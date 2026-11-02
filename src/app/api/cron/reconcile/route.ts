import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateBundlePricing } from "@/lib/pricing/engine";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "") || req.headers.get("x-cron-secret");
  const expectedSecret = process.env.CRON_SECRET;

  if (!expectedSecret || token !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch AppConfig reconcileGate setting ("warn" or "enforce")
  let reconcileGate = "warn";
  try {
    const configRow = await prisma.appConfig.findUnique({ where: { key: "reconcileGate" } });
    if (configRow && typeof configRow.value === "string") {
      reconcileGate = configRow.value;
    }
  } catch {
    // default
  }

  const bundles = await prisma.bundle.findMany({
    where: { isActive: true },
    include: {
      items: {
        include: {
          service: true,
        },
      },
    },
  });

  const now = new Date();
  const driftList: {
    slug: string;
    computedCents: number;
    vagaroPriceCents: number | null;
    driftCents: number;
  }[] = [];

  let reconciledCount = 0;

  for (const bundle of bundles) {
    if (bundle.kind === "BUILD_YOUR_OWN") {
      // Build your own has dynamic price based on customer selections
      await prisma.bundle.update({
        where: { id: bundle.id },
        data: { reconciledAt: now },
      });
      reconciledCount++;
      continue;
    }

    const pricing = calculateBundlePricing(
      bundle.items.map((i) => ({
        listPriceCents: i.service.listPriceCents,
        discountable: i.service.discountable,
        qty: i.qty,
      })),
      bundle.discountPct
    );

    const computed = pricing.bundlePriceCents;

    if (bundle.vagaroPriceCents !== null && bundle.vagaroPriceCents !== undefined) {
      if (computed === bundle.vagaroPriceCents) {
        await prisma.bundle.update({
          where: { id: bundle.id },
          data: { reconciledAt: now },
        });
        reconciledCount++;
      } else {
        const drift = computed - bundle.vagaroPriceCents;
        driftList.push({
          slug: bundle.slug,
          computedCents: computed,
          vagaroPriceCents: bundle.vagaroPriceCents,
          driftCents: drift,
        });
        console.warn(
          `[PRICE_DRIFT] Bundle "${bundle.slug}" computed price $${(computed / 100).toFixed(2)} does not match Vagaro price $${(bundle.vagaroPriceCents / 100).toFixed(2)} (diff: ${drift > 0 ? "+" : ""}$${(drift / 100).toFixed(2)})`
        );
      }
    } else {
      // When no vagaroPriceCents is set yet, mark reconciled
      await prisma.bundle.update({
        where: { id: bundle.id },
        data: { reconciledAt: now },
      });
      reconciledCount++;
    }
  }

  return NextResponse.json({
    timestamp: now.toISOString(),
    totalBundles: bundles.length,
    reconciledCount,
    driftCount: driftList.length,
    driftList,
    reconcileGate,
  });
}
