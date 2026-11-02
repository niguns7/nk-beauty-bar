"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MessageSquareHeart,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { SALON_DATA } from "@/config/siteContent";

export function WhyBlush() {
  const [activePillar, setActivePillar] = useState(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "MessageSquareHeart":
        return MessageSquareHeart;
      case "Sparkles":
        return Sparkles;
      case "ShieldCheck":
        return ShieldCheck;
      case "HeartHandshake":
        return HeartHandshake;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="difference" className="py-24 sm:py-32 relative z-20 bg-[#fffdfc] overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 -right-36 w-80 h-80 ambient-glow-rose" />
      <div className="absolute bottom-10 left-10 w-80 h-80 ambient-glow-blush" />

      <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto space-y-16">
        {/* Section Header */}
        <SectionHeading
          eyebrow={SALON_DATA.whyBlush.eyebrow}
          heading={SALON_DATA.whyBlush.heading}
          description={SALON_DATA.whyBlush.lead}
          align="center"
        />

        {/* ─── 2-COLUMN IMMERSIVE TRUST SECTION ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Large Editorial Lifestyle Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[440px] sm:h-[540px] w-full rounded-[2.5rem] overflow-hidden border border-[#c96f8e]/20 shadow-[0_20px_50px_rgba(142,63,92,0.1)]">
              <Image
                src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80"
                alt="BLUSH NK Beauty Bar serene aesthetic atmosphere"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#271e20]/70 via-transparent to-transparent" />

              {/* Floating Aesthetic Tag Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-lg space-y-1">
                <div className="flex items-center gap-2 text-[#8e3f5c] text-xs font-semibold uppercase tracking-[0.2em]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Sanctuary Standard</span>
                </div>
                <p className="text-xs text-[#5e5055] font-light">
                  A tranquil private space designed for focused, unhurried care.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Interactive Layered Cards */}
          <div className="lg:col-span-7 space-y-4">
            {SALON_DATA.whyBlush.pillars.map((pillar, index) => {
              const Icon = getIcon(pillar.icon);
              const isActive = activePillar === index;

              return (
                <div
                  key={pillar.id}
                  onClick={() => setActivePillar(index)}
                  onMouseEnter={() => setActivePillar(index)}
                  className={`p-6 sm:p-7 rounded-[1.75rem] border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white/95 border-[#c96f8e]/40 shadow-[0_16px_40px_rgba(142,63,92,0.1)] translate-x-1 sm:translate-x-2"
                      : "bg-white/50 hover:bg-white/80 border-[#c96f8e]/15 shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-gradient-to-br from-[#e89ab2] to-[#c96f8e] text-white shadow-md scale-105"
                          : "bg-[#f8f4f1] text-[#8e3f5c]"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`font-serif text-lg sm:text-xl font-normal transition-colors ${
                            isActive ? "text-[#8e3f5c]" : "text-[#271e20]"
                          }`}
                        >
                          {pillar.title}
                        </h3>
                        <span className="text-xs font-mono text-[#a69894]">
                          0{index + 1}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#6e5f64] leading-relaxed font-light">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── OPTIONAL METRICS STRIP (Configurable) ─── */}
        {SALON_DATA.whyBlush.showMetrics && (
          <div className="pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-[2rem] bg-[#f8f4f1]/80 backdrop-blur-md border border-[#c96f8e]/20 shadow-sm">
              {SALON_DATA.whyBlush.metrics.map((metric, idx) => (
                <div key={idx} className="text-center space-y-1">
                  <div className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#8e3f5c] font-normal">
                    {metric.value}
                  </div>
                  <div className="text-xs uppercase tracking-[0.18em] font-semibold text-[#271e20]">
                    {metric.label}
                  </div>
                  <div className="text-[11px] text-[#a69894] font-light">
                    {metric.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
