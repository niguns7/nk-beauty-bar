"use client";

import React from "react";
import { Sparkles, Calendar, HeartHandshake, Check, ArrowRight } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { SALON_DATA } from "@/config/siteContent";

interface BlushExperienceProps {
  onOpenBooking: () => void;
}

export function BlushExperience({ onOpenBooking }: BlushExperienceProps) {
  const { experienceSteps } = SALON_DATA;

  const getStepIcon = (iconName?: string) => {
    switch (iconName) {
      case "Calendar":
        return Calendar;
      case "HeartHandshake":
        return HeartHandshake;
      default:
        return Sparkles;
    }
  };

  const cardStyles = [
    {
      bg: "bg-white/85",
      border: "border-[#c96f8e]/25",
      badgeBg: "bg-[#e89ab2]/15 text-[#8e3f5c]",
      accentGlow: "from-[#e89ab2]/20 to-transparent",
    },
    {
      bg: "bg-[#fffdfc]/95",
      border: "border-[#c9a66b]/30",
      badgeBg: "bg-[#c9a66b]/15 text-[#8e3f5c]",
      accentGlow: "from-[#c9a66b]/20 to-transparent",
    },
    {
      bg: "bg-gradient-to-br from-[#732943] via-[#5c1e33] to-[#2a131c] text-white",
      border: "border-[#e89ab2]/35",
      badgeBg: "bg-white/20 text-[#fcd8e3]",
      accentGlow: "from-[#e89ab2]/30 to-transparent",
      isDark: true,
    },
  ];

  return (
    <section id="experience" className="py-16 sm:py-28 lg:py-32 relative z-20 bg-[#fffdfc] overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 right-0 w-96 h-96 ambient-glow-champagne" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 ambient-glow-rose" />

      <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto space-y-10 sm:space-y-16">
        {/* Section Heading: Bold simple headline and value-focused subline */}
        <SectionHeading
          eyebrow="YOUR VISIT"
          heading="Simple, Seamless Beauty Care"
          fontClass="font-display font-bold text-3xl sm:text-5xl lg:text-6xl"
          description="Transparent pricing, zero wait time, and unhurried personalized attention from the moment you book."
          align="center"
        />

        {/* ─── 3 VERTICAL / STACKED EXPERIENCE CARDS ─── */}
        <div className="space-y-6 sm:space-y-8">
          {experienceSteps.map((step, index) => {
            const style = cardStyles[index];
            const isDark = style.isDark;
            const Icon = getStepIcon(step.icon);

            return (
              <div
                key={step.step}
                className={`rounded-[2.25rem] p-7 sm:p-10 lg:p-12 border backdrop-blur-xl shadow-[0_15px_40px_rgba(142,63,92,0.06)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(142,63,92,0.12)] ${style.bg} ${style.border}`}
              >
                {/* Background Accent Glow */}
                <div
                  className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${style.accentGlow} rounded-full blur-3xl pointer-events-none`}
                />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
                  {/* Left Step Header & Value Proposition Content */}
                  <div className="space-y-3.5 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs font-bold px-3 py-1 rounded-full ${style.badgeBg}`}>
                        STEP {step.step}
                      </span>
                      <span
                        className={`text-xs uppercase tracking-[0.24em] font-bold ${
                          isDark ? "text-[#fcd8e3]" : "text-[#8e3f5c]"
                        }`}
                      >
                        {step.tag}
                      </span>
                    </div>

                    <h3
                      className={`font-display font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight ${
                        isDark ? "text-white" : "text-[#271e20]"
                      }`}
                    >
                      {step.title}
                    </h3>

                    <p
                      className={`text-sm sm:text-base leading-relaxed ${
                        isDark ? "text-white/80 font-light" : "text-[#5e5055] font-light"
                      }`}
                    >
                      {step.description}
                    </p>

                    {/* Value Proposition Highlights Checkpoints */}
                    {step.highlights && (
                      <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-4">
                        {step.highlights.map((highlight, hIdx) => (
                          <div
                            key={hIdx}
                            className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                              isDark
                                ? "bg-white/10 text-white border border-white/15"
                                : "bg-white/90 text-[#271e20] border border-[#c96f8e]/20 shadow-xs"
                            }`}
                          >
                            <Check className={`w-3.5 h-3.5 ${isDark ? "text-[#fcd8e3]" : "text-[#8e3f5c]"}`} />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Action / Micro Icon */}
                  <div className="flex-shrink-0 pt-2 md:pt-0">
                    {index === 2 ? (
                      <button
                        onClick={onOpenBooking}
                        className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#c96f8e] hover:bg-[#b85b7c] text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(201,111,142,0.4)] hover:opacity-95 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Book Your Visit</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                      </button>
                    ) : (
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center ${
                          isDark ? "bg-white/10 text-white" : "bg-[#f8f4f1] text-[#8e3f5c]"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
