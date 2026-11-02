"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Calendar, Check, Clock, ArrowRight } from "lucide-react";
import { SALON_DATA } from "@/config/siteContent";

interface FeaturedRitualProps {
  onOpenBooking: (serviceName?: string) => void;
}

export function FeaturedRitual({ onOpenBooking }: FeaturedRitualProps) {
  const { featuredRitual } = SALON_DATA;

  return (
    <section id="featured-ritual" className="py-24 sm:py-32 relative z-20 overflow-hidden bg-[#271e20] text-[#fffdfc]">
      {/* Ambient background light bloom */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#8e3f5c]/35 via-[#c96f8e]/20 to-transparent rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-[#c9a66b]/20 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto relative z-10">
        <div className="p-8 sm:p-12 lg:p-16 rounded-[2.75rem] bg-gradient-to-br from-[#3b272d] via-[#2d1e23] to-[#1a1215] border border-[#e89ab2]/25 shadow-[0_25px_60px_rgba(0,0,0,0.4)] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Editorial Campaign Details */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e89ab2]/15 border border-[#e89ab2]/30 text-[#e89ab2] text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#e89ab2]" />
                <span>{featuredRitual.eyebrow}</span>
              </div>

              {/* Campaign Headline */}
              <div className="space-y-2">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-[#fffdfc]">
                  {featuredRitual.heading}
                </h2>
                <p className="text-sm sm:text-base text-[#f8f4f1]/80 font-light leading-relaxed">
                  {featuredRitual.supporting}
                </p>
              </div>

              {/* Ritual Package Name */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#edd6a8] font-normal">
                    {featuredRitual.packageName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#e89ab2] font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredRitual.duration}</span>
                  </div>
                </div>

                {/* Included Services Checklist */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  {featuredRitual.includedServices.map((srv, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#f8f4f1]/90">
                      <Check className="w-4 h-4 text-[#edd6a8] flex-shrink-0 mt-0.5" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs and Reservation Note */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={() => onOpenBooking(featuredRitual.packageName)}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#8e3f5c] hover:opacity-95 text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2.5 shadow-[0_8px_30px_rgba(201,111,142,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{featuredRitual.ctaText}</span>
                </button>

                <p className="text-[11px] text-[#f8f4f1]/60 max-w-xs font-light">
                  {featuredRitual.terms}
                </p>
              </div>
            </div>

            {/* Right Column: Premium High-Res Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-[360px] sm:h-[460px] w-full rounded-[2.25rem] overflow-hidden border border-[#edd6a8]/30 shadow-2xl">
                <Image
                  src={featuredRitual.image}
                  alt={featuredRitual.packageName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1215]/80 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#271e20]/80 backdrop-blur-md border border-white/15 text-center">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-[#edd6a8] font-semibold">
                    Seasonal Specialization
                  </span>
                  <p className="font-serif text-sm text-white pt-1">
                    Book online with instant Vagaro confirmation
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
