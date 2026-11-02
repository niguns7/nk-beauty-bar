"use client";

import React, { useState, useRef, useMemo } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Clock,
  Calendar,
  Sparkles,
  Scissors,
  Droplet,
  Feather,
  Eye,
  Heart,
  Search,
  X,
  ArrowRight,
  Check,
  ShieldCheck,
} from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { CatalogCategory } from "@/lib/catalog";

interface SignatureServicesProps {
  categories?: CatalogCategory[];
  onSelectService: (serviceSlug?: string) => void;
}

interface CategoryMeta {
  title: string;
  headline: string;
  description: string;
  badge: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultDuration: string;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  threading: {
    title: "Artisanal Brow & Facial Threading",
    headline: "Millimeter-precise hair-by-hair thread sculpting",
    description:
      "Ancient natural hair removal using twisted organic antibacterial cotton thread. Gentle on delicate skin with crisp, defined arches and zero wax irritation.",
    badge: "Salon Signature",
    image:
      "https://images.unsplash.com/photo-1597225244660-1cd128c64284?auto=format&fit=crop&w=1200&q=85",
    icon: Sparkles,
    defaultDuration: "15 mins",
  },
  waxing: {
    title: "Botanical Face & Body Waxing",
    headline: "Hypoallergenic hard & strip waxing for calm, silky skin",
    description:
      "Gentle botanical waxes infused with soothing chamomile and azulene. Swift, comfortable, and tailored for sensitive skin from face to full body.",
    badge: "Gentle Formula",
    image:
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1200&q=85",
    icon: Feather,
    defaultDuration: "20 mins",
  },
  tinting: {
    title: "Brow Tinting & Henna Enhancement",
    headline: "Semi-permanent depth, definition & symmetry",
    description:
      "Custom shade formulation tailored to your skin undertone and hair shade. Delivers polished, wake-up-ready brows and lashes lasting up to 4 weeks.",
    badge: "Arch Architecture",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85",
    icon: Eye,
    defaultDuration: "25 mins",
  },
  hair: {
    title: "Haircuts & Precision Styling",
    headline: "Custom texture shaping, silk blowouts & gloss",
    description:
      "Tailored cuts designed for your bone structure and everyday lifestyle. Includes therapeutic wash, scalp massage, and lightweight thermal shine finish.",
    badge: "Everyday Luxury",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=85",
    icon: Scissors,
    defaultDuration: "35 mins",
  },
  "hair-treatments": {
    title: "Restorative Hair Treatments",
    headline: "Intensive bond repair, deep hydration & gloss",
    description:
      "Targeted salon therapies that reverse thermal fatigue and moisture loss. Restores healthy elastic bounce, cuticle seal, and vibrant shine.",
    badge: "Deep Repair",
    image:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=85",
    icon: Droplet,
    defaultDuration: "35 mins",
  },
  "head-spa": {
    title: "Signature Japanese Head Spa",
    headline: "Holistic scalp detox, waterfall halo & acupressure",
    description:
      "A deeply meditative sensory ritual featuring scalp exfoliation, warm herbal halo waterfalls, and tension-melting neck and shoulder acupressure.",
    badge: "Trending Ritual",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
    icon: Sparkles,
    defaultDuration: "60 mins",
  },
  lashes: {
    title: "Eyelash Extensions & Clusters",
    headline: "Weightless custom lash architecture",
    description:
      "Individually placed premium fibers tailored to your eye shape. From natural everyday flutter to captivating red-carpet volume.",
    badge: "Lash Artistry",
    image:
      "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1200&q=85",
    icon: Eye,
    defaultDuration: "45 mins",
  },
  facials: {
    title: "Customized Facial Services",
    headline: "Ultrasonic purification, botanical masks & glow",
    description:
      "Comprehensive skin diagnosis paired with active botanicals, lymphatic drainage, and deeply hydrating serums for an instant luminous complexion.",
    badge: "Skin Radiance",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85",
    icon: Heart,
    defaultDuration: "50 mins",
  },
};

