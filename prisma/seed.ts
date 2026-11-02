import { PrismaClient, OfferKind, OfferScope, BundleKind } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

interface RawCatalog {
  categories: [string, string, number][];
  services: Record<string, ([string, string, number, string] | [string, string, number, string, number])[]>;
  bundles: {
    slug: string;
    name: string;
    tagline?: string;
    audience?: string;
    kind?: "FIXED" | "BUILD_YOUR_OWN";
    pickCount?: number;
    discountPct: number;
    activeFrom?: string;
    activeTo?: string;
    daysOfWeek?: number[];
    featured?: boolean;
    sortOrder: number;
    items: string[];
  }[];
  offers: {
    code: string;
    name: string;
    description: string;
    kind: keyof typeof OfferKind;
    scope: keyof typeof OfferScope;
    percentOff?: number;
    amountOffCents?: number;
    freeServiceSlug?: string;
    params?: Record<string, unknown>;
    minSpendCents?: number;
    daysOfWeek?: number[];
    requiresCode?: boolean;
    startsAt: string;
    endsAt: string;
    maxRedemptionsTotal?: number;
    maxRedemptionsPerClient?: number;
    priority?: number;
  }[];
  appConfig: Record<string, unknown>;
}

export function validateCatalog(catalog: RawCatalog) {
  const errors: string[] = [];

  // Check categories for duplicates
  const categorySlugs = new Set<string>();
  for (const [slug] of catalog.categories) {
    if (categorySlugs.has(slug)) {
      errors.push(`Duplicate category slug: "${slug}"`);
    }
    categorySlugs.add(slug);
  }

  // Check services
  const serviceSlugs = new Set<string>();
  for (const [categoryKey, services] of Object.entries(catalog.services)) {
    if (!categorySlugs.has(categoryKey)) {
      errors.push(`Category "${categoryKey}" referenced in services does not exist in categories list`);
    }
    for (const srv of services) {
      const [slug, name, priceCents] = srv;
      if (serviceSlugs.has(slug)) {
        errors.push(`Duplicate service slug: "${slug}"`);
      }
      serviceSlugs.add(slug);

      if (priceCents === undefined || priceCents === null || typeof priceCents !== "number" || priceCents <= 0) {
        errors.push(`Service "${slug}" (${name}) has invalid or zero listPriceCents: ${priceCents}`);
      }
    }
  }

  // Check bundles
  const bundleSlugs = new Set<string>();
  for (const bundle of catalog.bundles) {
    if (bundleSlugs.has(bundle.slug)) {
      errors.push(`Duplicate bundle slug: "${bundle.slug}"`);
    }
    bundleSlugs.add(bundle.slug);

    if (bundle.discountPct < 0 || bundle.discountPct > 15) {
      errors.push(`Bundle "${bundle.slug}" discountPct (${bundle.discountPct}%) exceeds allowed range 0..15%`);
    }

    for (const itemSlug of bundle.items) {
      if (!serviceSlugs.has(itemSlug)) {
        errors.push(`Bundle "${bundle.slug}" references unknown service slug: "${itemSlug}"`);
      }
    }
  }

  // Check offers
  const offerCodes = new Set<string>();
  for (const offer of catalog.offers) {
    if (offerCodes.has(offer.code)) {
      errors.push(`Duplicate offer code: "${offer.code}"`);
    }
    offerCodes.add(offer.code);

    if (offer.percentOff !== undefined && offer.percentOff !== null) {
      if (offer.percentOff < 0 || offer.percentOff > 15) {
        errors.push(`Offer "${offer.code}" percentOff (${offer.percentOff}%) exceeds allowed range 0..15%`);
      }
    }

    if (offer.freeServiceSlug && !serviceSlugs.has(offer.freeServiceSlug)) {
      errors.push(`Offer "${offer.code}" references unknown free service slug: "${offer.freeServiceSlug}"`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Catalog validation failed with ${errors.length} error(s):\n- ${errors.join("\n- ")}`);
  }
}

export async function seedCatalog(customCatalog?: RawCatalog) {
  const catalogPath = path.join(__dirname, "seed", "catalog.json");
  const catalog: RawCatalog = customCatalog ?? JSON.parse(fs.readFileSync(catalogPath, "utf-8"));

  // 1. Validate catalog before executing any database modifications
  validateCatalog(catalog);

  console.log("Validation passed. Seeding catalog...");

  // 2. Upsert Categories
  const categoryIdMap = new Map<string, string>();
  for (const [slug, name, sortOrder] of catalog.categories) {
    const cat = await prisma.serviceCategory.upsert({
      where: { slug },
      update: { name, sortOrder },
      create: { slug, name, sortOrder },
    });
    categoryIdMap.set(slug, cat.id);
  }

  // 3. Upsert Services
  const serviceIdMap = new Map<string, string>();
  for (const [catSlug, services] of Object.entries(catalog.services)) {
    const categoryId = categoryIdMap.get(catSlug);
    if (!categoryId) {
      throw new Error(`Category id not found for slug: ${catSlug}`);
    }

    for (let i = 0; i < services.length; i++) {
      const srv = services[i];
      const [slug, name, priceCents, rawFlags, durationMin] = srv;
      const flags = (rawFlags || "").split(" ").map((f) => f.trim()).filter(Boolean);

      const priceIsFrom = flags.includes("F");
      const discountable = !flags.includes("ND");
      const isFoldedMenu = flags.includes("U");
      const isActive = !isFoldedMenu;
      const priceVerified = !isFoldedMenu;

      const service = await prisma.service.upsert({
        where: { slug },
        update: {
          name,
          categoryId,
          listPriceCents: priceCents,
          priceIsFrom,
          discountable,
          isActive,
          priceVerified,
          durationMin: durationMin ?? null,
          sortOrder: i + 1,
        },
        create: {
          slug,
          name,
          categoryId,
          listPriceCents: priceCents,
          priceIsFrom,
          discountable,
          isActive,
          priceVerified,
          durationMin: durationMin ?? null,
          sortOrder: i + 1,
        },
      });
      serviceIdMap.set(slug, service.id);
    }
  }

  // 4. Upsert Bundles & BundleItems
  for (const bundleData of catalog.bundles) {
    const kind = bundleData.kind === "BUILD_YOUR_OWN" ? BundleKind.BUILD_YOUR_OWN : BundleKind.FIXED;
    const bundle = await prisma.bundle.upsert({
      where: { slug: bundleData.slug },
      update: {
        name: bundleData.name,
        tagline: bundleData.tagline ?? null,
        audience: bundleData.audience ?? null,
        kind,
        pickCount: bundleData.pickCount ?? null,
        discountPct: bundleData.discountPct,
        activeFrom: bundleData.activeFrom ? new Date(bundleData.activeFrom) : null,
        activeTo: bundleData.activeTo ? new Date(bundleData.activeTo) : null,
        daysOfWeek: bundleData.daysOfWeek ?? [],
        featured: bundleData.featured ?? false,
        sortOrder: bundleData.sortOrder,
      },
      create: {
        slug: bundleData.slug,
        name: bundleData.name,
        tagline: bundleData.tagline ?? null,
        audience: bundleData.audience ?? null,
        kind,
        pickCount: bundleData.pickCount ?? null,
        discountPct: bundleData.discountPct,
        activeFrom: bundleData.activeFrom ? new Date(bundleData.activeFrom) : null,
        activeTo: bundleData.activeTo ? new Date(bundleData.activeTo) : null,
        daysOfWeek: bundleData.daysOfWeek ?? [],
        featured: bundleData.featured ?? false,
        sortOrder: bundleData.sortOrder,
      },
    });

    // Reconcile bundle items
    await prisma.bundleItem.deleteMany({
      where: { bundleId: bundle.id },
    });

    for (const itemSlug of bundleData.items) {
      const serviceId = serviceIdMap.get(itemSlug);
      if (!serviceId) {
        throw new Error(`Service not found for slug: ${itemSlug}`);
      }
      await prisma.bundleItem.upsert({
        where: {
          bundleId_serviceId: {
            bundleId: bundle.id,
            serviceId,
          },
        },
        update: { qty: 1 },
        create: {
          bundleId: bundle.id,
          serviceId,
          qty: 1,
        },
      });
    }
  }

  // 5. Upsert Offers
  for (const offerData of catalog.offers) {
    const freeServiceId = offerData.freeServiceSlug ? serviceIdMap.get(offerData.freeServiceSlug) ?? null : null;

    await prisma.offer.upsert({
      where: { code: offerData.code },
      update: {
        name: offerData.name,
        description: offerData.description,
        kind: offerData.kind as OfferKind,
        scope: offerData.scope as OfferScope,
        percentOff: offerData.percentOff ?? null,
        amountOffCents: offerData.amountOffCents ?? null,
        freeServiceId,
        params: offerData.params as any ?? null,
        minSpendCents: offerData.minSpendCents ?? null,
        daysOfWeek: offerData.daysOfWeek ?? [],
        requiresCode: offerData.requiresCode ?? false,
        startsAt: new Date(offerData.startsAt),
        endsAt: new Date(offerData.endsAt),
        maxRedemptionsTotal: offerData.maxRedemptionsTotal ?? null,
        maxRedemptionsPerClient: offerData.maxRedemptionsPerClient ?? null,
        priority: offerData.priority ?? 0,
      },
      create: {
        code: offerData.code,
        name: offerData.name,
        description: offerData.description,
        kind: offerData.kind as OfferKind,
        scope: offerData.scope as OfferScope,
        percentOff: offerData.percentOff ?? null,
        amountOffCents: offerData.amountOffCents ?? null,
        freeServiceId,
        params: offerData.params as any ?? null,
        minSpendCents: offerData.minSpendCents ?? null,
        daysOfWeek: offerData.daysOfWeek ?? [],
        requiresCode: offerData.requiresCode ?? false,
        startsAt: new Date(offerData.startsAt),
        endsAt: new Date(offerData.endsAt),
        maxRedemptionsTotal: offerData.maxRedemptionsTotal ?? null,
        maxRedemptionsPerClient: offerData.maxRedemptionsPerClient ?? null,
        priority: offerData.priority ?? 0,
      },
    });
  }

  // 6. Upsert AppConfig
  await prisma.appConfig.upsert({
    where: { key: "main" },
    update: { value: catalog.appConfig as any },
    create: { key: "main", value: catalog.appConfig as any },
  });

  for (const [key, val] of Object.entries(catalog.appConfig)) {
    await prisma.appConfig.upsert({
      where: { key },
      update: { value: val as any },
      create: { key, value: val as any },
    });
  }

  console.log("Seeding completed successfully.");
}

if (require.main === module || process.argv[1]?.endsWith("seed.ts")) {
  seedCatalog()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
