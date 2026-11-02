"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { SALON_DATA } from "@/config/siteContent";

export function ClientReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { reviews } = SALON_DATA;

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Observe visibility so autoplay only runs when the section is in the viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Smoothly scroll ONLY the horizontal carousel container (never the browser window!)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Only scroll if the container is horizontally overflowing (e.g. mobile view)
    if (container.scrollWidth > container.clientWidth) {
      const card = container.children[currentIndex] as HTMLElement;
      if (card) {
        const targetLeft =
          card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
        container.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
      }
    }
  }, [currentIndex]);

  // Autoplay: only runs when in viewport and not paused by user hover
  useEffect(() => {
    if (isPaused || !isInView) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, isInView, reviews.length]);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="py-16 sm:py-28 lg:py-32 relative z-20 bg-[#fffdfc] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient lighting */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 ambient-glow-rose -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 ambient-glow-blush pointer-events-none" />

      <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto space-y-10 sm:space-y-14">
        {/* Header with Professional Rating Badge & Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-[#c96f8e]/15">
          <div className="space-y-3">
            <SectionHeading
              eyebrow="5-STAR GOOGLE CLIENT EXPERIENCES"
              heading="Loved Locally in Hurst. Recommended Personally."
              fontClass="font-display font-bold text-3xl sm:text-5xl lg:text-6xl"
              align="left"
            />
            {/* Trust Proof Bar */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1 text-[#e89ab2]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#271e20]">
                5.0 Overall Rating
              </span>
              <span className="text-xs text-[#6e5f64] font-light">
                &bull; 100+ Verified Google Reviews
              </span>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-end">
            <button
              onClick={prevReview}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#f8f4f1] border border-[#c96f8e]/25 text-[#271e20] hover:text-[#8e3f5c] flex items-center justify-center transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextReview}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#f8f4f1] border border-[#c96f8e]/25 text-[#271e20] hover:text-[#8e3f5c] flex items-center justify-center transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ─── REVIEW CARDS (Clean, Professional, Snap Carousel on Mobile, Responsive Grid on Desktop) ─── */}
        <div
          ref={scrollContainerRef}
          className="-mx-4 px-4 flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none [scrollbar-width:none] pb-4"
        >
          {reviews.map((rev, idx) => {
            const isFeatured = idx === currentIndex;

            return (
              <div
                key={rev.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-[85vw] max-w-[360px] md:w-auto shrink-0 snap-center p-7 sm:p-8 rounded-[2rem] border transition-all duration-300 cursor-pointer flex flex-col justify-between ${isFeatured
                    ? "bg-white border-[#c96f8e]/40 shadow-[0_20px_50px_rgba(142,63,92,0.12)] md:-translate-y-1.5 ring-1 ring-[#c96f8e]/20"
                    : "bg-white/70 hover:bg-white border-[#c96f8e]/15 shadow-sm"
                  }`}
              >
                <div className="space-y-4">
                  {/* Top Bar: Stars & Verified Google Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f8f4f1] border border-[#c96f8e]/20 text-[10px] font-semibold text-[#8e3f5c] uppercase tracking-wider">
                      {/* Google G Icon */}
                      <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>{rev.source}</span>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-sm sm:text-base text-[#271e20] font-light leading-relaxed">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                {/* Author, Treatment & Verification */}
                <div className="pt-5 border-t border-[#c96f8e]/15 flex items-center justify-between mt-5">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-sans font-semibold text-sm text-[#271e20]">
                        {rev.clientName}
                      </h4>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#34A853]" />
                    </div>
                    <span className="text-xs text-[#8e3f5c] font-medium block">
                      {rev.service}
                    </span>
                  </div>
                  <Quote className="w-6 h-6 text-[#c96f8e]/25 shrink-0" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex items-center justify-center gap-2 pt-1">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === currentIndex ? "w-8 bg-[#8e3f5c]" : "w-2 bg-[#c96f8e]/30"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
