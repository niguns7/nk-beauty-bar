"use client";

import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { SALON_DATA } from "@/config/siteContent";

export function ClientReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { reviews } = SALON_DATA;

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Restrained autoplay: pauses on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, reviews.length]);

  return (
    <section
      id="reviews"
      className="py-24 sm:py-32 relative z-20 bg-[#fffdfc] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-10 w-96 h-96 ambient-glow-rose -translate-y-1/2" />
      <div className="absolute bottom-10 right-10 w-96 h-96 ambient-glow-blush" />

      <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="CLIENT LOVE"
            heading="Loved locally. Remembered personally."
            description="Kind words from our valued clients across brow sculpting, hair styling, facials, and head-spa rituals."
            align="left"
          />

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevReview}
              className="w-12 h-12 rounded-full bg-white/80 hover:bg-white border border-[#c96f8e]/20 text-[#271e20] hover:text-[#8e3f5c] flex items-center justify-center transition-all shadow-sm cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextReview}
              className="w-12 h-12 rounded-full bg-white/80 hover:bg-white border border-[#c96f8e]/20 text-[#271e20] hover:text-[#8e3f5c] flex items-center justify-center transition-all shadow-sm cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ─── FEATURED REVIEW CAROUSEL ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => {
            const isFeatured = idx === currentIndex;

            return (
              <div
                key={rev.id}
                onClick={() => setCurrentIndex(idx)}
                className={`p-8 sm:p-9 rounded-[2.25rem] border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                  isFeatured
                    ? "bg-white border-[#c96f8e]/40 shadow-[0_20px_50px_rgba(142,63,92,0.12)] md:scale-105 z-10"
                    : "bg-white/50 hover:bg-white/80 border-[#c96f8e]/15 opacity-75 hover:opacity-100 shadow-sm"
                }`}
              >
                <div className="space-y-4">
                  {/* Stars & Source */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#c9a66b]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#f8f4f1] border border-[#c96f8e]/15 text-[10px] uppercase font-semibold text-[#8e3f5c] tracking-wider">
                      {rev.source}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="font-serif text-base sm:text-lg text-[#271e20] font-normal leading-relaxed italic">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                {/* Author & Service Info */}
                <div className="pt-6 border-t border-[#c96f8e]/15 flex items-center justify-between">
                  <div>
                    <h4 className="font-sans font-semibold text-sm text-[#271e20]">
                      {rev.clientName}
                    </h4>
                    <span className="text-xs text-[#8e3f5c] font-medium">
                      {rev.service}
                    </span>
                  </div>
                  <Quote className="w-6 h-6 text-[#c96f8e]/30" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? "w-8 bg-[#c96f8e]" : "w-2 bg-[#c96f8e]/25"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
