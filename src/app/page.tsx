"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { MinimalistHero } from "@/components/MinimalistHero";
import { SignatureServices } from "@/components/SignatureServices";
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

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceName?: string) => {
    setSelectedService(serviceName);
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
    setSelectedService(undefined);
  };

  return (
    <div className="min-h-screen bg-[#f8f4f1] text-[#271e20] flex flex-col relative selection:bg-[#e89ab2]/30 selection:text-[#8e3f5c]">
      {/* ─── FLOATING & SCROLL-ADAPTIVE HEADER NAVBAR ─── */}
      <Navbar onOpenBooking={handleOpenBooking} />

      <main className="flex-1 flex flex-col w-full overflow-x-hidden">
        {/* Section 1: Hero */}
        <MinimalistHero onOpenBooking={handleOpenBooking} />

        {/* Section 2: Signature Services Lookbook */}
        <SignatureServices onSelectService={handleOpenBooking} />

        {/* Section 3: Why Choose BLUSH (The BLUSH Difference) */}
        <WhyBlush />

        {/* Section 4: Meet the Owner (4th Section) */}
        <OwnerSection onOpenBooking={() => handleOpenBooking("Owner Consultation")} />

        {/* Section 5: The BLUSH Experience (3-Step Sequence) */}
        <BlushExperience onOpenBooking={() => handleOpenBooking()} />

        {/* Section 6: Results Gallery (Filtered Masonry + Lightbox) */}
        <ResultsGallery onOpenBooking={() => handleOpenBooking("Gallery Selection")} />

        {/* Section 7: Featured Beauty Ritual (Campaign Section) */}
        <FeaturedRitual onOpenBooking={handleOpenBooking} />

        {/* Section 8: Client Reviews (Client Love Carousel) */}
        <ClientReviews />

        {/* Section 9: Visit the Beauty Bar (Location & Interactive Map Preview) */}
        <LocationSection onOpenBooking={() => handleOpenBooking()} />

        {/* Section 10: Social Proof Gallery (Behind the Chair Marquee) */}
        <SocialProofStrip />

        {/* Section 11: Final Booking CTA */}
        <FinalCTA onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Section 12: Footer */}
      <Footer />

      {/* Mobile Bottom Sticky Call-and-Book Bar */}
      <MobileBookingBar onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Reservation Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={handleCloseBooking}
        initialService={selectedService}
      />
    </div>
  );
}
