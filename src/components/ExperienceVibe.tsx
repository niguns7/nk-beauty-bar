"use client";

import React from "react";
import { Sparkles, ShieldCheck, Wine, Gem, Droplet } from "lucide-react";

export function ExperienceVibe() {
  const perks = [
    {
      icon: Wine,
      title: "Champagne & Tea Lounge",
      desc: "Complimentary organic cold-pressed matcha, artisanal herbal infusions, or vintage champagne with every visit.",
    },
    {
      icon: Gem,
      title: "Private Treatment Suites",
      desc: "Soundproof VIP aesthetic suites with memory foam heated loungers and curated acoustic soundscapes.",
    },
    {
      icon: Droplet,
      title: "Clean Clinical Formulations",
      desc: "Paraben-free, cruelty-free Japanese and Swiss botanical serums engineered for zero irritation.",
    },
    {
      icon: ShieldCheck,
      title: "Hospital-Grade Sterilization",
      desc: "Medical autoclave sterilization for all implements and 100% single-use medical supplies.",
    },
  ];

  return (
    <section id="experience" className="py-20 bg-[#0d0d12] border-y border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#f5e6a8] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              The NK Philosophy
            </div>
            
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              A Private Haven of Pure Indulgence.
            </h2>
            
            <p className="text-sm sm:text-base text-[#a1a1aa] font-light leading-relaxed">
              We believe true beauty is effortless when nurtured with precision. Every detail of
              the NK Beauty Bar environment is architected to calm your senses while our master
              artists transform your look.
            </p>

            <div className="p-6 rounded-3xl glass-card border border-[#d4af37]/20 space-y-2">
              <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Beverly Hills Flagship
              </div>
              <p className="font-serif text-lg text-white font-medium">
                &ldquo;Where red-carpet glamour feels like an intimate spa retreat.&rdquo;
              </p>
              <p className="text-xs text-[#a1a1aa]">&mdash; Vogue Beauty Digest</p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {perks.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl glass-panel border border-white/5 hover:border-[#d4af37]/30 transition-all space-y-3 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#f5e6a8] group-hover:scale-110 group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-white group-hover:text-[#f5e6a8] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
