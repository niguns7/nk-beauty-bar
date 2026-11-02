"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, ArrowUp } from "lucide-react";
import { SALON_DATA } from "@/config/siteContent";

export function Footer() {
  const { brand, booking, socials, services } = SALON_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1f1719] text-[#f8f4f1] border-t border-[#e89ab2]/20 pt-20 pb-12 relative z-20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#8e3f5c]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto space-y-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* 1. Brand Statement & Monogram */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border border-white/20 bg-black shrink-0">
                <Image
                  src="/images/nk-logo.png"
                  alt="NK Beauty Bar Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-[0.24em] text-base uppercase text-white font-bold">
                  {brand.name}
                </span>
                <span className="text-[8px] uppercase tracking-[0.34em] text-[#edd6a8] font-medium">
                  {brand.subName}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#f8f4f1]/70 leading-relaxed max-w-sm font-light">
              {brand.shortBio}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#e89ab2] hover:text-[#271e20] flex items-center justify-center text-white transition-all shadow-sm"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#e89ab2] hover:text-[#271e20] flex items-center justify-center text-white transition-all shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <span className="text-xs text-[#e89ab2] font-medium font-sans">
                {socials.instagramHandle}
              </span>
            </div>
          </div>

          {/* 2. Signature Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#edd6a8]">
              Rituals & Services
            </h4>
            <ul className="space-y-2.5 text-xs text-[#f8f4f1]/80 font-light">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="hover:text-[#e89ab2] transition-colors flex items-center gap-1.5"
                  >
                    <span>{s.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Quick Directory Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#edd6a8]">
              The Studio
            </h4>
            <ul className="space-y-2.5 text-xs text-[#f8f4f1]/80 font-light">
              <li>
                <a href="#difference" className="hover:text-[#e89ab2] transition-colors">
                  Why NK Beauty Bar
                </a>
              </li>
              <li>
                <a href="#owner" className="hover:text-[#e89ab2] transition-colors">
                  Meet the Owner
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#e89ab2] transition-colors">
                  The Experience
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#e89ab2] transition-colors">
                  Results Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#e89ab2] transition-colors">
                  Client Reviews
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#e89ab2] transition-colors">
                  Location & Hours
                </a>
              </li>
              <li>
                <a
                  href={booking.vagaroUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e89ab2] hover:underline font-semibold"
                >
                  Book on Vagaro ↗
                </a>
              </li>
            </ul>
          </div>

          {/* 4. Visit Information */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#edd6a8]">
              Texas Sanctuary
            </h4>
            <div className="space-y-3 text-xs text-[#f8f4f1]/80 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#e89ab2] flex-shrink-0 mt-0.5" />
                <span>
                  {booking.address.street}, {booking.address.city}, {booking.address.state} {booking.address.zip}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#e89ab2] flex-shrink-0" />
                <a href={`tel:${booking.phoneRaw}`} className="hover:text-[#e89ab2]">
                  {booking.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#e89ab2] flex-shrink-0" />
                <a href={`mailto:${booking.email}`} className="hover:text-[#e89ab2]">
                  {booking.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#e89ab2] flex-shrink-0 mt-0.5" />
                <span>Tue – Sun (Appointments Recommended)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal, Scroll to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#f8f4f1]/50 font-light">
          <div>
            © {new Date().getFullYear()} {brand.name} — {brand.subName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#e89ab2] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#e89ab2] transition-colors">
              Terms of Service
            </a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#e89ab2] hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
