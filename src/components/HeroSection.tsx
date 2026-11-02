"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Calendar,
  Star,
  ShieldCheck,
  Award,
  ArrowUpRight,
  Check,
  Clock,
  ChevronRight,
} from "lucide-react";

interface HeroSectionProps {
  onOpenBooking: (service?: string) => void;
}

interface FeaturedTreatment {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  price: string;
  duration: string;
  rating: string;
  image: string;
  highlights: string[];
}

const FEATURED_TREATMENTS: FeaturedTreatment[] = [
  {
    id: "lashes",
    category: "Lashes & Brows",
    title: "Couture Russian Volume & Lash Architecture",
    subtitle: "Weightless, handcrafted mega-fans tailored to elevate your natural eye shape.",
    price: "$240",
    duration: "120 mins",
    rating: "4.99 (480+ Reviews)",
    image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Custom eye-mapping consultation",
      "Medical-grade zero-fume adhesive",
      "Complimentary lash seal & spoolie kit",
    ],
  },
  {
    id: "skin",
    category: "Skin Alchemy",
    title: "24K Gold Hydra-Radiance & Dermal Infusion",
    subtitle: "Medical-grade hydro-peel with peptide vortex infusion and pure 24k gold leaf masking.",
    price: "$280",
    duration: "75 mins",
    rating: "5.0 (610+ Reviews)",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Deep pore ultrasonic vortex vacuum",
      "High-potency antioxidant serum infusion",
      "Cryo-lift collagen sealing therapy",
    ],
  },
  {
    id: "nails",
    category: "Nail Couture",
    title: "Japanese Structure Gel & Bespoke Chrome Art",
    subtitle: "Ultra-durable, healthy structure gel with bespoke hand-painted editorial accents.",
    price: "$165",
    duration: "90 mins",
    rating: "4.98 (390+ Reviews)",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "No-drill gentle Japanese removal",
      "Organic cuticle conditioning bath",
      "Bespoke pearl & mirror chrome pigment",
    ],
  },
  {
    id: "glam",
    category: "Master Makeup",
    title: "Red Carpet Airbrush & Bridal Glamour",
    subtitle: "Flawless camera-ready glow perfected with 18-hour waterproof luxury botanical seal.",
    price: "$290",
    duration: "90 mins",
    rating: "5.0 (310+ Reviews)",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Custom shade blending & skin prep",
      "Luxury mink / silk lash application",
      "Touch-up travel kit included",
    ],
  },
];

