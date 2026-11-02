"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { MinimalistHero } from "@/components/MinimalistHero";
import { SignatureServices } from "@/components/SignatureServices";
import { BundlesSection } from "@/components/BundlesSection";
import { WhyBlush } from "@/components/WhyBlush";
import { OwnerSection } from "@/components/OwnerSection";
import { BlushExperience } from "@/components/BlushExperience";
import { ResultsGallery } from "@/components/ResultsGallery";
import { FeaturedRitual } from "@/components/FeaturedRitual";
import { ClientReviews } from "@/components/ClientReviews";
import { LocationSection } from "@/components/LocationSection";
import { SocialProofStrip } from "@/components/SocialProofStrip";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { MobileBookingBar } from "@/components/MobileBookingBar";
import { BookingModal } from "@/components/BookingModal";
import { CatalogData } from "@/lib/catalog";

function UrlPreselectWatcher({
  onPreselectService,
  onPreselectBundle,
}: {
  onPreselectService: (slug: string) => void;
  onPreselectBundle: (slug: string) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const serviceSlug = searchParams.get("service");
    const bundleSlug = searchParams.get("bundle");

    if (bundleSlug) {
      onPreselectBundle(bundleSlug);
    } else if (serviceSlug) {
      onPreselectService(serviceSlug);
    }
  }, [searchParams, onPreselectService, onPreselectBundle]);

  return null;
}

export function HomeClient({ catalog }: { catalog: CatalogData }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [selectedBundle, setSelectedBundle] = useState<string | undefined>(undefined);

  const handleOpenServiceBooking = (serviceSlug?: string) => {
    setSelectedBundle(undefined);
    setSelectedService(serviceSlug);
    setBookingOpen(true);
  };

  const handleOpenBundleBooking = (bundleSlug: string) => {
    setSelectedService(undefined);
    setSelectedBundle(bundleSlug);
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
    setSelectedService(undefined);
    setSelectedBundle(undefined);
  };

  // Gift Card Promo calculation for FeaturedRitual
  const gcBonusOffer = catalog.offers.find((o) => o.code === "GC_BONUS");
  const now = new Date();
  const giftCardPromo = gcBonusOffer
    ? {
        active:
          gcBonusOffer.isActive &&
          now.getTime() >= new Date(gcBonusOffer.startsAt).getTime() &&
          now.getTime() <= new Date(gcBonusOffer.endsAt).getTime(),
        tiers: (gcBonusOffer.params as any)?.tiers || [],
        bonusValidFrom: (gcBonusOffer.params as any)?.bonusValidFrom,
        bonusValidTo: (gcBonusOffer.params as any)?.bonusValidTo,
      }
    : null;

  return (
    <div className="min-h-screen bg-[#f8f4f1] text-[#271e20] flex flex-col relative selection:bg-[#e89ab2]/30 selection:text-[#8e3f5c]">
      <Suspense fallback={null}>
        <UrlPreselectWatcher
          onPreselectService={handleOpenServiceBooking}
          onPreselectBundle={handleOpenBundleBooking}
        />
      </Suspense>

      {/* Floating Header */}
      <Navbar onOpenBooking={() => handleOpenServiceBooking()} />

      <main className="flex-1 flex flex-col w-full overflow-x-hidden">
        {/* Section 1: Hero */}
        <MinimalistHero onOpenBooking={() => handleOpenServiceBooking()} />

        {/* Section 2: Signature Services with verified database prices */}
        <SignatureServices
          categories={catalog.categories}
          onSelectService={handleOpenServiceBooking}
        />

        {/* Section 2.5: Bundles Section (always-on first, seasonal if active) */}
        <BundlesSection
          bundles={catalog.bundles}
          onSelectBundle={handleOpenBundleBooking}
        />

        {/* Section 3: Why Choose BLUSH */}
        <WhyBlush />

        {/* Section 4: Meet the Owner */}
        <OwnerSection onOpenBooking={() => handleOpenServiceBooking()} />

        {/* Section 5: The BLUSH Experience */}
        <BlushExperience onOpenBooking={() => handleOpenServiceBooking()} />

        {/* Section 6: Results Gallery */}
        <ResultsGallery onOpenBooking={() => handleOpenServiceBooking()} />

        {/* Section 7: Featured Beauty Ritual (Holiday Ready -> Party Glam -> Gift Cards) */}
        <FeaturedRitual
          featuredBundle={catalog.featuredBundle}
          giftCardPromo={giftCardPromo}
          onOpenBooking={(slugOrName) => {
            if (catalog.bundles.some((b) => b.slug === slugOrName)) {
              handleOpenBundleBooking(slugOrName!);
            } else {
              handleOpenServiceBooking(slugOrName);
            }
          }}
        />

        {/* Section 8: Client Reviews */}
        <ClientReviews />

        {/* Section 9: Visit the Beauty Bar (Location & Interactive Map Preview) */}
        <LocationSection onOpenBooking={() => handleOpenServiceBooking()} />

        {/* Section 10: Social Proof Strip */}
        <SocialProofStrip />

        {/* Section 11: Final Booking CTA */}
        <FinalCTA onOpenBooking={() => handleOpenServiceBooking()} />
      </main>

      {/* Section 12: Footer */}
      <Footer />

      {/* Mobile Sticky Booking Bar */}
      <MobileBookingBar onOpenBooking={() => handleOpenServiceBooking()} />

      {/* Database-backed Interactive Cart & Booking Engine Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={handleCloseBooking}
        initialService={selectedService}
        initialBundle={selectedBundle}
        categories={catalog.categories}
        bundles={catalog.bundles}
      />
    </div>
  );
}
