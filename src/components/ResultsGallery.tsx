"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Eye, ArrowRight } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Lightbox } from "./ui/Lightbox";
import { SALON_DATA, GalleryItem } from "@/config/siteContent";

interface ResultsGalleryProps {
  onOpenBooking: () => void;
}

export function ResultsGallery({ onOpenBooking }: ResultsGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ["All", "Brows", "Hair", "Skin", "Head Spa", "Studio"];

  const filteredGallery =
    selectedCategory === "All"
      ? SALON_DATA.gallery
      : SALON_DATA.gallery.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 sm:py-32 relative z-20 bg-[#f8f4f1] overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 ambient-glow-blush" />
      <div className="absolute bottom-10 right-0 w-96 h-96 ambient-glow-champagne" />

      <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto space-y-12">
        {/* Section Header */}
        <SectionHeading
          eyebrow="REAL WORK · REAL CONFIDENCE"
          heading="A closer look at the BLUSH effect."
          description="Explore authentic results from our brows, hair, skin, and head-spa rituals in our Texas sanctuary."
          align="center"
        />

        {/* ─── CATEGORY FILTER PILLS ─── */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#8e3f5c] text-white shadow-[0_4px_16px_rgba(201,111,142,0.35)] scale-105"
                    : "bg-white/80 hover:bg-white text-[#271e20] border border-[#c96f8e]/20 shadow-sm"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ─── MASONRY-STYLE EDITORIAL GALLERY GRID ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, index) => {
            // Give varied heights for organic editorial layout
            const isTall = index % 3 === 0;

            return (
              <div
                key={item.id}
                onClick={() => setActiveLightboxItem(item)}
                className={`group relative rounded-[2rem] overflow-hidden cursor-pointer bg-white/60 border border-white/80 shadow-[0_12px_30px_rgba(142,63,92,0.06)] hover:shadow-[0_20px_45px_rgba(142,63,92,0.15)] transition-all duration-500 ${
                  isTall ? "sm:row-span-2 min-h-[380px] sm:min-h-[480px]" : "min-h-[300px] sm:min-h-[340px]"
                }`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#271e20]/80 via-[#271e20]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Pill */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md text-[#8e3f5c] text-[10px] uppercase font-semibold tracking-[0.2em] shadow-sm">
                  {item.category}
                </div>

                {/* Expand Icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/85 backdrop-blur-md text-[#271e20] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                  <Eye className="w-4 h-4 text-[#8e3f5c]" />
                </div>

                {/* Bottom Title & Description on Hover */}
                <div className="absolute bottom-0 inset-x-0 p-6 text-white translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h4 className="font-serif text-lg sm:text-xl font-normal leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#f8f4f1]/80 font-light pt-1 line-clamp-2">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#e89ab2] font-semibold pt-2">
                    <span>View Detail</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery Footer CTA */}
        <div className="text-center pt-6">
          <a
            href={SALON_DATA.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/80 hover:bg-white border border-[#c96f8e]/25 text-[#271e20] text-xs uppercase tracking-[0.2em] font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 fill-[#c96f8e]" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Follow {SALON_DATA.socials.instagramHandle} on Instagram</span>
          </a>
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      <Lightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
        onBook={onOpenBooking}
      />
    </section>
  );
}
