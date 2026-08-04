"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { WhatsAppIcon } from "@/components/atoms/whatsapp-icon";
import { CallbackRequest } from "@/components/global/callback-request";
import { track } from "@/lib/analytics";
import {
  PHONE_E164,
  PHONE_DISPLAY,
  currentPropertyName,
  isHotlineOpen,
  whatsappLink,
} from "@/lib/contact";

/**
 * Reservations hotline — the one booking channel we own end to end.
 *
 * Presented as a co-primary booking route rather than a support widget: the
 * buttons are labelled (a bare phone glyph in a circle reads as "help", not
 * "book"), the number is printed rather than hidden behind an icon, and on
 * phones it becomes a real bottom bar instead of two floating dots.
 *
 * Outside 08:30–20:00 SAST the call button becomes a callback request, so an
 * after-hours visitor turns into a lead instead of ringing an empty office.
 *
 * On property pages the sticky booking bar carries Call/WhatsApp itself, so the
 * mobile bar here stands down (see globals.css).
 */
export function ReservationHotline() {
  const t = useTranslations("hotline");
  const pathname = usePathname();

  // null until mounted (avoids hydration mismatch on the time-based state)
  const [openNow, setOpenNow] = useState<boolean | null>(null);
  const [property, setProperty] = useState<string | undefined>(undefined);
  const [callbackOpen, setCallbackOpen] = useState(false);

  useEffect(() => {
    const check = () => setOpenNow(isHotlineOpen());
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  // Re-read the property the page published whenever we navigate. Runs after
  // the page's own effects on the same commit, so the name is already there.
  useEffect(() => {
    setProperty(currentPropertyName());
  }, [pathname]);

  const waHref = whatsappLink(
    property ? t("whatsappMessageProperty", { property }) : t("whatsappMessage"),
  );

  const onWhatsApp = () =>
    track("whatsapp_click", { source: "hotline", property, page: pathname });

  const onCall = () =>
    track("call_click", { source: "hotline", property, page: pathname });

  const openCallback = () => {
    track("callback_open", { source: "hotline", property, page: pathname });
    setCallbackOpen(true);
  };

  return (
    <>
      {/* ---------- Phones: a real bottom bar, labelled and thumb-reachable ---------- */}
      <div className="reservation-hotline-bar fixed inset-x-0 bottom-0 z-[60] flex border-t border-black/5 bg-white/95 backdrop-blur sm:hidden print:hidden">
        {openNow === false ? (
          <button
            type="button"
            onClick={openCallback}
            className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-bold text-[var(--color-brand-anchor)]"
          >
            <Phone className="h-4 w-4 flex-shrink-0" />
            {t("callbackShort")}
          </button>
        ) : (
          <a
            href={`tel:${PHONE_E164}`}
            onClick={onCall}
            className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-bold text-[var(--color-brand-anchor)]"
          >
            <Phone className="h-4 w-4 flex-shrink-0" />
            {t("callShort")}
          </a>
        )}
        <span aria-hidden className="my-2.5 w-px bg-stone-200" />
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onWhatsApp}
          className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-bold text-[#128C7E]"
        >
          <WhatsAppIcon className="h-4 w-4 flex-shrink-0" />
          {t("whatsappShort")}
        </a>
      </div>

      {/* ---------- Tablet and up: labelled pills, bottom right ---------- */}
      <div className="reservation-hotline fixed bottom-5 right-5 z-[60] hidden flex-col items-end gap-3 sm:flex print:hidden">
        {openNow !== null && (
          <div className="flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] font-semibold text-[#24272a] shadow-lg ring-1 ring-black/5 backdrop-blur">
            <span className="relative flex h-2 w-2" aria-hidden>
              {openNow && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              )}
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  openNow ? "bg-green-500" : "bg-stone-400"
                }`}
              />
            </span>
            {openNow ? t("openNow") : t("hours")}
          </div>
        )}

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onWhatsApp}
          className="flex items-center gap-2.5 rounded-full bg-[#25D366] py-3 pl-4 pr-5 text-sm font-bold text-white shadow-xl transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <WhatsAppIcon className="h-5 w-5 flex-shrink-0" />
          {t("whatsapp")}
        </a>

        {openNow === false ? (
          <button
            type="button"
            onClick={openCallback}
            className="flex items-center gap-2.5 rounded-full bg-[var(--color-brand-anchor)] py-3 pl-4 pr-5 text-sm font-bold text-white shadow-xl transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <Phone className="h-5 w-5 flex-shrink-0" />
            {t("callback")}
          </button>
        ) : (
          <a
            href={`tel:${PHONE_E164}`}
            onClick={onCall}
            className="flex items-center gap-2.5 rounded-full bg-[var(--color-brand-anchor)] py-3 pl-4 pr-5 text-sm font-bold text-white shadow-xl transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <Phone className="h-5 w-5 flex-shrink-0" />
            {t("call", { number: PHONE_DISPLAY })}
          </a>
        )}
      </div>

      <CallbackRequest
        open={callbackOpen}
        onClose={() => setCallbackOpen(false)}
        property={property}
        source="hotline"
      />
    </>
  );
}
