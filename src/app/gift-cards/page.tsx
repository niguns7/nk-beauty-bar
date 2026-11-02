import React from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SALON_DATA } from "@/config/siteContent";
import { GiftCardsClient, GiftTier } from "@/components/GiftCardsClient";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Gift Vouchers & Holiday Bonus Cards | BLUSH NK Beauty Bar",
  description:
    "Give the gift of pure self-care and relaxation. Instant digital vouchers for Japanese head spa, brow threading, facials, waxing, and hair styling in Hurst, Texas.",
};

export default async function GiftCardsPage() {
  const now = new Date();

  // Read GC_BONUS offer from database (all numbers from DB!)
  const gcBonus = await prisma.offer.findUnique({
    where: { code: "GC_BONUS" },
  });

  // Read GC_EGIFT_LASTMINUTE offer from database
  const gcEgift = await prisma.offer.findUnique({
    where: { code: "GC_EGIFT_LASTMINUTE" },
  });

  const isBonusActive = Boolean(
    gcBonus &&
      gcBonus.isActive &&
      now.getTime() >= gcBonus.startsAt.getTime() &&
      now.getTime() <= gcBonus.endsAt.getTime()
  );

  const isEgiftActive = Boolean(
    gcEgift &&
      gcEgift.isActive &&
      now.getTime() >= gcEgift.startsAt.getTime() &&
      now.getTime() <= gcEgift.endsAt.getTime()
  );

  const bonusParams = (gcBonus?.params as any) || {
    tiers: [
      { spendCents: 5000, bonusCents: 1000 },
      { spendCents: 10000, bonusCents: 2500 },
    ],
    bonusValidFrom: "2027-01-02",
    bonusValidTo: "2027-02-28",
  };

  const tiers: GiftTier[] = bonusParams.tiers || [];
  const validFrom = bonusParams.bonusValidFrom || "Jan 2, 2027";
  const validTo = bonusParams.bonusValidTo || "Feb 28, 2027";

  const vagaroUrl = process.env.VAGARO_BASE_URL || SALON_DATA.booking.vagaroUrl;

  return (
    <GiftCardsClient
      isBonusActive={isBonusActive}
      isEgiftActive={isEgiftActive}
      egiftDescription={gcEgift?.description}
      tiers={tiers}
      validFrom={validFrom}
      validTo={validTo}
      vagaroUrl={vagaroUrl}
    />
  );
}
