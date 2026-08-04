"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/atoms/whatsapp-icon";
import { track } from "@/lib/analytics";
import {
  PHONE_E164,
  PHONE_DISPLAY,
  whatsappLink,
  isHotlineOpen,
} from "@/lib/contact";
import {
  RESCUE_MAX_AWAY_MS,
  RESCUE_MIN_AWAY_MS,
  clearBookingHandoff,
  hasSeenRescue,
  markRescueSeen,
  readBookingHandoff,
} from "@/lib/booking-handoff";

/**
 * Catches the guest on their way back from Nightsbridge.
 *
 * Roughly 700 people a month reach the Nightsbridge booking engine from this
 * site and only a handful come out the other side as bookings. Because every
 * "Book Direct" CTA opens Nightsbridge in a new tab, our tab is still sitting
 * there when they give up — so the moment this one becomes visible again we
 * offer the one booking channel we control end to end: a human on the phone.
 *
 * We can't see whether they actually booked (different domain), so the copy is
 * phrased to be harmless either way and the panel is easy to dismiss. Shown at
 * most once per session, and never for a return so fast it was clearly a
 * misclick.
 */
export function BookingRescue() {
  const t = useTranslations("rescue");
  const [handoff, setHandoff] = useState<{ property?: string } | null>(null);

  const dismiss = useCallback(
    (reason: "dismiss" | "call" | "whatsapp") => {
      if (reason === "dismiss") track("rescue_dismiss");
      clearBookingHandoff();
      setHandoff(null);
    },
    [],
  );

  useEffect(() => {
    const consider = () => {
      if (document.visibilityState !== "visible") return;
      if (hasSeenRescue()) return;

      const pending = readBookingHandoff();
      if (!pending) return;

      const away = Date.now() - pending.at;
      // Straight back = they never left. Long gone = the moment has passed.
      if (away < RESCUE_MIN_AWAY_MS) return;
      if (away > RESCUE_MAX_AWAY_MS) {
        clearBookingHandoff();
        return;
      }

      markRescueSeen();
      track("rescue_shown", {
        property: pending.property,
        source: pending.source,
        away_seconds: Math.round(away / 1000),
      });
      setHandoff({ property: pending.property });
    };

    // Also check on mount, not just on the tab regaining focus. Some in-app
    // browsers (Instagram, Facebook) follow the "new tab" in place rather than
    // opening one, so the guest comes back via a fresh page load and no
    // visibility change ever fires — the breadcrumb in sessionStorage is the
    // only trace left of the handoff.
    consider();

    document.addEventListener("visibilitychange", consider);
    window.addEventListener("focus", consider);
    return () => {
      document.removeEventListener("visibilitychange", consider);
      window.removeEventListener("focus", consider);
    };
  }, []);

  // While the rescue is up, stand the hotline buttons down — the panel already
  // carries Call and WhatsApp, and two overlapping offers in the same corner
  // read as clutter (see globals.css).
  useEffect(() => {
    const root = document.documentElement;
    if (handoff) root.setAttribute("data-rescue-open", "");
    else root.removeAttribute("data-rescue-open");
    return () => root.removeAttribute("data-rescue-open");
  }, [handoff]);

  const open = isHotlineOpen();
  const waMessage = handoff?.property
    ? t("whatsappMessageProperty", { property: handoff.property })
    : t("whatsappMessage");

  return (
    <AnimatePresence>
      {handoff && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          role="dialog"
          aria-labelledby="rescue-title"
          className="fixed bottom-4 left-4 right-4 z-[70] sm:right-auto sm:bottom-6 sm:left-6 sm:max-w-sm print:hidden"
        >
          <div className="relative rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5">
            <button
              type="button"
              onClick={() => dismiss("dismiss")}
              aria-label={t("close")}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-black/5 hover:text-[#24272a]"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-brand-anchor)]">
              {t("eyebrow")}
            </p>
            <h2
              id="rescue-title"
              className="pr-6 text-xl leading-tight tracking-tight text-[#24272a]"
            >
              {handoff.property
                ? t("titleProperty", { property: handoff.property })
                : t("title")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-500">
              {open === false ? t("bodyClosed") : t("body")}
            </p>

            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={`tel:${PHONE_E164}`}
                onClick={() => {
                  track("rescue_call", { property: handoff.property });
                  dismiss("call");
                }}
                className="flex items-center justify-center gap-2.5 rounded-full bg-[var(--color-brand-anchor)] px-5 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg transition-transform duration-200 hover:scale-[1.02] active:scale-95"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                {t("call", { number: PHONE_DISPLAY })}
              </a>
              <a
                href={whatsappLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  track("rescue_whatsapp", { property: handoff.property });
                  dismiss("whatsapp");
                }}
                className="flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg transition-transform duration-200 hover:scale-[1.02] active:scale-95"
              >
                <WhatsAppIcon className="h-4 w-4 flex-shrink-0" />
                {t("whatsapp")}
              </a>
              <button
                type="button"
                onClick={() => dismiss("dismiss")}
                className="pt-1 text-xs text-stone-400 transition-colors hover:text-stone-600"
              >
                {t("decline")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
