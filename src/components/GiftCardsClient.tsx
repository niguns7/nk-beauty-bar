"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Gift,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  Mail,
  Phone,
  User,
  X,
  Check,
  CheckCheck,
  Copy,
  Printer,
  ChevronDown,
  CreditCard,
  Heart,
  Calendar,
  Lock,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BookingModal } from "@/components/BookingModal";
import { Footer } from "@/components/Footer";

export interface GiftTier {
  spendCents: number;
  bonusCents: number;
}

interface GiftCardsClientProps {
  isBonusActive: boolean;
  isEgiftActive: boolean;
  egiftDescription?: string;
  tiers: GiftTier[];
  validFrom: string;
  validTo: string;
  vagaroUrl: string;
}

interface SelectedVoucher {
  id: string;
  spendDollars: number;
  bonusDollars: number;
  title: string;
  code: string;
}

export function GiftCardsClient({
  isBonusActive,
  isEgiftActive,
  egiftDescription,
  tiers,
  validFrom,
  validTo,
  vagaroUrl,
}: GiftCardsClientProps) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<SelectedVoucher | null>(null);

  // Form states
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [serviceInterested, setServiceInterested] = useState("Japanese Head Spa Ritual");
  const [customAmount, setCustomAmount] = useState("150");
  const [personalMessage, setPersonalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [claimedCode, setClaimedCode] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const servicesList = [
    "Japanese Head Spa Ritual",
    "Eyebrow Threading & Tinting",
    "Signature Customized Facial",
    "Hair Styling & Blowout",
    "Waxing & Lashes Ritual",
    "Complete Sanctuary Day Experience",
    "Any Salon Service / Flexible Choice",
  ];

  const handleOpenVoucher = (voucher: SelectedVoucher) => {
    setSelectedVoucher(voucher);
    setIsSuccess(false);
    setClaimedCode("");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsSuccess(false);
  };

  const handleSubmitVoucher = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userName.trim() || !userEmail.trim()) {
      alert("Please enter your name and email to receive the gift voucher.");
      return;
    }

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const code = selectedVoucher
      ? `${selectedVoucher.code}-${randomSuffix}`
      : `BLUSH-GIFT-${randomSuffix}`;

    setClaimedCode(code);
    setIsSuccess(true);
  };

  const handleCopyCode = () => {
    if (navigator.clipboard && claimedCode) {
      navigator.clipboard.writeText(claimedCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const faqs = [
    {
      q: "How is the gift voucher delivered to the recipient?",
      a: "Instantly! Once claimed or purchased, your gift voucher is immediately sent by email and SMS text with a personalized voucher code. You can also print the digital voucher card to give in person.",
    },
    {
      q: "Do NK Beauty Bar gift vouchers ever expire?",
      a: "Never. The core purchased dollar value of every NK Beauty Bar gift voucher never expires and remains safely on file under the recipient's phone number or email.",
    },
    {
      q: "How does the complimentary bonus card work?",
      a: "When you select a $50 voucher you receive an extra $10 bonus card, and when you select a $100 voucher you receive an extra $25 bonus card! The bonus card is valid for in-salon appointments from January 2 through February 28.",
    },
    {
      q: "Can the voucher be used on any service or product?",
      a: "Yes! Vouchers are 100% flexible. The recipient can redeem their balance toward brow threading, Japanese head spas, facials, hair styling, waxing, or luxury boutique retail.",
    },
    {
      q: "How does the recipient redeem their voucher at NK Beauty Bar?",
      a: "At checkout, simply show the digital voucher code on their phone or provide their phone number. Our front desk concierge automatically applies the balance to their visit.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f4f1] text-[#271e20] selection:bg-[#e89ab2]/30 selection:text-[#8e3f5c] flex flex-col relative overflow-x-clip">
      {/* ============================================================== */}
      {/* 1. Full BLUSH Navbar with Home Links & Booking Modal           */}
      {/* ============================================================== */}
      <Navbar onOpenBooking={() => setBookingOpen(true)} activePage="gift-cards" />

      {/* Booking Modal */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

      <main className="flex-1 pt-24 sm:pt-28">
        {/* ============================================================== */}
        {/* 2. Hero Section with Beautiful Background Theme Effect         */}
        {/* ============================================================== */}
        <section className="relative overflow-hidden py-14 sm:py-20 border-b border-[#c96f8e]/15 bg-gradient-to-b from-[#fffdfc] via-[#fdf5f8] to-[#f8f4f1]">
          {/* Subtle Ambient Glow Blobs */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#fedde5]/45 blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-[#fbd1dc]/35 blur-3xl pointer-events-none" />
          <div className="absolute bottom-5 left-1/3 w-96 h-96 rounded-full bg-[#edd6a8]/20 blur-3xl pointer-events-none" />

          {/* Sparkle decorative points */}
          <span className="absolute top-12 left-10 text-[#c96f8e]/40 text-lg select-none pointer-events-none">✦</span>
          <span className="absolute top-24 right-16 text-[#c96f8e]/50 text-sm select-none pointer-events-none">★</span>
          <span className="absolute bottom-10 right-20 text-[#a38047]/40 text-base select-none pointer-events-none">✦</span>

          <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto max-w-4xl text-center space-y-5 relative z-10">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#c96f8e]/30 text-[#8e3f5c] text-xs font-bold uppercase tracking-[0.2em] shadow-xs">
              <Gift className="w-3.5 h-3.5 text-[#c96f8e]" />
              <span>The Gift of Thoughtful Elegance</span>
            </div>

            {/* Straightforward Title in Bold Fonts */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#271e20] font-bold tracking-tight leading-[1.15]">
              Give The Gift of Self-Care & Glow.
            </h1>

            {/* Straightforward Description in Bold/Medium Font */}
            <p className="text-sm sm:text-base lg:text-lg text-[#6e5f64] font-medium max-w-2xl mx-auto leading-relaxed">
              Send an instant digital gift voucher for any treatment or product at NK Beauty Bar. Valid for Japanese head spas, brow shaping, facials, waxing, and hair styling. Includes free bonus cash on select vouchers.
            </p>

            {/* Active E-Gift Notice Banner */}
            {isEgiftActive && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#fedde5] to-[#fce0e6] border border-[#c96f8e]/30 text-xs sm:text-sm text-[#8e3f5c] font-bold shadow-xs">
                <Mail className="w-4 h-4 text-[#c96f8e] shrink-0" />
                <span>Instant E-Delivery: Sent to recipient via email or text in 60 seconds.</span>
              </div>
            )}
          </div>
        </section>

        {/* ============================================================== */}
        {/* 3. Section: Beautiful Gift Card Vouchers (Perforated Stub)      */}
        {/* ============================================================== */}
        <section className="py-14 sm:py-20 w-[92%] sm:w-[85%] lg:w-[80%] mx-auto max-w-5xl space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#8e3f5c]">
              Select Your Voucher
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#271e20]">
              Available Gift Vouchers & Bonus Tiers
            </h2>
            <p className="text-xs sm:text-sm text-[#6e5f64] font-medium">
              Click any voucher below to personalize and get your instant gift code.
            </p>
          </div>

          {/* Vouchers Stack */}
          <div className="space-y-8">
            {/* ============================================================ */}
            {/* VOUCHER 1: $100 Tier (Most Popular with $25 Free Bonus)      */}
            {/* ============================================================ */}
            <div
              onClick={() =>
                handleOpenVoucher({
                  id: "tier-100",
                  spendDollars: 100,
                  bonusDollars: 25,
                  title: "$100 Gift Voucher",
                  code: "BLUSH-GIFT-100",
                })
              }
              className="relative w-full rounded-3xl overflow-hidden border-2 border-[#c96f8e]/40 bg-white shadow-[0_16px_40px_rgba(201,111,142,0.16)] hover:shadow-[0_24px_50px_rgba(201,111,142,0.28)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col md:flex-row group"
            >
              {/* Top Banner Ribbon */}
              <div className="absolute top-0 right-8 hidden sm:flex items-center gap-1 px-4 py-1 rounded-b-xl bg-[#8e3f5c] text-white text-[10px] font-bold uppercase tracking-widest shadow-sm z-20">
                <Sparkles className="w-3 h-3 text-[#edd6a8]" />
                <span>Best Value · Most Popular</span>
              </div>

              {/* LEFT STUB (Perforated Ticket Stub matching reference) */}
              <div className="relative w-full md:w-56 lg:w-64 p-6 sm:p-7 bg-gradient-to-br from-[#fedde5] via-[#fcd7e0] to-[#f8c2cf] flex flex-col justify-between items-center text-center border-b md:border-b-0 md:border-r-2 border-dashed border-[#c96f8e]/40 shrink-0">
                {/* Perforated ticket cutouts (Half-circles) */}
                <div className="hidden md:block absolute -top-3.5 -right-3.5 w-7 h-7 rounded-full bg-[#f8f4f1] border border-[#c96f8e]/25 z-20" />
                <div className="hidden md:block absolute -bottom-3.5 -right-3.5 w-7 h-7 rounded-full bg-[#f8f4f1] border border-[#c96f8e]/25 z-20" />

                {/* Stub Top Monogram */}
                <div className="space-y-0.5">
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-script text-3xl sm:text-4xl text-[#d15478] leading-none">gift</span>
                    <span className="font-sans font-black text-xs tracking-widest text-[#271e20] uppercase">VOUCHER</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-[#8e3f5c] font-semibold block">
                    NK BEAUTY BAR · HURST
                  </span>
                </div>

                {/* Stub Center Value */}
                <div className="my-4 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#8e3f5c]">
                    Voucher Value
                  </span>
                  <div className="font-serif text-4xl sm:text-5xl font-black text-[#271e20] tracking-tight">
                    $100
                  </div>
                </div>

                {/* Stub Bottom Barcode SVG */}
                <div className="w-full flex flex-col items-center gap-1 opacity-80">
                  <svg className="w-28 sm:w-32 h-7" viewBox="0 0 100 28" fill="currentColor">
                    <rect x="0" y="0" width="2" height="28" />
                    <rect x="4" y="0" width="1" height="28" />
                    <rect x="7" y="0" width="3" height="28" />
                    <rect x="12" y="0" width="1" height="28" />
                    <rect x="15" y="0" width="4" height="28" />
                    <rect x="21" y="0" width="2" height="28" />
                    <rect x="25" y="0" width="1" height="28" />
                    <rect x="28" y="0" width="3" height="28" />
                    <rect x="33" y="0" width="2" height="28" />
                    <rect x="37" y="0" width="1" height="28" />
                    <rect x="40" y="0" width="4" height="28" />
                    <rect x="46" y="0" width="2" height="28" />
                    <rect x="50" y="0" width="1" height="28" />
                    <rect x="53" y="0" width="3" height="28" />
                    <rect x="58" y="0" width="2" height="28" />
                    <rect x="62" y="0" width="4" height="28" />
                    <rect x="68" y="0" width="1" height="28" />
                    <rect x="71" y="0" width="3" height="28" />
                    <rect x="76" y="0" width="2" height="28" />
                    <rect x="80" y="0" width="1" height="28" />
                    <rect x="83" y="0" width="4" height="28" />
                    <rect x="89" y="0" width="2" height="28" />
                    <rect x="93" y="0" width="1" height="28" />
                    <rect x="96" y="0" width="3" height="28" />
                  </svg>
                  <span className="font-mono text-[9px] font-bold tracking-widest text-[#692d42]">
                    BLUSH-GC-100
                  </span>
                </div>
              </div>

              {/* MAIN VOUCHER BODY (Right side) */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden bg-gradient-to-r from-white via-[#fffbfc] to-[#fff6f9]">
                {/* Large Faint Watermark Background */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.06] font-serif text-8xl sm:text-9xl font-black text-[#8e3f5c]">
                  $100
                </div>

                {/* Top Row: Calligraphy Title & Bonus Pill */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-script text-5xl sm:text-6xl text-[#d15478] drop-shadow-xs font-normal">
                        gift
                      </span>
                      <span className="font-sans text-xl sm:text-2xl font-black tracking-[0.2em] text-[#271e20] uppercase">
                        VOUCHER
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#8e3f5c] tracking-wider uppercase">
                      NK Beauty Bar · Hurst Sanctuary, Texas
                    </p>
                  </div>

                  {/* PROMINENT BONUS HIGHLIGHT (Matching Reference Badge) */}
                  <div className="flex flex-col items-start sm:items-end">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-[#c93b66] to-[#e5688b] text-white shadow-md">
                      <Sparkles className="w-3.5 h-3.5 text-[#edd6a8]" />
                      <span className="text-xs sm:text-sm font-black uppercase tracking-wider">
                        +$25 BONUS FREE
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#8e3f5c] mt-1">
                      Total Salon Value: $125
                    </span>
                  </div>
                </div>

                {/* Middle: Details & Features */}
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-[#6e5f64] font-medium">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Valid for All Services & Products</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant E-Delivery via Email / SMS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Includes $25 In-Salon Bonus Card</span>
                  </div>
                </div>

                {/* Bottom Row: Action CTA */}
                <div className="relative z-10 pt-4 border-t border-[#c96f8e]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-[11px] text-[#8e3f5c] font-semibold">
                    Bonus Card Valid: {validFrom} – {validTo}
                  </span>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#8e3f5c] group-hover:bg-[#6e273b] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                  >
                    <span>Claim $100 Voucher</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* VOUCHER 2: $50 Tier (With $10 Free Bonus)                     */}
            {/* ============================================================ */}
            <div
              onClick={() =>
                handleOpenVoucher({
                  id: "tier-50",
                  spendDollars: 50,
                  bonusDollars: 10,
                  title: "$50 Gift Voucher",
                  code: "BLUSH-GIFT-50",
                })
              }
              className="relative w-full rounded-3xl overflow-hidden border border-[#c96f8e]/30 bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col md:flex-row group"
            >
              {/* LEFT STUB */}
              <div className="relative w-full md:w-56 lg:w-64 p-6 sm:p-7 bg-gradient-to-br from-[#f8f4f1] via-[#fcedf2] to-[#fedde5] flex flex-col justify-between items-center text-center border-b md:border-b-0 md:border-r-2 border-dashed border-[#c96f8e]/40 shrink-0">
                <div className="hidden md:block absolute -top-3.5 -right-3.5 w-7 h-7 rounded-full bg-[#f8f4f1] border border-[#c96f8e]/25 z-20" />
                <div className="hidden md:block absolute -bottom-3.5 -right-3.5 w-7 h-7 rounded-full bg-[#f8f4f1] border border-[#c96f8e]/25 z-20" />

                <div className="space-y-0.5">
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-script text-3xl sm:text-4xl text-[#d15478] leading-none">gift</span>
                    <span className="font-sans font-black text-xs tracking-widest text-[#271e20] uppercase">VOUCHER</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-[#8e3f5c] font-semibold block">
                    NK BEAUTY BAR · HURST
                  </span>
                </div>

                <div className="my-4 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#8e3f5c]">
                    Voucher Value
                  </span>
                  <div className="font-serif text-4xl sm:text-5xl font-black text-[#271e20] tracking-tight">
                    $50
                  </div>
                </div>

                <div className="w-full flex flex-col items-center gap-1 opacity-80">
                  <svg className="w-28 sm:w-32 h-7" viewBox="0 0 100 28" fill="currentColor">
                    <rect x="0" y="0" width="2" height="28" />
                    <rect x="4" y="0" width="1" height="28" />
                    <rect x="7" y="0" width="3" height="28" />
                    <rect x="12" y="0" width="1" height="28" />
                    <rect x="15" y="0" width="4" height="28" />
                    <rect x="21" y="0" width="2" height="28" />
                    <rect x="25" y="0" width="1" height="28" />
                    <rect x="28" y="0" width="3" height="28" />
                    <rect x="33" y="0" width="2" height="28" />
                    <rect x="37" y="0" width="1" height="28" />
                    <rect x="40" y="0" width="4" height="28" />
                    <rect x="46" y="0" width="2" height="28" />
                    <rect x="50" y="0" width="1" height="28" />
                    <rect x="53" y="0" width="3" height="28" />
                    <rect x="58" y="0" width="2" height="28" />
                    <rect x="62" y="0" width="4" height="28" />
                    <rect x="68" y="0" width="1" height="28" />
                    <rect x="71" y="0" width="3" height="28" />
                    <rect x="76" y="0" width="2" height="28" />
                    <rect x="80" y="0" width="1" height="28" />
                    <rect x="83" y="0" width="4" height="28" />
                    <rect x="89" y="0" width="2" height="28" />
                    <rect x="93" y="0" width="1" height="28" />
                    <rect x="96" y="0" width="3" height="28" />
                  </svg>
                  <span className="font-mono text-[9px] font-bold tracking-widest text-[#692d42]">
                    BLUSH-GC-50
                  </span>
                </div>
              </div>

              {/* MAIN VOUCHER BODY */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden bg-white">
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.05] font-serif text-8xl sm:text-9xl font-black text-[#8e3f5c]">
                  $50
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-script text-5xl sm:text-6xl text-[#d15478] drop-shadow-xs font-normal">
                        gift
                      </span>
                      <span className="font-sans text-xl sm:text-2xl font-black tracking-[0.2em] text-[#271e20] uppercase">
                        VOUCHER
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#8e3f5c] tracking-wider uppercase">
                      NK Beauty Bar · Hurst Sanctuary, Texas
                    </p>
                  </div>

                  {/* PROMINENT BONUS HIGHLIGHT */}
                  <div className="flex flex-col items-start sm:items-end">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-[#fcedf2] border border-[#c96f8e]/40 text-[#8e3f5c] shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#c96f8e]" />
                      <span className="text-xs sm:text-sm font-black uppercase tracking-wider">
                        +$10 BONUS FREE
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#8e3f5c] mt-1">
                      Total Salon Value: $60
                    </span>
                  </div>
                </div>

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-[#6e5f64] font-medium">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Valid for All Services & Products</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant E-Delivery via Email / SMS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Includes $10 In-Salon Bonus Card</span>
                  </div>
                </div>

                <div className="relative z-10 pt-4 border-t border-[#c96f8e]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-[11px] text-[#8e3f5c] font-semibold">
                    Bonus Card Valid: {validFrom} – {validTo}
                  </span>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-[#c96f8e] text-[#8e3f5c] group-hover:bg-[#8e3f5c] group-hover:text-white text-xs font-bold uppercase tracking-wider shadow-xs transition-all"
                  >
                    <span>Claim $50 Voucher</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* VOUCHER 3: Custom Amount Tier                                */}
            {/* ============================================================ */}
            <div
              onClick={() =>
                handleOpenVoucher({
                  id: "tier-custom",
                  spendDollars: parseInt(customAmount, 10) || 150,
                  bonusDollars: 0,
                  title: "Custom Value Gift Voucher",
                  code: "BLUSH-GIFT-CUSTOM",
                })
              }
              className="relative w-full rounded-3xl overflow-hidden border border-[#c96f8e]/25 bg-gradient-to-r from-white to-[#fbf7f5] shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col md:flex-row group"
            >
              {/* LEFT STUB */}
              <div className="relative w-full md:w-56 lg:w-64 p-6 sm:p-7 bg-[#f8f4f1] flex flex-col justify-between items-center text-center border-b md:border-b-0 md:border-r-2 border-dashed border-[#c96f8e]/30 shrink-0">
                <div className="hidden md:block absolute -top-3.5 -right-3.5 w-7 h-7 rounded-full bg-[#f8f4f1] border border-[#c96f8e]/25 z-20" />
                <div className="hidden md:block absolute -bottom-3.5 -right-3.5 w-7 h-7 rounded-full bg-[#f8f4f1] border border-[#c96f8e]/25 z-20" />

                <div className="space-y-0.5">
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-script text-3xl sm:text-4xl text-[#a2546e] leading-none">gift</span>
                    <span className="font-sans font-black text-xs tracking-widest text-[#271e20] uppercase">VOUCHER</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-[#a69894] font-semibold block">
                    BESPOKE VALUE
                  </span>
                </div>

                <div className="my-4 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#8e3f5c]">
                    Choose Amount
                  </span>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#271e20] tracking-tight">
                    Custom
                  </div>
                </div>

                <div className="w-full flex flex-col items-center gap-1 opacity-70">
                  <svg className="w-28 sm:w-32 h-7" viewBox="0 0 100 28" fill="currentColor">
                    <rect x="0" y="0" width="2" height="28" />
                    <rect x="4" y="0" width="1" height="28" />
                    <rect x="7" y="0" width="3" height="28" />
                    <rect x="12" y="0" width="1" height="28" />
                    <rect x="15" y="0" width="4" height="28" />
                    <rect x="21" y="0" width="2" height="28" />
                    <rect x="25" y="0" width="1" height="28" />
                    <rect x="28" y="0" width="3" height="28" />
                    <rect x="33" y="0" width="2" height="28" />
                    <rect x="37" y="0" width="1" height="28" />
                    <rect x="40" y="0" width="4" height="28" />
                    <rect x="46" y="0" width="2" height="28" />
                    <rect x="50" y="0" width="1" height="28" />
                    <rect x="53" y="0" width="3" height="28" />
                    <rect x="58" y="0" width="2" height="28" />
                    <rect x="62" y="0" width="4" height="28" />
                    <rect x="68" y="0" width="1" height="28" />
                    <rect x="71" y="0" width="3" height="28" />
                    <rect x="76" y="0" width="2" height="28" />
                    <rect x="80" y="0" width="1" height="28" />
                    <rect x="83" y="0" width="4" height="28" />
                    <rect x="89" y="0" width="2" height="28" />
                    <rect x="93" y="0" width="1" height="28" />
                    <rect x="96" y="0" width="3" height="28" />
                  </svg>
                  <span className="font-mono text-[9px] font-bold tracking-widest text-[#6e5f64]">
                    BLUSH-GC-CUSTOM
                  </span>
                </div>
              </div>

              {/* MAIN VOUCHER BODY */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-script text-5xl sm:text-6xl text-[#d15478] font-normal">
                        gift
                      </span>
                      <span className="font-sans text-xl sm:text-2xl font-black tracking-[0.2em] text-[#271e20] uppercase">
                        VOUCHER
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#8e3f5c] tracking-wider uppercase">
                      Select Any Bespoke Amount For Your Recipient
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-[#c96f8e]/30 text-xs font-bold text-[#8e3f5c]">
                    <Sparkles className="w-3.5 h-3.5 text-[#c96f8e]" />
                    <span>Any Service Value</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#6e5f64] font-medium leading-relaxed">
                  Enter any custom dollar amount. The voucher can also be purchased directly on our verified Vagaro platform.
                </p>

                <div className="pt-4 border-t border-[#c96f8e]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-[11px] text-[#6e5f64]">
                    Core gift card value never expires
                  </span>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-[#c96f8e]/50 text-[#8e3f5c] group-hover:bg-[#8e3f5c] group-hover:text-white text-xs font-bold uppercase tracking-wider shadow-xs transition-all"
                  >
                    <span>Customize Amount</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 4. Section: 3 Straightforward Highlights (No Fluff)             */}
        {/* ============================================================== */}
        <section className="py-12 border-y border-[#c96f8e]/15 bg-white/70">
          <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-5 rounded-2xl bg-white border border-[#c96f8e]/20 space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#fedde5] text-[#8e3f5c] mx-auto flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#271e20]">Never Expires</h3>
              <p className="text-xs text-[#6e5f64] font-medium">
                Purchased gift voucher amounts never expire and remain safe on profile.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#c96f8e]/20 space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#fedde5] text-[#8e3f5c] mx-auto flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#271e20]">Instant E-Delivery</h3>
              <p className="text-xs text-[#6e5f64] font-medium">
                Delivered by text or email in seconds, or printed out for in-person gifting.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#c96f8e]/20 space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#fedde5] text-[#8e3f5c] mx-auto flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#271e20]">All Services</h3>
              <p className="text-xs text-[#6e5f64] font-medium">
                Valid on brows, Japanese head spas, facials, waxing, and hair styling.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. Section: Frequently Asked Questions (Accordion)             */}
        {/* ============================================================== */}
        <section className="py-16 sm:py-20 w-[92%] sm:w-[85%] lg:w-[80%] mx-auto max-w-3xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#8e3f5c]">
              Questions & Answers
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#271e20]">
              Gift Voucher FAQ
            </h2>
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
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-semibold text-[#271e20] hover:text-[#8e3f5c] transition-colors cursor-pointer"
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
      </main>

      {/* ============================================================== */}
      {/* 6. MODAL: Name, Service Interested, Email, Phone, Get Voucher  */}
      {/* ============================================================== */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div
            className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#c96f8e]/30 relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#c96f8e]/15">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#8e3f5c]">
                  Official NK Beauty Bar Voucher
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#271e20]">
                  {selectedVoucher ? selectedVoucher.title : "Get Your Gift Voucher"}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-[#271e20] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* If NOT yet claimed: show the form */}
            {!isSuccess ? (
              <form onSubmit={handleSubmitVoucher} className="space-y-4">
                {/* Highlight of Selected Voucher */}
                {selectedVoucher && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#fedde5] to-[#fce0e6] border border-[#c96f8e]/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#271e20] block">
                        {selectedVoucher.title}
                      </span>
                      <span className="text-[11px] text-[#8e3f5c] font-semibold">
                        {selectedVoucher.bonusDollars > 0
                          ? `Includes +$${selectedVoucher.bonusDollars} Complimentary Bonus Card`
                          : "Customizable salon value"}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-serif text-2xl font-black text-[#8e3f5c]">
                        ${selectedVoucher.spendDollars}
                      </span>
                    </div>
                  </div>
                )}

                {/* Field 1: Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="clientName"
                    className="block text-xs font-bold uppercase tracking-wider text-[#3d1823]"
                  >
                    Your Name (or Recipient Name) *
                  </label>
                  <div className="relative">
                    <input
                      id="clientName"
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="e.g. Jessica Miller"
                      className="w-full px-4 py-3 rounded-2xl bg-[#faf5f6] border border-[#c96f8e]/30 focus:border-[#8e3f5c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8e3f5c]/20 text-sm font-medium text-[#271e20]"
                    />
                  </div>
                </div>

                {/* Field 2: Service Interested */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="serviceSelect"
                    className="block text-xs font-bold uppercase tracking-wider text-[#3d1823]"
                  >
                    Service Interested *
                  </label>
                  <select
                    id="serviceSelect"
                    value={serviceInterested}
                    onChange={(e) => setServiceInterested(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf5f6] border border-[#c96f8e]/30 focus:border-[#8e3f5c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8e3f5c]/20 text-sm font-medium text-[#271e20] cursor-pointer"
                  >
                    {servicesList.map((srv) => (
                      <option key={srv} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Field 3: Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="clientEmail"
                    className="block text-xs font-bold uppercase tracking-wider text-[#3d1823]"
                  >
                    Email Address (For Instant Delivery) *
                  </label>
                  <input
                    id="clientEmail"
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="e.g. jessica@example.com"
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf5f6] border border-[#c96f8e]/30 focus:border-[#8e3f5c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8e3f5c]/20 text-sm font-medium text-[#271e20]"
                  />
                </div>

                {/* Field 4: Phone */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="clientPhone"
                    className="block text-xs font-bold uppercase tracking-wider text-[#3d1823]"
                  >
                    Phone Number (SMS Confirmation) *
                  </label>
                  <input
                    id="clientPhone"
                    type="tel"
                    required
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="e.g. (817) 555-0199"
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf5f6] border border-[#c96f8e]/30 focus:border-[#8e3f5c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8e3f5c]/20 text-sm font-medium text-[#271e20]"
                  />
                </div>

                {/* Optional Note */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="clientMsg"
                    className="block text-xs font-bold uppercase tracking-wider text-[#3d1823]"
                  >
                    Gift Note / Message (Optional)
                  </label>
                  <textarea
                    id="clientMsg"
                    rows={2}
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                    placeholder="e.g. Wishing you a day of pure relaxation and self-care!"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#faf5f6] border border-[#c96f8e]/30 focus:border-[#8e3f5c] focus:bg-white focus:outline-none text-xs font-medium text-[#271e20]"
                  />
                </div>

                {/* Dual Action Buttons: Get Voucher & Payment Button (Static) */}
                <div className="pt-3 space-y-2.5">
                  {/* Primary: Get Voucher */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#8e3f5c] hover:opacity-95 text-white text-xs font-bold uppercase tracking-[0.18em] shadow-[0_4px_16px_rgba(201,111,142,0.32)] flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Gift className="w-4 h-4" />
                    <span>Get Voucher</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Secondary: Static Payment Button (Credit Card / Apple Pay) */}
                  <a
                    href={vagaroUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-full bg-[#271e20] hover:bg-[#3d1823] text-white text-xs font-bold uppercase tracking-[0.18em] flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4 text-[#edd6a8]" />
                    <span>Proceed to Payment (Card / Apple Pay)</span>
                  </a>

                  <p className="text-[10px] text-center text-[#a69894] pt-1">
                    🔒 256-Bit SSL Encrypted Checkout · Instant E-Delivery
                  </p>
                </div>
              </form>
            ) : (
              /* Success / Claimed Voucher State */
              <div className="space-y-6 text-center py-2 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-[#fedde5] text-[#8e3f5c] mx-auto flex items-center justify-center shadow-md">
                  <Check className="w-8 h-8 text-[#8e3f5c] stroke-[3]" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif text-2xl font-bold text-[#271e20]">
                    Your Gift Voucher Is Ready!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6e5f64]">
                    We have generated your personalized voucher for <strong>{userName}</strong>.
                  </p>
                </div>

                {/* Generated Voucher Ticket Card */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-[#fedde5] via-[#fcd7e0] to-[#f8c2cf] border border-[#c96f8e]/40 shadow-sm space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-script text-3xl text-[#d15478]">gift</span>
                      <span className="font-sans font-black text-xs tracking-widest text-[#271e20] ml-1.5 uppercase">
                        VOUCHER
                      </span>
                    </div>

                    <span className="font-serif text-2xl font-black text-[#8e3f5c]">
                      ${selectedVoucher?.spendDollars}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between font-bold text-[#271e20]">
                      <span>Voucher Code:</span>
                      <span className="font-mono bg-white px-2.5 py-1 rounded-lg border border-[#c96f8e]/30 text-[#8e3f5c]">
                        {claimedCode}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[#692d42]">
                      <span>Recipient:</span>
                      <span className="font-semibold">{userName}</span>
                    </div>

                    <div className="flex items-center justify-between text-[#692d42]">
                      <span>Service:</span>
                      <span className="font-semibold">{serviceInterested}</span>
                    </div>

                    {selectedVoucher && selectedVoucher.bonusDollars > 0 && (
                      <div className="flex items-center justify-between text-emerald-800 font-bold pt-1 border-t border-[#c96f8e]/20">
                        <span>Included Bonus:</span>
                        <span>+${selectedVoucher.bonusDollars} In-Salon Voucher</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-[#6e5f64]">
                  A confirmation has been sent to <strong>{userEmail}</strong>. Present this code at NK Beauty Bar or when booking online.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#f8f4f1] hover:bg-[#fedde5] text-[#8e3f5c] text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Code Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#f8f4f1] hover:bg-[#fedde5] text-[#8e3f5c] text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Voucher</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#8e3f5c] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Done</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 7. Full BLUSH Footer                                           */}
      {/* ============================================================== */}
      <Footer />
    </div>
  );
}

