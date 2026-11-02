"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Menu, X, Calendar, Phone, Sparkles } from "lucide-react";
import { SALON_DATA } from "@/config/siteContent";

interface NavbarProps {
  onOpenBooking: (serviceName?: string) => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 60);

      // Simple active section detection
      const sections = [
        "services",
        "difference",
        "owner",
        "experience",
        "gallery",
        "featured-ritual",
        "reviews",
        "location",
      ];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open & ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Services", href: "#services", id: "services" },
    { label: "Bundles", href: "#bundles", id: "bundles" },
    { label: "Glow Club", href: "/glow-club", id: "glow-club" },
    { label: "Gift Cards", href: "/gift-cards", id: "gift-cards" },
    { label: "Why BLUSH", href: "#difference", id: "difference" },
    { label: "Reviews", href: "#reviews", id: "reviews" },
    { label: "Location", href: "#location", id: "location" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ease-out ${
          scrolled ? "py-3 bg-[#f8f4f1]/90 backdrop-blur-xl border-b border-[#c96f8e]/15 shadow-sm" : "py-6 bg-transparent"
        }`}
      >
        <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto">
          <div
            className={`w-full px-5 sm:px-7 py-3 rounded-full flex items-center justify-between transition-all duration-300 ${
              scrolled
                ? "bg-white/70 border border-white/90 shadow-[0_4px_20px_rgba(142,63,92,0.06)]"
                : "bg-white/45 hover:bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(212,136,156,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)]"
            }`}
          >
            {/* Brand Logo & Monogram */}
            <a href="#" className="flex items-center gap-3 group" aria-label="BLUSH NK Beauty Bar Home">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                  fill="none"
                >
                  <path
                    d="M 46 8 C 47 28, 48 55, 52 92 C 50 78, 47 48, 45 22 Z"
                    fill="#c96f8e"
                    opacity="0.95"
                  />
                  <path
                    d="M 47 28 C 65 18, 82 28, 75 46 C 68 62, 50 56, 48 56 C 68 56, 88 66, 78 84 C 68 100, 48 86, 52 74"
                    stroke="#c96f8e"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif tracking-[0.32em] text-sm uppercase text-[#271e20] font-semibold">
                  {SALON_DATA.brand.name}
                </span>
                <span className="text-[8px] uppercase tracking-[0.38em] text-[#a69894] font-medium">
                  {SALON_DATA.brand.subName}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-[11px] uppercase tracking-[0.22em] font-semibold text-[#4e4047]">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`transition-colors duration-200 relative py-1 ${
                      isActive ? "text-[#8e3f5c]" : "hover:text-[#c96f8e]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c96f8e] rounded-full animate-in fade-in duration-200" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Action CTA */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenBooking()}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#8e3f5c] hover:opacity-95 text-white shadow-[0_4px_16px_rgba(201,111,142,0.32)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Book Visit</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-full bg-white/80 text-[#271e20] shadow-sm hover:bg-white transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Accessible Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col justify-end animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-full bg-[#f8f4f1] rounded-t-[2.5rem] p-7 sm:p-9 shadow-2xl border-t border-white/80 space-y-6 animate-in slide-in-from-bottom-10 duration-300 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#c96f8e]/15">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c96f8e]" />
                <span className="font-serif tracking-[0.24em] text-sm uppercase text-[#271e20] font-semibold">
                  BLUSH MENU
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-white/80 text-[#271e20]"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="flex flex-col space-y-3.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base tracking-[0.18em] uppercase text-[#271e20] hover:text-[#c96f8e] font-serif py-1 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-2 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#8e3f5c] text-white text-xs uppercase tracking-[0.2em] font-semibold text-center shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Appointment</span>
              </button>

              <a
                href={`tel:${SALON_DATA.booking.phoneRaw}`}
                className="w-full py-3 rounded-full bg-white/80 border border-[#c96f8e]/20 text-[#271e20] text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#c96f8e]" />
                <span>Call Salon {SALON_DATA.booking.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
