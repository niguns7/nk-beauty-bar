"use client";

import React from "react";
import Image from "next/image";
import {
  Calendar,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Heart,
  MapPin,
  Clock,
} from "lucide-react";
import { SALON_DATA } from "@/config/siteContent";

interface MinimalistHeroProps {
  onOpenBooking: (serviceName?: string) => void;
}

export function MinimalistHero({ onOpenBooking }: MinimalistHeroProps) {
  return (
    <section className="relative min-h-[95vh] lg:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#f8f4f1] text-[#271e20] pt-24 pb-8">
      {/* ─── FULL BACKGROUND SALON PHOTOGRAPHY (Clean, Warm, Editorial) ─── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/salon-hero.png"
          alt="NK Beauty Bar Texas Sanctuary Interior"
          fill
          priority
          className="object-cover object-center scale-[1.01] transition-transform duration-1000 ease-out"
          sizes="100vw"
        />

        {/* Soft, warm diffused gradient overlay preserving photo radiance */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f4f1]/90 via-[#f8f4f1]/50 via-50% to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f4f1]/60 via-transparent to-[#f8f4f1]/80 z-10" />
      </div>

      {/* ─── HERO MAIN CONTENT: TRANSLUCENT GLASSMORPHIC LUXURY PANEL ─── */}
      <div className="relative z-20 flex-1 flex items-center py-8 w-[92%] sm:w-[85%] lg:w-[80%] mx-auto">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Glassmorphic Luxury Card */}
          <div className="relative p-7 sm:p-10 lg:p-12 rounded-[2.25rem] bg-white/55 hover:bg-white/65 backdrop-blur-2xl border border-white/85 shadow-[0_20px_60px_rgba(201,111,142,0.14),inset_0_1px_2px_rgba(255,255,255,0.95)] space-y-6 text-left transition-all duration-500 group">
            {/* Ambient subtle light highlight inside glass */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#e89ab2]/30 to-transparent rounded-full blur-2xl pointer-events-none -z-10" />

            {/* Eyebrow Label: NK BEAUTY BAR · TEXAS */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-[#c96f8e]/30 shadow-[0_2px_8px_rgba(201,111,142,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c96f8e] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#8e3f5c] font-semibold">
                {SALON_DATA.brand.eyebrow}
              </span>
            </div>

            {/* Headline per guide: Where Subtle Elegance Meets Thoughtful Care. */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal tracking-tight text-[#271e20] leading-[1.18]">
              Where Subtle Elegance <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#8e3f5c] via-[#c96f8e] to-[#c9a66b]">
                Meets Thoughtful Care.
              </span>
            </h1>

            {/* Supporting Copy per guide */}
            <p className="text-sm sm:text-base text-[#5e5055] font-normal leading-relaxed max-w-lg">
              {SALON_DATA.brand.heroSupporting}
            </p>

            {/* Primary & Secondary Call To Actions */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#8e3f5c] hover:opacity-95 text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_6px_20px_rgba(201,111,142,0.35)] hover:shadow-[0_8px_25px_rgba(201,111,142,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

              <a
                href="#services"
                className="px-5 sm:px-6 py-3.5 rounded-full bg-white/75 hover:bg-white/95 backdrop-blur-md border border-[#c96f8e]/30 hover:border-[#c96f8e] text-xs uppercase tracking-[0.18em] font-semibold text-[#271e20] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8e3f5c]" />
              </a>
            </div>

            {/* Subtle Trust Line */}
            <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] sm:text-xs text-[#6e5f64] font-medium tracking-wide">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#c96f8e]" />
                <span>Boutique Texas Studio</span>
              </div>
              <span className="text-[#c96f8e]/40 select-none">·</span>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#c96f8e]" />
                <span>Personalized Consultation</span>
              </div>
              <span className="text-[#c96f8e]/40 select-none">·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#c96f8e]" />
                <span>Unhurried Appointments</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── SCROLL CUE AT BOTTOM ─── */}
      <div className="relative z-20 w-full pt-4 flex items-center justify-center pointer-events-auto">
        <a
          href="#services"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-[#7a6872] hover:text-[#271e20] transition-all duration-300 cursor-pointer"
          aria-label="Scroll down to view services"
        >
          <span className="text-[9px] uppercase tracking-[0.32em] font-semibold text-[#7a6872] group-hover:text-[#271e20] transition-colors">
            Scroll to explore
          </span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#c96f8e]" />
        </a>
      </div>
    </section>
  );
}
