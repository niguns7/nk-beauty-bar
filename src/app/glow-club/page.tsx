import React from "react";
import Link from "next/link";
import { Sparkles, Gift, Award, Calendar, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 300;

export default async function GlowClubPage() {
  // Fetch AppConfig
  let loyalty = {
    pointsPerDollar: 1,
    redeemPoints: 200,
    redeemCents: 1000,
    browClubEveryNth: 6,
  };
  let flags = {
    membershipPilot: false,
    giftCardsPage: true,
    glowClubPage: true,
  };

  try {
    const configRow = await prisma.appConfig.findUnique({ where: { key: "main" } });
    if (configRow && typeof configRow.value === "object" && configRow.value !== null) {
      const cfg = configRow.value as any;
      if (cfg.loyalty) loyalty = { ...loyalty, ...cfg.loyalty };
      if (cfg.flags) flags = { ...flags, ...cfg.flags };
    }
  } catch {
    // defaults
  }

  // Fetch relevant loyalty offers from DB
  const offers = await prisma.offer.findMany({
    where: {
      scope: "LOYALTY",
      isActive: true,
    },
    orderBy: { priority: "desc" },
  });

  const birthdayOffer = offers.find((o) => o.code === "BIRTHDAY_FREE_LIPS");
  const rebookOffer = offers.find((o) => o.code === "REBOOK_2X_POINTS");
  const referOffer = offers.find((o) => o.code === "REFER_10");

  const redeemDollars = (loyalty.redeemCents / 100).toFixed(0);

  return (
    <div className="min-h-screen bg-[#fffdfc] text-[#271e20] selection:bg-[#e89ab2] selection:text-[#271e20]">
      {/* Header */}
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
            BLUSH — Glow Club
          </span>
        </div>
      </header>

      <main className="py-16 sm:py-24 space-y-16">
        {/* Hero */}
        <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto text-center space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f8f4f1] border border-[#c96f8e]/20 text-[#8e3f5c] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BLUSH Client Privileges</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#271e20] font-normal leading-tight">
            The Glow Club
          </h1>

          <p className="text-base sm:text-lg text-[#6e5f64] font-light leading-relaxed">
            Our way of honoring regulars. Earn Glow Points on every visit, enjoy our legendary Brow Club rewards, and receive treats crafted for your routine.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Brow Club */}
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-br from-[#fffbfc] to-[#fcf3f6] border border-[#c96f8e]/30 shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#8e3f5c] text-white flex items-center justify-center shadow-md">
                <Award className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8e3f5c]">
                  Always Active
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#271e20]">
                  The Brow Club
                </h3>
              </div>

              <p className="text-sm text-[#6e5f64] leading-relaxed">
                Consistency deserves a celebration. Every {loyalty.browClubEveryNth}th eyebrow threading service is complimentary. No cards to stamp—tracked automatically with your phone number at checkout.
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#8e3f5c]">
                <Check className="w-4 h-4" />
                <span>Every {loyalty.browClubEveryNth}th Eyebrow Threading Free</span>
              </div>
            </div>

            {/* 2. Glow Points */}
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white border border-[#c96f8e]/20 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#c96f8e] text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8e3f5c]">
                  Points & Rewards
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#271e20]">
                  Glow Points
                </h3>
              </div>

              <p className="text-sm text-[#6e5f64] leading-relaxed">
                Earn {loyalty.pointsPerDollar} Glow Point for every $1 spent across services and retail. Reach {loyalty.redeemPoints} points and redeem ${redeemDollars} toward your next salon appointment.
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#8e3f5c]">
                <Check className="w-4 h-4" />
                <span>{loyalty.redeemPoints} pts = ${redeemDollars} Service Credit</span>
              </div>
            </div>

            {/* 3. Rebook Bonus */}
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white border border-[#c96f8e]/20 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#a38047] text-white flex items-center justify-center shadow-md">
                <Calendar className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8e3f5c]">
                  Priority Booking
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#271e20]">
                  {rebookOffer?.name || "Rebook Bonus"}
                </h3>
              </div>

              <p className="text-sm text-[#6e5f64] leading-relaxed">
                {rebookOffer?.description || "Book your next visit before you leave and earn double Glow Points on your upcoming appointment."}
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#8e3f5c]">
                <Check className="w-4 h-4" />
                <span>2× Glow Points on advance rebooking</span>
              </div>
            </div>

            {/* 4. Referral & Birthday Perks */}
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-br from-[#f8f4f1] to-white border border-[#c96f8e]/20 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#8e3f5c] text-white flex items-center justify-center shadow-md">
                <Gift className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8e3f5c]">
                  Referral & Birthday
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#271e20]">
                  Friend Credit & Birthday Treat
                </h3>
              </div>

              <p className="text-sm text-[#6e5f64] leading-relaxed">
                {referOffer?.description || "Give $10, get $10 toward a future visit."} Plus, celebrate your special day with our complimentary birthday gift ({birthdayOffer?.name || "Birthday Treat"} with code).
              </p>

              <div className="pt-2 space-y-1 text-xs font-semibold text-[#8e3f5c]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Refer a friend: Give $10, Get $10</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Free lips threading during your birthday month</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Membership Pilot (Hidden unless flags.membershipPilot is true) */}
        {flags.membershipPilot && (
          <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto max-w-4xl p-8 sm:p-12 rounded-[2.5rem] bg-[#271e20] text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#edd6a8] text-xs font-mono uppercase">
              <span>Pilot Program</span>
            </div>
            <h3 className="font-serif text-3xl font-normal">BLUSH VIP Monthly Membership</h3>
            <p className="text-sm text-white/80 font-light max-w-xl">
              Enjoy unlimited eyebrow threading and monthly facial refresh rituals for a single predictable monthly rate. Currently accepting pilot members by invitation.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto text-center space-y-4 pt-8 border-t border-[#c96f8e]/15">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#271e20]">
            Ready to Reserve Your Next Visit?
          </h2>
          <p className="text-xs sm:text-sm text-[#6e5f64] max-w-md mx-auto">
            Book online and let our front desk automatically track your Brow Club credits and Glow Points.
          </p>
          <div className="pt-2">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#8e3f5c] hover:bg-[#6e273b] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-md"
            >
              <span>Explore Services & Bundles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
