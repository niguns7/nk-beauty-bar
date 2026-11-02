"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  Sparkles,
  ArrowLeft,
  Check,
  Plus,
  Minus,
  Trash2,
  ExternalLink,
  Tag,
  Gift,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { CatalogCategory, CatalogBundle } from "@/lib/catalog";

interface SelectedItem {
  type: "service" | "bundle";
  slug: string;
  qty: number;
  picks?: string[];
}

interface QuoteLineData {
  type: string;
  slug: string;
  name: string;
  qty: number;
  listCents: number;
  finalCents: number;
  unitPriceCents: number;
  discountable: boolean;
  note?: string;
}

interface QuoteResponse {
  lines: QuoteLineData[];
  subtotalCents: number;
  discountCents: number;
  totalCents: number;
  savingsPct: number;
  hasFromPrice: boolean;
  appliedOffer: {
    code: string;
    name: string;
    discountCents: number;
  } | null;
  bonuses: {
    code: string;
    name: string;
    description: string;
  }[];
  notes: string[];
  quoteId?: string;
  expiresAt: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialBundle?: string;
  categories?: CatalogCategory[];
  bundles?: CatalogBundle[];
}

export function BookingModal({
  isOpen,
  onClose,
  initialService,
  initialBundle,
  categories = [],
  bundles = [],
}: BookingModalProps) {
  const [cart, setCart] = useState<SelectedItem[]>([]);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [offerCodeInput, setOfferCodeInput] = useState("");
  const [activeOfferCode, setActiveOfferCode] = useState("");

  const [activeTab, setActiveTab] = useState<"catalog" | "cart">("catalog");
  const [catalogSubTab, setCatalogSubTab] = useState<"services" | "bundles">("services");
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>(
    categories[0]?.slug ?? "threading"
  );

  // Build Your Glow picker state
  const [buildYourGlowPicks, setBuildYourGlowPicks] = useState<string[]>([]);
  const [isBuildingGlow, setIsBuildingGlow] = useState(false);

  // Quote state
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync initial item when props change
  const [prevProps, setPrevProps] = useState({ initialService, initialBundle, isOpen });
  if (
    prevProps.initialService !== initialService ||
    prevProps.initialBundle !== initialBundle ||
    prevProps.isOpen !== isOpen
  ) {
    setPrevProps({ initialService, initialBundle, isOpen });
    if (isOpen) {
      if (initialBundle === "build-your-glow") {
        setIsBuildingGlow(true);
        setActiveTab("catalog");
        setCatalogSubTab("bundles");
      } else if (initialBundle) {
        setCart([{ type: "bundle", slug: initialBundle, qty: 1 }]);
        setActiveTab("cart");
      } else if (initialService) {
        setCart([{ type: "service", slug: initialService, qty: 1 }]);
        setActiveTab("cart");
      }
    }
  }

  // Focus trap & Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Debounced quote fetch
  const fetchQuote = useCallback(
    async (items: SelectedItem[], code: string, firstVisit: boolean) => {
      if (items.length === 0) {
        setQuote(null);
        setQuoteError(null);
        setIsLoadingQuote(false);
        return;
      }

      setIsLoadingQuote(true);
      setQuoteError(null);

      try {
        const res = await fetch("/api/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items,
            offerCode: code.trim() || undefined,
            isFirstVisit: firstVisit,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to calculate live quote");
        }

        setQuote(data);
        const formattedTotal = (data.totalCents / 100).toFixed(2);
        setAnnouncement(`Total updated to $${formattedTotal}`);

        trackEvent("quote_created", {
          quoteId: data.quoteId,
          subtotalCents: data.subtotalCents,
          discountCents: data.discountCents,
          totalCents: data.totalCents,
          itemCount: items.length,
          offerCode: code || undefined,
        });
      } catch (err: any) {
        setQuoteError(err.message || "Could not retrieve live price quote");
      } finally {
        setIsLoadingQuote(false);
      }
    },
    []
  );

  // Trigger live quote whenever cart, code, or first visit changes
  useEffect(() => {
    if (!isOpen) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      fetchQuote(cart, activeOfferCode, isFirstVisit);
    }, 250);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [cart, activeOfferCode, isFirstVisit, isOpen, fetchQuote]);

  if (!isOpen) return null;

  // Cart actions
  const handleAddService = (slug: string) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.type === "service" && i.slug === slug);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx].qty = Math.min(5, updated[idx].qty + 1);
        return updated;
      }
      return [...prev, { type: "service", slug, qty: 1 }];
    });
    setActiveTab("cart");
  };

  const handleAddBundle = (slug: string) => {
    if (slug === "build-your-glow") {
      setIsBuildingGlow(true);
      return;
    }
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.type === "bundle" && i.slug === slug);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx].qty = Math.min(5, updated[idx].qty + 1);
        return updated;
      }
      return [...prev, { type: "bundle", slug, qty: 1 }];
    });
    setActiveTab("cart");
  };

  const handleConfirmBuildYourGlow = () => {
    if (buildYourGlowPicks.length !== 3) return;
    setCart((prev) => [
      ...prev,
      {
        type: "bundle",
        slug: "build-your-glow",
        qty: 1,
        picks: [...buildYourGlowPicks],
      },
    ]);
    setIsBuildingGlow(false);
    setBuildYourGlowPicks([]);
    setActiveTab("cart");
  };

  const handleUpdateQty = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      const newQty = updated[index].qty + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index].qty = Math.min(5, newQty);
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleApplyOfferCode = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveOfferCode(offerCodeInput.trim().toUpperCase());
  };

  const handleContinueToVagaro = () => {
    if (!quote?.quoteId) return;
    trackEvent("booking_handoff", {
      quoteId: quote.quoteId,
      totalCents: quote.totalCents,
      campaign: quote.appliedOffer?.code || "booking",
    });
    window.location.href = `${window.location.origin}/api/book/${quote.quoteId}`;
  };

  // Find all discountable services for Build Your Glow
  const allDiscountableServices = categories.flatMap((c) =>
    c.services.filter((s) => s.discountable)
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Appointment Reservation and Live Pricing Engine"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Screen reader live region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <div
        ref={modalRef}
        className="relative w-full max-w-3xl bg-[#fffdfc] text-[#271e20] rounded-[2.5rem] overflow-hidden border border-white/90 shadow-2xl p-5 sm:p-9 space-y-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#c96f8e]/15 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e89ab2] to-[#c96f8e] flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif tracking-[0.18em] text-sm uppercase text-[#271e20] font-semibold block">
                RESERVE YOUR RITUAL
              </span>
              <span className="text-[10px] text-[#8e3f5c] tracking-wider uppercase font-medium">
                Guaranteed Server Pricing Engine · Hurst TX
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#f8f4f1] hover:bg-[#e89ab2]/20 text-[#271e20] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs (Select Services vs Your Quote) */}
        <div className="flex items-center justify-between bg-[#f8f4f1] p-1.5 rounded-2xl shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("catalog")}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "catalog"
                ? "bg-white text-[#8e3f5c] shadow-sm"
                : "text-[#6e5f64] hover:text-[#271e20]"
            }`}
          >
            1. Select Services & Bundles
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("cart")}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all relative cursor-pointer ${
              activeTab === "cart"
                ? "bg-white text-[#8e3f5c] shadow-sm"
                : "text-[#6e5f64] hover:text-[#271e20]"
            }`}
          >
            <span>2. Live Quote & Handoff</span>
            {cart.length > 0 && (
              <span className="ml-1.5 px-2 py-0.5 rounded-full bg-[#8e3f5c] text-white text-[10px] font-bold">
                {cart.reduce((sum, i) => sum + i.qty, 0)}
              </span>
            )}
          </button>
        </div>

        {/* ─── TAB 1: CATALOG PICKER ─── */}
        {activeTab === "catalog" && !isBuildingGlow && (
          <div className="space-y-4 overflow-y-auto flex-1 pr-1">
            {/* Sub-tab: Services vs Bundles */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCatalogSubTab("services")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  catalogSubTab === "services"
                    ? "bg-[#8e3f5c] text-white"
                    : "bg-[#f8f4f1] text-[#6e5f64] hover:bg-[#e89ab2]/15"
                }`}
              >
                Individual Services
              </button>
              <button
                type="button"
                onClick={() => setCatalogSubTab("bundles")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  catalogSubTab === "bundles"
                    ? "bg-[#8e3f5c] text-white"
                    : "bg-[#f8f4f1] text-[#6e5f64] hover:bg-[#e89ab2]/15"
                }`}
              >
                Curated Bundles (Up to 15% Off)
              </button>
            </div>

            {catalogSubTab === "services" ? (
              <div className="space-y-4">
                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCategorySlug(c.slug)}
                      className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all cursor-pointer ${
                        selectedCategorySlug === c.slug
                          ? "bg-[#fcf3f6] border border-[#c96f8e] text-[#8e3f5c] font-semibold"
                          : "bg-white border border-[#c96f8e]/15 text-[#6e5f64] hover:bg-[#f8f4f1]"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categories
                    .find((c) => c.slug === selectedCategorySlug)
                    ?.services.map((srv) => {
                      const inCart = cart.find(
                        (i) => i.type === "service" && i.slug === srv.slug
                      );
                      const priceFormatted = `$${(srv.listPriceCents / 100).toFixed(0)}${
                        srv.priceIsFrom ? "+" : ""
                      }`;

                      return (
                        <div
                          key={srv.id}
                          className="p-3.5 rounded-2xl border border-[#c96f8e]/20 bg-white hover:border-[#c96f8e] transition-all flex items-center justify-between gap-3 shadow-sm"
                        >
                          <div className="min-w-0">
                            <h4 className="font-serif text-sm text-[#271e20] truncate font-medium">
                              {srv.name}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-[#8e3f5c] font-semibold pt-0.5">
                              <span>{priceFormatted}</span>
                              {srv.durationMin && (
                                <span className="text-[10px] text-[#a69894] font-normal">
                                  · {srv.durationMin}m
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAddService(srv.slug)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                              inCart
                                ? "bg-[#8e3f5c] text-white"
                                : "bg-[#f8f4f1] text-[#8e3f5c] hover:bg-[#c96f8e] hover:text-white"
                            }`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{inCart ? `Add (${inCart.qty})` : "Add"}</span>
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              /* Bundles Grid */
              <div className="space-y-3">
                {bundles
                  .filter((b) => b.isAvailableNow)
                  .map((bundle) => {
                    const isBuild = bundle.kind === "BUILD_YOUR_OWN";
                    const priceFormatted = `$${(bundle.priceCents / 100).toFixed(0)}`;
                    const listFormatted = `$${(bundle.listPriceCents / 100).toFixed(0)}`;

                    return (
                      <div
                        key={bundle.id}
                        className="p-4 rounded-2xl border border-[#c96f8e]/20 bg-white hover:border-[#c96f8e] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif text-base text-[#271e20] font-medium">
                              {bundle.name}
                            </h4>
                            <span className="px-2 py-0.5 rounded-full bg-[#f8f4f1] text-[10px] font-bold text-[#8e3f5c]">
                              Save {bundle.discountPct}%
                            </span>
                          </div>
                          <p className="text-xs text-[#6e5f64] font-light">
                            {bundle.tagline || (isBuild ? "Pick any 3 services and save 10%" : "")}
                          </p>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-[#c96f8e]/10">
                          {!isBuild && (
                            <div className="text-right">
                              <span className="font-serif text-lg font-bold text-[#271e20] block">
                                {bundle.hasFromPrice && <span className="text-xs font-normal mr-1">from</span>}
                                {priceFormatted}
                              </span>
                              <span className="text-xs line-through text-[#a69894]">
                                {listFormatted}
                              </span>
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={() => handleAddBundle(bundle.slug)}
                            className="px-4 py-2 rounded-full bg-[#8e3f5c] hover:bg-[#6e273b] text-white text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer"
                          >
                            {isBuild ? "Customize Trio" : "Add Bundle"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* ─── BUILD YOUR GLOW 3-SERVICE PICKER ─── */}
        {activeTab === "catalog" && isBuildingGlow && (
          <div className="space-y-4 overflow-y-auto flex-1 pr-1 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-[#c96f8e]/15">
              <button
                type="button"
                onClick={() => setIsBuildingGlow(false)}
                className="inline-flex items-center gap-1 text-xs text-[#8e3f5c] font-semibold hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Bundles</span>
              </button>
              <span className="text-xs font-bold text-[#8e3f5c]">
                {buildYourGlowPicks.length} of 3 Services Selected
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-xl text-[#271e20]">
                Build Your Glow Custom Bundle
              </h3>
              <p className="text-xs text-[#6e5f64]">
                Choose any 3 discountable salon treatments to save 10% on your entire combination.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto p-1">
              {allDiscountableServices.map((srv) => {
                const isSelected = buildYourGlowPicks.includes(srv.slug);

                const handleToggle = () => {
                  if (isSelected) {
                    setBuildYourGlowPicks((prev) => prev.filter((s) => s !== srv.slug));
                  } else {
                    if (buildYourGlowPicks.length >= 3) return;
                    setBuildYourGlowPicks((prev) => [...prev, srv.slug]);
                  }
                };

                return (
                  <div
                    key={srv.id}
                    onClick={handleToggle}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected
                        ? "bg-[#fcf3f6] border-[#c96f8e] shadow-sm ring-1 ring-[#c96f8e]"
                        : "bg-white border-[#c96f8e]/15 hover:bg-[#f8f4f1]"
                    }`}
                  >
                    <div className="min-w-0">
                      <span className="font-serif text-xs text-[#271e20] block font-medium truncate">
                        {srv.name}
                      </span>
                      <span className="text-[11px] text-[#8e3f5c] font-semibold">
                        ${(srv.listPriceCents / 100).toFixed(0)}
                      </span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-[#8e3f5c] border-[#8e3f5c] text-white"
                          : "border-[#c96f8e]/40"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              disabled={buildYourGlowPicks.length !== 3}
              onClick={handleConfirmBuildYourGlow}
              className={`w-full py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
                buildYourGlowPicks.length === 3
                  ? "bg-[#8e3f5c] hover:bg-[#6e273b] text-white shadow-md cursor-pointer"
                  : "bg-[#f8f4f1] text-[#a69894] cursor-not-allowed"
              }`}
            >
              Add Custom Bundle to Reservation
            </button>
          </div>
        )}

        {/* ─── TAB 2: CART & LIVE SERVER QUOTE ─── */}
        {activeTab === "cart" && (
          <div className="space-y-5 overflow-y-auto flex-1 pr-1">
            {cart.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <p className="text-sm text-[#6e5f64]">
                  Your reservation cart is currently empty.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab("catalog")}
                  className="px-6 py-2.5 rounded-full bg-[#8e3f5c] text-white text-xs uppercase tracking-wider font-semibold cursor-pointer"
                >
                  Browse Menu & Rituals
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Cart Items List */}
                <div className="space-y-2.5">
                  {cart.map((item, idx) => {
                    let displayName = item.slug;
                    if (item.type === "service") {
                      const s = categories.flatMap((c) => c.services).find((s) => s.slug === item.slug);
                      if (s) displayName = s.name;
                    } else if (item.type === "bundle") {
                      const b = bundles.find((b) => b.slug === item.slug);
                      if (b) displayName = b.name;
                    }

                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-[#f8f4f1] border border-[#c96f8e]/15 flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <span className="text-[10px] uppercase font-semibold text-[#8e3f5c] tracking-wider block">
                            {item.type}
                          </span>
                          <h4 className="font-serif text-sm text-[#271e20] font-medium truncate">
                            {displayName}
                          </h4>
                          {item.picks && (
                            <span className="text-[10px] text-[#6e5f64] block truncate">
                              Picks: {item.picks.join(", ")}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center gap-1.5 bg-white rounded-full px-2 py-1 border border-[#c96f8e]/20">
                            <button
                              type="button"
                              onClick={() => handleUpdateQty(idx, -1)}
                              className="p-1 text-[#6e5f64] hover:text-[#8e3f5c] cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono font-semibold w-4 text-center">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleUpdateQty(idx, 1)}
                              className="p-1 text-[#6e5f64] hover:text-[#8e3f5c] cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveItem(idx)}
                            className="p-1.5 text-[#a69894] hover:text-red-500 transition-colors cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* First Visit & Promo Code Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#c96f8e]/15">
                  {/* First Visit Toggle */}
                  <label className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#c96f8e]/20 cursor-pointer">
                    <span className="text-xs font-medium text-[#271e20]">
                      First visit to BLUSH?
                    </span>
                    <input
                      type="checkbox"
                      checked={isFirstVisit}
                      onChange={(e) => setIsFirstVisit(e.target.checked)}
                      className="w-4 h-4 accent-[#8e3f5c] rounded cursor-pointer"
                    />
                  </label>

                  {/* Promo Code Input */}
                  <form onSubmit={handleApplyOfferCode} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. NEIGHBOR10)"
                      value={offerCodeInput}
                      onChange={(e) => setOfferCodeInput(e.target.value)}
                      className="flex-1 p-2.5 rounded-2xl bg-white border border-[#c96f8e]/20 text-xs text-[#271e20] focus:outline-none focus:border-[#8e3f5c]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-2xl bg-[#8e3f5c] text-white text-xs font-semibold cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                </div>

                {/* Loading / Error States */}
                {isLoadingQuote && (
                  <div className="p-4 rounded-2xl bg-[#f8f4f1] flex items-center justify-center gap-2 text-xs text-[#8e3f5c]">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Calculating verified server quote...</span>
                  </div>
                )}

                {quoteError && (
                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{quoteError}</span>
                  </div>
                )}

                {/* ─── LIVE SERVER BREAKDOWN ─── */}
                {quote && !isLoadingQuote && (
                  <div className="p-5 rounded-2xl bg-white border border-[#c96f8e]/25 shadow-sm space-y-3.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8e3f5c] block">
                      Live Server Pricing Breakdown
                    </span>

                    {/* Server Quote Lines */}
                    <div className="space-y-1.5 border-b border-[#c96f8e]/10 pb-3">
                      {quote.lines.map((line, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs text-[#271e20]"
                        >
                          <span className="truncate pr-2">
                            {line.name} {line.qty > 1 && `× ${line.qty}`}
                          </span>
                          <div className="flex items-center gap-2 shrink-0 font-mono">
                            {line.listCents !== line.finalCents && (
                              <span className="line-through text-[#a69894]">
                                ${(line.listCents / 100).toFixed(2)}
                              </span>
                            )}
                            <span className="font-bold text-[#271e20]">
                              ${(line.finalCents / 100).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Offer Badges & Bonuses */}
                    {quote.appliedOffer && (
                      <div className="flex items-center gap-2 text-xs text-[#8e3f5c] font-semibold bg-[#fcf3f6] p-2 rounded-xl">
                        <Tag className="w-3.5 h-3.5" />
                        <span>
                          {quote.appliedOffer.code} applied (Saved $
                          {(quote.appliedOffer.discountCents / 100).toFixed(2)})
                        </span>
                      </div>
                    )}

                    {quote.bonuses.map((bonus, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-[#8e3f5c] font-semibold bg-[#fcf3f6] p-2 rounded-xl"
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>
                          {bonus.name}: {bonus.description}
                        </span>
                      </div>
                    ))}

                    {quote.notes.map((note, idx) => (
                      <p key={idx} className="text-[11px] text-[#6e5f64] italic">
                        * {note}
                      </p>
                    ))}

                    {/* Subtotal, Discount & Guaranteed Total */}
                    <div className="pt-2 space-y-1 text-xs">
                      <div className="flex justify-between text-[#6e5f64]">
                        <span>List Subtotal:</span>
                        <span className="font-mono">
                          ${(quote.subtotalCents / 100).toFixed(2)}
                        </span>
                      </div>

                      {quote.discountCents > 0 && (
                        <div className="flex justify-between text-[#8e3f5c] font-semibold">
                          <span>Total Savings ({quote.savingsPct}%):</span>
                          <span className="font-mono">
                            -${(quote.discountCents / 100).toFixed(2)}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between items-baseline pt-2 border-t border-[#c96f8e]/15 font-serif text-lg font-bold text-[#271e20]">
                        <span>Guaranteed Total:</span>
                        <span className="text-2xl text-[#8e3f5c]">
                          {quote.hasFromPrice && (
                            <span className="text-xs font-sans font-normal text-[#6e5f64] mr-1">
                              from
                            </span>
                          )}
                          ${(quote.totalCents / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ─── MODAL FOOTER & VAGARO HANDOFF ─── */}
        <div className="pt-3 border-t border-[#c96f8e]/15 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-[#6e5f64] text-center sm:text-left">
            <span>Guaranteed quotes held for 30 minutes. Final slot reserved on Vagaro.</span>
          </div>

          <button
            type="button"
            disabled={!quote?.quoteId || isLoadingQuote}
            onClick={handleContinueToVagaro}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-lg transition-all ${
              quote?.quoteId && !isLoadingQuote
                ? "bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#8e3f5c] text-white hover:opacity-95 cursor-pointer"
                : "bg-[#f8f4f1] text-[#a69894] cursor-not-allowed"
            }`}
          >
            <span>Continue to Vagaro</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
