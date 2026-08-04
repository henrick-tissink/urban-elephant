// Every "Book Direct" CTA hands the guest off to Nightsbridge in a new tab,
// which means our tab survives underneath. We remember that a handoff happened
// so <BookingRescue> can offer the hotline when the guest comes back to us —
// they're returning from a checkout they didn't finish, and at that moment a
// human on the phone converts far better than a second attempt at the widget.

import { track } from "@/lib/analytics";

const HANDOFF_KEY = "ue:booking-handoff";
const RESCUE_KEY = "ue:rescue-shown";

/** Returning inside this window reads as a misclick, not an abandoned checkout. */
export const RESCUE_MIN_AWAY_MS = 3_000;
/** After this long the trail is cold — they've moved on, don't ambush them. */
export const RESCUE_MAX_AWAY_MS = 30 * 60_000;

export type BookingHandoff = {
  /** Property they were trying to book, when we know it. */
  property?: string;
  /** Which CTA sent them (picker / property_page / property_sticky). */
  source: string;
  /** Epoch ms at the moment they left. */
  at: number;
};

/**
 * Call from every Nightsbridge click-through. Fires the GA4 conversion event
 * and leaves the breadcrumb the rescue panel looks for.
 */
export function recordBookingHandoff(details: {
  property?: string;
  source: string;
}): void {
  track("booking_handoff", {
    property: details.property,
    source: details.source,
  });

  if (typeof window === "undefined") return;
  try {
    const handoff: BookingHandoff = { ...details, at: Date.now() };
    window.sessionStorage.setItem(HANDOFF_KEY, JSON.stringify(handoff));
  } catch {
    // Private mode / storage disabled — we simply lose the rescue, not the click.
  }
}

export function readBookingHandoff(): BookingHandoff | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(HANDOFF_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as BookingHandoff;
    return typeof parsed?.at === "number" ? parsed : null;
  } catch {
    return null;
  }
}

export function clearBookingHandoff(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(HANDOFF_KEY);
  } catch {
    // no-op
  }
}

/** The rescue is a once-per-session offer — twice is nagging. */
export function hasSeenRescue(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.sessionStorage.getItem(RESCUE_KEY) === "1";
  } catch {
    return true;
  }
}

export function markRescueSeen(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(RESCUE_KEY, "1");
  } catch {
    // no-op
  }
}
