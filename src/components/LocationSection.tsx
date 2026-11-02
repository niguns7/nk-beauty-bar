"use client";

import React from "react";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Phone,
  Car,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { SALON_DATA } from "@/config/siteContent";

interface LocationSectionProps {
  onOpenBooking: () => void;
}

export function LocationSection({ onOpenBooking }: LocationSectionProps) {
  const { booking } = SALON_DATA;

  return (
    <section id="location" className="py-24 sm:py-32 relative z-20 bg-[#f8f4f1] overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 ambient-glow-blush" />
      <div className="absolute bottom-10 left-10 w-96 h-96 ambient-glow-champagne" />

      <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto space-y-16">
        {/* Section Header */}
        <SectionHeading
          eyebrow="VISIT BLUSH"
          heading="Your beauty escape, close to home."
          description="Nestled in Texas, our serene salon studio is designed to offer calm, focused, and personalized care from the moment you arrive."
          align="center"
        />

        {/* ─── SPLIT LOCATION & MAP PANEL ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Salon Details, Hours, Contact Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8 p-8 sm:p-10 rounded-[2.5rem] bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_15px_45px_rgba(142,63,92,0.08)]">
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.28em] font-semibold text-[#8e3f5c]">
                  TEXAS BEAUTY SANCTUARY
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#271e20] font-normal">
                  BLUSH — NK Beauty Bar
                </h3>
              </div>

              {/* Address Card */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#f8f4f1] border border-[#c96f8e]/15">
                <MapPin className="w-5 h-5 text-[#8e3f5c] flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-xs sm:text-sm text-[#271e20]">
                  <p className="font-semibold">{booking.address.street}</p>
                  <p className="text-[#6e5f64]">
                    {booking.address.city}, {booking.address.state} {booking.address.zip}
                  </p>
                  <p className="text-[11px] text-[#8e3f5c] font-medium pt-1">
                    {booking.address.landmark}
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#271e20]">
                  <Clock className="w-4 h-4 text-[#8e3f5c]" />
                  <span>Studio Hours</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {booking.hours.map((h, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/90 border border-[#c96f8e]/10 flex flex-col justify-between"
                    >
                      <span className="font-medium text-[#271e20]">{h.days}</span>
                      <span className="text-[#6e5f64]">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parking Notes */}
              <div className="flex items-center gap-2.5 text-xs text-[#6e5f64] font-light">
                <Car className="w-4 h-4 text-[#8e3f5c] flex-shrink-0" />
                <span>{booking.parkingNotes}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#c96f8e]/15">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={booking.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-full bg-white/90 hover:bg-white border border-[#c96f8e]/30 text-[#271e20] text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <MapPin className="w-4 h-4 text-[#8e3f5c]" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#a69894]" />
                </a>

                <a
                  href={`tel:${booking.phoneRaw}`}
                  className="py-3 px-5 rounded-full bg-white/90 hover:bg-white border border-[#c96f8e]/30 text-[#271e20] text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Phone className="w-4 h-4 text-[#8e3f5c]" />
                  <span>Call {booking.phone}</span>
                </a>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#8e3f5c] hover:opacity-95 text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(201,111,142,0.3)] transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </button>
            </div>
          </div>

          {/* Right Column: Stylized Interactive Map Preview Card */}
          <div className="lg:col-span-6 relative">
            <a
              href={booking.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative h-full min-h-[420px] rounded-[2.5rem] overflow-hidden border border-[#c96f8e]/20 shadow-[0_15px_45px_rgba(142,63,92,0.1)] group cursor-pointer"
              aria-label="Open location in Google Maps"
            >
              {/* Map / Salon Exterior Background */}
              <Image
                src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80"
                alt="BLUSH NK Beauty Bar Location"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#271e20]/80 via-[#271e20]/30 to-transparent" />

              {/* Centered Stylized Pin Badge */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#e89ab2] to-[#8e3f5c] p-1 shadow-2xl flex items-center justify-center animate-bounce">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-[#8e3f5c]" />
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/95 shadow-xl max-w-xs space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#8e3f5c]">
                    TAP TO OPEN MAPS
                  </span>
                  <p className="font-serif text-sm font-semibold text-[#271e20]">
                    {booking.address.street}
                  </p>
                  <p className="text-[11px] text-[#6e5f64]">
                    {booking.address.city}, {booking.address.state}
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
