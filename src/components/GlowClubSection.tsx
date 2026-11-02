"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Gift, Award, ArrowRight, Star, Heart, Check, CreditCard, ChevronRight } from "lucide-react";
import { LoyaltyCard } from "@/components/LoyaltyCard";

export function GlowClubSection() {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const handleCardClick = () => {
    router.push("/glow-club");
  };

  const perks = [
    {
      icon: Gift,
      title: "10th Visit On Us",
      tag: "Signature Reward",
      desc: "Receive a complimentary beauty treatment of your choice upon completing your 10-visit digital loyalty pass.",
      highlight: "Free Treatment on 10th Visit",
    },
    {
      icon: Award,
      title: "The Brow Club",
      tag: "Always Active",
      desc: "Our beloved brow loyalty privilege. Every 6th eyebrow threading or shaping service is 100% complimentary.",
      highlight: "Every 6th Brow Free",
    },
    {
      icon: Sparkles,
      title: "Glow Points",
      tag: "Spend & Redeem",
      desc: "Earn 1 point for every $1 spent on all services and boutique products. Redeem 200 points for a $10 salon credit.",
      highlight: "200 pts = $10 Credit",
    },
    {
      icon: Heart,
      title: "Birthday & Rebook Perks",
      tag: "VIP Surprises",
      desc: "Celebrate your birthday month with complimentary lip threading, plus earn double Glow Points when rebooking in advance.",
      highlight: "2× Points & Birthday Gift",
    },
  ];

  return (
    <section
      id="glow-club"
      className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-[#fbf7f5] via-[#f7edf1] to-[#fbf7f5]"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#e89ab2]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#c96f8e]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#c96f8e]/25 text-[#8e3f5c] text-xs font-semibold uppercase tracking-widest shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#c96f8e]" />
            <span>NK Beauty Bar Privileges</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#271e20] font-normal leading-tight">
            The <span className="italic font-serif text-[#8e3f5c]">Glow Club</span>
          </h2>

          <p className="text-sm sm:text-base text-[#6e5f64] font-light leading-relaxed">
            Where your self-care ritual is celebrated. Claim your digital VIP Loyalty Card, track your 10 visits toward a free treatment, and enjoy effortless brow rewards synced automatically to your phone number.
          </p>
        </div>

        {/* Hero Interactive Split: 3D Floating Clickable Card Preview & Privilege Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          {/* Left Column: Interactive Clickable Loyalty Card Preview (5 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Interactive Card Container with Click-To-Redirect */}
            <div
              onClick={handleCardClick}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="relative w-full max-w-[460px] cursor-pointer group transition-transform duration-500 hover:-translate-y-2"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick();
                }
              }}
              aria-label="Click to customize your digital VIP loyalty card"
            >
              {/* Outer Glowing Halos */}
              <div className="absolute -inset-1.5 rounded-[2rem] bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#edd6a8] opacity-40 blur-xl group-hover:opacity-75 transition duration-500 pointer-events-none" />

              {/* The Realistic Luxury Pink Loyalty Card */}
              <div className="relative">
                <LoyaltyCard
                  name="SOFIA DAVIS"
                  memberId="NK-VIP-2026"
                  stampsCount={3}
                  interactiveStamps={false}
                  showFlipHint={false}
                />

                {/* Shimmer Overlay Sweep on Hover */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                  <div className="absolute -inset-full top-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                </div>
              </div>

              {/* Magnetic Click Callout Pill */}
              <div className="mt-5 flex items-center justify-center">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-md border border-[#c96f8e]/30 text-[#8e3f5c] text-xs font-semibold tracking-wider uppercase group-hover:bg-[#8e3f5c] group-hover:text-white transition-all duration-300">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Click Card to Personalize Your Name</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#6e5f64] text-center mt-3 font-medium">
              ✨ Free instant membership · No app download or plastic card needed
            </p>
          </div>

          {/* Right Column: Key Pillars & Benefits (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#8e3f5c]">
                Designed For Your Beauty Routine
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#271e20] leading-snug">
                Effortless privileges, seamlessly tracked on every appointment.
              </h3>
              <p className="text-sm text-[#6e5f64] leading-relaxed">
                Whether dropping in for your bi-weekly brow threading or unwinding with a Japanese head spa, your loyalty is rewarded without cumbersome punch cards. Just provide your phone number at checkout.
              </p>
            </div>

            {/* Quick Feature Checklist */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-[#c96f8e]/15">
                <div className="w-8 h-8 rounded-xl bg-[#8e3f5c]/10 text-[#8e3f5c] flex items-center justify-center shrink-0">
                  <Gift className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-semibold text-[#271e20]">10-Visit Complimentary Treatment</h4>
                  <p className="text-xs text-[#6e5f64]">
                    Complete 9 visits, and your 10th signature service is on us as our thank-you.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-[#c96f8e]/15">
                <div className="w-8 h-8 rounded-xl bg-[#8e3f5c]/10 text-[#8e3f5c] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-semibold text-[#271e20]">Every 6th Eyebrow Threading Free</h4>
                  <p className="text-xs text-[#6e5f64]">
                    Our signature Brow Club perk for flawless arches all year long.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-[#c96f8e]/15">
                <div className="w-8 h-8 rounded-xl bg-[#8e3f5c]/10 text-[#8e3f5c] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-semibold text-[#271e20]">Glow Points & Birthday Surprises</h4>
                  <p className="text-xs text-[#6e5f64]">
                    Accumulate $1 = 1 point redeemable anytime, plus birthday month pampering.
                  </p>
                </div>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link
                href="/glow-club"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#8e3f5c] hover:bg-[#6e273b] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-md hover:shadow-lg"
              >
                <span>Enter Your Name & Get Card</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/glow-club#perks"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8e3f5c] hover:text-[#6e273b] hover:underline uppercase tracking-wider px-2 py-1"
              >
                <span>Explore All Privileges</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-[#c96f8e]/20 hover:border-[#c96f8e]/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#fedde5] text-[#8e3f5c] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-[#8e3f5c]" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#8e3f5c]">
                      {perk.tag}
                    </span>
                    <h4 className="font-serif text-lg font-medium text-[#271e20]">
                      {perk.title}
                    </h4>
                  </div>

                  <p className="text-xs text-[#6e5f64] leading-relaxed">
                    {perk.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#c96f8e]/15 flex items-center gap-1.5 text-[11px] font-semibold text-[#8e3f5c]">
                  <Check className="w-3.5 h-3.5 text-[#c96f8e]" />
                  <span>{perk.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

