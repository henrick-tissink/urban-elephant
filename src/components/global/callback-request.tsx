"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { track } from "@/lib/analytics";
import { PHONE_DISPLAY } from "@/lib/contact";

interface Props {
  open: boolean;
  onClose: () => void;
  /** Property they were looking at, pre-filled into the request. */
  property?: string;
  /** Where the request was opened from, for attribution. */
  source: string;
}

/**
 * Out-of-hours callback request.
 *
 * The reservations desk is staffed 08:30–20:00 SAST, but the site sells in five
 * languages across European time zones — outside those hours a `tel:` link just
 * rings an empty office and the lead is gone. This turns that dead click into a
 * lead: name and number are all we ask for, everything else is optional.
 */
export function CallbackRequest({ open, onClose, property, source }: Props) {
  const t = useTranslations("callback");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

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

  // Fresh form each time it's opened.
  useEffect(() => {
    if (open) setDone(false);
  }, [open]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const dates = String(form.get("dates") ?? "").trim();

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          subject: property
            ? `Callback request — ${property}`
            : "Callback request — reservations",
          // The desk reads this in the email, so spell out what they need to do.
          message: [
            `${name} asked us to call them back about a booking.`,
            property ? `Property: ${property}` : null,
            dates ? `Preferred dates: ${dates}` : null,
            `Requested from: ${source}`,
          ]
            .filter(Boolean)
            .join("\n"),
          ...(property ? { property } : {}),
          ...(dates ? { dates } : {}),
        }),
      });

      if (!response.ok) throw new Error("Request failed");

      track("callback_submit", { property, source });
      setDone(true);
    } catch {
      toast.error(t("error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="callback-title"
        >
          <button
            type="button"
            aria-label={t("close")}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-lg bg-white p-7 shadow-2xl sm:p-9"
          >
            <button
              type="button"
              aria-label={t("close")}
              onClick={onClose}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-black/5 hover:text-[#24272a]"
            >
              <X className="h-5 w-5" />
            </button>

            {done ? (
              <div className="py-4 text-center">
                <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-wash)]">
                  <Check className="h-6 w-6 text-[var(--color-brand-anchor)]" />
                </span>
                <h2
                  id="callback-title"
                  className="text-2xl leading-tight tracking-tight text-[#24272a]"
                >
                  {t("doneTitle")}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  {t("doneBody")}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 text-sm font-bold uppercase tracking-wide text-[var(--color-brand-anchor)] transition-opacity hover:opacity-70"
                >
                  {t("doneClose")}
                </button>
              </div>
            ) : (
              <>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-brand-anchor)]">
                  {t("eyebrow")}
                </p>
                <h2
                  id="callback-title"
                  className="pr-6 text-2xl leading-tight tracking-tight text-[#24272a]"
                >
                  {property ? t("titleProperty", { property }) : t("title")}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  {t("body", { number: PHONE_DISPLAY })}
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                  <div>
                    <label htmlFor="cb-name" className="sr-only">
                      {t("nameLabel")}
                    </label>
                    <input
                      id="cb-name"
                      name="name"
                      required
                      minLength={2}
                      autoComplete="name"
                      placeholder={t("nameLabel")}
                      className="w-full rounded-md border border-stone-200 px-4 py-3 text-sm text-[#24272a] outline-none transition-colors placeholder:text-stone-400 focus:border-[var(--color-brand-anchor)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="cb-phone" className="sr-only">
                      {t("phoneLabel")}
                    </label>
                    <input
                      id="cb-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder={t("phoneLabel")}
                      className="w-full rounded-md border border-stone-200 px-4 py-3 text-sm text-[#24272a] outline-none transition-colors placeholder:text-stone-400 focus:border-[var(--color-brand-anchor)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="cb-dates" className="sr-only">
                      {t("datesLabel")}
                    </label>
                    <input
                      id="cb-dates"
                      name="dates"
                      placeholder={t("datesLabel")}
                      className="w-full rounded-md border border-stone-200 px-4 py-3 text-sm text-[#24272a] outline-none transition-colors placeholder:text-stone-400 focus:border-[var(--color-brand-anchor)]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[var(--color-brand-anchor)] px-5 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg transition-transform duration-200 hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    {submitting ? t("submitting") : t("submit")}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
