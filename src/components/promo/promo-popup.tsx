"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { promoConfig } from "@/data/promo";

const STORAGE_PREFIX = "ue_promo_dismissed_";

export function PromoPopup() {
  const t = useTranslations("promo");
  const [open, setOpen] = useState(false);
  const storageKey = `${STORAGE_PREFIX}${promoConfig.version}`;

  // Open the popup once per browser per promo version, after a short delay so
  // the page settles first. Bumping promoConfig.version re-engages dismissed
  // users automatically.
  useEffect(() => {
    if (!promoConfig.enabled) return;
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(storageKey) === "1") return;
    const timer = window.setTimeout(() => setOpen(true), promoConfig.delayMs);
    return () => window.clearTimeout(timer);
  }, [storageKey]);

  const dismiss = useCallback(() => {
    setOpen(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, "1");
    }
  }, [storageKey]);

  // ESC closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, dismiss]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-6 py-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-title"
        >
          <button
            type="button"
            aria-label={t("close")}
            onClick={dismiss}
            className="absolute inset-0 bg-black/55 backdrop-blur-sm cursor-default"
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden"
          >
            <button
              type="button"
              aria-label={t("close")}
              onClick={dismiss}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/85 hover:bg-white flex items-center justify-center text-[#24272a] shadow transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[336/266] w-full bg-stone-100">
              <Image
                src={promoConfig.image}
                alt={t("imageAlt")}
                fill
                sizes="(max-width: 480px) 100vw, 28rem"
                className="object-cover"
                priority
              />
            </div>

            <div className="p-7 lg:p-8">
              <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.25em] text-[10px] font-bold mb-3">
                {t("eyebrow")}
              </p>
              <h2
                id="promo-title"
                className="text-2xl md:text-3xl text-[#24272a] leading-tight tracking-tight mb-3"
              >
                {t("title")}
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                {t("body")}
              </p>
              <Button variant="primary" size="default" asChild>
                <a
                  href={t("ctaHref")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={dismiss}
                >
                  {t("cta")}
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
