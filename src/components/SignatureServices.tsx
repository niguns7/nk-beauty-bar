"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Clock, Calendar, Check } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { CatalogCategory } from "@/lib/catalog";

interface SignatureServicesProps {
  categories?: CatalogCategory[];
  onSelectService: (serviceSlug?: string) => void;
}

const CATEGORY_IMAGES: Record<string, string> = {
  threading: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
  waxing: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85",
  tinting: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=85",
  hair: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85",
  "hair-treatments": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=85",
  "head-spa": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
  lashes: "https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=1200&q=85",
  facials: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=85",
};

export function SignatureServices({ categories = [], onSelectService }: SignatureServicesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(
    categories[0]?.slug ?? "threading"
  );

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const activeCategory = categories.find((c) => c.slug === activeCategorySlug) || categories[0];

  return (
    <section id="services" className="py-24 sm:py-32 relative z-20 overflow-hidden bg-[#f8f4f1]">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 ambient-glow-blush pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 ambient-glow-champagne pointer-events-none" />

      <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto space-y-12">
        {/* Section Heading & Lookbook Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="OUR SIGNATURE SERVICES"
            heading="Carefully chosen rituals for your kind of beauty."
            description="Explore our complete database-backed catalog. Tap any category to view individual services and verified salon pricing."
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

        {/* ─── HORIZONTAL SCROLL CATEGORY CARDS ─── */}
        <div
          ref={scrollContainerRef}
          tabIndex={0}
          role="region"
          aria-label="Service categories carousel"
          className="flex items-stretch gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 px-1"
        >
          {categories.map((category) => {
            const isSelected = activeCategorySlug === category.slug;
            const minDollars = (category.minPriceCents / 100).toFixed(0);
            const image =
              CATEGORY_IMAGES[category.slug] ||
              "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85";

            const durations = category.services
              .filter((s) => s.durationMin !== null)
              .map((s) => `${s.durationMin}m`);
            const durationLabel = durations.length > 0 ? durations[0] : null;

            return (
              <div
                key={category.id}
                className="flex-none w-[280px] sm:w-[320px] md:w-[350px] snap-start"
              >
                <div
                  onClick={() => setActiveCategorySlug(category.slug)}
                  className={`relative h-[420px] sm:h-[450px] w-full rounded-[2.25rem] overflow-hidden border flex flex-col justify-between group cursor-pointer transition-all duration-500 hover:-translate-y-1 ${
                    isSelected
                      ? "border-[#c96f8e] shadow-[0_20px_50px_rgba(201,111,142,0.35)] ring-2 ring-[#c96f8e]"
                      : "border-white/40 shadow-[0_18px_45px_rgba(39,30,32,0.12)] hover:shadow-[0_24px_55px_rgba(201,111,142,0.22)]"
                  }`}
                >
                  {/* Background Full-Bleed Image with gradient overlay */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={image}
                      alt={category.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 280px, 350px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />
                  </div>

                  {/* Top Badge */}
                  <div className="relative z-20 p-5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white/20 backdrop-blur-md text-white tracking-wider uppercase">
                      {category.services.length} {category.services.length === 1 ? "Option" : "Options"}
                    </span>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#8e3f5c] text-white">
                        <Check className="w-3.5 h-3.5" />
                        Selected
                      </span>
                    )}
                  </div>

                  {/* Bottom Info Card */}
                  <div className="relative z-20 p-6 sm:p-7 flex items-end justify-between gap-4">
                    <div className="space-y-1.5 text-left flex-1 min-w-0">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight group-hover:text-[#f8b4c6] transition-colors">
                        {category.name}
                      </h3>

                      {durationLabel && (
                        <div className="flex items-center gap-1.5 text-xs text-white/90">
                          <Clock className="w-3.5 h-3.5 text-[#f8b4c6]" />
                          <span>From {durationLabel}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center font-serif font-bold text-lg bg-white/25 backdrop-blur-md text-white border border-white/60 shadow-lg">
                        ${minDollars}
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-white/90 drop-shadow mt-1">
                        from
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── ACTIVE CATEGORY SERVICES ACCORDION / LIST ─── */}
        {activeCategory && (
          <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 border border-[#c96f8e]/20 shadow-xl space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#c96f8e]/15 gap-2">
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#8e3f5c] tracking-widest">
                  Menu Pricing · Verified In-Salon
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#271e20]">
                  {activeCategory.name} Rituals
                </h3>
              </div>
              <p className="text-xs text-[#5e5055]">
                {activeCategory.services.length} services available
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeCategory.services.map((srv) => {
                const formattedPrice = `$${(srv.listPriceCents / 100).toFixed(0)}${
                  srv.priceIsFrom ? "+" : ""
                }`;

                return (
                  <div
                    key={srv.id}
                    onClick={() => onSelectService(srv.slug)}
                    className="p-5 rounded-2xl border border-[#c96f8e]/15 bg-[#fffdfc] hover:bg-[#f8f4f1] transition-all hover:border-[#c96f8e] group cursor-pointer flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-serif text-lg text-[#271e20] group-hover:text-[#8e3f5c] transition-colors">
                          {srv.name}
                        </h4>
                        <span className="text-base font-serif font-bold text-[#8e3f5c] whitespace-nowrap">
                          {formattedPrice}
                        </span>
                      </div>
                      {srv.description && (
                        <p className="text-xs text-[#6e5f64] font-light mt-1 line-clamp-2">
                          {srv.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#c96f8e]/10 text-xs">
                      {srv.durationMin ? (
                        <span className="text-[#6e5f64] flex items-center gap-1 text-[11px]">
                          <Clock className="w-3 h-3 text-[#c96f8e]" />
                          {srv.durationMin} mins
                        </span>
                      ) : (
                        <span />
                      )}

                      <button
                        type="button"
                        className="text-[11px] uppercase font-semibold tracking-wider text-[#8e3f5c] group-hover:underline flex items-center gap-1"
                      >
                        <Calendar className="w-3 h-3" />
                        <span>Reserve</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
