import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import {
  QuoteRequestInput,
  PricingEngineResult,
  QuoteLine,
  AppliedOfferSummary,
  BonusSummary,
  quoteRequestSchema,
} from "./types";

export function getSalonWeekday(date: Date, timeZone: string = "America/Chicago"): number {
  const dayStr = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
  }).format(date);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days.indexOf(dayStr);
}

export function hashClientRef(ref?: string): string | null {
  if (!ref || !ref.trim()) return null;
  return crypto.createHash("sha256").update(ref.trim().toLowerCase()).digest("hex");
}

export function calculateBundlePricing(
  items: { listPriceCents: number; discountable: boolean; qty?: number }[],
  discountPct: number
) {
  let protectedCents = 0;
  let discCents = 0;

  for (const item of items) {
    const qty = item.qty ?? 1;
    const itemTotal = item.listPriceCents * qty;
    if (item.discountable === false) {
      protectedCents += itemTotal;
    } else {
      discCents += itemTotal;
    }
  }

  // discounted = floor((disc * (100 - discountPct) + 5000) / 10000) * 100 // nearest dollar, half up
  const discountedCents =
    Math.floor((discCents * (100 - discountPct) + 5000) / 10000) * 100;
  const bundlePriceCents = protectedCents + discountedCents;
  const listTotalCents = protectedCents + discCents;
  const savingsCents = listTotalCents - bundlePriceCents;

  return {
    protectedCents,
    discCents,
    bundlePriceCents,
    listTotalCents,
    savingsCents,
  };
}

export interface EngineContext {
  now?: Date;
  persist?: boolean;
  appConfig?: {
    salonTz?: string;
    maxDiscountPct?: number;
    quoteTtlMin?: number;
    reconcileGate?: string;
  };
}