const SERVICE_HIGHLIGHTS: Record<string, { duration?: string; note: string }> = {
  // Threading
  "thread-eyebrow": { duration: "15 mins", note: "Precision hair-by-hair shaping & crisp arch definition" },
  "thread-forehead": { duration: "10 mins", note: "Smooth hair removal along hairline and forehead" },
  "thread-lips": { duration: "10 mins", note: "Silky-smooth upper lip line with zero skin irritation" },
  "thread-chin": { duration: "10 mins", note: "Gentle targeted hair removal across the chin area" },
  "thread-sideburns": { duration: "15 mins", note: "Crisp contouring along jawline and sideburns" },
  "thread-chin-neck": { duration: "20 mins", note: "Combined lower facial and neck smoothing" },
  "thread-full-face": { duration: "35 mins", note: "Complete facial rejuvenation: brows, lip, chin & cheeks" },

  // Waxing
  "wax-eyebrow": { duration: "15 mins", note: "Gentle hard wax shaping with calming botanical finish" },
  "wax-forehead": { duration: "10 mins", note: "Even hairline smoothing with sensitive-skin wax" },
  "wax-lips": { duration: "10 mins", note: "Rapid, gentle upper lip hair removal" },
  "wax-chin": { duration: "10 mins", note: "Smooth chin hair removal with aloe soothing gel" },
  "wax-sideburns": { duration: "15 mins", note: "Clean side contouring for a polished silhouette" },
  "wax-full-face": { duration: "35 mins", note: "Full face waxing followed by calming chamomile oil" },
  "wax-under-arms": { duration: "15 mins", note: "Swift, smooth underarm care with zero razor burn" },
  "wax-half-arms": { duration: "20 mins", note: "Lower or upper arm smoothing with hypoallergenic strip wax" },
  "wax-full-arms": { duration: "35 mins", note: "Silky arm care from shoulder to wrist" },
  "wax-half-legs": { duration: "25 mins", note: "Lower leg smoothing with moisturizing botanical wax" },
  "wax-full-legs": { duration: "45 mins", note: "Complete leg smoothing with restorative post-wax hydration" },
  "wax-chest": { duration: "25 mins", note: "Even chest hair removal with cooling post-care" },
  "wax-full-stomach": { duration: "25 mins", note: "Smooth stomach contouring for a fresh feel" },
  "wax-half-back": { duration: "20 mins", note: "Upper or lower back smoothing" },
  "wax-full-back": { duration: "35 mins", note: "Full back hair removal with antibacterial tea tree lotion" },
  "wax-bikini": { duration: "20 mins", note: "Tidy perimeter bikini line waxing" },
  "wax-brazilian": { duration: "35 mins", note: "Complete intimate waxing with soothing azulene oil" },
  "wax-full-body": { duration: "90 mins", note: "Comprehensive full-body smoothing (excl. Brazilian)" },
  "wax-hydro-jelly": { duration: "15 mins", note: "Electrolyte-rich soothing mask to reduce redness & hydrate" },
  "wax-nose-ear": { duration: "10 mins", note: "Quick, hygienic trimming and waxing" },
  "wax-chin-neck": { duration: "20 mins", note: "Combined lower facial and neck smoothing" },

  // Tinting & Brows
  "tint-henna": { duration: "30 mins", note: "Organic henna brow staining that lasts up to 4 weeks on hair" },
  "tint-eyebrow": { duration: "20 mins", note: "Custom semi-permanent tint to add rich depth & fullness" },
  "tint-lash": { duration: "25 mins", note: "Deep dark lash tinting for effortless mascara-free eyes" },
  "tint-brow-lash-combo": { duration: "40 mins", note: "Synchronized brow and lash tint for unified eye drama" },
  "lam-brow-tint": { duration: "50 mins", note: "Fluffy, styled brow lamination paired with custom tint" },
  "lam-brow": { duration: "40 mins", note: "Keratin-infused brow lifting to create thick, brushed-up arches" },
  "lift-lash-tint": { duration: "55 mins", note: "Semi-permanent lash curling plus dark rich tinting" },
  "lift-lash": { duration: "45 mins", note: "Upward lash curl lasting 6-8 weeks with zero damage" },
  "tattoo-henna": { duration: "20 mins", note: "Artisanal hand-drawn organic henna body adornment" },

  // Hair
  "hair-men-regular": { duration: "30 mins", note: "Tailored men's cut with neck taper and styling finish" },
  "hair-beard-trim": { duration: "15 mins", note: "Crisp line definition and beard length sculpting" },
  "hair-bang-trim": { duration: "15 mins", note: "Fringe reshaping and face-framing adjustment" },
  "hair-women": { duration: "45 mins", note: "Custom precision cut with light texture layering" },
  "hair-child": { duration: "25 mins", note: "Gentle, patient haircut for young guests" },
  "hair-senior": { duration: "30 mins", note: "Classic cut tailored for comfort and easy maintenance" },
  "hair-styling": { duration: "45 mins", note: "Silk blowout, beach waves, or elegant special occasion styling" },

  // Hair Treatments
  "treatment-hair-men": { duration: "30 mins", note: "Revitalizing scalp and follicle strengthening therapy" },
  "treatment-hair-women": { duration: "45 mins", note: "Intensive deep hydration mask and cuticle sealant" },
  "treatment-head-oil-massage": { duration: "25 mins", note: "Traditional warm ayurvedic oil acupressure scalp massage" },

  // Head Spa
  "head-spa-signature": { duration: "60 mins", note: "Japanese scalp waterfall, deep pore detox & neck acupressure" },

  // Lashes
  "lash-cluster-natural": { duration: "35 mins", note: "Soft cluster application for lightweight daytime flutter" },
  "lash-cluster-refill": { duration: "20 mins", note: "Fast refresh to restore cluster fullness" },
  "lash-cluster-volume": { duration: "40 mins", note: "High-density clusters for glamorous volume" },
  "lash-remover": { duration: "20 mins", note: "Safe, non-damaging adhesive breakdown and conditioning" },
  "lash-classic-full": { duration: "90 mins", note: "1:1 single-lash application for timeless natural elegance" },
  "lash-classic-refill": { duration: "45 mins", note: "2-3 week maintenance touch-up for classic sets" },
  "lash-hybrid-full": { duration: "105 mins", note: "Blend of classic and volume fans for textured fluffiness" },
  "lash-hybrid-refill": { duration: "50 mins", note: "2-3 week maintenance touch-up for hybrid sets" },
  "lash-volume-full": { duration: "120 mins", note: "Handmade lightweight multi-lash fans for bold glamour" },
  "lash-volume-refill": { duration: "60 mins", note: "2-3 week maintenance touch-up for volume sets" },
  "lash-mega-volume-full": { duration: "135 mins", note: "Maximum density ultra-fine lash fans for striking drama" },
  "lash-mega-volume-refill": { duration: "65 mins", note: "Maintenance refresh for mega volume sets" },

  // Facials
  "facial-express-glow": { duration: "30 mins", note: "Pore cleansing, enzymatic exfoliation & vitamin C boost" },
  "facial-signature": { duration: "60 mins", note: "Custom European facial with steam, extraction & cooling mask" },
  "facial-anti-aging-lift": { duration: "75 mins", note: "Collagen-stimulating massage, firming serum & peptide cream" },
  "facial-purifying-acne": { duration: "65 mins", note: "Deep antibacterial extraction, calming blue light & aloe mask" },
};

