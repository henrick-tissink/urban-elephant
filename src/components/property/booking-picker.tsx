"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Phone, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { TGCSAStars } from "@/components/atoms/tgcsa-stars";
import { AwardBadge } from "@/components/property/award-badge";
import type { Property } from "@/types";
import type { Locale } from "@/i18n/routing";
import { pickOptional } from "@/lib/i18n-content";
import { recordBookingHandoff } from "@/lib/booking-handoff";
import { WhatsAppIcon } from "@/components/atoms/whatsapp-icon";
import { track } from "@/lib/analytics";
import { PHONE_E164, PHONE_DISPLAY, whatsappLink } from "@/lib/contact";

interface Props {
  open: boolean;
  onClose: () => void;
  properties: Property[];
}

/**
 * Lets a guest pick which Urban Elephant property to book before being
 * handed off to Nightsbridge. Without this step, every "Book Direct" CTA
 * lands on the same account page and the choice of property feels invisible.
 */
export function BookingPicker({ open, onClose, properties }: Props) {
  const t = useTranslations("bookingPicker");
  const tHotline = useTranslations("hotline");
  const locale = useLocale() as Locale;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 sm:px-6 sm:py-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-picker-title"
        >
          <button
            type="button"
            aria-label={t("close")}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-3xl bg-white rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <button
              type="button"
              aria-label={t("close")}
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/85 hover:bg-white flex items-center justify-center text-[#24272a] shadow transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="px-6 pt-8 pb-5 sm:px-9 sm:pt-9 sm:pb-6 border-b border-stone-100">
              <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.25em] text-[10px] font-bold mb-3">
                {t("eyebrow")}
              </p>
              <h2
                id="booking-picker-title"
                className="text-2xl sm:text-3xl text-[#24272a] leading-tight tracking-tight mb-2"
              >
                {t("title")}
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed">
                {t("subtitle")}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-wash)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-brand-anchor)]">
                <Check className="w-4 h-4 flex-shrink-0" />
                {t("prideNote")}
              </p>
            </div>

            <div className="overflow-y-auto px-6 py-6 sm:px-9 sm:py-7">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {properties.map((property) => {
                  const stars = property.starRating ?? 0;
                  return (
                    <li key={property._id}>
                      <a
                        href={property.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          recordBookingHandoff({
                            property: property.name,
                            source: "picker",
                          });
                          onClose();
                        }}
                        className="group block rounded-md overflow-hidden border border-stone-200 hover:border-[var(--color-brand-anchor)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-anchor)] focus:ring-offset-2 transition-colors"
                      >
                        <div className="relative aspect-[5/3] w-full bg-stone-100 overflow-hidden">
                          {property.heroImage && (
                            <Image
                              src={property.heroImage}
                              alt={property.name}
                              fill
                              sizes="(max-width: 640px) 100vw, 320px"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            />
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-1.5">
                            {stars > 0 && <TGCSAStars count={stars} size={12} />}
                            {property.location && (
                              <span className="text-stone-400 text-[10px] uppercase tracking-[0.2em]">
                                {pickOptional(property.location, locale)}
                              </span>
                            )}
                          </div>
                          <p className="text-[#24272a] text-lg font-light tracking-tight group-hover:text-[var(--color-brand-anchor)] transition-colors">
                            {property.name}
                          </p>
                          {property.awards && property.awards.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {property.awards.map((award) => (
                                <AwardBadge key={`${award.provider}-${award.year}`} award={award} />
                              ))}
                            </div>
                          )}
                          <span className="mt-2 inline-flex items-center gap-2 text-[#24272a] text-[11px] uppercase tracking-[0.25em] font-medium">
                            <span className="w-6 h-px bg-[#24272a] group-hover:w-10 group-hover:bg-[var(--color-brand-anchor)] transition-all duration-500" />
                            {t("cardCta")}
                          </span>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Whoever is in this modal has already decided to book. Offering a
                human here catches the ones the widget would otherwise lose. */}
            <div className="border-t border-stone-100 bg-stone-50/80 px-6 py-4 sm:px-9">
              <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                <p className="text-sm text-stone-500">{t("hotlinePrompt")}</p>
                <div className="flex w-full items-center gap-2 sm:w-auto">
                  <a
                    href={`tel:${PHONE_E164}`}
                    onClick={() => track("call_click", { source: "picker" })}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--color-brand-anchor)] px-4 py-2.5 text-sm font-bold text-[var(--color-brand-anchor)] transition-colors hover:bg-[var(--color-brand-wash)] sm:flex-none"
                  >
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    {PHONE_DISPLAY}
                  </a>
                  <a
                    href={whatsappLink(tHotline("whatsappMessage"))}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("whatsapp_click", { source: "picker" })}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02] sm:flex-none"
                  >
                    <WhatsAppIcon className="h-4 w-4 flex-shrink-0" />
                    {tHotline("whatsappShort")}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
