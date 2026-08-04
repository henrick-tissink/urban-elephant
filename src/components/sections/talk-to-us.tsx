"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { WhatsAppIcon } from "@/components/atoms/whatsapp-icon";
import { CallbackRequest } from "@/components/global/callback-request";
import { track } from "@/lib/analytics";
import {
  PHONE_E164,
  PHONE_DISPLAY,
  WHATSAPP_DISPLAY,
  isHotlineOpen,
  whatsappLink,
} from "@/lib/contact";

/**
 * The reservations desk, given a section of its own.
 *
 * A floating button says "support". A band with the number set large says the
 * hotel has people you can talk to — and booking by phone is the one route that
 * never hands the guest to a third-party checkout. It doubles as the canonical
 * name/address/phone block for local SEO, so the number here must stay in step
 * with the Google Business Profile.
 */
export function TalkToUs() {
  const t = useTranslations("talkToUs");
  const [openNow, setOpenNow] = useState<boolean | null>(null);
  const [callbackOpen, setCallbackOpen] = useState(false);

  useEffect(() => {
    const check = () => setOpenNow(isHotlineOpen());
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-[#24272a] py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-brand-mid)]">
              {t("eyebrow")}
            </p>
            <h2 className="text-3xl leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60">
              {t("body")}
            </p>

            {/* The number, set large — the point of the whole section. */}
            <a
              href={`tel:${PHONE_E164}`}
              onClick={() => track("call_click", { source: "talk_to_us" })}
              className="mt-10 inline-block text-4xl tracking-tight text-white transition-colors hover:text-[var(--color-brand-mid)] sm:text-5xl lg:text-6xl"
            >
              {PHONE_DISPLAY}
            </a>

            <div className="mt-4 flex items-center justify-center gap-2.5 text-sm text-white/50">
              <span className="relative flex h-2 w-2" aria-hidden>
                {openNow && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                )}
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${
                    openNow === null
                      ? "bg-stone-500"
                      : openNow
                        ? "bg-green-500"
                        : "bg-stone-400"
                  }`}
                />
              </span>
              {openNow === null
                ? t("hours")
                : openNow
                  ? t("openNow")
                  : t("closedNow")}
            </div>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={whatsappLink(t("whatsappMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { source: "talk_to_us" })}
                className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold tracking-wide text-white transition-transform duration-200 hover:scale-[1.02] active:scale-95 sm:w-auto"
              >
                <WhatsAppIcon className="h-5 w-5 flex-shrink-0" />
                {t("whatsappCta", { number: WHATSAPP_DISPLAY })}
              </a>
              <button
                type="button"
                onClick={() => {
                  track("callback_open", { source: "talk_to_us" });
                  setCallbackOpen(true);
                }}
                className="flex w-full items-center justify-center gap-2.5 rounded-full border border-white/25 px-7 py-4 text-sm font-bold tracking-wide text-white transition-colors hover:border-white sm:w-auto"
              >
                <Phone className="h-5 w-5 flex-shrink-0" />
                {t("callbackCta")}
              </button>
            </div>

            <p className="mt-6 text-xs text-white/40">{t("promise")}</p>
          </div>
        </ScrollReveal>
      </div>

      <CallbackRequest
        open={callbackOpen}
        onClose={() => setCallbackOpen(false)}
        source="talk_to_us"
      />
    </section>
  );
}