export function SignatureServices({
  categories = [],
  onSelectService,
}: SignatureServicesProps) {
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>(
    categories[0]?.slug ?? "threading"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAllMobile, setShowAllMobile] = useState<boolean>(false);

  // Active Category Data
  const activeCategory =
    categories.find((c) => c.slug === activeCategorySlug) || categories[0];

  // Category Metadata Fallback
  const currentMeta: CategoryMeta =
    CATEGORY_META[activeCategorySlug] || {
      title: activeCategory?.name || "Beauty Rituals",
      headline: "Artisanal beauty treatments personalized for you",
      description:
        "Transparent in-salon pricing with premium botanical formulas and verified standards.",
      badge: "Signature Ritual",
      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
      icon: Sparkles,
      defaultDuration: "20 mins",
    };

  // Flatten all services for fast search capability
  const allServices = useMemo(() => {
    return categories.flatMap((cat) =>
      cat.services.map((srv) => ({
        ...srv,
        categoryName: cat.name,
        categorySlug: cat.slug,
      }))
    );
  }, [categories]);

  // Search Results
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return allServices.filter((s) => {
      const matchName = s.name.toLowerCase().includes(q);
      const matchCat = s.categoryName.toLowerCase().includes(q);
      const matchDesc = s.description?.toLowerCase().includes(q) ?? false;
      const highlight = SERVICE_HIGHLIGHTS[s.slug]?.note.toLowerCase().includes(q) ?? false;
      return matchName || matchCat || matchDesc || highlight;
    });
  }, [searchQuery, allServices]);

  // Horizontal scroll for category tab pills
  const scrollTabs = (direction: "left" | "right") => {
    if (tabsScrollRef.current) {
      const scrollOffset = 260;
      tabsScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollOffset : scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const handleTabClick = (slug: string) => {
    setActiveCategorySlug(slug);
    setSearchQuery("");
    setShowAllMobile(false);
  };

  // Display all category services directly so clients see all treatments without hassle
  const isSearchActive = searchQuery.trim().length > 0;
  const activeServices = activeCategory?.services || [];
  const displayedServices = activeServices;

  return (
    <section
      id="services"
      className="py-16 sm:py-24 relative z-20 overflow-hidden bg-[#f8f4f1]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-12 -left-36 w-80 h-80 ambient-glow-blush pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 ambient-glow-champagne pointer-events-none" />

      <div className="w-[92%] sm:w-[88%] lg:w-[84%] max-w-7xl mx-auto space-y-8">
        {/* ─── SECTION HEADER & INTEGRATED QUICK SEARCH ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#c96f8e]/15">
          <SectionHeading
            eyebrow="OUR SERVICES"
            heading="Services & Pricing"
            fontClass="font-display text-3xl sm:text-4xl lg:text-[44px] font-normal"
            align="left"
          />

          {/* Quick Treatment Search Bar */}
          <div className="w-full sm:w-72 lg:w-80 shrink-0">
            <label htmlFor="service-search" className="sr-only">
              Search treatments and pricing
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-[#8e3f5c] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="service-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search treatments (e.g. Brow, Facial)..."
                className="w-full pl-9 pr-9 py-2.5 bg-white/90 focus:bg-white text-xs sm:text-sm text-[#271e20] placeholder-[#a69894] border border-[#c96f8e]/25 focus:border-[#8e3f5c] rounded-full shadow-sm outline-none transition-all focus:ring-2 focus:ring-[#c96f8e]/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6e5f64] hover:text-[#271e20] p-0.5 rounded-full"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ─── CATEGORY TAB PILLS (Horizontal, Compact, Zero Bloat) ─── */}
        {!isSearchActive && (
          <div className="relative flex items-center">
            {/* Scroll Left Button */}
            <button
              onClick={() => scrollTabs("left")}
              className="hidden md:flex absolute -left-3.5 z-10 w-8 h-8 rounded-full bg-white/95 border border-[#c96f8e]/30 text-[#8e3f5c] shadow-md items-center justify-center hover:bg-[#8e3f5c] hover:text-white transition-all cursor-pointer"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Scrollable Tabs Container */}
            <div
              ref={tabsScrollRef}
              role="tablist"
              aria-label="Service Categories"
              className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar scroll-smooth w-full py-1 px-0.5"
            >
              {categories.map((cat) => {
                const isSelected = activeCategorySlug === cat.slug;
                const minDollars = (cat.minPriceCents / 100).toFixed(0);
                const IconComponent = CATEGORY_META[cat.slug]?.icon || Sparkles;

                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleTabClick(cat.slug)}
                    className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-medium whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0 ${isSelected
                        ? "bg-gradient-to-r from-[#8e3f5c] to-[#c96f8e] text-white shadow-[0_6px_20px_rgba(142,63,92,0.3)] ring-2 ring-[#8e3f5c]/40 font-semibold scale-[1.02]"
                        : "bg-white/85 text-[#271e20] border border-[#c96f8e]/20 hover:border-[#c96f8e]/60 hover:bg-white hover:text-[#8e3f5c] shadow-sm"
                      }`}
                  >
                    <IconComponent
                      className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-[#c96f8e]"
                        }`}
                    />
                    <span>{cat.name}</span>
                    <span
                      className={`text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full ${isSelected
                          ? "bg-white/20 text-white font-medium"
                          : "bg-[#f8f4f1] text-[#6e5f64] font-normal"
                        }`}
                    >
                      from ${minDollars}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Scroll Right Button */}
            <button
              onClick={() => scrollTabs("right")}
              className="hidden md:flex absolute -right-3.5 z-10 w-8 h-8 rounded-full bg-white/95 border border-[#c96f8e]/30 text-[#8e3f5c] shadow-md items-center justify-center hover:bg-[#8e3f5c] hover:text-white transition-all cursor-pointer"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ─── LIVE SEARCH RESULTS VIEW (Instant Feedback) ─── */}
        {isSearchActive ? (
          <div className="bg-white/90 backdrop-blur-md rounded-[2rem] p-6 sm:p-8 border border-[#c96f8e]/20 shadow-xl space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#c96f8e]/15 gap-2">
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#8e3f5c] tracking-widest">
                  Live Search Results
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#271e20]">
                  Found {searchResults.length} treatment{searchResults.length === 1 ? "" : "s"} matching &ldquo;{searchQuery}&rdquo;
                </h3>
              </div>
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-[#8e3f5c] hover:underline font-semibold self-start sm:self-auto flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear Search</span>
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <p className="text-sm text-[#5e5055]">
                  No services matched &ldquo;{searchQuery}&rdquo;.
                </p>
                <p className="text-xs text-[#a69894]">
                  Try searching for keywords like <button onClick={() => setSearchQuery("brow")} className="text-[#8e3f5c] underline">brow</button>,{" "}
                  <button onClick={() => setSearchQuery("wax")} className="text-[#8e3f5c] underline">wax</button>,{" "}
                  <button onClick={() => setSearchQuery("facial")} className="text-[#8e3f5c] underline">facial</button>, or{" "}
                  <button onClick={() => setSearchQuery("head spa")} className="text-[#8e3f5c] underline">head spa</button>.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {searchResults.map((srv) => {
                  const formattedPrice = `$${(srv.listPriceCents / 100).toFixed(0)}${srv.priceIsFrom ? "+" : ""
                    }`;
                  const highlight = SERVICE_HIGHLIGHTS[srv.slug];
                  const duration = srv.durationMin
                    ? `${srv.durationMin} mins`
                    : highlight?.duration || "15-30 mins";
                  const note = srv.description || highlight?.note;

                  return (
                    <div
                      key={srv.id}
                      onClick={() => onSelectService(srv.slug)}
                      className="p-4 rounded-xl border border-[#c96f8e]/15 bg-[#fffdfc] hover:bg-[#fff7f9] hover:border-[#c96f8e]/60 transition-all cursor-pointer group flex flex-col justify-between space-y-3 shadow-xs hover:shadow-md"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#f8f4f1] text-[#8e3f5c]">
                            {srv.categoryName}
                          </span>
                          <span className="font-serif font-bold text-base text-[#8e3f5c]">
                            {formattedPrice}
                          </span>
                        </div>
                        <h4 className="font-serif text-[15px] sm:text-base font-medium text-[#271e20] group-hover:text-[#8e3f5c] transition-colors leading-snug">
                          {srv.name}
                        </h4>
                        {note && (
                          <p className="text-xs text-[#6e5f64] font-light line-clamp-2">
                            {note}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#c96f8e]/10 text-xs">
                        <span className="text-[#6e5f64] flex items-center gap-1 text-[11px]">
                          <Clock className="w-3 h-3 text-[#c96f8e]" />
                          {duration}
                        </span>
                        <span className="text-[11px] font-semibold text-[#8e3f5c] group-hover:underline flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Reserve</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* ─── OPTIMIZED STUDIO MASTER-DETAIL SHOWCASE ─── */
          <div className="space-y-6">
            {/* Mobile Category Spotlight Banner (Compact, streamlined for instant list visibility) */}
            <div className="lg:hidden relative h-24 sm:h-28 w-full rounded-2xl overflow-hidden shadow-md border border-white/60">
              <Image
                src={currentMeta.image}
                alt={currentMeta.title}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35 z-10" />
              <div className="relative z-20 h-full p-3.5 sm:p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-white/20 backdrop-blur-md text-white">
                    {currentMeta.badge}
                  </span>
                  <span className="text-xs font-semibold text-white bg-[#8e3f5c]/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                    From ${(activeCategory.minPriceCents / 100).toFixed(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-normal text-white leading-tight">
                    {activeCategory.name}
                  </h3>
                  <p className="text-[11px] text-white/85 line-clamp-1 mt-0.5">
                    {currentMeta.headline}
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop & Tablet Studio Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* ─── LEFT: CATEGORY SPOTLIGHT CARD (Desktop Only, Fits within 500px Viewport) ─── */}
              <div className="hidden lg:flex lg:col-span-4 flex-col">
                <div className="relative h-[490px] w-full rounded-[2rem] overflow-hidden border border-[#c96f8e]/30 shadow-xl flex flex-col justify-between p-7 text-white group">
                  {/* Full-bleed category photography */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={currentMeta.image}
                      alt={currentMeta.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/25 z-10 pointer-events-none" />
                  </div>

                  {/* Top Badges */}
                  <div className="relative z-20 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/20 backdrop-blur-md text-white tracking-wider uppercase border border-white/30">
                      <Sparkles className="w-3 h-3 text-[#f8b4c6]" />
                      {currentMeta.badge}
                    </span>
                    <span className="text-xs font-medium text-white/90">
                      {activeCategory.services.length} Rituals
                    </span>
                  </div>

                  {/* Bottom Editorial Category Content */}
                  <div className="relative z-20 space-y-4">
                    <div className="space-y-1.5 text-left">
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-[#f8b4c6]">
                        Salon Ritual
                      </span>
                      <h3 className="font-display text-2xl xl:text-3xl font-normal text-white tracking-tight leading-tight">
                        {activeCategory.name}
                      </h3>
                      <p className="text-xs text-white/90 leading-relaxed font-light">
                        {currentMeta.description}
                      </p>
                    </div>

                    {/* Quick Metric Pills */}
                    <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-xl border border-white/25">
                          <span className="text-[10px] text-white/70 block uppercase font-medium">Starting</span>
                          <span className="font-serif font-bold text-base text-white">
                            ${(activeCategory.minPriceCents / 100).toFixed(0)}
                          </span>
                        </div>
                        <div className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-xl border border-white/25">
                          <span className="text-[10px] text-white/70 block uppercase font-medium">Duration</span>
                          <span className="text-xs font-semibold text-white">
                            {currentMeta.defaultDuration}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectService(activeCategory.services[0]?.slug)}
                        className="p-3 rounded-full bg-[#8e3f5c] hover:bg-[#a64a6d] text-white shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center justify-center"
                        aria-label={`Reserve ${activeCategory.name}`}
                        title="Book first available ritual"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── RIGHT: COMPACT, HIGH-USABILITY SERVICE MENU ─── */}
              <div className="lg:col-span-8 flex flex-col">
                <div className="bg-white/95 rounded-[2rem] p-5 sm:p-7 border border-[#c96f8e]/20 shadow-xl flex flex-col justify-between h-auto lg:h-[490px]">
                  {/* Menu Header Bar */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-[#c96f8e]/15">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#8e3f5c]" />
                      <h4 className="font-display text-lg sm:text-xl font-normal text-[#271e20]">
                        {activeCategory.name} Rituals
                      </h4>
                      <span className="text-xs text-[#6e5f64] font-normal">
                        ({activeCategory.services.length} items)
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#8e3f5c] bg-[#8e3f5c]/10 px-2.5 py-1 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Verified In-Salon Pricing</span>
                      <span className="sm:hidden">Verified</span>
                    </div>
                  </div>

                  {/* Services List / Grid (Scrollable on desktop, clean on mobile) */}
                  <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 py-3 space-y-2.5 luxury-scrollbar lg:max-h-[360px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {displayedServices.map((srv) => {
                        const formattedPrice = `$${(srv.listPriceCents / 100).toFixed(0)}${srv.priceIsFrom ? "+" : ""
                          }`;
                        const highlight = SERVICE_HIGHLIGHTS[srv.slug];
                        const duration = srv.durationMin
                          ? `${srv.durationMin} mins`
                          : highlight?.duration || currentMeta.defaultDuration;
                        const note = srv.description || highlight?.note;

                        return (
                          <div
                            key={srv.id}
                            onClick={() => onSelectService(srv.slug)}
                            className="p-3 sm:p-3.5 rounded-xl border border-[#c96f8e]/15 bg-[#fffdfc] hover:bg-[#fff7f9] hover:border-[#c96f8e]/60 transition-all cursor-pointer group flex flex-col justify-between space-y-2 shadow-xs hover:shadow-sm"
                          >
                            <div className="space-y-1">
                              <div className="flex items-start justify-between gap-2">
                                <h5 className="font-serif text-[14px] sm:text-[15px] font-medium text-[#271e20] group-hover:text-[#8e3f5c] transition-colors leading-snug">
                                  {srv.name}
                                </h5>
                                <span className="font-serif font-bold text-sm sm:text-base text-[#8e3f5c] shrink-0 bg-[#8e3f5c]/5 px-2 py-0.5 rounded-md">
                                  {formattedPrice}
                                </span>
                              </div>
                              {note && (
                                <p className="text-[11px] sm:text-xs text-[#6e5f64] font-light line-clamp-1">
                                  {note}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center justify-between pt-1.5 border-t border-[#c96f8e]/10 text-xs">
                              <span className="text-[#6e5f64] flex items-center gap-1 text-[11px]">
                                <Clock className="w-3 h-3 text-[#c96f8e]" />
                                {duration}
                              </span>

                              <span className="text-[11px] font-semibold text-[#8e3f5c] group-hover:underline flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>Reserve</span>
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Mobile Expand Button (When > 6 services in category) */}
                    {activeServices.length > 6 && (
                      <div className="lg:hidden pt-2 text-center">
                        <button
                          type="button"
                          onClick={() => setShowAllMobile(!showAllMobile)}
                          className="w-full py-2.5 rounded-xl bg-[#f8f4f1] hover:bg-[#f1ebe5] border border-[#c96f8e]/20 text-xs font-semibold text-[#8e3f5c] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {showAllMobile ? (
                            <>
                              <ChevronUp className="w-3.5 h-3.5" />
                              <span>Show Top Services Only</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3.5 h-3.5" />
                              <span>
                                View All {activeServices.length} {activeCategory.name} Rituals (+{activeServices.length - 6} more)
                              </span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Menu Footer Reassurance Strip */}
                  <div className="pt-3 border-t border-[#c96f8e]/15 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[#6e5f64] gap-2">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#8e3f5c]" />
                      Organic & hypoallergenic formulas · Licensed estheticians
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectService(activeCategory.services[0]?.slug)}
                      className="text-[#8e3f5c] font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto"
                    >
                      <span>Book Consultation</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
