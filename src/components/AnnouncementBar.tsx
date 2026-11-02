"use client";

import React, { useState } from "react";
import { Sparkles, Phone, MapPin, X } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-[#18181b] via-[#27272a] to-[#18181b] border-b border-[#d4af37]/20 text-xs py-2 px-4 transition-all duration-300">
      <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="hidden md:flex items-center gap-4 text-[#a1a1aa]">
          <span className="flex items-center gap-1.5 hover:text-[#f4f4f5] transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
            Flagship Atelier: 450 North Rodeo Dr, Beverly Hills
          </span>
          <span className="text-[#3f3f46]">|</span>
          <span className="flex items-center gap-1.5 hover:text-[#f4f4f5] transition-colors">
            <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
            (310) 848-9200
          </span>
        </div>

        <div className="flex-1 text-center flex items-center justify-center gap-2 font-medium">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#d4af37]/15 text-[#f5e6a8] text-[11px] border border-[#d4af37]/30">
            <Sparkles className="w-3 h-3 text-[#d4af37] animate-spin" style={{ animationDuration: '6s' }} />
            New Season Offer
          </span>
          <span className="text-[#f4f4f5]">
            Complimentary Gold Collagen Mask with any Signature Hydra-Facial booking
          </span>
          <span className="hidden sm:inline text-[#d4af37] font-semibold underline underline-offset-2 cursor-pointer hover:text-[#f5e6a8]">
            Claim Privileges &rarr;
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden lg:inline-flex items-center gap-1.5 text-[#e4e4e7] bg-[#09090b]/60 px-2.5 py-0.5 rounded-md border border-white/5 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Concierge Available
          </span>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss banner"
            className="text-[#71717a] hover:text-[#f4f4f5] transition-colors p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
