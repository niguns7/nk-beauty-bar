import { describe, it, expect, beforeAll } from "vitest";
import { prisma } from "../src/lib/prisma";
import { seedCatalog } from "../prisma/seed";

describe("Gift Cards Page - Database-Backed Pricing", () => {
  beforeAll(async () => {
    await seedCatalog();
  });

  it("loads gift card bonus tiers dynamically from GC_BONUS in database", async () => {
    const offer = await prisma.offer.findUnique({
      where: { code: "GC_BONUS" },
    });

    expect(offer).not.toBeNull();
    const params = offer?.params as any;
    expect(params.tiers).toBeDefined();
    expect(params.tiers).toEqual([
      { spendCents: 5000, bonusCents: 1000 },
      { spendCents: 10000, bonusCents: 2500 },
    ]);
    expect(params.bonusValidFrom).toBe("2027-01-02");
    expect(params.bonusValidTo).toBe("2027-02-28");
  });

  it("loads last-minute e-gift message dynamically from GC_EGIFT_LASTMINUTE", async () => {
    const egiftOffer = await prisma.offer.findUnique({
      where: { code: "GC_EGIFT_LASTMINUTE" },
    });

    expect(egiftOffer).not.toBeNull();
    expect(egiftOffer?.description).toBe("Delivered by text or email in 60 seconds.");
  });
});

