// Lightweight, typed wrapper over gtag for conversion events. Safely no-ops
// when analytics hasn't loaded — during SSR, or before the GA4 id is set — so
// call sites never need to guard. Events show up in GA4 once NEXT_PUBLIC_GA4_ID
// is configured (see components/global/analytics.tsx).

type Primitive = string | number | boolean | undefined;
export type TrackParams = Record<string, Primitive>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** The conversion events we care about across the funnel. */
export type AnalyticsEvent =
  | "book_now_open" // opened the property picker from a "Book Direct" CTA
  | "booking_handoff" // clicked through to Nightsbridge for a specific property
  | "enquiry_submit" // submitted the contact/enquiry form
  | "whatsapp_click" // opened a WhatsApp conversation
  | "call_click" // tapped a call button (reservation hotline)
  | "tour_enquiry_click" // clicked "Book This Tour" through to the enquiry form
  | "rescue_shown" // came back from Nightsbridge and was offered the hotline
  | "rescue_call" // took the call offer on the way back from Nightsbridge
  | "rescue_whatsapp" // took the WhatsApp offer on the way back
  | "rescue_dismiss" // closed the rescue panel without taking it
  | "callback_open" // opened the out-of-hours callback form
  | "callback_submit"; // submitted a callback request

export function track(event: AnalyticsEvent, params?: TrackParams): void {
  if (typeof window === "undefined") return;
  const { gtag } = window;
  if (typeof gtag !== "function") return;
  gtag("event", event, params ?? {});
}
