"use client";

import React, { useState } from "react";
import { Sparkles, Calendar, Clock, User, ArrowRight, Check } from "lucide-react";

interface QuickConciergeProps {
  onQuickBook: (service: string) => void;
}

export function QuickConcierge({ onQuickBook }: QuickConciergeProps) {
  const [selectedService, setSelectedService] = useState("Couture Russian Volume Lashes");
  const [selectedDate, setSelectedDate] = useState("Tomorrow");
  const [selectedTime, setSelectedTime] = useState("02:30 PM");

  const services = [
    "Couture Russian Volume Lashes",
    "24K Gold Hydra-Glow Facial",
    "Japanese Gel & Chrome Art",
    "Bio-Microneedling Glass Skin",
    "Red Carpet Bridal & Event Glam",
    "Keratin Lash Lift & Tint",
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-30 -mt-8 sm:-mt-12">
      <div className="glass-panel rounded-3xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#d4af37]/30">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Treatment Selection */}
          <div className="flex-1 min-w-[220px] p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#d4af37]/30 transition-all">
            <label className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              1. Desired Treatment
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full bg-transparent text-sm text-[#f4f4f5] font-medium focus:outline-none cursor-pointer"
            >
              {services.map((s) => (
                <option key={s} value={s} className="bg-[#181822] text-white">
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div className="flex-1 min-w-[170px] p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#d4af37]/30 transition-all">
            <label className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold flex items-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5" />
              2. Preferred Date
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-transparent text-sm text-[#f4f4f5] font-medium focus:outline-none cursor-pointer"
            >
              <option value="Today" className="bg-[#181822] text-white">Today (Limited Slots)</option>
              <option value="Tomorrow" className="bg-[#181822] text-white">Tomorrow</option>
              <option value="This Friday" className="bg-[#181822] text-white">This Friday</option>
              <option value="This Saturday" className="bg-[#181822] text-white">This Saturday</option>
              <option value="Next Week" className="bg-[#181822] text-white">Next Week</option>
            </select>
          </div>

          {/* Time Slot */}
          <div className="flex-1 min-w-[150px] p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#d4af37]/30 transition-all">
            <label className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold flex items-center gap-1.5 mb-1">
              <Clock className="w-3.5 h-3.5" />
              3. Time Window
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full bg-transparent text-sm text-[#f4f4f5] font-medium focus:outline-none cursor-pointer"
            >
              <option value="Morning (10:00 AM - 1:00 PM)" className="bg-[#181822] text-white">Morning (10 AM - 1 PM)</option>
              <option value="Afternoon (1:00 PM - 4:00 PM)" className="bg-[#181822] text-white">Afternoon (1 PM - 4 PM)</option>
              <option value="Evening (4:00 PM - 8:00 PM)" className="bg-[#181822] text-white">Evening (4 PM - 8 PM)</option>
            </select>
          </div>

          {/* Instant Reserve Button */}
          <button
            onClick={() => onQuickBook(selectedService)}
            className="gold-glow-btn px-6 py-4 rounded-2xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap self-stretch lg:self-auto"
          >
            <span>Check Availability</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      </div>
    </div>
  );
}
