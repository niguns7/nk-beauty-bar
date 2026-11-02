import { prisma } from "@/lib/prisma";
import { calculateBundlePricing, getSalonWeekday } from "@/lib/pricing/engine";

export interface CatalogService {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  durationMin: number | null;
  listPriceCents: number;
  priceIsFrom: boolean;
  discountable: boolean;
  sortOrder: number;
}

export interface CatalogCategory {
  id: string;
  slug: string;
  name: string;
  sortOrder: number;
  minPriceCents: number;
  services: CatalogService[];
}

export interface CatalogBundleItem {
  slug: string;
  name: string;
  listPriceCents: number;
  discountable: boolean;
  qty: number;
}

export interface CatalogBundle {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  audience: string | null;
  kind: "FIXED" | "BUILD_YOUR_OWN";
  discountPct: number;
  daysOfWeek: number[];
  featured: boolean;
  sortOrder: number;
  isAvailableNow: boolean;
  activeFrom?: Date | null;
  activeTo?: Date | null;
  priceCents: number;
  listPriceCents: number;
  savingsCents: number;
  hasFromPrice: boolean;
  pickCount?: number | null;
  items: CatalogBundleItem[];
}

export interface CatalogData {
  categories: CatalogCategory[];
  bundles: CatalogBundle[];
  offers: any[];
  appConfig: Record<string, any>;
  featuredBundle: CatalogBundle | null;
}

export async function getCatalog(simulatedNow?: Date): Promise<CatalogData> {
  const now = simulatedNow ?? new Date();
  const salonTz = process.env.SALON_TZ || "America/Chicago";
  const currentWeekday = getSalonWeekday(now, salonTz);

  // 1. Categories with verified active services
  const rawCategories = await prisma.serviceCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      services: {
        where: { isActive: true, priceVerified: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  const categories: CatalogCategory[] = rawCategories.map((cat) => {
    const minPriceCents =
      cat.services.length > 0
        ? Math.min(...cat.services.map((s) => s.listPriceCents))
        : 0;
    return {
      id: cat.id,
      slug: cat.slug,
      name: cat.name,
      sortOrder: cat.sortOrder,
      minPriceCents,
      services: cat.services.map((s) => ({
        id: s.id,
        slug: s.slug,
        name: s.name,
        description: s.description,
        durationMin: s.durationMin,
        listPriceCents: s.listPriceCents,
        priceIsFrom: s.priceIsFrom,
        discountable: s.discountable,
        sortOrder: s.sortOrder,
      })),
    };
  });

  // 2. Bundles
  const rawBundles = await prisma.bundle.findMany({
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

  const bundles: CatalogBundle[] = rawBundles.map((b) => {
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
        kind: b.kind as "BUILD_YOUR_OWN",
        discountPct: b.discountPct,
        daysOfWeek: b.daysOfWeek,
        featured: b.featured,
        sortOrder: b.sortOrder,
        isAvailableNow,
        activeFrom: b.activeFrom,
        activeTo: b.activeTo,
        priceCents: 0,
        listPriceCents: 0,
        savingsCents: 0,
        hasFromPrice: false,
        pickCount: b.pickCount ?? 3,
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
      kind: b.kind as "FIXED",
      discountPct: b.discountPct,
      daysOfWeek: b.daysOfWeek,
      featured: b.featured,
      sortOrder: b.sortOrder,
      isAvailableNow,
      activeFrom: b.activeFrom,
      activeTo: b.activeTo,
      priceCents: pricing.bundlePriceCents,
      listPriceCents: pricing.listTotalCents,
      savingsCents: pricing.savingsCents,
      hasFromPrice,
      pickCount: null,
      items: b.items.map((i) => ({
        slug: i.service.slug,
        name: i.service.name,
        listPriceCents: i.service.listPriceCents,
        discountable: i.service.discountable,
        qty: i.qty,
      })),
    };
  });

  // 3. Active offers
  const offers = await prisma.offer.findMany({
    where: {
      isActive: true,
      startsAt: { lte: now },
      endsAt: { gte: now },
    },
    orderBy: { priority: "desc" },
  });

  // 4. AppConfig
  let appConfig: Record<string, any> = {};
  try {
    const configRow = await prisma.appConfig.findUnique({ where: { key: "main" } });
    if (configRow) appConfig = configRow.value as Record<string, any>;
  } catch {
    // defaults
  }

  // 5. Featured bundle logic:
  // "FeaturedRitual: choose the featured active bundle (Holiday Ready → Party Glam by date); if none, show the gift-card promo during Nov 27–Dec 24."
  const activeFeaturedBundles = bundles.filter((b) => b.featured && b.isAvailableNow);
  const featuredBundle = activeFeaturedBundles.length > 0 ? activeFeaturedBundles[0] : null;

  return {
    categories,
    bundles,
    offers,
    appConfig,
    featuredBundle,
  };
}
