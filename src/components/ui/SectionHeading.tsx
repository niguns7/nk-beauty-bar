"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  description?: string;
  align?: "left" | "center" | "right";
  theme?: "light" | "dark";
  className?: string;
  fontClass?: string;
}

export function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "center",
  theme = "light",
  className = "",
  fontClass = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isRight = align === "right";
  const isDark = theme === "dark";

  return (
    <div
      className={`space-y-4 ${
        isCenter ? "text-center mx-auto max-w-2xl" : isRight ? "text-right ml-auto max-w-2xl" : "text-left max-w-2xl"
      } ${className}`}
    >
      {/* Eyebrow Pill */}
      <div
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase ${
          isDark
            ? "bg-[#e89ab2]/15 text-[#e89ab2] border border-[#e89ab2]/30"
            : "bg-white/80 text-[#8e3f5c] border border-[#c96f8e]/25 shadow-[0_2px_10px_rgba(201,111,142,0.08)] backdrop-blur-md"
        }`}
      >
        <Sparkles className={`w-3 h-3 ${isDark ? "text-[#e89ab2]" : "text-[#c96f8e]"}`} />
        <span>{eyebrow}</span>
      </div>

      {/* Expressive Editorial Heading */}
      <h2
        className={`${fontClass || "font-serif text-3xl sm:text-4xl lg:text-[42px]"} leading-[1.2] tracking-tight ${
          isDark ? "text-[#fffdfc]" : "text-[#271e20]"
        }`}
      >
        {heading}
      </h2>

      {/* Supporting Description */}
      {description && (
        <p
          className={`text-sm sm:text-base font-normal leading-relaxed ${
            isDark ? "text-[#f8f4f1]/80" : "text-[#6e5f64]"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
