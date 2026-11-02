import { z } from "zod";

export const quoteItemSchema = z.object({
  type: z.enum(["service", "bundle"]),
  slug: z.string(),
  qty: z.number().int().min(1).max(5).default(1).optional(),
  picks: z.array(z.string()).optional(),
});

export const quoteRequestSchema = z
  .object({
    items: z.array(quoteItemSchema).min(1),
    offerCode: z.string().optional(),
    isFirstVisit: z.boolean().optional(),
    clientRef: z.string().optional(),
    utm: z.record(z.string(), z.unknown()).optional(),
  })
  .passthrough();

export type QuoteItemInput = z.infer<typeof quoteItemSchema>;
export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

export interface QuoteLine {
  type: "service" | "bundle" | "addon";
  slug: string;
  name: string;
  qty: number;
  listCents: number;
  finalCents: number;
  unitPriceCents: number;
  discountable: boolean;
  priceIsFrom?: boolean;
  picks?: string[];
  note?: string;
}

export interface AppliedOfferSummary {
  id: string;
  code: string;
  name: string;
  description: string;
  kind: string;
  discountCents: number;
}

export interface BonusSummary {
  code: string;
  name: string;
  description: string;
  kind: string;
  details?: Record<string, unknown> | null;
}

export interface PricingEngineResult {
  lines: QuoteLine[];
  subtotalCents: number;
  discountCents: number;
  totalCents: number;
  savingsPct: number;
  hasFromPrice: boolean;
  appliedOffer: AppliedOfferSummary | null;
  bonuses: BonusSummary[];
  notes: string[];
}
