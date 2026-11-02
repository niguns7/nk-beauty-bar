"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Calendar } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { SALON_DATA } from "@/config/siteContent";

interface OwnerSectionProps {
  onOpenBooking: () => void;
}

export function OwnerSection({ onOpenBooking }: OwnerSectionProps) {
  const { owner } = SALON_DATA;

  return (
    <section id="owner" className="py-24 sm:py-32 relative z-20 bg-[#f8f4f1] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] ambient-glow-blush -translate-y-1/2" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] ambient-glow-champagne" />

      <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto space-y-16">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={owner.eyebrow}
          heading={owner.heading}
          align="center"
        />

        {/* ─── 2-COLUMN EDITORIAL OWNER STORY ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Layered Editorial Portraits & Floating Quote */}
          <div className="lg:col-span-6 relative">
            {/* Background Organic Ambient Gradient Orb */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#e89ab2]/30 via-[#c96f8e]/20 to-[#c9a66b]/20 rounded-[3rem] blur-2xl -z-10" />

            <div className="relative">
              {/* Primary Large Portrait with Editorial Arch & Pedestal */}
              <div className="relative h-[480px] sm:h-[560px] w-full sm:w-[88%] rounded-[2.5rem] overflow-hidden border border-white/90 shadow-[0_20px_50px_rgba(142,63,92,0.12)] bg-gradient-to-b from-[#fbf5f2] via-[#f5e8e3] to-[#ebdcd6] flex items-end justify-center">
                {/* Subtle Luxury Radial Highlight behind figure */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.85)_0%,rgba(247,235,230,0.4)_50%,transparent_80%)]" />

                {/* Transparent Owner Cutout */}
                <div className="relative w-full h-full">
                  <Image
                    src={owner.portraitImage}
                    alt={`${owner.name} - ${owner.role}`}
                    fill
                    priority
                    className="object-contain object-bottom drop-shadow-[0_15px_30px_rgba(142,63,92,0.15)]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Secondary Layered Detail Photograph */}
              <div className="hidden sm:block absolute -bottom-8 right-0 w-48 h-48 rounded-2xl overflow-hidden border-4 border-[#f8f4f1] shadow-xl">
                <Image
                  src={owner.detailImage}
                  alt="Delicate salon artistry details"
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>

              {/* Floating Quote inside Glass Card */}
              <div className="absolute -bottom-6 sm:bottom-8 left-2 sm:-left-6 right-2 sm:right-auto sm:max-w-xs p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-xl border border-white/95 shadow-[0_15px_35px_rgba(142,63,92,0.12)] space-y-2">
                <p className="font-serif italic text-sm sm:text-base text-[#271e20] leading-snug">
                  {owner.quote}
                </p>
                <div className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#8e3f5c]">
                  — {owner.name}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Story, Specialties & CTA */}
          <div className="lg:col-span-6 space-y-6 pt-8 lg:pt-0">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.28em] font-semibold text-[#8e3f5c]">
                {owner.role}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#271e20] font-normal leading-tight">
                {owner.name}
              </h3>
            </div>

            {/* Narrative Story */}
            <div className="space-y-4 text-sm sm:text-base text-[#5e5055] font-light leading-relaxed">
              <p>{owner.story}</p>
              <p>{owner.extendedStory}</p>
            </div>

            {/* Specialties Badges */}
            <div className="space-y-3 pt-2">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#271e20]">
                Areas of Artistry
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {owner.specialties.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/80 border border-[#c96f8e]/20 text-xs text-[#271e20]"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#c96f8e] flex-shrink-0" />
                    <span className="font-medium">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Handwritten-Style Subtle Signature Treatment & Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-[#c96f8e]/15">
              <div>
                <span className="font-serif italic text-2xl text-[#8e3f5c] tracking-wider font-light">
                  Bimala Bajgain
                </span>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-[#a69894]">
                  Master Aesthetician
                </span>
              </div>

              <button
                onClick={onOpenBooking}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#8e3f5c] hover:opacity-95 text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2 shadow-[0_6px_20px_rgba(201,111,142,0.35)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book With Us</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
