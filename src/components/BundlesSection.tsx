"use client";

import React from "react";
import { Tag, ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { CatalogBundle } from "@/lib/catalog";

interface BundlesSectionProps {
  bundles?: CatalogBundle[];
  onSelectBundle: (bundleSlug: string, isCustom?: boolean) => void;
}

export function BundlesSection({ bundles = [], onSelectBundle }: BundlesSectionProps) {
  // Sort: always-on bundles first (activeFrom === null), seasonal ones only if active now
  const visibleBundles = bundles
    .filter((b) => b.isAvailableNow)
    .sort((a, b) => {
      const aAlwaysOn = !a.activeFrom;
      const bAlwaysOn = !b.activeFrom;
      if (aAlwaysOn && !bAlwaysOn) return -1;
      if (!aAlwaysOn && bAlwaysOn) return 1;
      return a.sortOrder - b.sortOrder;
    });

  return (
    <section id="bundles" className="py-24 sm:py-32 relative z-20 bg-[#fffdfc] overflow-clip">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 ambient-glow-rose pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 ambient-glow-blush pointer-events-none" />

      <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-3xl mx-auto">
          <SectionHeading
            eyebrow="CURATED PAIRINGS & SAVINGS"
            heading="Bundled rituals designed to flow together."
            fontClass="font-display text-3xl sm:text-4xl lg:text-[44px] font-normal"
            align="left"
          />
        </div>

        {/* Stacked Cards Interactive Scroll Track */}
        <div className="max-w-2xl lg:max-w-3xl mx-auto flex flex-col gap-10 sm:gap-14 pb-16 relative">
          {visibleBundles.map((bundle, idx) => {
            const isSecond = idx === 1;
            const isBuildYourGlow = bundle.kind === "BUILD_YOUR_OWN";
            const includesEyebrow = bundle.items.some((i) => i.slug === "thread-eyebrow");

            const priceFormatted = `$${(bundle.priceCents / 100).toFixed(0)}`;
            const listFormatted = `$${(bundle.listPriceCents / 100).toFixed(0)}`;
            const savingsFormatted = `$${(bundle.savingsCents / 100).toFixed(0)}`;

            return (
              <div
                key={bundle.id}
                style={{
                  top: `calc(90px + ${idx * 24}px)`,
                  zIndex: 10 + idx,
                }}
                className={`sticky p-7 sm:p-9 rounded-[2.25rem] border flex flex-col justify-between transition-all duration-500 shadow-[0_20px_50px_rgba(39,30,32,0.10)] hover:shadow-2xl ${isSecond
                  ? "bg-gradient-to-br from-[#732943] via-[#5c1e33] to-[#2a131c] text-white border-[#e89ab2]/35 shadow-[0_24px_60px_rgba(115,41,67,0.35)] ring-1 ring-[#e89ab2]/30"
                  : bundle.featured
                    ? "bg-gradient-to-br from-[#fffbfc] to-[#fcf3f6] border-[#c96f8e]/40 ring-1 ring-[#c96f8e]/30"
                    : "bg-white border-[#c96f8e]/20"
                  }`}
              >
                <div className="space-y-4">
                  {/* Top Tags */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-3 py-1 rounded-full border text-[10px] uppercase font-bold tracking-wider ${isSecond
                        ? "bg-white/15 text-[#fcd8e3] border-white/20 backdrop-blur-md"
                        : "bg-[#f8f4f1] border-[#c96f8e]/20 text-[#8e3f5c]"
                        }`}
                    >
                      {bundle.audience || "Salon Ritual"}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold ${isSecond ? "text-[#fcd8e3]" : "text-[#8e3f5c]"
                        }`}
                    >
                      <Tag className="w-3.5 h-3.5" />
                      Save {bundle.discountPct}%
                    </span>
                  </div>

                  {/* Bundle Title & Tagline */}
                  <div>
                    <h3
                      className={`font-display text-2xl sm:text-[26px] font-bold tracking-tight ${isSecond ? "text-white" : "text-[#1c1416]"
                        }`}
                    >
                      {bundle.name}
                    </h3>
                    {bundle.tagline && (
                      <p
                        className={`text-xs font-medium mt-1 ${isSecond ? "text-white/80" : "text-[#5e4f54]"
                          }`}
                      >
                        {bundle.tagline}
                      </p>
                    )}
                  </div>

                  {/* Included Services Checklist */}
                  <div
                    className={`pt-2 border-t space-y-2 ${isSecond ? "border-white/15" : "border-[#c96f8e]/10"
                      }`}
                  >
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider block ${isSecond ? "text-white/60" : "text-[#a69894]"
                        }`}
                    >
                      Included In Ritual:
                    </span>
                    {isBuildYourGlow ? (
                      <div
                        className={`text-xs space-y-1 italic ${isSecond ? "text-white/85" : "text-[#5e5055]"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <Check className={`w-3.5 h-3.5 ${isSecond ? "text-[#fcd8e3]" : "text-[#8e3f5c]"}`} />
                          <span>Choose any 3 discountable salon services</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className={`w-3.5 h-3.5 ${isSecond ? "text-[#fcd8e3]" : "text-[#8e3f5c]"}`} />
                          <span>Automatically save 10% on your custom trio</span>
                        </div>
                      </div>
                    ) : (
                      bundle.items.map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center justify-between text-xs ${isSecond ? "text-white/90" : "text-[#271e20]"
                            }`}
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${isSecond ? "bg-[#e89ab2]" : "bg-[#c96f8e]"
                                }`}
                            />
                            {item.name}
                          </span>
                          <span
                            className={`font-mono text-[11px] ${isSecond ? "text-white/60" : "text-[#a69894]"
                              }`}
                          >
                            ${(item.listPriceCents / 100).toFixed(0)}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Eyebrow full price note */}
                  {includesEyebrow && (
                    <div
                      className={`p-2.5 rounded-xl text-[10px] font-medium leading-tight ${isSecond
                        ? "bg-white/10 text-[#fcd8e3] border border-white/15"
                        : "bg-[#f8f4f1] text-[#8e3f5c]"
                        }`}
                    >
                      Note: Eyebrow threading is always full price. Discount applies to companion services.
                    </div>
                  )}
                </div>

                {/* Bottom Pricing & CTA */}
                <div
                  className={`pt-6 border-t space-y-4 mt-6 ${isSecond ? "border-white/15" : "border-[#c96f8e]/15"
                    }`}
                >
                  <div className="flex items-end justify-between">
                    <div>
                      {isBuildYourGlow ? (
                        <div className="space-y-0.5">
                          <span
                            className={`text-[11px] font-medium block ${isSecond ? "text-white/60" : "text-[#a69894]"
                              }`}
                          >
                            Custom Trio
                          </span>
                          <span
                            className={`font-serif text-2xl font-bold ${isSecond ? "text-white" : "text-[#8e3f5c]"
                              }`}
                          >
                            Save 10%
                          </span>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-serif text-2xl sm:text-3xl font-bold ${isSecond ? "text-white" : "text-[#271e20]"
                                }`}
                            >
                              {bundle.hasFromPrice && (
                                <span
                                  className={`text-xs font-normal mr-1 ${isSecond ? "text-white/70" : "text-[#6e5f64]"
                                    }`}
                                >
                                  from
                                </span>
                              )}
                              {priceFormatted}
                            </span>
                            <span
                              className={`text-sm line-through ${isSecond ? "text-white/50" : "text-[#a69894]"
                                }`}
                            >
                              {listFormatted}
                              <span className="sr-only">
                                was {listFormatted}, now {priceFormatted}
                              </span>
                            </span>
                          </div>
                          <span
                            className={`text-[11px] font-semibold tracking-wide block ${isSecond ? "text-[#fcd8e3]" : "text-[#8e3f5c]"
                              }`}
                          >
                            Save {savingsFormatted}
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectBundle(bundle.slug, isBuildYourGlow)}
                      className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer ${isSecond
                        ? "bg-[#c96f8e] hover:bg-[#b85b7c] text-white shadow-[0_4px_16px_rgba(201,111,142,0.4)]"
                        : "bg-[#8e3f5c] hover:bg-[#6e273b] text-white"
                        }`}
                    >
                      <span>{isBuildYourGlow ? "Build Your Glow" : "Reserve"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
