import { describe, it, expect, beforeAll } from "vitest";
import { calculateQuote, calculateBundlePricing } from "../src/lib/pricing/engine";
import { seedCatalog } from "../prisma/seed";
import { prisma } from "../src/lib/prisma";

describe("Pricing Engine - Golden Fixtures & Core Rules", () => {
  beforeAll(async () => {
    await seedCatalog();
  });

  // Base date inside active ranges (e.g. Dec 10, 2026 14:00 CST)
  // 2026-12-10 is a Thursday (getSalonWeekday = 4)
  const dec10 = new Date("2026-12-10T14:00:00-06:00");
  // 2026-11-14 is a Saturday (getSalonWeekday = 6)
  const nov14Sat = new Date("2026-11-14T14:00:00-06:00");
  // 2026-11-11 is a Wednesday (getSalonWeekday = 3)
  const nov11Wed = new Date("2026-11-11T14:00:00-06:00");

  it("express-glow: list 1700 → 1600", async () => {
    const res = await calculateQuote(
      { items: [{ type: "bundle", slug: "express-glow" }] },
      { now: dec10 }
    );
    expect(res.subtotalCents).toBe(1700);
    expect(res.totalCents).toBe(1600);
  });

  it("brow-polish: list 2200 → 2000", async () => {
    const res = await calculateQuote(
      { items: [{ type: "bundle", slug: "brow-polish" }] },
      { now: dec10 }
    );
    expect(res.subtotalCents).toBe(2200);
    expect(res.totalCents).toBe(2000);
  });

  it("smooth-and-polished: list 5200 → 4700", async () => {
    const res = await calculateQuote(
      { items: [{ type: "bundle", slug: "smooth-and-polished" }] },
      { now: dec10 }
    );
    expect(res.subtotalCents).toBe(5200);
    expect(res.totalCents).toBe(4700);
  });

  it("mom-and-me: list 2500 → 2300 on Saturday, rejected on Wednesday", async () => {
    const satRes = await calculateQuote(
      { items: [{ type: "bundle", slug: "mom-and-me" }] },
      { now: nov14Sat }
    );
    expect(satRes.subtotalCents).toBe(2500);
    expect(satRes.totalCents).toBe(2300);

    await expect(
      calculateQuote(
        { items: [{ type: "bundle", slug: "mom-and-me" }] },
        { now: nov11Wed }
      )
    ).rejects.toThrow(/not available on this day/);
  });

  it("holiday-ready: list 6700 → 6000 (from; rejected Nov 8 and Nov 26, accepted Nov 10)", async () => {
    const nov8 = new Date("2026-11-08T12:00:00-06:00");
    const nov10 = new Date("2026-11-10T12:00:00-06:00");
    const nov26 = new Date("2026-11-26T12:00:00-06:00");

    // Rejected Nov 8
    await expect(
      calculateQuote(
        { items: [{ type: "bundle", slug: "holiday-ready" }] },
        { now: nov8 }
      )
    ).rejects.toThrow(/not active until/);

    // Accepted Nov 10
    const accepted = await calculateQuote(
      { items: [{ type: "bundle", slug: "holiday-ready" }] },
      { now: nov10 }
    );
    expect(accepted.subtotalCents).toBe(6700);
    expect(accepted.totalCents).toBe(6000);
    expect(accepted.hasFromPrice).toBe(true);

    // Rejected Nov 26
    await expect(
      calculateQuote(
        { items: [{ type: "bundle", slug: "holiday-ready" }] },
        { now: nov26 }
      )
    ).rejects.toThrow(/expired on/);
  });

  it("gentlemans-groom: list 4900 → 4400", async () => {
    const res = await calculateQuote(
      { items: [{ type: "bundle", slug: "gentlemans-groom" }] },
      { now: dec10 }
    );
    expect(res.subtotalCents).toBe(4900);
    expect(res.totalCents).toBe(4400);
  });

  it("party-glam: list 10200 → 9000", async () => {
    const res = await calculateQuote(
      { items: [{ type: "bundle", slug: "party-glam" }] },
      { now: dec10 }
    );
    expect(res.subtotalCents).toBe(10200);
    expect(res.totalCents).toBe(9000);
  });

  it("party-glam-facial: list 6200 → 5500", async () => {
    const res = await calculateQuote(
      { items: [{ type: "bundle", slug: "party-glam-facial" }] },
      { now: dec10 }
    );
    expect(res.subtotalCents).toBe(6200);
    expect(res.totalCents).toBe(5500);
  });

  it("holiday-de-stress: list 9200 → 8400", async () => {
    const res = await calculateQuote(
      { items: [{ type: "bundle", slug: "holiday-de-stress" }] },
      { now: dec10 }
    );
    expect(res.subtotalCents).toBe(9200);
    expect(res.totalCents).toBe(8400);
  });

  it("build-your-glow: [wax-underarms, wax-half-legs, tint-eyebrow-regular] list 6000 → 5400", async () => {
    const res = await calculateQuote(
      {
        items: [
          {
            type: "bundle",
            slug: "build-your-glow",
            picks: ["wax-underarms", "wax-half-legs", "tint-eyebrow-regular"],
          },
        ],
      },
      { now: dec10 }
    );
    expect(res.subtotalCents).toBe(6000);
    expect(res.totalCents).toBe(5400);
  });

  it("ignores forged client-supplied price, discount, and total fields", async () => {
    const forgedInput = {
      items: [
        {
          type: "service",
          slug: "facial-signature",
          price: 1, // forged!
          listPriceCents: 100, // forged!
          finalCents: 50, // forged!
        },
      ],
      discountCents: 5000, // forged!
      totalCents: 10, // forged!
    };

    const res = await calculateQuote(forgedInput, { now: dec10 });
    // Real signature facial price is 7500 cents ($75)
    expect(res.subtotalCents).toBe(7500);
    expect(res.totalCents).toBe(7500);
    expect(res.discountCents).toBe(0);
  });

  it("thread-eyebrow is never discounted alone, in bundle, or with NEIGHBOR10", async () => {
    // 1. Thread eyebrow alone with NEIGHBOR10 on Wednesday (day 3)
    const res = await calculateQuote(
      {
        items: [{ type: "service", slug: "thread-eyebrow" }],
        offerCode: "NEIGHBOR10",
      },
      { now: nov11Wed }
    );
    expect(res.subtotalCents).toBe(700);
    expect(res.totalCents).toBe(700);
    expect(res.discountCents).toBe(0); // non-discountable!

    // 2. Thread eyebrow + forehead thread with NEIGHBOR10:
    // Eyebrow (700, non-discountable) + Forehead (600, discountable) = 1300
    // 10% of 600 is 60 cents. Eyebrow 700 remains 100% full price!
    const resCombo = await calculateQuote(
      {
        items: [
          { type: "service", slug: "thread-eyebrow" },
          { type: "service", slug: "thread-forehead" },
        ],
        offerCode: "NEIGHBOR10",
      },
      { now: nov11Wed }
    );
    expect(resCombo.subtotalCents).toBe(1300);
    expect(resCombo.discountCents).toBe(60);
    expect(resCombo.totalCents).toBe(1240);

    const eyebrowLine = resCombo.lines.find((l) => l.slug === "thread-eyebrow");
    expect(eyebrowLine?.finalCents).toBe(700);
    expect(eyebrowLine?.discountable).toBe(false);
  });

  it("rejects NEIGHBOR10 when a bundle is present and rejects Mon/Fri", async () => {
    // Bundle + NEIGHBOR10
    const bundleRes = await calculateQuote(
      {
        items: [{ type: "bundle", slug: "express-glow" }],
        offerCode: "NEIGHBOR10",
      },
      { now: nov11Wed }
    );
    expect(bundleRes.appliedOffer).toBeNull();
    expect(bundleRes.notes).toContain(
      "Promotional discount codes cannot be combined with bundle pricing."
    );

    // Monday (2026-11-09 is Monday)
    const nov9Mon = new Date("2026-11-09T14:00:00-06:00");
    const monRes = await calculateQuote(
      {
        items: [{ type: "service", slug: "wax-full-arms" }],
        offerCode: "NEIGHBOR10",
      },
      { now: nov9Mon }
    );
    expect(monRes.appliedOffer).toBeNull();
    expect(monRes.discountCents).toBe(0);

    // Friday (2026-11-13 is Friday)
    const nov13Fri = new Date("2026-11-13T14:00:00-06:00");
    const friRes = await calculateQuote(
      {
        items: [{ type: "service", slug: "wax-full-arms" }],
        offerCode: "NEIGHBOR10",
      },
      { now: nov13Fri }
    );
    expect(friRes.appliedOffer).toBeNull();
    expect(friRes.discountCents).toBe(0);
  });

  it("applies only highest priority price-reducing offer (One-Offer Rule)", async () => {
    // If multiple offers qualify, only highest priority applies
    const res = await calculateQuote(
      {
        items: [{ type: "service", slug: "facial-signature" }], // 7500 cents
        offerCode: "NEIGHBOR10", // priority 10, 10% off = 750 cents
      },
      { now: nov11Wed }
    );
    expect(res.appliedOffer?.code).toBe("NEIGHBOR10");
    expect(res.discountCents).toBe(750);
  });

  it("enforces max discount cap (15%) and adds a note", async () => {
    // Set up a scenario where discount would exceed 15%
    const res = await calculateQuote(
      {
        items: [{ type: "bundle", slug: "express-glow" }],
      },
      {
        now: dec10,
        appConfig: { maxDiscountPct: 5 }, // artificially constrain to 5%
      }
    );
    // Express glow list is 1700. 5% max = 85 cents.
    expect(res.discountCents).toBe(85);
    expect(res.totalCents).toBe(1615);
    expect(res.notes).toContain(
      "Promotional savings capped at maximum allowed 5%."
    );
  });

  it("FIRST_VISIT_FREE_LIPS requires isFirstVisit and subtotal >= 2000", async () => {
    // 1. First visit but subtotal < 2000 (e.g. Eyebrow threading 700)
    const underSpendRes = await calculateQuote(
      {
        items: [{ type: "service", slug: "thread-eyebrow" }],
        isFirstVisit: true,
      },
      { now: dec10 }
    );
    expect(underSpendRes.lines.some((l) => l.slug === "thread-lips")).toBe(false);

    // 2. Subtotal >= 2000 but NOT first visit
    const returningRes = await calculateQuote(
      {
        items: [{ type: "service", slug: "haircut-mens" }], // 2000 cents
        isFirstVisit: false,
      },
      { now: dec10 }
    );
    expect(returningRes.lines.some((l) => l.slug === "thread-lips")).toBe(false);

    // 3. First visit AND subtotal >= 2000
    const qualRes = await calculateQuote(
      {
        items: [{ type: "service", slug: "haircut-mens" }], // 2000 cents
        isFirstVisit: true,
      },
      { now: dec10 }
    );
    const freeLipsLine = qualRes.lines.find((l) => l.slug === "thread-lips");
    expect(freeLipsLine).toBeDefined();
    expect(freeLipsLine?.finalCents).toBe(0);
    expect(freeLipsLine?.listCents).toBe(500);
    expect(qualRes.totalCents).toBe(2000);
  });

  it("GC_BONUS: only inside Nov 27–Dec 24, Dec 24 11:59 PM CST accepted, 12:00 AM Dec 25 rejected", async () => {
    const dec24Night = new Date("2026-12-24T23:59:59-06:00");
    const dec25Midnight = new Date("2026-12-25T00:00:00-06:00");
    const nov20 = new Date("2026-11-20T12:00:00-06:00");

    // Before Nov 27
    const nov20Res = await calculateQuote(
      {
        items: [{ type: "service", slug: "facial-signature" }],
        offerCode: "GC_BONUS",
      },
      { now: nov20 }
    );
    expect(nov20Res.bonuses.some((b) => b.code === "GC_BONUS")).toBe(false);

    // Dec 24 11:59 PM America/Chicago (accepted)
    const dec24Res = await calculateQuote(
      {
        items: [{ type: "service", slug: "facial-signature" }],
        offerCode: "GC_BONUS",
      },
      { now: dec24Night }
    );
    expect(dec24Res.bonuses.some((b) => b.code === "GC_BONUS")).toBe(true);

    // Dec 25 12:00 AM America/Chicago (rejected)
    const dec25Res = await calculateQuote(
      {
        items: [{ type: "service", slug: "facial-signature" }],
        offerCode: "GC_BONUS",
      },
      { now: dec25Midnight }
    );
    expect(dec25Res.bonuses.some((b) => b.code === "GC_BONUS")).toBe(false);
  });

  it("inactive (U) services cannot be booked", async () => {
    // wax-hydro-jelly-addon is flagged U (inactive/unverified)
    await expect(
      calculateQuote(
        { items: [{ type: "service", slug: "wax-hydro-jelly-addon" }] },
        { now: dec10 }
      )
    ).rejects.toThrow(/not active or available/);
  });

  it("build-your-glow rejects duplicate picks and non-discountable items (thread-eyebrow)", async () => {
    // 1. Duplicate picks
    await expect(
      calculateQuote(
        {
          items: [
            {
              type: "bundle",
              slug: "build-your-glow",
              picks: ["wax-underarms", "wax-underarms", "wax-half-legs"],
            },
          ],
        },
        { now: dec10 }
      )
    ).rejects.toThrow(/distinct services/);

    // 2. Contains thread-eyebrow (ND)
    await expect(
      calculateQuote(
        {
          items: [
            {
              type: "bundle",
              slug: "build-your-glow",
              picks: ["thread-eyebrow", "wax-underarms", "wax-half-legs"],
            },
          ],
        },
        { now: dec10 }
      )
    ).rejects.toThrow(/cannot be used in Build Your Glow/);

    // 3. Wrong pick count (2 instead of 3)
    await expect(
      calculateQuote(
        {
          items: [
            {
              type: "bundle",
              slug: "build-your-glow",
              picks: ["wax-underarms", "wax-half-legs"],
            },
          ],
        },
        { now: dec10 }
      )
    ).rejects.toThrow(/requires exactly 3 service picks/);
  });

  it("persists Quote and supports persistence options", async () => {
    const res = await calculateQuote(
      { items: [{ type: "bundle", slug: "express-glow" }] },
      { now: dec10, persist: true }
    );
    expect(res.quoteId).toBeDefined();

    const saved = await prisma.quote.findUnique({
      where: { id: res.quoteId },
    });
    expect(saved).not.toBeNull();
    expect(saved?.totalCents).toBe(1600);
    expect(saved?.inputHash).toBe(res.inputHash);
  });
});
