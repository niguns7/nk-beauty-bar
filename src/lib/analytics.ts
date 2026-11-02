/**
 * Client & Server Analytics Helper for BLUSH
 * Dispatches events to window.dataLayer / window.gtag if available, otherwise logs to console in development.
 */

export interface AnalyticsEventMap {
  quote_created: {
    quoteId?: string;
    subtotalCents: number;
    discountCents: number;
    totalCents: number;
    itemCount: number;
    offerCode?: string;
  };
  booking_handoff: {
    quoteId: string;
    totalCents: number;
    campaign?: string;
  };
}

export function trackEvent<K extends keyof AnalyticsEventMap>(
  event: K,
  payload: AnalyticsEventMap[K]
) {
  if (typeof window !== "undefined") {
    const customWindow = window as unknown as {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
    };

    if (customWindow.gtag) {
      customWindow.gtag("event", event, payload);
    } else if (customWindow.dataLayer) {
      customWindow.dataLayer.push({ event, ...payload });
    } else if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics Event: ${event}]`, payload);
    }
  } else if (process.env.NODE_ENV === "development") {
    console.log(`[Server Analytics Event: ${event}]`, payload);
  }
}
