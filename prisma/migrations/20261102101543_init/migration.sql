-- CreateEnum
CREATE TYPE "OfferKind" AS ENUM ('PERCENT_OFF', 'AMOUNT_OFF', 'FREE_ADDON', 'BONUS_CARD', 'POINTS_MULTIPLIER', 'INFO');

-- CreateEnum
CREATE TYPE "OfferScope" AS ENUM ('BUNDLE_ONLY', 'FIRST_VISIT', 'OFF_PEAK', 'GIFT_CARD', 'LOYALTY', 'ANY_ELIGIBLE');

-- CreateEnum
CREATE TYPE "BundleKind" AS ENUM ('FIXED', 'BUILD_YOUR_OWN');

-- CreateTable
CREATE TABLE "ServiceCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ServiceCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "durationMin" INTEGER,
    "listPriceCents" INTEGER NOT NULL,
    "priceIsFrom" BOOLEAN NOT NULL DEFAULT false,
    "discountable" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "priceVerified" BOOLEAN NOT NULL DEFAULT true,
    "vagaroServiceId" TEXT,
    "vagaroUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bundle" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT,
    "audience" TEXT,
    "kind" "BundleKind" NOT NULL DEFAULT 'FIXED',
    "pickCount" INTEGER,
    "discountPct" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "activeFrom" TIMESTAMP(3),
    "activeTo" TIMESTAMP(3),
    "daysOfWeek" INTEGER[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "vagaroServiceId" TEXT,
    "vagaroUrl" TEXT,
    "vagaroPriceCents" INTEGER,
    "reconciledAt" TIMESTAMP(3),

    CONSTRAINT "Bundle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BundleItem" (
    "bundleId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "BundleItem_pkey" PRIMARY KEY ("bundleId","serviceId")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "kind" "OfferKind" NOT NULL,
    "scope" "OfferScope" NOT NULL,
    "percentOff" INTEGER,
    "amountOffCents" INTEGER,
    "freeServiceId" TEXT,
    "params" JSONB,
    "minSpendCents" INTEGER,
    "daysOfWeek" INTEGER[],
    "requiresCode" BOOLEAN NOT NULL DEFAULT false,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "maxRedemptionsTotal" INTEGER,
    "maxRedemptionsPerClient" INTEGER,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "inputHash" TEXT NOT NULL,
    "linesJson" JSONB NOT NULL,
    "subtotalCents" INTEGER NOT NULL,
    "discountCents" INTEGER NOT NULL,
    "totalCents" INTEGER NOT NULL,
    "hasFromPrice" BOOLEAN NOT NULL DEFAULT false,
    "appliedOfferId" TEXT,
    "bonusesJson" JSONB,
    "notesJson" JSONB,
    "utmJson" JSONB,
    "clientRef" TEXT,
    "handedOffAt" TIMESTAMP(3),
    "vagaroUrl" TEXT,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferRedemption" (
    "id" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "clientRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OfferRedemption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceAudit" (
    "id" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "oldValue" TEXT,
    "newValue" TEXT NOT NULL,
    "changedBy" TEXT NOT NULL,
    "at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PriceAudit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppConfig" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "AppConfig_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceCategory_slug_key" ON "ServiceCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Bundle_slug_key" ON "Bundle"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Offer_code_key" ON "Offer"("code");

-- CreateIndex
CREATE UNIQUE INDEX "OfferRedemption_offerId_quoteId_key" ON "OfferRedemption"("offerId", "quoteId");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ServiceCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BundleItem" ADD CONSTRAINT "BundleItem_bundleId_fkey" FOREIGN KEY ("bundleId") REFERENCES "Bundle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BundleItem" ADD CONSTRAINT "BundleItem_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferRedemption" ADD CONSTRAINT "OfferRedemption_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Check Constraints
ALTER TABLE "Service" ADD CONSTRAINT "chk_service_list_price" CHECK ("listPriceCents" > 0);
ALTER TABLE "Bundle" ADD CONSTRAINT "chk_bundle_discount_pct" CHECK ("discountPct" BETWEEN 0 AND 15);
ALTER TABLE "Offer" ADD CONSTRAINT "chk_offer_percent_off" CHECK ("percentOff" IS NULL OR ("percentOff" BETWEEN 0 AND 15));

