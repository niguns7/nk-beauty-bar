import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateBundlePricing, getSalonWeekday } from "@/lib/pricing/engine";

export const runtime = "nodejs";
export const revalidate = 300;

export async function GET() {
  const now = new Date();
  const salonTz = process.env.SALON_TZ || "America/Chicago";
  const currentWeekday = getSalonWeekday(now, salonTz);

  // 1. Fetch Categories with active, price-verified services
  const categories = await prisma.serviceCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      services: {
        where: { isActive: true, priceVerified: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  // 2. Fetch Bundles
  const allBundles = await prisma.bundle.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: {
      items: {
        include: {
          service: true,
        },
      },
    },
  });

  // Calculate pricing for bundles and determine active status
  const bundles = allBundles.map((b) => {
    const isWithinDate =
      (!b.activeFrom || now.getTime() >= b.activeFrom.getTime()) &&
      (!b.activeTo || now.getTime() <= b.activeTo.getTime());

    const isWithinWeekday =
      !b.daysOfWeek || b.daysOfWeek.length === 0 || b.daysOfWeek.includes(currentWeekday);

    const isAvailableNow = isWithinDate && isWithinWeekday;

    if (b.kind === "BUILD_YOUR_OWN") {
      return {
        id: b.id,
        slug: b.slug,
        name: b.name,
        tagline: b.tagline,
        audience: b.audience,
        kind: b.kind,
        pickCount: b.pickCount ?? 3,
        discountPct: b.discountPct,
        daysOfWeek: b.daysOfWeek,
        featured: b.featured,
        sortOrder: b.sortOrder,
        isAvailableNow,
        items: [],
      };
    }

    const pricing = calculateBundlePricing(
      b.items.map((i) => ({
        listPriceCents: i.service.listPriceCents,
        discountable: i.service.discountable,
        qty: i.qty,
      })),
      b.discountPct
    );

    const hasFromPrice = b.items.some((i) => i.service.priceIsFrom);

    return {
      id: b.id,
      slug: b.slug,
      name: b.name,
      tagline: b.tagline,
      audience: b.audience,
      kind: b.kind,
      discountPct: b.discountPct,
      daysOfWeek: b.daysOfWeek,
      featured: b.featured,
      sortOrder: b.sortOrder,
      isAvailableNow,
      priceCents: pricing.bundlePriceCents,
      listPriceCents: pricing.listTotalCents,
      savingsCents: pricing.savingsCents,
      hasFromPrice,
      items: b.items.map((i) => ({
        slug: i.service.slug,
        name: i.service.name,
        listPriceCents: i.service.listPriceCents,
        discountable: i.service.discountable,
        qty: i.qty,
      })),
    };
  });

  // 3. Fetch active offers
  const offers = await prisma.offer.findMany({
    where: {
      isActive: true,
      startsAt: { lte: now },
      endsAt: { gte: now },
    },
    orderBy: { priority: "desc" },
    select: {
      id: true,
      code: true,
      name: true,
      description: true,
      kind: true,
      scope: true,
      percentOff: true,
      amountOffCents: true,
      params: true,
      minSpendCents: true,
      daysOfWeek: true,
      requiresCode: true,
      priority: true,
    },
  });

  // 4. Fetch AppConfig
  let appConfig: Record<string, any> = {};
  try {
    const configRow = await prisma.appConfig.findUnique({ where: { key: "main" } });
    if (configRow) appConfig = configRow.value as Record<string, any>;
  } catch {
    // defaults
  }

  return NextResponse.json(
    {
      categories,
      bundles,
      offers,
      appConfig,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}
