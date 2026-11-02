"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Calendar, ArrowRight } from "lucide-react";
import { GalleryItem } from "@/config/siteContent";

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onBook: () => void;
}

export function Lightbox({ item, onClose, onBook }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#1c1417] text-[#fffdfc] rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/50 text-white/90 hover:text-white hover:bg-black/80 transition-colors"
          aria-label="Close image modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Preview Container */}
        <div className="relative w-full md:w-3/5 h-[340px] sm:h-[420px] md:h-[520px] bg-black">
          <Image
            src={item.imageUrl}
            alt={item.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </div>

        {/* Details & Action */}
        <div className="p-6 sm:p-8 md:w-2/5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[#e89ab2]/20 border border-[#e89ab2]/30 text-[#e89ab2] text-[10px] uppercase font-semibold tracking-[0.24em]">
              {item.category}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight">
              {item.title}
            </h3>
            <p className="text-sm text-[#f8f4f1]/80 leading-relaxed font-light">
              {item.description}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10">
            <button
              onClick={() => {
                onClose();
                onBook();
              }}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#e89ab2] to-[#c96f8e] hover:from-[#f0a9be] hover:to-[#d47b99] text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book This Service</span>
            </button>
            <p className="text-[11px] text-center text-[#f8f4f1]/50">
              Personalized consultation included with all bookings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
