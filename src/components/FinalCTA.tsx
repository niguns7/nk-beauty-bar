"use client";

import React from "react";
import Image from "next/image";
import { Calendar, ArrowRight, Sparkles, Heart } from "lucide-react";

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export function FinalCTA({ onOpenBooking }: FinalCTAProps) {
  return (
    <section id="booking-cta" className="py-24 sm:py-32 relative z-20 bg-[#f8f4f1] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] ambient-glow-blush" />

      <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto relative z-10">
        <div className="relative rounded-[3rem] p-8 sm:p-14 lg:p-18 bg-gradient-to-br from-[#fffdfc] via-[#fbf3f5] to-[#f6e5eb] border border-[#e89ab2]/35 shadow-[0_25px_60px_rgba(201,111,142,0.18)] overflow-hidden text-center space-y-8">
          {/* Subtle Decorative Accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#c9a66b]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#e89ab2]/25 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#c96f8e]/25 text-[#8e3f5c] text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#c96f8e]" />
            <span>BEGIN YOUR BEAUTY JOURNEY</span>
          </div>

          {/* Headline & Supporting Copy */}
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-[#271e20] tracking-tight">
              Your next beauty ritual <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#8e3f5c] via-[#c96f8e] to-[#c9a66b]">
                starts here.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#6e5f64] font-light leading-relaxed max-w-lg mx-auto">
              Take a little time for yourself—with personalized care designed around you.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#8e3f5c] hover:opacity-95 text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2.5 shadow-[0_8px_25px_rgba(201,111,142,0.38)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Appointment</span>
            </button>

            <a
              href="#services"
              className="px-7 py-4 rounded-full bg-white/80 hover:bg-white border border-[#c96f8e]/30 text-[#271e20] text-xs uppercase tracking-[0.18em] font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4 text-[#8e3f5c]" />
            </a>
          </div>

          {/* Trust Notice */}
          <div className="flex items-center justify-center gap-2 text-xs text-[#a69894] font-medium pt-2">
            <Heart className="w-3.5 h-3.5 text-[#c96f8e]" />
            <span>Instant booking & real-time confirmation via Vagaro</span>
          </div>
        </div>
      </div>
    </section>
  );
}
