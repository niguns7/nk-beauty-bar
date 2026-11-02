"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Gift,
  Award,
  Heart,
  Calendar,
  ArrowRight,
  Check,
  CheckCheck,
  Copy,
  Printer,
  RefreshCw,
  ChevronDown,
  ShieldCheck,
  Phone,
  User,
  Star,
  Clock,
  Tag,
  Sparkle,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BookingModal } from "@/components/BookingModal";
import { Footer } from "@/components/Footer";
import { LoyaltyCard } from "@/components/LoyaltyCard";

interface GlowClubClientProps {
  loyalty: {
    pointsPerDollar: number;
    redeemPoints: number;
    redeemCents: number;
    browClubEveryNth: number;
  };
  rebookOffer?: { name: string; description: string } | null;
  referOffer?: { name: string; description: string } | null;
  birthdayOffer?: { name: string; description: string } | null;
}

export function GlowClubClient({
  loyalty,
  rebookOffer,
  referOffer,
  birthdayOffer,
}: GlowClubClientProps) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [userName, setUserName] = useState("Sofia Davis");
  const [userPhone, setUserPhone] = useState("(817) 555-0192");
  const [isFlipped, setIsFlipped] = useState(false);
  const [stampsCount, setStampsCount] = useState(4);
  const [copied, setCopied] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const memberId = "NK-VIP-4821";
  const redeemDollars = (loyalty.redeemCents / 100).toFixed(0);

  const handleCopyPass = () => {
    const text = `NK Beauty Bar VIP Loyalty Pass\nName: ${userName}\nMember ID: ${memberId}\nPhone: ${userPhone}\nVisits: ${stampsCount}/10`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleStampClick = (idx: number) => {
    if (idx + 1 === stampsCount) {
      setStampsCount(idx);
    } else {
      setStampsCount(idx + 1);
    }
  };

  const faqs = [
    {
      q: "Do I need to carry a physical loyalty card?",
      a: "No. Your visits, brow counts, and Glow Points are tracked automatically by your phone number every time you visit NK Beauty Bar.",
    },
    {
      q: "How do I redeem my 10th visit free treatment?",
      a: "After completing 9 visits, your 10th appointment unlocks a free signature treatment automatically at checkout. Just let our team know which service you'd like.",
    },
    {
      q: "Does The Brow Club run alongside the 10-visit card?",
      a: "Yes! Every 6th eyebrow threading or shaping service is free, and it also counts as a visit toward your 10th free treatment.",
    },
    {
      q: "How do Glow Points work?",
      a: "Earn 1 point for every $1 spent. Collect 200 points to take $10 off any service or retail product.",
    },
    {
      q: "Do my points or stamps expire?",
      a: "No, as long as you visit NK Beauty Bar once every 12 months, your progress and points remain active.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f4f1] text-[#271e20] selection:bg-[#e89ab2]/30 selection:text-[#8e3f5c] flex flex-col">
      {/* 1. Full BLUSH Navbar with Home Links & Booking Modal */}
      <Navbar onOpenBooking={() => setBookingOpen(true)} activePage="glow-club" />

      {/* Booking Modal */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

      <main className="flex-1 pt-24 sm:pt-28">
        {/* ============================================================== */}
        {/* 2. Hero Section: Short, Sweet, Straightforward                 */}
        {/* ============================================================== */}
        <section className="relative overflow-hidden py-14 sm:py-20 border-b border-[#c96f8e]/15 bg-gradient-to-b from-[#fffdfc] via-[#fdf5f8] to-[#f8f4f1]">
          {/* Subtle Ambient Glow Blobs */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#fedde5]/40 blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-[#fbd1dc]/30 blur-3xl pointer-events-none" />

          <div className="w-[95%] sm:w-[92%] max-w-[1440px] mx-auto text-center space-y-5 relative z-10">
            {/* VIP Pass Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#c96f8e]/30 text-[#8e3f5c] text-xs font-bold uppercase tracking-[0.2em] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#c96f8e]" />
              <span>The Glow Club · VIP Rewards</span>
            </div>

            {/* Main Heading using OwnerSection's DM Serif Display */}
            <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-[#271e20] tracking-tight leading-[1.15]">
              Every Visit Celebrates You. <br />
              <span className="italic text-[#8e3f5c]">
                Earn Free Treatments Every Time You Visit.
              </span>
            </h1>

            {/* Short & Sweet Description */}
            <p className="text-sm sm:text-base lg:text-lg text-[#6e5f64] font-medium max-w-2xl mx-auto leading-relaxed">
              No cards to carry. No apps to download. Just give your phone number when you visit NK Beauty Bar in Hurst, TX, and enjoy free brow threading, 10th-visit gifts, and cash discounts on your rituals.
            </p>

            {/* Dual Call To Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              <a
                href="#loyalty-card-studio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#8e3f5c] hover:opacity-95 text-white text-xs uppercase tracking-[0.18em] font-bold transition-all duration-300 shadow-[0_4px_18px_rgba(201,111,142,0.32)] transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create Loyalty Card</span>
              </a>

              <a
                href="#benefits"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/90 hover:bg-white text-[#271e20] hover:text-[#8e3f5c] text-xs uppercase tracking-[0.18em] font-bold border border-[#c96f8e]/25 hover:border-[#8e3f5c]/50 transition-all duration-300 shadow-xs cursor-pointer"
              >
                <span>Explore 4 Benefits</span>
                <ArrowRight className="w-4 h-4 text-[#8e3f5c]" />
              </a>
            </div>

            {/* Trust Highlights Strip */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
              <div className="p-3.5 rounded-2xl bg-white/80 border border-white/90 shadow-xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#fedde5] text-[#8e3f5c] flex items-center justify-center shrink-0">
                  <Gift className="w-4 h-4" />
                </div>
                <div className="text-[11px] leading-tight">
                  <span className="font-bold text-[#271e20] block">10th Visit Free</span>
                  <span className="text-[#6e5f64]">Free signature treatment</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 border border-white/90 shadow-xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#fedde5] text-[#8e3f5c] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-[11px] leading-tight">
                  <span className="font-bold text-[#271e20] block">Brow Club</span>
                  <span className="text-[#6e5f64]">Every 6th brow free</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 border border-white/90 shadow-xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#fedde5] text-[#8e3f5c] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-[11px] leading-tight">
                  <span className="font-bold text-[#271e20] block">Glow Points</span>
                  <span className="text-[#6e5f64]">1 point per $1 spent</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 border border-white/90 shadow-xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#fedde5] text-[#8e3f5c] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-[11px] leading-tight">
                  <span className="font-bold text-[#271e20] block">Zero App Needed</span>
                  <span className="text-[#6e5f64]">Synced by phone number</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 3. Section: 4 Benefits Side-by-Side (Expanded Page Width)     */}
        {/*    Card 1 has the Dark Plum Luxury Ritual Theme from photo    */}
        {/* ============================================================== */}
        <section id="benefits" className="py-16 sm:py-22 w-[95%] sm:w-[92%] max-w-[1440px] mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#8e3f5c]">
              Simple & Straightforward Perks
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#271e20]">
              4 Exclusive Benefits For Every Member
            </h2>
            <p className="text-xs sm:text-sm text-[#6e5f64] font-medium">
              Transparent rewards with zero catch. Here is exactly what you receive:
            </p>
          </div>

          {/* 4 Cards Grid - 4 Columns Across Page Width on Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {/* ============================================================ */}
            {/* CARD 1: 10th Visit On Us (DARK PLUM LUXURY THEME FROM IMAGE) */}
            {/* ============================================================ */}
            <div className="rounded-[2rem] p-6 sm:p-7 bg-gradient-to-br from-[#4d1627] via-[#3a101d] to-[#250b13] text-white border border-[#c96f8e]/35 shadow-[0_20px_50px_rgba(77,22,39,0.35)] flex flex-col justify-between space-y-5 hover:shadow-[0_26px_60px_rgba(77,22,39,0.48)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              {/* Subtle ambient light sheen */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#c96f8e]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                {/* Top Row: Pill Badges matching reference */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-[10px] font-bold uppercase tracking-widest">
                    SALON RITUAL
                  </span>

                  <div className="flex items-center gap-1 text-xs font-semibold text-white/85">
                    <Tag className="w-3.5 h-3.5 text-[#e89ab2]" />
                    <span>Save 100%</span>
                  </div>
                </div>

                {/* Card Title & Short Description */}
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                    10th Visit On Us
                  </h3>
                  <p className="text-xs text-white/75 font-light">
                    Complimentary signature ritual of your choice
                  </p>
                </div>

                {/* Thin divider line */}
                <div className="border-t border-white/15 pt-3 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/60 block">
                    INCLUDED IN RITUAL:
                  </span>
                  <div className="space-y-1.5 text-xs text-white/90 font-light">
                    <div className="flex items-center justify-between">
                      <span>• Any Signature Treatment</span>
                      <span className="font-medium text-[#e89ab2]">FREE</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Brow, Facial, Spa, or Hair</span>
                      <span className="font-medium">$0</span>
                    </div>
                  </div>
                </div>

                {/* Translucent Note Box matching reference */}
                <div className="p-3 rounded-2xl bg-white/[0.07] border border-white/10 text-[11px] text-white/80 leading-relaxed font-light">
                  Note: Automatically unlocked at checkout after your 9th salon visit.
                </div>
              </div>

              {/* Bottom Row matching reference: Price on Left & Pink Button on Right */}
              <div className="pt-4 border-t border-white/15 flex items-center justify-between relative z-10">
                <div className="space-y-0.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-bold text-2xl sm:text-3xl text-white">
                      $0
                    </span>
                    <span className="text-xs text-white/50 line-through">$65+</span>
                  </div>
                  <span className="text-[11px] text-[#e89ab2] font-semibold block">
                    Save 100%
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-[#c96f8e] hover:bg-[#b05d7a] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>RESERVE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ============================================================ */}
            {/* CARD 2: The Brow Club (Every 6th Free)                       */}
            {/* ============================================================ */}
            <div className="rounded-[2rem] p-6 sm:p-7 bg-white border border-[#c96f8e]/25 shadow-sm flex flex-col justify-between space-y-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3.5 py-1 rounded-full bg-[#fedde5] text-[#8e3f5c] text-[10px] font-bold uppercase tracking-widest border border-[#c96f8e]/25">
                    EVERYDAY PERK
                  </span>

                  <div className="flex items-center gap-1 text-xs font-semibold text-[#8e3f5c]">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Every 6th Free</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#271e20] tracking-tight">
                    The Brow Club
                  </h3>
                  <p className="text-xs text-[#6e5f64] font-medium">
                    Never pay for every brow visit
                  </p>
                </div>

                <div className="border-t border-[#c96f8e]/15 pt-3 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8e3f5c] block">
                    INCLUDED IN PERK:
                  </span>
                  <div className="space-y-1.5 text-xs text-[#271e20] font-medium">
                    <div className="flex items-center justify-between">
                      <span>• Every 6th Eyebrow Threading</span>
                      <span className="font-bold text-[#8e3f5c]">FREE</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Threading or Brow Shaping</span>
                      <span>$0</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#faf5f6] border border-[#c96f8e]/15 text-[11px] text-[#6e5f64] leading-relaxed">
                  Note: Automatically tracked by your phone number at checkout.
                </div>
              </div>

              <div className="pt-4 border-t border-[#c96f8e]/15 flex items-center justify-between relative z-10">
                <div className="space-y-0.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-bold text-2xl sm:text-3xl text-[#271e20]">
                      $0
                    </span>
                    <span className="text-xs text-[#a69894] line-through">$15</span>
                  </div>
                  <span className="text-[11px] text-[#8e3f5c] font-semibold block">
                    Save $15 Every 6 Visits
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-[#8e3f5c] hover:bg-[#6e273b] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>BOOK BROW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ============================================================ */}
            {/* CARD 3: Glow Points ($10 Credit for 200 pts)                 */}
            {/* ============================================================ */}
            <div className="rounded-[2rem] p-6 sm:p-7 bg-white border border-[#c96f8e]/25 shadow-sm flex flex-col justify-between space-y-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3.5 py-1 rounded-full bg-[#fedde5] text-[#8e3f5c] text-[10px] font-bold uppercase tracking-widest border border-[#c96f8e]/25">
                    SPEND & SAVE
                  </span>

                  <div className="flex items-center gap-1 text-xs font-semibold text-[#8e3f5c]">
                    <Tag className="w-3.5 h-3.5" />
                    <span>$10 Discount</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#271e20] tracking-tight">
                    Glow Points
                  </h3>
                  <p className="text-xs text-[#6e5f64] font-medium">
                    Cash off your next salon visit
                  </p>
                </div>

                <div className="border-t border-[#c96f8e]/15 pt-3 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8e3f5c] block">
                    INCLUDED IN PERK:
                  </span>
                  <div className="space-y-1.5 text-xs text-[#271e20] font-medium">
                    <div className="flex items-center justify-between">
                      <span>• 1 Point Per $1 Spent</span>
                      <span className="font-bold text-[#8e3f5c]">1 pt / $1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• 200 Points Milestone</span>
                      <span className="font-bold text-emerald-700">$10 Credit</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#faf5f6] border border-[#c96f8e]/15 text-[11px] text-[#6e5f64] leading-relaxed">
                  Note: Redeem right away at checkout or save up for bigger treatments.
                </div>
              </div>

              <div className="pt-4 border-t border-[#c96f8e]/15 flex items-center justify-between relative z-10">
                <div className="space-y-0.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-bold text-2xl sm:text-3xl text-[#271e20]">
                      $10 Off
                    </span>
                  </div>
                  <span className="text-[11px] text-[#8e3f5c] font-semibold block">
                    200 pts = $10 Credit
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-[#8e3f5c] hover:bg-[#6e273b] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>REDEEM</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ============================================================ */}
            {/* CARD 4: Birthday Treats & 2× Rebooking                        */}
            {/* ============================================================ */}
            <div className="rounded-[2rem] p-6 sm:p-7 bg-white border border-[#c96f8e]/25 shadow-sm flex flex-col justify-between space-y-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3.5 py-1 rounded-full bg-[#fedde5] text-[#8e3f5c] text-[10px] font-bold uppercase tracking-widest border border-[#c96f8e]/25">
                    VIP EXTRAS
                  </span>

                  <div className="flex items-center gap-1 text-xs font-semibold text-[#8e3f5c]">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Free Gift + 2×</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#271e20] tracking-tight">
                    Birthday & Rebook
                  </h3>
                  <p className="text-xs text-[#6e5f64] font-medium">
                    Double points & free birthday gifts
                  </p>
                </div>

                <div className="border-t border-[#c96f8e]/15 pt-3 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8e3f5c] block">
                    INCLUDED IN PERK:
                  </span>
                  <div className="space-y-1.5 text-xs text-[#271e20] font-medium">
                    <div className="flex items-center justify-between">
                      <span>• Birthday Month Lip Threading</span>
                      <span className="font-bold text-[#8e3f5c]">FREE</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Advance Rebooking Bonus</span>
                      <span className="font-bold text-emerald-700">2× Points</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#faf5f6] border border-[#c96f8e]/15 text-[11px] text-[#6e5f64] leading-relaxed">
                  Note: Mention your birthday month when checking in at NK Beauty Bar.
                </div>
              </div>

              <div className="pt-4 border-t border-[#c96f8e]/15 flex items-center justify-between relative z-10">
                <div className="space-y-0.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-bold text-2xl sm:text-3xl text-[#271e20]">
                      2× Pts
                    </span>
                  </div>
                  <span className="text-[11px] text-[#8e3f5c] font-semibold block">
                    + Free Birthday Service
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-[#8e3f5c] hover:bg-[#6e273b] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>CLAIM</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 4. Section: Create Loyalty Cards Studio (10 Stamps on Back)    */}
        {/* ============================================================== */}
        <section
          id="loyalty-card-studio"
          className="py-16 sm:py-24 border-y border-[#c96f8e]/20 bg-gradient-to-b from-[#fbf7f5] via-[#fff9fb] to-[#fbf7f5] scroll-mt-24"
        >
          <div className="w-[95%] sm:w-[92%] max-w-[1440px] mx-auto">
            {/* Header */}
            <div className="text-center space-y-3 max-w-2xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fedde5]/60 border border-[#c96f8e]/30 text-[#8e3f5c] text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#c96f8e]" />
                <span>Card Personalization Studio</span>
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#271e20] leading-tight">
                Create Your Digital <br className="hidden sm:inline" />
                <span className="italic text-[#8e3f5c]">VIP Loyalty Card</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#6e5f64] font-medium leading-relaxed">
                Type your name below to personalize your VIP pass. Tap the card or the button below to flip it and explore all 10 visit stamp circles on the back!
              </p>
            </div>

            {/* Interactive Studio Grid: Card on Left / Studio Controls on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
              {/* Left Column: Interactive 3D Card Display */}
              <div className="lg:col-span-7 flex flex-col items-center">
                <div className="w-full max-w-[480px]">
                  <LoyaltyCard
                    name={userName}
                    memberId={memberId}
                    isFlipped={isFlipped}
                    onToggleFlip={() => setIsFlipped(!isFlipped)}
                    stampsCount={stampsCount}
                    onStampClick={handleStampClick}
                    interactiveStamps={true}
                    showFlipHint={true}
                  />
                </div>

                {/* 10-Stamp Progress Indicator Banner */}
                <div className="w-full max-w-[480px] mt-6 p-4 sm:p-5 rounded-2xl bg-white border border-[#c96f8e]/20 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#c93b66] to-[#ec6c91] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      {stampsCount}/10
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#271e20]">
                        {stampsCount >= 10
                          ? "🎉 10th Visit Milestone Unlocked!"
                          : `${10 - stampsCount} Visits Until Free Treatment`}
                      </div>
                      <div className="text-[11px] text-[#6e5f64]">
                        {stampsCount >= 10
                          ? "Congratulations! Your next signature treatment is completely free."
                          : "Flip card and tap stamp circles to simulate your visit progress."}
                      </div>
                    </div>
                  </div>

                  {stampsCount < 10 ? (
                    <button
                      type="button"
                      onClick={() => setStampsCount(Math.min(10, stampsCount + 1))}
                      className="px-3 py-1.5 rounded-lg bg-[#8e3f5c]/10 hover:bg-[#8e3f5c]/20 text-[#8e3f5c] text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                    >
                      +1 Stamp
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setStampsCount(0)}
                      className="px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#6e5f64] text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column: Customization & Actions Form */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-7 sm:p-8 rounded-3xl bg-white border border-[#c96f8e]/25 shadow-sm space-y-6">
                  {/* Step 1: Member Name */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="memberName"
                        className="text-xs font-bold uppercase tracking-wider text-[#3d1823] flex items-center gap-1.5"
                      >
                        <User className="w-3.5 h-3.5 text-[#8e3f5c]" />
                        <span>Member Full Name</span>
                      </label>
                      <span className="text-[10px] font-bold text-[#8e3f5c]">Live Preview</span>
                    </div>

                    <div className="relative">
                      <input
                        id="memberName"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="e.g., Sofia Davis"
                        maxLength={26}
                        className="w-full px-4 py-3 rounded-2xl bg-[#faf5f6] border border-[#c96f8e]/30 focus:border-[#8e3f5c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8e3f5c]/20 text-sm font-semibold text-[#271e20] transition-all"
                      />
                      {userName && (
                        <button
                          type="button"
                          onClick={() => setUserName("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6e5f64] hover:text-[#271e20] px-1.5 py-0.5"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Quick name ideas */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-[#8e3f5c] font-medium mr-1">
                        Try names:
                      </span>
                      {["Sofia Davis", "Jessica Miller", "Aaliyah Patel", "Elena Rose"].map((sample) => (
                        <button
                          key={sample}
                          type="button"
                          onClick={() => setUserName(sample)}
                          className="px-2.5 py-0.5 rounded-full bg-[#f8f4f1] hover:bg-[#fedde5] text-[10px] font-medium text-[#6e5f64] hover:text-[#8e3f5c] transition-colors cursor-pointer"
                        >
                          {sample}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Member Phone Number */}
                  <div className="space-y-2">
                    <label
                      htmlFor="memberPhone"
                      className="text-xs font-bold uppercase tracking-wider text-[#3d1823] flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#8e3f5c]" />
                      <span>Phone Number (Tracks Your Visits)</span>
                    </label>

                    <input
                      id="memberPhone"
                      type="tel"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      placeholder="(817) 000-0000"
                      className="w-full px-4 py-3 rounded-2xl bg-[#faf5f6] border border-[#c96f8e]/30 focus:border-[#8e3f5c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8e3f5c]/20 text-sm font-medium text-[#271e20] transition-all"
                    />
                    <p className="text-[11px] text-[#6e5f64]">
                      Our front desk concierge looks up your stamps with this number at checkout.
                    </p>
                  </div>

                  {/* Step 3: Card Flip & 10 Stamp Slider Controls */}
                  <div className="pt-3 border-t border-[#c96f8e]/15 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#271e20]">
                      <span>Card Side:</span>
                      <button
                        type="button"
                        onClick={() => setIsFlipped(!isFlipped)}
                        className="inline-flex items-center gap-1.5 text-[#8e3f5c] hover:underline font-bold cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>{isFlipped ? "View VIP Front" : "View 10 Stamps on Back"}</span>
                      </button>
                    </div>

                    {/* Stamp Simulator Slider */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-[#6e5f64]">
                        <span>Simulate Visit Stamps:</span>
                        <span className="font-bold text-[#8e3f5c]">
                          {stampsCount === 10 ? "🎉 FREE Treatment Unlocked!" : `${stampsCount} of 10 Stamps`}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={10}
                        value={stampsCount}
                        onChange={(e) => setStampsCount(parseInt(e.target.value, 10))}
                        className="w-full accent-[#8e3f5c] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Step 4: Card Actions (Copy / Print / Book) */}
                  <div className="pt-3 border-t border-[#c96f8e]/15 space-y-2.5">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={handleCopyPass}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#f8f4f1] hover:bg-[#fedde5] text-[#8e3f5c] text-xs font-bold transition-colors cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Pass Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Pass Info</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handlePrint}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#f8f4f1] hover:bg-[#fedde5] text-[#8e3f5c] text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print or Save Pass</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setBookingOpen(true)}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#8e3f5c] hover:opacity-95 text-white text-xs uppercase tracking-[0.18em] font-bold transition-all shadow-[0_4px_16px_rgba(201,111,142,0.3)] cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Appointment & Earn Stamps</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Helpful Reassurance Note */}
                <div className="p-4 rounded-2xl bg-white/80 border border-[#c96f8e]/20 flex items-start gap-3 text-xs text-[#6e5f64]">
                  <ShieldCheck className="w-5 h-5 text-[#8e3f5c] shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-medium">
                    <strong className="text-[#271e20]">Zero hassle guarantee:</strong> You never have to worry about forgetting your card at home. Whenever you book online or walk in to NK Beauty Bar in Hurst, just provide your phone number and we track everything for you!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. Section: How It Works in 3 Straightforward Steps            */}
        {/* ============================================================== */}
        <section className="py-16 sm:py-24 w-[95%] sm:w-[92%] max-w-[1440px] mx-auto">
          <div className="text-center space-y-3 max-w-xl mx-auto mb-12">
            <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#8e3f5c]">
              How It Works
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#271e20]">
              Earning Rewards In 3 Simple Steps
            </h2>
            <p className="text-xs sm:text-sm text-[#6e5f64] font-medium">
              No complicated rules. Earning your perks at NK Beauty Bar is completely effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-8 rounded-3xl bg-white border border-[#c96f8e]/20 shadow-xs space-y-3">
              <span className="w-9 h-9 rounded-full bg-[#fedde5] text-[#8e3f5c] flex items-center justify-center font-bold text-sm">
                1
              </span>
              <h3 className="font-display font-bold text-xl text-[#271e20]">
                Give Your Phone Number
              </h3>
              <p className="text-xs sm:text-sm text-[#6e5f64] leading-relaxed">
                When you book online or arrive for your appointment, give your phone number. Your VIP profile is automatically created on the spot.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#c96f8e]/20 shadow-xs space-y-3">
              <span className="w-9 h-9 rounded-full bg-[#fedde5] text-[#8e3f5c] flex items-center justify-center font-bold text-sm">
                2
              </span>
              <h3 className="font-display font-bold text-xl text-[#271e20]">
                Enjoy Your Ritual
              </h3>
              <p className="text-xs sm:text-sm text-[#6e5f64] leading-relaxed">
                Relax during your appointment. Every service adds 1 visit stamp toward your 10th free visit, counts toward your 6th free brow, and earns 1 Glow Point per $1 spent.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#c96f8e]/20 shadow-xs space-y-3">
              <span className="w-9 h-9 rounded-full bg-[#fedde5] text-[#8e3f5c] flex items-center justify-center font-bold text-sm">
                3
              </span>
              <h3 className="font-display font-bold text-xl text-[#271e20]">
                Redeem Free Rewards
              </h3>
              <p className="text-xs sm:text-sm text-[#6e5f64] leading-relaxed">
                Collect your 10th visit free treatment, enjoy every 6th eyebrow threading free, and cash in your Glow Points for instant dollar discounts at checkout.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 6. Section: Frequently Asked Questions (Accordion)             */}
        {/* ============================================================== */}
        <section className="py-14 sm:py-20 w-[92%] sm:w-[85%] lg:w-[80%] mx-auto max-w-3xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#8e3f5c]">
              Questions & Answers
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#271e20]">
              Glow Club FAQs
            </h2>
            <p className="text-xs sm:text-sm text-[#6e5f64] font-medium">
              Clear, honest answers to common questions about your loyalty rewards.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-[#c96f8e]/20 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-display text-base sm:text-lg font-bold text-[#271e20] hover:text-[#8e3f5c] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8e3f5c] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#6e5f64] font-medium leading-relaxed border-t border-[#c96f8e]/10 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================== */}
        {/* 7. Section: Bottom Call to Action                              */}
        {/* ============================================================== */}
        <section className="py-16 sm:py-20 border-t border-[#c96f8e]/20 bg-gradient-to-b from-white to-[#fbf7f5] text-center">
          <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fedde5]/60 border border-[#c96f8e]/25 text-[#8e3f5c] text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready To Start Earning?</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#271e20]">
              Book Your Appointment at NK Beauty Bar
            </h2>

            <p className="text-xs sm:text-sm text-[#6e5f64] font-medium leading-relaxed max-w-md mx-auto">
              Your self-care journey starts here. Book online in 60 seconds and start stacking your loyalty stamps today.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#8e3f5c] hover:opacity-95 text-white text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-[0_4px_18px_rgba(201,111,142,0.32)] cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-[#faf5f6] text-[#271e20] text-xs uppercase tracking-[0.2em] font-bold border border-[#c96f8e]/25 transition-all shadow-xs"
              >
                <span>View All Services</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Full BLUSH Footer */}
      <Footer />
    </div>
  );
}
