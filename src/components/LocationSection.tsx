"use client";

import React from "react";
import {
  MapPin,
  Clock,
  Phone,
  Car,
  ExternalLink,
  Calendar,
  Navigation,
} from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { SALON_DATA } from "@/config/siteContent";

interface LocationSectionProps {
  onOpenBooking: () => void;
}

export function LocationSection({ onOpenBooking }: LocationSectionProps) {
  const { booking } = SALON_DATA;

  return (
    <section id="location" className="py-16 sm:py-28 lg:py-32 relative z-20 bg-[#f8f4f1] overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 ambient-glow-blush pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 ambient-glow-champagne pointer-events-none" />

      <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto space-y-10 sm:space-y-16">
        {/* Section Header: Clear, accessible language with bold display heading */}
        <SectionHeading
          eyebrow="FIND OUR SALON"
          heading="Visit NK Beauty Bar in Hurst"
          fontClass="font-display font-bold text-3xl sm:text-5xl lg:text-6xl"
          description="Conveniently located near Walmart in Pipeline Plaza with free front parking. Stop by or book ahead for unhurried, personalized beauty care."
          align="center"
        />

        {/* ─── SPLIT LOCATION & INTERACTIVE LIVE MAP PANEL ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Salon Details, Hours, Contact Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 sm:space-y-7 p-6 sm:p-9 rounded-[2.5rem] bg-white/90 backdrop-blur-xl border border-white/95 shadow-[0_15px_45px_rgba(142,63,92,0.08)]">
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.28em] font-bold text-[#8e3f5c]">
                  HURST BEAUTY STUDIO
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#271e20]">
                  NK Beauty Bar
                </h3>
              </div>

              {/* Address Card */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#f8f4f1] border border-[#c96f8e]/20">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#8e3f5c] shadow-xs shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 text-xs sm:text-sm text-[#271e20]">
                  <p className="font-semibold text-[#271e20]">{booking.address.street}</p>
                  <p className="text-[#6e5f64]">
                    {booking.address.city}, {booking.address.state} {booking.address.zip}
                  </p>
                  <p className="text-[11px] text-[#8e3f5c] font-medium pt-0.5">
                    {booking.address.landmark}
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#271e20]">
                  <Clock className="w-4 h-4 text-[#8e3f5c]" />
                  <span>Studio Hours</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {booking.hours.map((h, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-[#c96f8e]/15 flex flex-col justify-between shadow-xs"
                    >
                      <span className="font-semibold text-[#271e20]">{h.days}</span>
                      <span className="text-[#6e5f64] font-light mt-0.5">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parking Notes */}
              <div className="flex items-center gap-2.5 text-xs text-[#5e5055] font-normal p-3 rounded-xl bg-[#f8f4f1]/80 border border-[#c96f8e]/15">
                <Car className="w-4 h-4 text-[#8e3f5c] shrink-0" />
                <span>{booking.parkingNotes}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-3 border-t border-[#c96f8e]/15">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={booking.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-full bg-white hover:bg-[#f8f4f1] border border-[#c96f8e]/30 text-[#271e20] text-xs uppercase tracking-[0.16em] font-semibold flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#8e3f5c]" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3 text-[#a69894]" />
                </a>

                <a
                  href={`tel:${booking.phoneRaw}`}
                  className="py-3 px-4 rounded-full bg-white hover:bg-[#f8f4f1] border border-[#c96f8e]/30 text-[#271e20] text-xs uppercase tracking-[0.16em] font-semibold flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-[#8e3f5c]" />
                  <span>Call {booking.phone}</span>
                </a>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 px-6 rounded-full bg-[#8e3f5c] hover:bg-[#6e273b] text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(142,63,92,0.3)] transition-all cursor-pointer hover:opacity-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </button>
            </div>
          </div>

          {/* Right Column: Real Embedded Interactive Google Map */}
          <div className="lg:col-span-6 flex flex-col min-h-[380px] sm:min-h-[460px] rounded-[2.5rem] overflow-hidden border border-[#c96f8e]/25 shadow-[0_15px_45px_rgba(142,63,92,0.1)] bg-white relative">
            <iframe
              title="NK Beauty Bar Google Map Location"
              src={booking.googleMapsEmbedUrl}
              className="w-full h-full min-h-[340px] lg:min-h-full border-0 flex-1"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            {/* Bottom floating direct directions pill */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 flex items-center justify-between sm:justify-end gap-3 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[#c96f8e]/25 shadow-lg">
              <div className="text-left sm:pr-2">
                <p className="text-[11px] font-bold text-[#271e20]">
                  712 W Pipeline Rd Ste 700
                </p>
                <p className="text-[10px] text-[#8e3f5c] font-medium">
                  Pipeline Plaza &bull; Hurst, TX
                </p>
              </div>
              <a
                href={booking.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-full bg-[#8e3f5c] hover:bg-[#6e273b] text-white text-[11px] font-semibold flex items-center gap-1.5 transition-all shrink-0 shadow-xs"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
