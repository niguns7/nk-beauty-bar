import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SALON_DATA } from "@/config/siteContent";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ quoteId: string }> }
) {
  const { quoteId } = await context.params;

  const quote = await prisma.quote.findUnique({
    where: { id: quoteId },
  });

  if (!quote) {
    return NextResponse.json(
      { error: `Quote not found: ${quoteId}` },
      { status: 404 }
    );
  }

  const now = new Date();
  if (now.getTime() > quote.expiresAt.getTime()) {
    return NextResponse.json(
      {
        error: "Quote has expired. Please refresh your quote to book.",
        expired: true,
        expiresAt: quote.expiresAt.toISOString(),
      },
      { status: 410 }
    );
  }

  // Record handoff timestamp
  await prisma.quote.update({
    where: { id: quote.id },
    data: { handedOffAt: now },
  });

  // Idempotent OfferRedemption record if offer was applied
  if (quote.appliedOfferId) {
    try {
      await prisma.offerRedemption.upsert({
        where: {
          offerId_quoteId: {
            offerId: quote.appliedOfferId,
            quoteId: quote.id,
          },
        },
        update: {},
        create: {
          offerId: quote.appliedOfferId,
          quoteId: quote.id,
          clientRef: quote.clientRef,
        },
      });
    } catch {
      // already exists
    }
  }

  // Determine campaign name (offer code or first bundle slug or "general")
  let campaign = "booking";
  if (quote.appliedOfferId) {
    const offer = await prisma.offer.findUnique({ where: { id: quote.appliedOfferId } });
    if (offer) campaign = offer.code;
  } else if (Array.isArray(quote.linesJson)) {
    const bundleLine = (quote.linesJson as any[]).find((l) => l.type === "bundle");
    if (bundleLine) campaign = bundleLine.slug;
  }

  // Find destination Vagaro URL
  let targetVagaroUrl = process.env.VAGARO_BASE_URL?.trim();

  // Check bundle or service specific URL if available in lines
  if (Array.isArray(quote.linesJson)) {
    for (const line of quote.linesJson as any[]) {
      if (line.type === "bundle") {
        const b = await prisma.bundle.findUnique({ where: { slug: line.slug } });
        if (b?.vagaroUrl) {
          targetVagaroUrl = b.vagaroUrl;
          break;
        }
      } else if (line.type === "service") {
        const s = await prisma.service.findUnique({ where: { slug: line.slug } });
        if (s?.vagaroUrl) {
          targetVagaroUrl = s.vagaroUrl;
          break;
        }
      }
    }
  }

  // If VAGARO_BASE_URL is unset/empty, return a friendly "Call to book" page
  if (!targetVagaroUrl) {
    const formattedTotal = (quote.totalCents / 100).toFixed(2);
    const phone = SALON_DATA.booking.phone || "(817) 510-6363";
    const cleanPhone = phone.replace(/\D/g, "");

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reserve Appointment — BLUSH NK Beauty Bar</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #fffdfc;
      color: #271e20;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 1.5rem;
    }
    .card {
      max-width: 480px;
      width: 100%;
      background: white;
      border: 1px solid rgba(201, 111, 142, 0.2);
      border-radius: 2rem;
      padding: 2.5rem;
      box-shadow: 0 20px 40px rgba(142, 63, 92, 0.08);
      text-align: center;
    }
    .eyebrow {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #8e3f5c;
      margin-bottom: 0.5rem;
    }
    h1 {
      font-size: 1.75rem;
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 1rem;
    }
    p {
      color: #5e5055;
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .quote-box {
      background: #f8f4f1;
      border-radius: 1.25rem;
      padding: 1rem 1.5rem;
      margin-bottom: 1.75rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .btn {
      display: inline-block;
      width: 100%;
      box-sizing: border-box;
      background: linear-gradient(135deg, #e89ab2, #c96f8e, #8e3f5c);
      color: white;
      text-decoration: none;
      font-weight: 600;
      padding: 1rem 1.5rem;
      border-radius: 9999px;
      font-size: 0.9rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      box-shadow: 0 8px 20px rgba(142, 63, 92, 0.25);
    }
    .details {
      margin-top: 1.5rem;
      font-size: 0.8rem;
      color: #8e3f5c;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="eyebrow">BLUSH — NK Beauty Bar</div>
    <h1>Call Directly to Book</h1>
    <p>Your guaranteed quote has been prepared. Direct calendar booking is being connected. Call our front desk with Quote Ref: <strong>${quote.id.slice(-6).toUpperCase()}</strong>.</p>
    <div class="quote-box">
      <span>Guaranteed Total:</span>
      <strong style="font-size: 1.25rem; color: #8e3f5c;">$${formattedTotal}</strong>
    </div>
    <a href="tel:${cleanPhone}" class="btn">Call ${phone}</a>
    <div class="details">712 W Pipeline Rd Ste 700, Hurst TX 76053</div>
  </div>
</body>
</html>`;

    return new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Construct destination URL with UTM params
  const destination = new URL(targetVagaroUrl);
  destination.searchParams.set("utm_source", "site");
  destination.searchParams.set("utm_campaign", campaign);
  destination.searchParams.set("utm_content", quote.id);

  return NextResponse.redirect(destination.toString(), 302);
}
