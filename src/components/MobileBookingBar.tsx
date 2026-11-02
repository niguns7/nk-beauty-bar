"use client";

import React, { useState, useEffect } from "react";
import { Phone, Calendar } from "lucide-react";
import { SALON_DATA } from "@/config/siteContent";

interface MobileBookingBarProps {
  onOpenBooking: () => void;
}

export function MobileBookingBar({ onOpenBooking }: MobileBookingBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show bar after scrolling past initial hero area (e.g. 200px)
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-2xl border-t border-[#c96f8e]/20 p-3.5 pb-safe shadow-[0_-8px_30px_rgba(142,63,92,0.15)] animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3">
        {/* Call Salon Button */}
        <a
          href={`tel:${SALON_DATA.booking.phoneRaw}`}
          className="flex-1 py-3 px-4 rounded-full bg-white border border-[#c96f8e]/30 text-[#271e20] text-xs font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 text-[#8e3f5c]" />
          <span>Call Us</span>
        </a>

        {/* Book Appointment CTA */}
        <button
          onClick={onOpenBooking}
          className="flex-[2] py-3 px-5 rounded-full bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#8e3f5c] text-white text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(201,111,142,0.4)] active:scale-95 transition-all cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>
    </div>
  );
}
