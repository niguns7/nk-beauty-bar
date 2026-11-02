import { NextRequest, NextResponse } from "next/server";
import { calculateQuote } from "@/lib/pricing/engine";

export const runtime = "nodejs";

// In-memory rate limiter: ~30 requests per minute per IP
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const ipRateLimits = new Map<string, RateLimitRecord>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const limit = ipRateLimits.get(ip);

  if (!limit || now > limit.resetAt) {
    ipRateLimits.set(ip, { count: 1, resetAt: now + 60 * 1000 });
    return false;
  }

  limit.count += 1;
  return limit.count > 30;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many quote requests. Please wait a moment." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const result = await calculateQuote(body, { persist: true });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to calculate quote" },
      { status: 400 }
    );
  }
}

