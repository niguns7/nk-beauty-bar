"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Calendar, Check, Gift, ArrowRight } from "lucide-react";
import { CatalogBundle } from "@/lib/catalog";
import { SALON_DATA } from "@/config/siteContent";

interface FeaturedRitualProps {
  featuredBundle?: CatalogBundle | null;
  giftCardPromo?: {
    active: boolean;
    tiers: { spendCents: number; bonusCents: number }[];
    bonusValidFrom?: string;
    bonusValidTo?: string;
  } | null;
  onOpenBooking: (slugOrName?: string) => void;
}

export function FeaturedRitual({
  featuredBundle,
  giftCardPromo,
  onOpenBooking,
}: FeaturedRitualProps) {
  const { featuredRitual } = SALON_DATA;

  // 1. If active featured bundle exists (Holiday Ready -> Party Glam)
  if (featuredBundle) {
    const priceFormatted = `$${(featuredBundle.priceCents / 100).toFixed(0)}`;
    const listFormatted = `$${(featuredBundle.listPriceCents / 100).toFixed(0)}`;
    const savingsFormatted = `$${(featuredBundle.savingsCents / 100).toFixed(0)}`;

    return (
      <section id="featured-ritual" className="py-24 sm:py-32 relative z-20 overflow-hidden bg-[#271e20] text-[#fffdfc]">
        {/* Ambient background light bloom */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#8e3f5c]/35 via-[#c96f8e]/20 to-transparent rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-[#c9a66b]/20 to-transparent rounded-full blur-[100px] pointer-events-none" />

        <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto relative z-10">
          <div className="p-8 sm:p-12 lg:p-16 rounded-[2.75rem] bg-gradient-to-br from-[#3b272d] via-[#2d1e23] to-[#1a1215] border border-[#e89ab2]/25 shadow-[0_25px_60px_rgba(0,0,0,0.4)] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Featured Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e89ab2]/15 border border-[#e89ab2]/30 text-[#e89ab2] text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#e89ab2]" />
                  <span>Featured Seasonal Pairing</span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-[#fffdfc]">
                    {featuredBundle.name}
                  </h2>
                  <p className="text-sm sm:text-base text-[#f8f4f1]/80 font-light leading-relaxed">
                    {featuredBundle.tagline || "Artisanal multi-service bundle crafted for flawless Texas celebrations."}
                  </p>
                </div>

                {/* Ritual Package Name & Included Services */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#e89ab2] block">Verified Pricing</span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-3xl font-bold text-[#edd6a8]">
                          {featuredBundle.hasFromPrice && <span className="text-sm font-normal mr-1">from</span>}
                          {priceFormatted}
                        </span>
                        <span className="text-sm line-through text-white/50">{listFormatted}</span>
                        <span className="text-xs text-[#e89ab2] font-semibold">(Save {savingsFormatted})</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#edd6a8]">
                      Save {featuredBundle.discountPct}%
                    </span>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-white/10">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white/60 block">Included Services:</span>
                    {featuredBundle.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs sm:text-sm text-[#f8f4f1]/90">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#edd6a8] flex-shrink-0" />
                          <span>{item.name}</span>
                        </div>
                        <span className="text-white/60 font-mono text-xs">${(item.listPriceCents / 100).toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    onClick={() => onOpenBooking(featuredBundle.slug)}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#8e3f5c] hover:opacity-95 text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2.5 shadow-[0_8px_30px_rgba(201,111,142,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Reserve {featuredBundle.name}</span>
                  </button>

                  <p className="text-[11px] text-[#f8f4f1]/60 max-w-xs font-light">
                    Guaranteed server quote. Final calendar slot verified directly on Vagaro.
                  </p>
                </div>
              </div>

              {/* Right Column: Visual */}
              <div className="lg:col-span-5 relative">
                <div className="relative h-[360px] sm:h-[460px] w-full rounded-[2.25rem] overflow-hidden border border-[#edd6a8]/30 shadow-2xl">
                  <Image
                    src={featuredRitual.image}
                    alt={featuredBundle.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1215]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#271e20]/80 backdrop-blur-md border border-white/15 text-center">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-[#edd6a8] font-semibold">
                      Limited Seasonal Window
                    </span>
                    <p className="font-serif text-sm text-white pt-1">
                      712 W Pipeline Rd Ste 700 · Hurst, TX
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 2. If no featured bundle is active, check if gift card promo is active (Nov 27–Dec 24)
  if (giftCardPromo?.active) {
    return (
      <section id="featured-ritual" className="py-24 sm:py-32 relative z-20 overflow-hidden bg-[#271e20] text-[#fffdfc]">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#c9a66b]/25 via-[#8e3f5c]/20 to-transparent rounded-full blur-[110px] pointer-events-none" />

        <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto relative z-10">
          <div className="p-8 sm:p-12 lg:p-16 rounded-[2.75rem] bg-gradient-to-br from-[#382622] via-[#2d1e23] to-[#1a1215] border border-[#edd6a8]/40 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edd6a8]/15 border border-[#edd6a8]/30 text-[#edd6a8] text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase">
                  <Gift className="w-3.5 h-3.5 text-[#edd6a8]" />
                  <span>Holiday Gift Card Event</span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-[#fffdfc]">
                    The Gift of Unhurried Glow
                  </h2>
                  <p className="text-sm sm:text-base text-[#f8f4f1]/80 font-light leading-relaxed">
                    Treat someone you love to BLUSH. Enjoy exclusive complimentary bonus cards for yourself with every qualifying holiday gift card purchase.
                  </p>
                </div>

                {/* Tiers Box */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#edd6a8] block">
                    Limited Time Bonus Tiers (Nov 27 – Dec 24):
                  </span>
                  <div className="space-y-2.5">
                    {giftCardPromo.tiers.map((tier, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-sm font-serif text-white">
                          Buy ${(tier.spendCents / 100).toFixed(0)} Gift Card
                        </span>
                        <span className="text-sm font-semibold text-[#edd6a8]">
                          Get ${(tier.bonusCents / 100).toFixed(0)} Bonus Card
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-white/60 pt-1">
                    Bonus cards redeemable in salon Jan 2 – Feb 28, 2027.
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <Link
                    href="/gift-cards"
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-[#edd6a8] via-[#c9a66b] to-[#a38047] text-[#271e20] text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2 shadow-lg hover:opacity-95 transition-all"
                  >
                    <span>View Gift Card Offers</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative h-[360px] sm:h-[440px] w-full rounded-[2.25rem] overflow-hidden border border-[#edd6a8]/30 shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85"
                    alt="BLUSH Gift Cards"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1215]/80 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 3. Fallback to default featured ritual
  return (
    <section id="featured-ritual" className="py-24 sm:py-32 relative z-20 overflow-hidden bg-[#271e20] text-[#fffdfc]">
      <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto relative z-10">
        <div className="p-8 sm:p-12 lg:p-16 rounded-[2.75rem] bg-gradient-to-br from-[#3b272d] via-[#2d1e23] to-[#1a1215] border border-[#e89ab2]/25 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e89ab2]/15 text-[#e89ab2] text-xs uppercase tracking-widest font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{featuredRitual.eyebrow}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
                {featuredRitual.heading}
              </h2>
              <p className="text-sm text-white/80 font-light">{featuredRitual.supporting}</p>
              <button
                onClick={() => onOpenBooking(featuredRitual.packageName)}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#8e3f5c] text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{featuredRitual.ctaText}</span>
              </button>
            </div>
            <div className="lg:col-span-5 relative h-[360px] rounded-2xl overflow-hidden border border-white/10">
              <Image src={featuredRitual.image} alt={featuredRitual.packageName} fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
