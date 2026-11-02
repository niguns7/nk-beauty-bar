import { describe, it, expect, beforeAll } from "vitest";
import { POST as quoteHandler } from "../src/app/api/quote/route";
import { GET as bookHandler } from "../src/app/api/book/[quoteId]/route";
import { handleAdminRequest } from "../src/app/api/admin/[...action]/route";
import { GET as cronReconcileHandler } from "../src/app/api/cron/reconcile/route";
import { GET as catalogHandler } from "../src/app/api/catalog/route";
import { seedCatalog } from "../prisma/seed";
import { prisma } from "../src/lib/prisma";
import { NextRequest } from "next/server";

describe("API Endpoints — Catalog, Quote, Booking Handoff, Admin & Cron", () => {
  beforeAll(async () => {
    process.env.ADMIN_TOKEN = "test_admin_token";
    process.env.CRON_SECRET = "test_cron_secret";
    await seedCatalog();
  });

  it("GET /api/catalog returns active categories, services in cents, active bundles, and offers", async () => {
    const res = await catalogHandler();
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.categories).toBeDefined();
    expect(json.categories.length).toBeGreaterThan(0);

    const threading = json.categories.find((c: any) => c.slug === "threading");
    expect(threading).toBeDefined();
    const eyebrow = threading.services.find((s: any) => s.slug === "thread-eyebrow");
    expect(eyebrow.listPriceCents).toBe(700);

    expect(json.bundles).toBeDefined();
    expect(json.offers).toBeDefined();
  });

  it("POST /api/quote with a forged price returns the true server price", async () => {
    const forgedPayload = {
      items: [
        {
          type: "service",
          slug: "signature-head-spa",
          priceCents: 100, // forged! real is 8500
          finalCents: 50,
        },
      ],
      discountCents: 8000, // forged!
      totalCents: 500, // forged!
    };

    const req = new NextRequest("http://localhost:3000/api/quote", {
      method: "POST",
      body: JSON.stringify(forgedPayload),
      headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.1" },
    });

    const res = await quoteHandler(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.subtotalCents).toBe(8500);
    expect(json.totalCents).toBe(8500);
    expect(json.discountCents).toBe(0);
    expect(json.quoteId).toBeDefined();
  });

  it("GET /api/book/[quoteId] redirects with UTM tags, is idempotent on refresh, and returns 410 when expired", async () => {
    // 1. Create a fresh valid quote
    const savedQuote = await prisma.quote.create({
      data: {
        expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 min in future
        inputHash: "test_hash_1",
        linesJson: [{ type: "bundle", slug: "express-glow" }],
        subtotalCents: 1700,
        discountCents: 100,
        totalCents: 1600,
      },
    });

    process.env.VAGARO_BASE_URL = "https://www.vagaro.com/blushnkbeautybar";

    const req1 = new NextRequest(`http://localhost:3000/api/book/${savedQuote.id}`);
    const res1 = await bookHandler(req1, {
      params: Promise.resolve({ quoteId: savedQuote.id }),
    });

    // 302 Redirect
    expect(res1.status).toBe(302);
    const location = res1.headers.get("location");
    expect(location).toBeDefined();
    expect(location).toContain("utm_source=site");
    expect(location).toContain("utm_campaign=express-glow");
    expect(location).toContain(`utm_content=${savedQuote.id}`);

    // Refresh: idempotent handoff
    const req2 = new NextRequest(`http://localhost:3000/api/book/${savedQuote.id}`);
    const res2 = await bookHandler(req2, {
      params: Promise.resolve({ quoteId: savedQuote.id }),
    });
    expect(res2.status).toBe(302);
    expect(res2.headers.get("location")).toBe(location);

    // 2. Expired quote returns 410
    const expiredQuote = await prisma.quote.create({
      data: {
        expiresAt: new Date(Date.now() - 1000), // expired 1s ago
        inputHash: "test_hash_expired",
        linesJson: [{ type: "service", slug: "thread-eyebrow" }],
        subtotalCents: 700,
        discountCents: 0,
        totalCents: 700,
      },
    });

    const expReq = new NextRequest(`http://localhost:3000/api/book/${expiredQuote.id}`);
    const expRes = await bookHandler(expReq, {
      params: Promise.resolve({ quoteId: expiredQuote.id }),
    });
    expect(expRes.status).toBe(410);
    const expJson = await expRes.json();
    expect(expJson.expired).toBe(true);

    // 3. Nonexistent quote returns 404
    const notFoundReq = new NextRequest(`http://localhost:3000/api/book/non-existent-id`);
    const notFoundRes = await bookHandler(notFoundReq, {
      params: Promise.resolve({ quoteId: "non-existent-id" }),
    });
    expect(notFoundRes.status).toBe(404);
  });

  it("POST /api/admin requires x-admin-token, updates service price, and creates PriceAudit", async () => {
    // 1. Missing token -> 401
    const unauthReq = new NextRequest("http://localhost:3000/api/admin", {
      method: "POST",
      body: JSON.stringify({ action: "update-service-price", slug: "thread-forehead", listPriceCents: 650 }),
      headers: { "Content-Type": "application/json" },
    });
    const unauthRes = await handleAdminRequest(unauthReq);
    expect(unauthRes.status).toBe(401);

    // 2. Valid token -> 200 and audit created
    const authReq = new NextRequest("http://localhost:3000/api/admin", {
      method: "POST",
      body: JSON.stringify({ action: "update-service-price", slug: "thread-forehead", listPriceCents: 650 }),
      headers: { "Content-Type": "application/json", "x-admin-token": "test_admin_token" },
    });
    const authRes = await handleAdminRequest(authReq);
    expect(authRes.status).toBe(200);

    const updated = await prisma.service.findUnique({ where: { slug: "thread-forehead" } });
    expect(updated?.listPriceCents).toBe(650);

    const audit = await prisma.priceAudit.findFirst({
      where: { entity: "service", entityId: updated?.id },
      orderBy: { at: "desc" },
    });
    expect(audit).not.toBeNull();
    expect(audit?.oldValue).toBe("600");
    expect(audit?.newValue).toBe("650");

    // Restore to original 600
    await prisma.service.update({
      where: { slug: "thread-forehead" },
      data: { listPriceCents: 600 },
    });
  });

  it("GET /api/cron/reconcile checks bundle pricing consistency with Bearer CRON_SECRET", async () => {
    // 1. Invalid secret -> 401
    const unauthReq = new NextRequest("http://localhost:3000/api/cron/reconcile", {
      headers: { authorization: "Bearer wrong_secret" },
    });
    const unauthRes = await cronReconcileHandler(unauthReq);
    expect(unauthRes.status).toBe(401);

    // 2. Valid secret -> 200
    const authReq = new NextRequest("http://localhost:3000/api/cron/reconcile", {
      headers: { authorization: "Bearer test_cron_secret" },
    });
    const authRes = await cronReconcileHandler(authReq);
    expect(authRes.status).toBe(200);

    const json = await authRes.json();
    expect(json.totalBundles).toBeGreaterThan(0);
    expect(json.reconciledCount).toBeGreaterThan(0);
  });
});
