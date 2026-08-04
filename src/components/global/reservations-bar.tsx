"use client";

import { useEffect, useState } from "react";
import { Clock, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { WhatsAppIcon } from "@/components/atoms/whatsapp-icon";
import { track } from "@/lib/analytics";
import {
  PHONE_E164,
  PHONE_DISPLAY,
  currentPropertyName,
  isHotlineOpen,
  whatsappLink,
} from "@/lib/contact";

/**
 * The reservations line, pinned above the header on every page.
 *
 * A floating button in the bottom-right corner is where the web has agreed
 * help widgets live — no amount of labelling overrides that. Putting the
 * number in the site's chrome, permanently, is what graded hotels do and is
 * the only placement that says "there is a desk you can ring" rather than
 * "click here for support".
 *
 * Kept deliberately thin (36px) so it reads as a hotel's reservations line
 * rather than a promo banner sitting on top of the video hero.
 */
export function ReservationsBar() {
  const t = useTranslations("hotline");
  const pathname = usePathname();

  const [openNow, setOpenNow] = useState<boolean | null>(null);
  const [property, setProperty] = useState<string | undefined>(undefined);

  useEffect(() => {
    const check = () => setOpenNow(isHotlineOpen());
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setProperty(currentPropertyName());
  }, [pathname]);

  const waHref = whatsappLink(
    property ? t("whatsappMessageProperty", { property }) : t("whatsappMessage"),
  );

  return (
    <div className="reservations-bar fixed inset-x-0 top-0 z-[55] bg-[#24272a] text-white print:hidden">
      <div className="container mx-auto flex h-9 items-center justify-between gap-3 px-4 sm:px-6 lg:px-12">
        <a
          href={`tel:${PHONE_E164}`}
          onClick={() =>
            track("call_click", { source: "top_bar", property, page: pathname })
          }
          className="flex min-w-0 items-center gap-2 text-[12px] leading-none transition-colors hover:text-[var(--color-brand-mid)] sm:text-[13px]"
        >
          <span className="relative flex h-1.5 w-1.5 flex-shrink-0" aria-hidden>
            {openNow && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                openNow === null
                  ? "bg-white/30"
                  : openNow
                    ? "bg-green-500"
                    : "bg-white/35"
              }`}
            />
          </span>

          {/* "Reservations" is the word that reframes this from support to booking. */}
          <span className="hidden text-white/60 sm:inline">{t("barLabel")}</span>
          <span className="font-bold tracking-wide">{PHONE_DISPLAY}</span>
          <span className="hidden items-center gap-1.5 pl-3 text-white/50 md:inline-flex">
            <Clock className="h-3 w-3 flex-shrink-0" aria-hidden />
            {/* Still swaps to "Opens 8:30am" out of hours — more use than a
                static line when someone is looking at this at 11pm. */}
            {openNow === false ? t("barClosed") : t("barHours")}
          </span>
        </a>

        <div className="flex flex-shrink-0 items-center gap-4">
          {/* On phones the bottom bar already carries a big WhatsApp button —
              repeating it up here would just be noise. */}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              track("whatsapp_click", {
                source: "top_bar",
                property,
                page: pathname,
              })
            }
            className="hidden items-center gap-1.5 text-[13px] leading-none text-white/75 transition-colors hover:text-[#25D366] sm:flex"
          >
            <WhatsAppIcon className="h-3.5 w-3.5 flex-shrink-0" />
            {t("whatsappShort")}
          </a>

          <a
            href={`tel:${PHONE_E164}`}
            onClick={() =>
              track("call_click", {
                source: "top_bar_cta",
                property,
                page: pathname,
              })
            }
            className="flex items-center gap-1.5 text-[12px] font-bold uppercase leading-none tracking-wider text-[var(--color-brand-mid)] transition-colors hover:text-white sm:text-[13px]"
          >
            <Phone className="h-3.5 w-3.5 flex-shrink-0" />
            {t("callShortBar")}
          </a>
        </div>
      </div>
    </div>
  );
}
