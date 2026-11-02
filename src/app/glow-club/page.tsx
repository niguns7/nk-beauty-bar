import React from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { GlowClubClient } from "@/components/GlowClubClient";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "The Glow Club — VIP Loyalty Pass & Privileges | BLUSH NK Beauty Bar",
  description:
    "Personalize your digital VIP loyalty card. Enjoy a complimentary 10th visit treatment, every 6th eyebrow threading free, and Glow Points on every appointment.",
};

export default async function GlowClubPage() {
  // Fetch AppConfig
  let loyalty = {
    pointsPerDollar: 1,
    redeemPoints: 200,
    redeemCents: 1000,
    browClubEveryNth: 6,
  };
  let flags = {
    membershipPilot: false,
    giftCardsPage: true,
    glowClubPage: true,
  };

  try {
    const configRow = await prisma.appConfig.findUnique({ where: { key: "main" } });
    if (configRow && typeof configRow.value === "object" && configRow.value !== null) {
      const cfg = configRow.value as any;
      if (cfg.loyalty) loyalty = { ...loyalty, ...cfg.loyalty };
      if (cfg.flags) flags = { ...flags, ...cfg.flags };
    }
  } catch {
    // defaults
  }

  // Fetch relevant loyalty offers from DB
  let birthdayOffer: { name: string; description: string } | null = null;
  let rebookOffer: { name: string; description: string } | null = null;
  let referOffer: { name: string; description: string } | null = null;

  try {
    const offers = await prisma.offer.findMany({
      where: {
        scope: "LOYALTY",
        isActive: true,
      },
      orderBy: { priority: "desc" },
    });

    const b = offers.find((o) => o.code === "BIRTHDAY_FREE_LIPS");
    if (b) birthdayOffer = { name: b.name, description: b.description };

    const r = offers.find((o) => o.code === "REBOOK_2X_POINTS");
    if (r) rebookOffer = { name: r.name, description: r.description };

    const ref = offers.find((o) => o.code === "REFER_10");
    if (ref) referOffer = { name: ref.name, description: ref.description };
  } catch {
    // defaults
  }

  return (
    <GlowClubClient
      loyalty={loyalty}
      rebookOffer={rebookOffer}
      referOffer={referOffer}
      birthdayOffer={birthdayOffer}
    />
  );
}
