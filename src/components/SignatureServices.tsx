"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Clock, Calendar } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { SALON_DATA, ServiceItem } from "@/config/siteContent";

interface SignatureServicesProps {
  onSelectService: (serviceName?: string) => void;
}

export function SignatureServices({ onSelectService }: SignatureServicesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 relative z-20 overflow-hidden bg-[#f8f4f1]">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 ambient-glow-blush" />
      <div className="absolute bottom-0 right-0 w-96 h-96 ambient-glow-champagne" />

      <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto space-y-12">
        {/* Section Heading & Lookbook Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="OUR SIGNATURE SERVICES"
            heading="Carefully chosen rituals for your kind of beauty."
            description="From precise brows to restorative skin and scalp care, every service is personalized around how you want to look and feel."
            align="left"
          />

          {/* Lookbook Arrow Navigation */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleScroll("left")}
              className="w-12 h-12 rounded-full bg-white/80 hover:bg-white border border-[#c96f8e]/20 text-[#271e20] hover:text-[#8e3f5c] flex items-center justify-center transition-all shadow-sm cursor-pointer"
              aria-label="Scroll services left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="w-12 h-12 rounded-full bg-white/80 hover:bg-white border border-[#c96f8e]/20 text-[#271e20] hover:text-[#8e3f5c] flex items-center justify-center transition-all shadow-sm cursor-pointer"
              aria-label="Scroll services right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ─── HORIZONTAL SCROLL LOOKBOOK CONTAINER ─── */}
        <div
          ref={scrollContainerRef}
          tabIndex={0}
          role="region"
          aria-label="Signature services carousel"
          className="flex items-stretch gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 px-1"
        >
          {SALON_DATA.services.map((service) => {
            const priceValue = service.startingPrice
              ? service.startingPrice.replace(/starting at\s*/i, "").trim()
              : "$25";

            const isPopular = Boolean(
              service.badge?.toLowerCase().includes("popular") ||
              service.badge?.toLowerCase().includes("favorite") ||
              service.badge?.toLowerCase().includes("trending")
            );

            return (
              <div
                key={service.id}
                className="flex-none w-[300px] sm:w-[340px] md:w-[380px] snap-start"
              >
                <div
                  onClick={() => onSelectService(service.name)}
                  className="relative h-[460px] sm:h-[490px] w-full rounded-[2.25rem] overflow-hidden border border-white/40 shadow-[0_18px_45px_rgba(39,30,32,0.16)] flex flex-col justify-between group cursor-pointer transition-all duration-500 hover:shadow-[0_24px_55px_rgba(201,111,142,0.28)] hover:-translate-y-1"
                >
                  {/* Background Full-Bleed Image with linear gradient from black to opacity 0 (bottom to top) */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 300px, (max-width: 768px) 340px, 380px"
                    />
                    {/* Linear gradient from black at bottom to transparent (opacity 0) at top */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent z-10 pointer-events-none" />
                  </div>

                  {/* Top Floating Badge */}
                  <div className="relative z-20 p-5 flex items-center justify-between">
                    <div
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-[0_4px_14px_rgba(0,0,0,0.18)] transition-all ${isPopular
                        ? "bg-[#e89ab2]/10 text-white"
                        : "bg-white/20 hover:bg-white backdrop-blur-md text-white"
                        }`}
                    >
                      <span className="tracking-wide">
                        {`${service.category} Pick`}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Content Directly Over Gradient */}
                  <div className="relative z-20 p-6 sm:p-7 flex items-end justify-between gap-4">
                    {/* Left: Bigger Bold Title & Flex for Time and Service Count */}
                    <div className="space-y-2 text-left flex-1 min-w-0">
                      <h3 className="font-serif text-xl sm:text-[28px] font-bold text-white tracking-tight leading-tight drop-shadow-md group-hover:text-[#f8b4c6] transition-colors">
                        {service.name}
                      </h3>

                      <hr className="my-2 w-1/2 h-0.5 bg-white/50" />

                      {/* Flex for Time and Sub-Service Count */}
                      <div className="flex items-center flex-wrap gap-2.5 text-xs sm:text-sm text-white/90 pt-0.5">
                        {service.duration && (
                          <div className="flex items-center gap-1.5 font-medium">
                            <Clock className="w-3.5 h-3.5 text-[#f8b4c6] shrink-0" />
                            <span>{service.duration}</span>
                          </div>
                        )}
                        <span className="text-white/40">•</span>
                        <div className="flex items-center gap-1.5 font-medium">
                          <Sparkles className="w-3.5 h-3.5 text-[#f8b4c6] shrink-0" />
                          <span>{service.serviceCount || `${service.category} Ritual`}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Circular Price Badge with 'Starting' Below */}
                    <div className="flex flex-col items-center shrink-0">
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-serif font-bold text-lg sm:text-xl shadow-[0_8px_24px_rgba(0,0,0,0.35)] border-2 transition-transform duration-300 group-hover:scale-105 ${isPopular
                          ? "bg-[#e89ab2]/30 backdrop-blur-sm text-[#e89ab2] border-[#f8b4c6]"
                          : "bg-white/30 backdrop-blur-sm text-white border-white"
                          }`}
                      >
                        {priceValue}
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/90 drop-shadow mt-1.5">
                        Starting
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* 7th Lookbook Card: Custom Package Consultation */}
          <div className="flex-none w-[300px] sm:w-[340px] md:w-[380px] snap-start">
            <div
              onClick={() => onSelectService("Custom Package Consultation")}
              className="relative h-[460px] sm:h-[490px] w-full rounded-[2.25rem] overflow-hidden border border-[#e89ab2]/30 shadow-[0_18px_45px_rgba(39,30,32,0.16)] flex flex-col justify-between group cursor-pointer transition-all duration-500 hover:shadow-[0_24px_55px_rgba(201,111,142,0.28)] hover:-translate-y-1 bg-gradient-to-br from-[#8e3f5c] via-[#5c2436] to-[#271e20] text-white"
            >
              {/* Decorative Ambient Bloom */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#e89ab2]/25 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c9a66b]/20 rounded-full blur-3xl pointer-events-none" />

              {/* Top Floating Badge */}
              <div className="relative z-20 p-5">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#8e3f5c] text-xs font-semibold shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-[#8e3f5c]" />
                  <span className="tracking-wide">Bespoke Rituals</span>
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-20 p-6 sm:p-7 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-white">
                    Looking for a custom package?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#f8f4f1]/80 leading-relaxed font-light">
                    Combine hair styling, brows, head-spa detox, and facial therapies for special occasions.
                  </p>
                </div>

                <button
                  type="button"
                  className="w-full py-3 px-5 rounded-full bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#8e3f5c] text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-md group-hover:opacity-95 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