export async function calculateQuote(
  rawInput: unknown,
  context: EngineContext = {}
): Promise<PricingEngineResult & { quoteId?: string; expiresAt: Date; inputHash: string }> {
  // 1. Zod parse & sanitize: any unknown fields (price, discount, total, time) are stripped
  const parsed = quoteRequestSchema.parse(rawInput);
  const now = context.now ?? new Date();

  // 2. Load AppConfig
  let salonTz = process.env.SALON_TZ || "America/Chicago";
  let maxDiscountPct = 15;
  let quoteTtlMin = 30;

  try {
    const configRow = await prisma.appConfig.findUnique({ where: { key: "main" } });
    if (configRow && typeof configRow.value === "object" && configRow.value !== null) {
      const cfg = configRow.value as Record<string, any>;
      if (cfg.salonTz) salonTz = cfg.salonTz;
      if (typeof cfg.maxDiscountPct === "number") maxDiscountPct = cfg.maxDiscountPct;
      if (typeof cfg.quoteTtlMin === "number") quoteTtlMin = cfg.quoteTtlMin;
    }
  } catch {
    // Fall back to defaults if database not yet migrated in tests
  }

  // Explicit context overrides DB
  if (context.appConfig?.salonTz) salonTz = context.appConfig.salonTz;
  if (typeof context.appConfig?.maxDiscountPct === "number") maxDiscountPct = context.appConfig.maxDiscountPct;
  if (typeof context.appConfig?.quoteTtlMin === "number") quoteTtlMin = context.appConfig.quoteTtlMin;

  const currentWeekday = getSalonWeekday(now, salonTz);

  // 3. Resolve items from DB
  const lines: QuoteLine[] = [];
  const notes: string[] = [];
  let subtotalCents = 0;
  let bundleSavingsCents = 0;
  let hasFromPrice = false;
  let hasBundleLine = false;

  for (const item of parsed.items) {
    const qty = item.qty ?? 1;

    if (item.type === "service") {
      const service = await prisma.service.findFirst({
        where: { slug: item.slug, isActive: true, priceVerified: true },
      });

      if (!service) {
        throw new Error(`Service "${item.slug}" is not active or available`);
      }

      const listCents = service.listPriceCents * qty;
      lines.push({
        type: "service",
        slug: service.slug,
        name: service.name,
        qty,
        listCents,
        finalCents: listCents,
        unitPriceCents: service.listPriceCents,
        discountable: service.discountable,
        priceIsFrom: service.priceIsFrom,
      });

      subtotalCents += listCents;
      if (service.priceIsFrom) hasFromPrice = true;
    } else if (item.type === "bundle") {
      hasBundleLine = true;
      const bundle = await prisma.bundle.findUnique({
        where: { slug: item.slug },
        include: {
          items: {
            include: {
              service: true,
            },
          },
        },
      });

      if (!bundle || !bundle.isActive) {
        throw new Error(`Bundle "${item.slug}" is not active or available`);
      }

      // Check date schedule
      if (bundle.activeFrom && now.getTime() < bundle.activeFrom.getTime()) {
        throw new Error(`Bundle "${bundle.name}" is not active until ${bundle.activeFrom.toISOString()}`);
      }
      if (bundle.activeTo && now.getTime() > bundle.activeTo.getTime()) {
        throw new Error(`Bundle "${bundle.name}" expired on ${bundle.activeTo.toISOString()}`);
      }

      // Check daysOfWeek
      if (bundle.daysOfWeek && bundle.daysOfWeek.length > 0 && !bundle.daysOfWeek.includes(currentWeekday)) {
        throw new Error(`Bundle "${bundle.name}" is not available on this day of the week`);
      }

      if (bundle.kind === "BUILD_YOUR_OWN") {
        const requiredPicks = bundle.pickCount ?? 3;
        const picks = item.picks ?? [];
        if (picks.length !== requiredPicks) {
          throw new Error(`Build Your Glow bundle requires exactly ${requiredPicks} service picks`);
        }
        // Must be distinct
        const uniquePicks = new Set(picks);
        if (uniquePicks.size !== requiredPicks) {
          throw new Error("Build Your Glow bundle requires distinct services");
        }

        const pickedServices = await prisma.service.findMany({
          where: {
            slug: { in: picks },
            isActive: true,
            priceVerified: true,
          },
        });

        if (pickedServices.length !== requiredPicks) {
          throw new Error("One or more chosen services for Build Your Glow are invalid or inactive");
        }

        for (const ps of pickedServices) {
          if (!ps.discountable) {
            throw new Error(`Service "${ps.name}" cannot be used in Build Your Glow bundle`);
          }
          if (ps.priceIsFrom) hasFromPrice = true;
        }

        const pricing = calculateBundlePricing(pickedServices, bundle.discountPct);
        const listCents = pricing.listTotalCents * qty;
        const finalCents = pricing.bundlePriceCents * qty;
        const lineSavings = listCents - finalCents;

        lines.push({
          type: "bundle",
          slug: bundle.slug,
          name: bundle.name,
          qty,
          listCents,
          finalCents,
          unitPriceCents: pricing.bundlePriceCents,
          discountable: false,
          priceIsFrom: pickedServices.some((p) => p.priceIsFrom),
          picks,
          note: `Custom bundle (${bundle.discountPct}% savings)`,
        });

        subtotalCents += listCents;
        bundleSavingsCents += lineSavings;
      } else {
        // FIXED bundle
        for (const bi of bundle.items) {
          if (!bi.service.isActive || !bi.service.priceVerified) {
            throw new Error(`Service "${bi.service.name}" in bundle "${bundle.name}" is currently unavailable`);
          }
          if (bi.service.priceIsFrom) hasFromPrice = true;
        }

        const pricing = calculateBundlePricing(
          bundle.items.map((bi) => ({
            listPriceCents: bi.service.listPriceCents,
            discountable: bi.service.discountable,
            qty: bi.qty,
          })),
          bundle.discountPct
        );

        const listCents = pricing.listTotalCents * qty;
        const finalCents = pricing.bundlePriceCents * qty;
        const lineSavings = listCents - finalCents;

        lines.push({
          type: "bundle",
          slug: bundle.slug,
          name: bundle.name,
          qty,
          listCents,
          finalCents,
          unitPriceCents: pricing.bundlePriceCents,
          discountable: false,
          priceIsFrom: bundle.items.some((bi) => bi.service.priceIsFrom),
          note: `${bundle.discountPct}% bundle savings`,
        });

        subtotalCents += listCents;
        bundleSavingsCents += lineSavings;
      }
    }
  }

  // 4. Eligible offers
  const hashedClientRef = hashClientRef(parsed.clientRef);
  const activeOffers = await prisma.offer.findMany({
    where: { isActive: true },
    orderBy: { priority: "desc" },
  });

  const eligiblePriceOffers: typeof activeOffers = [];
  const eligibleNonPriceOffers: typeof activeOffers = [];

  const userCode = parsed.offerCode?.trim().toUpperCase();

  for (const offer of activeOffers) {
    // Schedule check
    if (now.getTime() < offer.startsAt.getTime() || now.getTime() > offer.endsAt.getTime()) {
      if (userCode && userCode === offer.code) {
        notes.push(`Offer "${offer.code}" is not active at this time.`);
      }
      continue;
    }

    // Days of week check
    if (offer.daysOfWeek && offer.daysOfWeek.length > 0 && !offer.daysOfWeek.includes(currentWeekday)) {
      if (userCode && userCode === offer.code) {
        notes.push(`Offer "${offer.code}" is only available on specific days of the week.`);
      }
      continue;
    }

    // Code check
    if (offer.requiresCode) {
      if (!userCode || userCode !== offer.code) {
        continue;
      }
    }

    // Min spend check
    if (offer.minSpendCents && subtotalCents < offer.minSpendCents) {
      if (userCode && userCode === offer.code) {
        notes.push(`Offer "${offer.code}" requires a minimum spend of $${(offer.minSpendCents / 100).toFixed(2)}.`);
      }
      continue;
    }

    // Scope check
    if (offer.scope === "GIFT_CARD" && userCode !== offer.code) {
      continue;
    }

    if (offer.scope === "FIRST_VISIT" && !parsed.isFirstVisit) {
      if (userCode && userCode === offer.code) {
        notes.push(`Offer "${offer.code}" is only valid for first-time guests.`);
      }
      continue;
    }

    if (offer.scope === "BUNDLE_ONLY" && !hasBundleLine) {
      if (userCode && userCode === offer.code) {
        notes.push(`Offer "${offer.code}" requires a bundle.`);
      }
      continue;
    }

    // Redemptions check
    if (offer.maxRedemptionsTotal) {
      const totalCount = await prisma.offerRedemption.count({ where: { offerId: offer.id } });
      if (totalCount >= offer.maxRedemptionsTotal) {
        if (userCode && userCode === offer.code) {
          notes.push(`Offer "${offer.code}" has reached its maximum total redemptions.`);
        }
        continue;
      }
    }

    if (offer.maxRedemptionsPerClient && hashedClientRef) {
      const clientCount = await prisma.offerRedemption.count({
        where: { offerId: offer.id, clientRef: hashedClientRef },
      });
      if (clientCount >= offer.maxRedemptionsPerClient) {
        if (userCode && userCode === offer.code) {
          notes.push(`Offer "${offer.code}" has already been redeemed by your profile.`);
        }
        continue;
      }
    }

    if (offer.kind === "PERCENT_OFF" || offer.kind === "AMOUNT_OFF") {
      eligiblePriceOffers.push(offer);
    } else {
      eligibleNonPriceOffers.push(offer);
    }
  }

  // 5. Apply Offers
  let offerDiscountCents = 0;
  let appliedOffer: AppliedOfferSummary | null = null;
  const bonuses: BonusSummary[] = [];

  // One-Offer Rule for price-reducing offers:
  if (hasBundleLine) {
    if (userCode && eligiblePriceOffers.some((o) => o.code === userCode)) {
      notes.push("Promotional discount codes cannot be combined with bundle pricing.");
    }
  } else if (eligiblePriceOffers.length > 0) {
    // Pick highest priority
    const bestPriceOffer = eligiblePriceOffers[0];
    if (bestPriceOffer.kind === "PERCENT_OFF" && bestPriceOffer.percentOff) {
      // Applies only to discountable lines
      const discountableTotal = lines
        .filter((l) => l.discountable !== false)
        .reduce((sum, l) => sum + l.listCents, 0);

      offerDiscountCents = Math.floor((discountableTotal * bestPriceOffer.percentOff) / 100);
      appliedOffer = {
        id: bestPriceOffer.id,
        code: bestPriceOffer.code,
        name: bestPriceOffer.name,
        description: bestPriceOffer.description,
        kind: bestPriceOffer.kind,
        discountCents: offerDiscountCents,
      };

      // Adjust line finalCents for discountable lines
      if (discountableTotal > 0 && offerDiscountCents > 0) {
        let remainingDiscount = offerDiscountCents;
        const discLines = lines.filter((l) => l.discountable !== false);
        for (let i = 0; i < discLines.length; i++) {
          const l = discLines[i];
          const linePortion =
            i === discLines.length - 1
              ? remainingDiscount
              : Math.floor((l.listCents * bestPriceOffer.percentOff) / 100);
          l.finalCents = l.listCents - linePortion;
          remainingDiscount -= linePortion;
        }
      }
    } else if (bestPriceOffer.kind === "AMOUNT_OFF" && bestPriceOffer.amountOffCents) {
      const discountableTotal = lines
        .filter((l) => l.discountable !== false)
        .reduce((sum, l) => sum + l.listCents, 0);

      offerDiscountCents = Math.min(bestPriceOffer.amountOffCents, discountableTotal);
      appliedOffer = {
        id: bestPriceOffer.id,
        code: bestPriceOffer.code,
        name: bestPriceOffer.name,
        description: bestPriceOffer.description,
        kind: bestPriceOffer.kind,
        discountCents: offerDiscountCents,
      };

      // Adjust line finalCents
      let remaining = offerDiscountCents;
      for (const l of lines.filter((line) => line.discountable !== false)) {
        const deduct = Math.min(l.finalCents, remaining);
        l.finalCents -= deduct;
        remaining -= deduct;
        if (remaining <= 0) break;
      }
    }
  }

  // Non-price offers: at most one unless stackable
  if (eligibleNonPriceOffers.length > 0) {
    const bestNonPriceOffer = eligibleNonPriceOffers[0];

    if (bestNonPriceOffer.kind === "FREE_ADDON" && bestNonPriceOffer.freeServiceId) {
      const freeSrv = await prisma.service.findUnique({
        where: { id: bestNonPriceOffer.freeServiceId },
      });
      if (freeSrv) {
        lines.push({
          type: "addon",
          slug: freeSrv.slug,
          name: `${freeSrv.name} (Free Gift)`,
          qty: 1,
          listCents: freeSrv.listPriceCents,
          finalCents: 0,
          unitPriceCents: freeSrv.listPriceCents,
          discountable: false,
          note: bestNonPriceOffer.name,
        });
        bonuses.push({
          code: bestNonPriceOffer.code,
          name: bestNonPriceOffer.name,
          description: bestNonPriceOffer.description,
          kind: bestNonPriceOffer.kind,
        });
      }
    } else {
      bonuses.push({
        code: bestNonPriceOffer.code,
        name: bestNonPriceOffer.name,
        description: bestNonPriceOffer.description,
        kind: bestNonPriceOffer.kind,
        details: (bestNonPriceOffer.params as Record<string, unknown>) ?? null,
      });
    }
  }

  // 6. Discount Cap: total discount (bundle savings + offer) <= maxDiscountPct
  let totalDiscountCents = bundleSavingsCents + offerDiscountCents;
  const maxAllowedDiscountCents = Math.floor((subtotalCents * maxDiscountPct) / 100);

  if (totalDiscountCents > maxAllowedDiscountCents) {
    const excess = totalDiscountCents - maxAllowedDiscountCents;
    totalDiscountCents = maxAllowedDiscountCents;
    if (offerDiscountCents > 0) {
      offerDiscountCents = Math.max(0, offerDiscountCents - excess);
      if (appliedOffer) {
        appliedOffer.discountCents = offerDiscountCents;
      }
    }
    notes.push(`Promotional savings capped at maximum allowed ${maxDiscountPct}%.`);
  }

  const totalCents = Math.max(0, subtotalCents - totalDiscountCents);
  const savingsPct = subtotalCents > 0 ? Math.round((totalDiscountCents / subtotalCents) * 100) : 0;

  const expiresAt = new Date(now.getTime() + quoteTtlMin * 60 * 1000);
  const inputHash = crypto
    .createHash("sha256")
    .update(
      JSON.stringify({
        items: parsed.items,
        offerCode: parsed.offerCode,
        isFirstVisit: parsed.isFirstVisit,
        clientRef: hashedClientRef,
      })
    )
    .digest("hex");

  let quoteId: string | undefined;

  if (context.persist) {
    const saved = await prisma.quote.create({
      data: {
        expiresAt,
        inputHash,
        linesJson: lines as any,
        subtotalCents,
        discountCents: totalDiscountCents,
        totalCents,
        hasFromPrice,
        appliedOfferId: appliedOffer?.id ?? null,
        bonusesJson: bonuses.length > 0 ? (bonuses as any) : undefined,
        notesJson: notes.length > 0 ? (notes as any) : undefined,
        utmJson: parsed.utm ? (parsed.utm as any) : undefined,
        clientRef: hashedClientRef,
      },
    });
    quoteId = saved.id;
  }

  return {
    lines,
    subtotalCents,
    discountCents: totalDiscountCents,
    totalCents,
    savingsPct,
    hasFromPrice,
    appliedOffer,
    bonuses,
    notes,
    quoteId,
    expiresAt,
    inputHash,
  };
}
