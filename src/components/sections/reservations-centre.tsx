"use client";

import {
  CalendarCheck,
  CalendarDays,
  CircleOff,
  Clock,
  CreditCard,
  Headset,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/atoms/whatsapp-icon";
import { track } from "@/lib/analytics";
import { PHONE_E164, PHONE_DISPLAY, whatsappLink } from "@/lib/contact";

/**
 * The reservations desk, given the middle of the hero.
 *
 * Niles' first ask was to get the booking hotline front and centre. Everything
 * before this put it beside the online path; this makes it the centrepiece —
 * the number is the largest single element on the page, and the three ways to
 * reach us sit directly under it.
 *
 * The four proof points exist to answer the objection that stops people
 * phoning a hotel: that it will cost more or take longer than booking online.
 */
export function ReservationsCentre({ onBookOnline }: { onBookOnline: () => void }) {
  const t = useTranslations("reservationsHero");

  const features = [
    { Icon: ShieldCheck, label: t("bestRate"), sub: t("bestRateSub") },
    { Icon: CircleOff, label: t("noFees"), sub: t("noFeesSub") },
    { Icon: CreditCard, label: t("plans"), sub: t("plansSub") },
    { Icon: CalendarCheck, label: t("instant"), sub: t("instantSub") },
  ];

  return (
    <div className="w-full max-w-4xl">
      <span className="mx-auto mb-3 flex h-10 w-10 sm:mb-4 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
        <Headset className="h-5 w-5 text-[var(--color-brand-mid)]" aria-hidden />
      </span>

      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white sm:text-sm">
        {t("title")}
      </p>
      <p className="mt-2 text-[13px] text-white/60 sm:text-sm">{t("subtitle")}</p>

      {/* The number itself — the largest single thing on the page. */}
      <a
        href={`tel:${PHONE_E164}`}
        onClick={() => track("call_click", { source: "hero_centre" })}
        className="mt-3 block text-4xl font-bold sm:mt-4 tracking-tight text-[var(--color-brand-anchor)] transition-colors hover:text-[var(--color-brand-mid)] sm:text-5xl md:text-6xl"
      >
        {PHONE_DISPLAY}
      </a>

      <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-anchor)] px-4 py-1.5 text-xs font-semibold text-white sm:text-sm">
        <Clock className="h-3.5 w-3.5 flex-shrink-0" aria-hidden />
        {t("hours")}
      </span>

      <hr className="mx-auto mt-6 w-full max-w-2xl sm:mt-7 border-0 border-t border-white/15" />

      {/* Proof points — 2×2 on phones, a single row from md up. */}
      <ul className="mx-auto mt-5 grid w-full grid-cols-2 gap-x-3 gap-y-4 sm:mt-6 sm:gap-x-5 md:grid-cols-4">
        {features.map(({ Icon, label, sub }) => (
          <li key={label} className="flex items-center gap-2.5 text-left md:justify-center">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-white/20">
              <Icon className="h-4 w-4 text-[var(--color-brand-mid)]" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase leading-tight tracking-[0.06em] text-white sm:tracking-[0.1em]">
                {label}
              </span>
              <span className="block text-[11px] leading-tight text-white/55">{sub}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-col sm:mt-8 items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        <a
          href={`tel:${PHONE_E164}`}
          onClick={() => track("call_click", { source: "hero_cta" })}
          className="flex items-center justify-center gap-2.5 rounded-md bg-[var(--color-brand-anchor)] px-7 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-[var(--color-brand-anchor)]/25 transition-transform duration-200 hover:scale-[1.02] active:scale-95"
        >
          <Phone className="h-4 w-4 flex-shrink-0" aria-hidden />
          {t("callCta")}
        </a>

        <a
          href={whatsappLink(t("whatsappMessage"))}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { source: "hero_cta" })}
          className="flex items-center justify-center gap-2.5 rounded-md border-2 border-white/70 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white hover:text-[#24272a]"
        >
          <WhatsAppIcon className="h-4 w-4 flex-shrink-0" />
          {t("whatsappCta")}
        </a>

        {/* Online booking stays available — the phone is co-primary, not the
            only way through. */}
        <button
          type="button"
          onClick={onBookOnline}
          className="flex items-center justify-center gap-2.5 rounded-md bg-white px-7 py-3 text-left transition-transform duration-200 hover:scale-[1.02] active:scale-95"
        >
          <CalendarDays
            className="h-4 w-4 flex-shrink-0 text-[var(--color-brand-anchor)]"
            aria-hidden
          />
          <span>
            <span className="block text-sm font-bold uppercase leading-tight tracking-wider text-[var(--color-brand-anchor)]">
              {t("bookCta")}
            </span>
            <span className="block text-[11px] leading-tight text-stone-500">
              {t("bookCtaSub")}
            </span>
          </span>
        </button>
      </div>

      <p className="mt-4 text-[11px] text-white/65 sm:mt-5 sm:text-sm">{t("reassurance")}</p>
    </div>
  );
}
