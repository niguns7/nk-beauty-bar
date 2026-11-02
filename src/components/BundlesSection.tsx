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
    <section id="bundles" className="py-24 sm:py-32 relative z-20 bg-[#fffdfc] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 ambient-glow-rose pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 ambient-glow-blush pointer-events-none" />

      <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="CURATED PAIRINGS & SAVINGS"
            heading="Bundled rituals designed to flow together."
            description="Enjoy up to 15% guaranteed savings when pairing your favorite treatments in one visit. Eyebrow threading remains protected at its artisanal price."
            align="left"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleBundles.map((bundle) => {
            const isBuildYourGlow = bundle.kind === "BUILD_YOUR_OWN";
            const includesEyebrow = bundle.items.some((i) => i.slug === "thread-eyebrow");

            const priceFormatted = `$${(bundle.priceCents / 100).toFixed(0)}`;
            const listFormatted = `$${(bundle.listPriceCents / 100).toFixed(0)}`;
            const savingsFormatted = `$${(bundle.savingsCents / 100).toFixed(0)}`;

            return (
              <div
                key={bundle.id}
                className={`p-7 sm:p-8 rounded-[2.25rem] border flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  bundle.featured
                    ? "bg-gradient-to-br from-[#fffbfc] to-[#fcf3f6] border-[#c96f8e]/50 shadow-md ring-1 ring-[#c96f8e]/30"
                    : "bg-white border-[#c96f8e]/15 shadow-sm hover:border-[#c96f8e]/40"
                }`}
              >
                <div className="space-y-4">
                  {/* Top Tags */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#f8f4f1] border border-[#c96f8e]/20 text-[10px] uppercase font-semibold text-[#8e3f5c] tracking-wider">
                      {bundle.audience || "Salon Ritual"}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8e3f5c]">
                      <Tag className="w-3.5 h-3.5" />
                      Save {bundle.discountPct}%
                    </span>
                  </div>

                  {/* Bundle Title & Tagline */}
                  <div>
                    <h3 className="font-serif text-2xl text-[#271e20] font-normal">
                      {bundle.name}
                    </h3>
                    {bundle.tagline && (
                      <p className="text-xs text-[#6e5f64] font-light mt-1">
                        {bundle.tagline}
                      </p>
                    )}
                  </div>

                  {/* Included Services Checklist */}
                  <div className="pt-2 border-t border-[#c96f8e]/10 space-y-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#a69894] block">
                      Included In Ritual:
                    </span>
                    {isBuildYourGlow ? (
                      <div className="text-xs text-[#5e5055] space-y-1 italic">
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#8e3f5c]" />
                          <span>Choose any 3 discountable salon services</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#8e3f5c]" />
                          <span>Automatically save 10% on your custom trio</span>
                        </div>
                      </div>
                    ) : (
                      bundle.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs text-[#271e20]"
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c96f8e]" />
                            {item.name}
                          </span>
                          <span className="text-[#a69894] font-mono text-[11px]">
                            ${(item.listPriceCents / 100).toFixed(0)}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Eyebrow full price note */}
                  {includesEyebrow && (
                    <div className="p-2.5 rounded-xl bg-[#f8f4f1] text-[10px] text-[#8e3f5c] font-medium leading-tight">
                      Note: Eyebrow threading is always full price. Discount applies to companion services.
                    </div>
                  )}
                </div>

                {/* Bottom Pricing & CTA */}
                <div className="pt-6 border-t border-[#c96f8e]/15 space-y-4 mt-6">
                  <div className="flex items-end justify-between">
                    <div>
                      {isBuildYourGlow ? (
                        <div className="space-y-0.5">
                          <span className="text-[11px] text-[#a69894] font-medium block">Custom Trio</span>
                          <span className="font-serif text-2xl font-bold text-[#8e3f5c]">Save 10%</span>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#271e20]">
                              {bundle.hasFromPrice && (
                                <span className="text-xs font-normal text-[#6e5f64] mr-1">from</span>
                              )}
                              {priceFormatted}
                            </span>
                            <span className="text-sm line-through text-[#a69894]">
                              {listFormatted}
                              <span className="sr-only">
                                was {listFormatted}, now {priceFormatted}
                              </span>
                            </span>
                          </div>
                          <span className="text-[11px] font-semibold text-[#8e3f5c] tracking-wide block">
                            Save {savingsFormatted}
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectBundle(bundle.slug, isBuildYourGlow)}
                      className="px-5 py-2.5 rounded-full bg-[#8e3f5c] hover:bg-[#6e273b] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
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
