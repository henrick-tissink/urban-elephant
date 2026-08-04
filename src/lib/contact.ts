// Reservations contact details (Niles): office line + a WhatsApp line for
// bookings, tours and upsell. International format for tel:/wa.me, plus a
// display form for the places where the number should read as a number rather
// than an icon. Hours 08:30–20:00 SAST (UTC+2, no DST).

/** tel: target — international format. */
export const PHONE_E164 = "+27213001044";
/** How the number is printed on the page. Keep in step with the Google Business Profile. */
export const PHONE_DISPLAY = "021 300 1044";
/** wa.me target — international, no plus. */
export const WHATSAPP_E164 = "27820097621";
/** How the WhatsApp number is printed on the page. */
export const WHATSAPP_DISPLAY = "082 009 7621";

/** Minutes past midnight, SAST. */
export const HOTLINE_OPEN_MIN = 8 * 60 + 30; // 08:30
export const HOTLINE_CLOSE_MIN = 20 * 60; // 20:00

/**
 * A wa.me link pre-filled with what we already know. An agent opening a
 * conversation that names the property (and later, the dates) can answer
 * straight away instead of starting from scratch.
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(message)}`;
}

/**
 * The property the visitor is currently looking at, if any. The hotline lives
 * in the root layout — above the page in the tree — so a React context set by
 * a property page can't reach it. The property page publishes its name on the
 * body instead (same trick as `data-booking-bar`), and the hotline reads it.
 */
export function currentPropertyName(): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.body.dataset.propertyName || undefined;
}

/** Is the reservations desk staffed right now? `null` until we know (pre-hydration). */
export function isHotlineOpen(now: Date = new Date()): boolean | null {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Johannesburg",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(now);
    const h = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
    const m = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
    const mins = h * 60 + m;
    return mins >= HOTLINE_OPEN_MIN && mins < HOTLINE_CLOSE_MIN;
  } catch {
    return null;
  }
}