export function HeroSection({ onOpenBooking }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const currentTreatment = FEATURED_TREATMENTS[activeTab];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-8 sm:pt-14 pb-16 overflow-hidden">
      {/* Ambient Lighting Gradients */}
      <div className="ambient-glow-1 top-[-100px] left-[-100px]" />
      <div className="ambient-glow-2 top-[30%] right-[-150px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.12),rgba(255,255,255,0))]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT COLUMN: Editorial Typography & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-left">

            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#d4af37]/35 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#f5e6a8] font-semibold">
                Beverly Hills &bull; Premier Aesthetic Lounge
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                Hurst&apos;s 5-Star <br className="hidden sm:inline" />
                <span className="gold-gradient-text">Beauty Bar</span>
              </h1>
              <p className="text-base sm:text-lg text-[#d4af37]/90 max-w-xl font-medium leading-relaxed">
                Brows, wax, hair, facials, lashes &amp; head spa. Threading
              </p>
            </div>

            {/* Action Buttons & Video Tour */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="gold-glow-btn px-8 py-4 rounded-full text-xs sm:text-sm uppercase tracking-wider font-bold flex items-center gap-2.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Online</span>
              </button>

              <a
                href="#signature"
                className="px-6 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-[#d4af37]/50 text-xs sm:text-sm uppercase tracking-wider font-semibold text-[#f4f4f5] flex items-center gap-2 transition-all"
              >
                <span>View Services</span>
                <ArrowUpRight className="w-4 h-4 text-[#d4af37]" />
              </a>
            </div>

            {/* Trust Badges & Social Proof */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-[#d4af37]/25 flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#d4af37] fill-[#d4af37]" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-sm text-white">4.9 / 5.0</span>
                    <span className="text-[11px] text-[#f5e6a8]">★★★★★</span>
                  </div>
                  <p className="text-[11px] text-[#a1a1aa]">1,850+ Verified Reviews</p>
                </div>
              </div>

              {/* Master Certified */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-[#d4af37]/25 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <span className="font-bold text-sm text-white">Master Artists</span>
                  <p className="text-[11px] text-[#a1a1aa]">10+ Yrs Artistry Exp.</p>
                </div>
              </div>

              {/* Medical Clean */}
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-[#d4af37]/25 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <span className="font-bold text-sm text-white">Clean & Organic</span>
                  <p className="text-[11px] text-[#a1a1aa]">100% Medical Grade</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Luxury Treatment Showcase */}
          <div className="lg:col-span-5 relative">

            {/* Category Tabs */}
            <div className="flex items-center justify-start gap-1 p-1.5 rounded-2xl bg-[#121218]/90 border border-white/10 mb-4 backdrop-blur-md overflow-x-auto">
              {FEATURED_TREATMENTS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${activeTab === idx
                    ? "bg-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                    : "text-[#a1a1aa] hover:text-white hover:bg-white/5"
                    }`}
                >
                  {item.category}
                </button>
              ))}
            </div>

            {/* Main Showcase Glass Card */}
            <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-[#d4af37]/30 relative group shadow-[0_25px_60px_rgba(0,0,0,0.8)]">

              {/* Card Image Container */}
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden mb-5 border border-white/10">
                <img
                  src={currentTreatment.image}
                  alt={currentTreatment.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-90" />

                {/* Floating Image Badges */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#09090b]/80 backdrop-blur-md border border-[#d4af37]/30 text-[11px] font-semibold text-[#f5e6a8] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#d4af37]" />
                  <span>Signature Experience</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-white font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#d4af37]" />
                    {currentTreatment.duration}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#d4af37] text-black font-bold shadow-lg">
                    {currentTreatment.price}
                  </span>
                </div>
              </div>

              {/* Treatment Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold">
                    {currentTreatment.category}
                  </span>
                  <span className="text-xs text-[#a1a1aa] flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                    {currentTreatment.rating}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#f5e6a8] transition-colors">
                  {currentTreatment.title}
                </h3>

                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  {currentTreatment.subtitle}
                </p>

                {/* Highlights list */}
                <div className="space-y-1.5 pt-1">
                  {currentTreatment.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#d4d4d8]">
                      <div className="w-4 h-4 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#f5e6a8]" />
                      </div>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Card CTA */}
                <div className="pt-3">
                  <button
                    onClick={() => onOpenBooking(currentTreatment.title)}
                    className="w-full py-3 rounded-2xl bg-white/[0.06] hover:bg-[#d4af37] text-white hover:text-black font-semibold text-xs uppercase tracking-wider border border-white/10 hover:border-[#d4af37] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Book {currentTreatment.category} Ritual</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Live Badge (Top Right) */}
            <div className="hidden sm:flex absolute -top-4 -right-4 animate-float glass-card px-3.5 py-2 rounded-2xl border border-[#d4af37]/40 shadow-xl items-center gap-2.5 z-20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div className="text-left">
                <p className="text-[10px] text-[#a1a1aa] font-medium">Live Concierge</p>
                <p className="text-xs font-bold text-white">3 Openings Today</p>
              </div>
            </div>

            {/* Floating Review Bubble (Bottom Left) */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 animate-float-delayed glass-card p-3 rounded-2xl border border-white/10 shadow-2xl items-center gap-3 z-20 max-w-xs">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f43f5e] to-[#fb7185] flex items-center justify-center font-bold text-xs text-white">
                S
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 text-[10px] text-[#d4af37]">
                  ★★★★★
                  <span className="text-[#a1a1aa] ml-1">Sophia V.</span>
                </div>
                <p className="text-[11px] text-[#f4f4f5] italic line-clamp-1">
                  &ldquo;The best lash artists in Beverly Hills!&rdquo;
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
