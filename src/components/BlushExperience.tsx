"use client";

import React from "react";
import { Sparkles, Calendar, Heart, CheckCircle2, ArrowRight } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { SALON_DATA } from "@/config/siteContent";

interface BlushExperienceProps {
  onOpenBooking: () => void;
}

export function BlushExperience({ onOpenBooking }: BlushExperienceProps) {
  const { experienceSteps } = SALON_DATA;

  const cardStyles = [
    {
      bg: "bg-white/75",
      border: "border-[#c96f8e]/25",
      badgeBg: "bg-[#e89ab2]/15 text-[#8e3f5c]",
      accentGlow: "from-[#e89ab2]/20 to-transparent",
    },
    {
      bg: "bg-[#fffdfc]/90",
      border: "border-[#c9a66b]/30",
      badgeBg: "bg-[#c9a66b]/15 text-[#8e3f5c]",
      accentGlow: "from-[#c9a66b]/20 to-transparent",
    },
    {
      bg: "bg-gradient-to-br from-[#8e3f5c] via-[#6e273b] to-[#271e20] text-white",
      border: "border-[#e89ab2]/40",
      badgeBg: "bg-white/20 text-[#fffdfc]",
      accentGlow: "from-[#e89ab2]/30 to-transparent",
      isDark: true,
    },
  ];

  return (
    <section id="experience" className="py-24 sm:py-32 relative z-20 bg-[#fffdfc] overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 right-0 w-96 h-96 ambient-glow-champagne" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 ambient-glow-rose" />

      <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto space-y-16">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="YOUR VISIT"
          heading="A simpler path to feeling your best."
          description="From browsing our personalized service menu to stepping into our calm Texas sanctuary, every moment is seamless."
          align="center"
        />

        {/* ─── 3 VERTICAL / STACKED EXPERIENCE CARDS ─── */}
        <div className="space-y-6 sm:space-y-8">
          {experienceSteps.map((step, index) => {
            const style = cardStyles[index];
            const isDark = style.isDark;

            return (
              <div
                key={step.step}
                className={`rounded-[2.25rem] p-8 sm:p-10 lg:p-12 border backdrop-blur-xl shadow-[0_15px_40px_rgba(142,63,92,0.06)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(142,63,92,0.12)] ${style.bg} ${style.border}`}
              >
                {/* Background Accent Glow */}
                <div
                  className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${style.accentGlow} rounded-full blur-3xl pointer-events-none`}
                />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  {/* Left Step Header */}
                  <div className="space-y-3 max-w-xl">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs font-bold px-3 py-1 rounded-full ${style.badgeBg}`}>
                        STEP {step.step}
                      </span>
                      <span
                        className={`text-xs uppercase tracking-[0.24em] font-semibold ${
                          isDark ? "text-[#e89ab2]" : "text-[#8e3f5c]"
                        }`}
                      >
                        {step.tag}
                      </span>
                    </div>

                    <h3
                      className={`font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight ${
                        isDark ? "text-white" : "text-[#271e20]"
                      }`}
                    >
                      {step.title}
                    </h3>

                    <p
                      className={`text-sm sm:text-base leading-relaxed font-light ${
                        isDark ? "text-[#f8f4f1]/85" : "text-[#6e5f64]"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>

                  {/* Right Action / Micro Icon */}
                  <div className="flex-shrink-0">
                    {index === 2 ? (
                      <button
                        onClick={onOpenBooking}
                        className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#e89ab2] to-[#c96f8e] text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2 shadow-lg hover:opacity-95 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Book Your Visit</span>
                      </button>
                    ) : (
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                          isDark ? "bg-white/10 text-white" : "bg-[#f8f4f1] text-[#8e3f5c]"
                        }`}
                      >
                        <Sparkles className="w-6 h-6" />
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
