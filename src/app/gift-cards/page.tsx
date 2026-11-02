import React from "react";
import Link from "next/link";
import { Gift, Sparkles, ArrowRight, Clock, ShieldCheck, Mail, ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { SALON_DATA } from "@/config/siteContent";

export const revalidate = 300;

export default async function GiftCardsPage() {
  const now = new Date();

  // Read GC_BONUS offer from database (all numbers from DB!)
  const gcBonus = await prisma.offer.findUnique({
    where: { code: "GC_BONUS" },
  });

  // Read GC_EGIFT_LASTMINUTE offer from database
  const gcEgift = await prisma.offer.findUnique({
    where: { code: "GC_EGIFT_LASTMINUTE" },
  });

  const isBonusActive = Boolean(
    gcBonus &&
      gcBonus.isActive &&
      now.getTime() >= gcBonus.startsAt.getTime() &&
      now.getTime() <= gcBonus.endsAt.getTime()
  );

  const isEgiftActive = Boolean(
    gcEgift &&
      gcEgift.isActive &&
      now.getTime() >= gcEgift.startsAt.getTime() &&
      now.getTime() <= gcEgift.endsAt.getTime()
  );

  const bonusParams = (gcBonus?.params as any) || {
    tiers: [
      { spendCents: 5000, bonusCents: 1000 },
      { spendCents: 10000, bonusCents: 2500 },
    ],
    bonusValidFrom: "2027-01-02",
    bonusValidTo: "2027-02-28",
  };

  const tiers: { spendCents: number; bonusCents: number }[] = bonusParams.tiers || [];
  const validFrom = bonusParams.bonusValidFrom || "Jan 2, 2027";
  const validTo = bonusParams.bonusValidTo || "Feb 28, 2027";

  const vagaroUrl = process.env.VAGARO_BASE_URL || SALON_DATA.booking.vagaroUrl;

  return (
    <div className="min-h-screen bg-[#fffdfc] text-[#271e20] selection:bg-[#e89ab2] selection:text-[#271e20]">
      {/* Top Navigation */}
      <header className="border-b border-[#c96f8e]/15 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8e3f5c] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to BLUSH</span>
          </Link>

          <span className="font-serif tracking-[0.2em] text-sm uppercase text-[#271e20] font-semibold">
            BLUSH — Gift Studio
          </span>
        </div>
      </header>

      <main className="py-16 sm:py-24 space-y-16">
        {/* Hero Section */}
        <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto text-center space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f8f4f1] border border-[#c96f8e]/20 text-[#8e3f5c] text-xs font-semibold uppercase tracking-widest">
            <Gift className="w-3.5 h-3.5" />
            <span>The Gift of Thoughtful Elegance</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#271e20] font-normal leading-tight">
            Share the BLUSH Sanctuary
          </h1>

          <p className="text-base sm:text-lg text-[#6e5f64] font-light leading-relaxed">
            Give the gift of bespoke brow artistry, restorative Japanese head-spa therapy, soothing facials, or hair styling at our Hurst sanctuary.
          </p>

          {/* Last-Minute E-Gift Banner if active */}
          {isEgiftActive && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#fcf3f6] to-[#f8f4f1] border border-[#c96f8e]/30 flex items-center justify-center gap-2.5 text-xs sm:text-sm text-[#8e3f5c] font-medium animate-in fade-in">
              <Mail className="w-4 h-4 text-[#8e3f5c]" />
              <span>
                <strong>Last-Minute E-Gift Active:</strong> {gcEgift?.description || "Delivered by text or email in 60 seconds."}
              </span>
            </div>
          )}
        </div>

        {/* Database-backed Gift Card Bonus Tiers */}
        <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#271e20]">
              {isBonusActive ? "Exclusive Holiday Bonus Tiers" : "Available Gift Card Values"}
            </h2>
            <p className="text-xs sm:text-sm text-[#6e5f64] max-w-lg mx-auto">
              {isBonusActive
                ? `Purchase during our holiday window and receive an in-salon bonus card valid from ${validFrom} through ${validTo}.`
                : "Select an amount to redeem across any signature service or curated ritual."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {tiers.map((tier, idx) => {
              const spendDollars = (tier.spendCents / 100).toFixed(0);
              const bonusDollars = (tier.bonusCents / 100).toFixed(0);

              return (
                <div
                  key={idx}
                  className="p-8 rounded-[2.25rem] bg-white border border-[#c96f8e]/25 shadow-md flex flex-col justify-between space-y-6 hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase tracking-widest text-[#8e3f5c] font-semibold block">
                      Tier {idx + 1}
                    </span>
                    <div className="font-serif text-4xl font-bold text-[#271e20]">
                      ${spendDollars}
                    </div>
                    <p className="text-xs text-[#6e5f64]">
                      Redeemable toward all hair, brow, skin, and spa services.
                    </p>

                    {isBonusActive && (
                      <div className="pt-3 border-t border-[#c96f8e]/15">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#fcf3f6] text-[#8e3f5c] text-xs font-bold">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>+ ${bonusDollars} In-Salon Bonus Card</span>
                        </div>
                        <span className="text-[10px] text-[#a69894] block mt-1">
                          Valid {validFrom} – {validTo}
                        </span>
                      </div>
                    )}
                  </div>

                  <a
                    href={vagaroUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-full bg-[#8e3f5c] hover:bg-[#6e273b] text-white text-xs uppercase tracking-wider font-semibold text-center flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <span>Purchase ${spendDollars} Card</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}

            {/* Custom Amount Card */}
            <div className="p-8 rounded-[2.25rem] bg-gradient-to-br from-[#f8f4f1] to-white border border-[#c96f8e]/20 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-[#a69894] font-semibold block">
                  Bespoke Value
                </span>
                <div className="font-serif text-3xl font-bold text-[#271e20]">
                  Custom Amount
                </div>
                <p className="text-xs text-[#6e5f64]">
                  Choose any custom amount on our official Vagaro gift page.
                </p>
              </div>

              <a
                href={vagaroUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full bg-white border border-[#c96f8e] text-[#8e3f5c] hover:bg-[#8e3f5c] hover:text-white text-xs uppercase tracking-wider font-semibold text-center flex items-center justify-center gap-2 transition-all"
              >
                <span>Customize on Vagaro</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Gift Card Perks */}
        <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto max-w-3xl pt-8 border-t border-[#c96f8e]/15">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#f8f4f1] text-[#8e3f5c] mx-auto flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-medium">Never Expires</h4>
              <p className="text-xs text-[#6e5f64]">
                Core gift card values never expire. Use anytime in salon.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#f8f4f1] text-[#8e3f5c] mx-auto flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-medium">Instant E-Delivery</h4>
              <p className="text-xs text-[#6e5f64]">
                Schedule an email or print immediately for in-person gifting.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#f8f4f1] text-[#8e3f5c] mx-auto flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-medium">Vagaro Backed</h4>
              <p className="text-xs text-[#6e5f64]">
                Secure checkout and balance tracking directly through Vagaro.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
