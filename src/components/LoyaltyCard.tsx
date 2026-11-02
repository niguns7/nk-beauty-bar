"use client";

import React, { useState } from "react";
import { Sparkles, Check, Gift, RefreshCw, Star } from "lucide-react";

export interface LoyaltyCardProps {
  name?: string;
  memberId?: string;
  isFlipped?: boolean;
  onToggleFlip?: () => void;
  stampsCount?: number;
  onStampClick?: (index: number) => void;
  interactiveStamps?: boolean;
  className?: string;
  showFlipHint?: boolean;
}

export function LoyaltyCard({
  name = "Sofia Davis",
  memberId = "BLUSH-VIP-4821",
  isFlipped: controlledFlipped,
  onToggleFlip,
  stampsCount = 4,
  onStampClick,
  interactiveStamps = true,
  className = "",
  showFlipHint = true,
}: LoyaltyCardProps) {
  const [internalFlipped, setInternalFlipped] = useState(false);
  const isFlipped = controlledFlipped !== undefined ? controlledFlipped : internalFlipped;

  const handleCardClick = () => {
    if (onToggleFlip) {
      onToggleFlip();
    } else {
      setInternalFlipped(!internalFlipped);
    }
  };

  const displayName = name && name.trim() ? name.toUpperCase() : "SOFIA DAVIS";

  return (
    <div className={`relative select-none group ${className}`} style={{ perspective: "1200px" }}>
      {/* 3D Flippable Container */}
      <div
        className="relative w-full aspect-[1.62/1] min-h-[220px] max-w-[500px] mx-auto rounded-3xl transition-transform duration-700 ease-out shadow-[0_20px_50px_rgba(201,111,142,0.22),0_10px_20px_rgba(39,30,32,0.06)] hover:shadow-[0_28px_60px_rgba(201,111,142,0.32),0_12px_24px_rgba(39,30,32,0.09)]"
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ============================================================== */}
        {/* FRONT SIDE: Luxury VIP Loyalty Pass                            */}
        {/* ============================================================== */}
        <div
          onClick={handleCardClick}
          className={`absolute inset-0 w-full h-full rounded-3xl p-5 sm:p-7 flex flex-col justify-between overflow-hidden cursor-pointer border border-white/60 bg-gradient-to-br from-[#fedde5] via-[#fcd7e0] to-[#f7cad6] transition-opacity duration-300 ${
            isFlipped ? "opacity-0 pointer-events-none invisible" : "opacity-100 visible z-10"
          }`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
            backgroundImage: `
              radial-gradient(circle at 15% 20%, rgba(255, 255, 255, 0.8) 0%, transparent 40%),
              radial-gradient(circle at 85% 80%, rgba(244, 182, 199, 0.6) 0%, transparent 45%),
              linear-gradient(135deg, #fedde5 0%, #fbd1dc 50%, #f8c2cf 100%)
            `,
          }}
        >
          {/* Subtle Marble / Rose Overlay Shimmer */}
          <div className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Ambient Sparkles */}
          <span className="absolute top-4 left-6 text-white/90 text-sm select-none pointer-events-none drop-shadow">✦</span>
          <span className="absolute top-10 right-8 text-white/80 text-xs select-none pointer-events-none drop-shadow">★</span>
          <span className="absolute bottom-12 left-10 text-white/70 text-xs select-none pointer-events-none drop-shadow">✦</span>
          <span className="absolute bottom-6 right-12 text-white/90 text-sm select-none pointer-events-none drop-shadow">★</span>

          {/* Large Faint "VIP" Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-serif text-[110px] sm:text-[145px] font-bold text-[#e6859f]/15 tracking-tight leading-none select-none">
              VIP
            </span>
          </div>

          {/* Top Row: Business Brand Name */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-sans text-[10px] sm:text-xs font-bold tracking-[0.24em] sm:tracking-[0.28em] uppercase text-[#692d42]">
                NK BEAUTY BAR
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#a2546e] font-medium">
                HURST SANCTUARY · TEXAS
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/75 backdrop-blur-sm border border-white/80 text-[9px] sm:text-[10px] font-semibold tracking-wider text-[#8e3f5c] shadow-xs">
              <Sparkles className="w-3 h-3 text-[#c96f8e]" />
              <span>VIP GLOW PASS</span>
            </div>
          </div>

          {/* Center Calligraphy: "loyalty card" matching brand luxury style */}
          <div className="relative z-10 text-center my-auto py-1">
            <h2 className="font-script text-5xl sm:text-6xl md:text-7xl text-[#d15478] drop-shadow-sm font-normal tracking-wide transform -rotate-1 select-none">
              loyalty card
            </h2>
          </div>

          {/* Bottom Row: Personalized Member Name & ID */}
          <div className="relative z-10 pt-2 border-t border-[#d15478]/25 flex items-end justify-between">
            <div className="space-y-0.5">
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-semibold text-[#8e3f5c]">
                VIP Member
              </span>
              <div className="font-serif text-sm sm:text-base font-semibold text-[#3d1823] tracking-wider truncate max-w-[200px] sm:max-w-[260px]">
                {displayName}
              </div>
            </div>

            <div className="text-right space-y-0.5">
              <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#8e3f5c] font-medium">
                Card No.
              </span>
              <div className="font-mono text-[10px] sm:text-xs tracking-wider text-[#692d42] font-semibold">
                {memberId}
              </div>
            </div>
          </div>

          {/* Corner Light Sheen */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-white/20 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* ============================================================== */}
        {/* BACK SIDE: 10-Stamp Punch Tracker (Upright & Interactive)      */}
        {/* ============================================================== */}
        <div
          onClick={interactiveStamps ? undefined : handleCardClick}
          className={`absolute inset-0 w-full h-full rounded-3xl p-4 sm:p-6 flex flex-col justify-between overflow-hidden border border-white/70 bg-gradient-to-br from-[#fedde5] via-[#fce0e6] to-[#f7cad6] transition-opacity duration-300 ${
            isFlipped ? "opacity-100 visible z-10" : "opacity-0 pointer-events-none invisible"
          }`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundImage: `
              radial-gradient(circle at 10% 90%, rgba(255, 255, 255, 0.7) 0%, transparent 40%),
              radial-gradient(circle at 90% 10%, rgba(244, 182, 199, 0.6) 0%, transparent 45%),
              linear-gradient(135deg, #fde4eb 0%, #fbd5df 50%, #f9cad7 100%)
            `,
          }}
        >
          {/* Top Title & Subtitle */}
          <div className="relative z-10 text-center space-y-0.5">
            <div className="flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#d15478]" />
              <h3 className="font-serif text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-[#d15478]">
                LOYALTY CARD
              </h3>
              <Sparkles className="w-3 h-3 text-[#d15478]" />
            </div>
            <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase text-[#3d1823]">
              GET A <span className="text-[#c93b66] underline decoration-wavy decoration-1 underline-offset-2">FREE TREATMENT</span> ON YOUR 10TH VISIT
            </p>
          </div>

          {/* 10 Stamp Punch Circles Grid (2 Rows of 5) + Scan To Book QR */}
          <div className="relative z-10 flex items-center justify-between gap-2.5 sm:gap-4 my-auto px-1 sm:px-2">
            {/* 10 Punch Stamp Slots (2 x 5) */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5 flex-1 max-w-[330px]">
              {Array.from({ length: 10 }).map((_, idx) => {
                const isTenth = idx === 9;
                const isStamped = idx < stampsCount;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (interactiveStamps && onStampClick) {
                        onStampClick(idx);
                      }
                    }}
                    title={
                      isTenth
                        ? "10th Visit: Complimentary Treatment!"
                        : `Visit #${idx + 1} Stamp`
                    }
                    className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 font-sans cursor-pointer ${
                      isTenth
                        ? isStamped
                          ? "bg-gradient-to-tr from-[#c93b66] to-[#ec6c91] text-white ring-2 ring-white shadow-md scale-105"
                          : "bg-white text-[#c93b66] border-2 border-dashed border-[#c93b66] hover:bg-[#fedde5] shadow-xs"
                        : isStamped
                        ? "bg-gradient-to-tr from-[#d15478] to-[#ea7094] text-white shadow-xs border border-white/80 ring-1 ring-[#c96f8e]/30 scale-100"
                        : "bg-white/90 text-[#8e3f5c] border border-white hover:bg-white hover:shadow-xs"
                    }`}
                  >
                    {isTenth ? (
                      <div className="flex flex-col items-center justify-center leading-none">
                        <Gift className="w-3 h-3 sm:w-3.5 sm:h-3.5 mb-0.5" />
                        <span className="text-[7px] sm:text-[8px] font-black tracking-wider uppercase">
                          FREE
                        </span>
                      </div>
                    ) : isStamped ? (
                      <div className="flex items-center justify-center">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.8]" />
                      </div>
                    ) : (
                      <span className="text-[10px] sm:text-[11px] font-bold text-[#8e3f5c]">
                        {idx + 1}
                      </span>
                    )}

                    {/* Stamped Star Badge */}
                    {isStamped && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white border border-[#d15478] flex items-center justify-center text-[7px] text-[#c93b66] shadow-xs">
                        ★
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Scan To Book with QR Code */}
            <div className="flex flex-col items-center justify-center shrink-0 pl-2 sm:pl-3 border-l border-[#d15478]/25">
              <span className="font-script text-sm sm:text-base text-[#9c2f50] -rotate-3 leading-none mb-1">
                scan to book
              </span>
              <div className="w-11 h-11 sm:w-13 sm:h-13 p-1 rounded-xl bg-white shadow-xs border border-white/80 flex items-center justify-center">
                <svg
                  viewBox="0 0 29 29"
                  className="w-full h-full text-[#3d1823]"
                  fill="currentColor"
                >
                  <path d="M0 0h7v7H0zm2 2h3v3H2zM0 22h7v7H0zm2 2h3v3H2zM22 0h7v7h-7zm2 2h3v3h-3zM9 1h2v2H9zm4 0h1v2h-1zm3 0h2v2h-2zm-6 4h3v2h-3zm5 0h2v2h-2zm-7 4h2v2H8zm3 0h3v2h-3zm5 0h2v1h-2zm4 0h1v3h-1zm-19 3h3v2H1zm4 0h2v1H5zm8 0h3v2h-3zm6 0h2v2h-2zm3 0h2v2h-2zM0 16h2v3H0zm3 2h2v2H3zm7-2h3v2h-3zm5 1h2v1h-2zm5 0h3v2h-3zm-19 5h2v2H1zm9 0h2v1h-2zm4 0h1v2h-1zm4 0h2v1h-2zm4 0h2v2h-2zm-12 3h2v2h-2zm4 0h3v1h-3zm6 0h2v2h-2zm-7 2h2v1h-2zm4 0h2v1h-2zm4 0h2v1h-2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Salon Contact Bar matching reference photo */}
          <div className="relative z-10 pt-1.5 sm:pt-2 border-t border-[#d15478]/25 flex items-center justify-between text-[8px] sm:text-[9.5px] font-medium text-[#4a1c2a] tracking-wider">
            <span className="font-semibold">@nkbeautybar</span>
            <span className="text-[#8e3f5c]/50">•</span>
            <span>nkbeautybar.com</span>
            <span className="text-[#8e3f5c]/50">•</span>
            <span className="font-semibold">(817) 510-6363</span>
          </div>
        </div>
      </div>

      {/* Floating Flip Hint Button */}
      {showFlipHint && (
        <div className="mt-4 flex items-center justify-center">
          <button
            type="button"
            onClick={handleCardClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-[#8e3f5c] hover:text-[#6e273b] text-xs font-semibold tracking-wider uppercase border border-[#c96f8e]/30 shadow-xs hover:shadow-sm transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#c96f8e]" />
            <span>{isFlipped ? "Flip to Front (VIP Pass)" : "Flip to Back (10-Stamp Tracker)"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
