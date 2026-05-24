"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const DISMISSED_KEY = "ue-locale-banner-dismissed";

const PROMPT_KEYS: Record<Locale, string | null> = {
  en: null,
  af: null,
  de: "promptDeutsch",
  fr: "promptFrancais",
  da: "promptDansk",
};

export function LocaleBanner() {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("locale.banner");
  const ta = useTranslations("a11y");
  const [suggested, setSuggested] = useState<Locale | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(DISMISSED_KEY)) return;
    const nav = navigator.language?.split("-")[0]?.toLowerCase();
    if (!nav) return;
    if (nav === currentLocale) return;
    if (!routing.locales.includes(nav as Locale)) return;
    const target = nav as Locale;
    if (!PROMPT_KEYS[target]) return;
    setSuggested(target);
  }, [currentLocale]);

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    setSuggested(null);
  };

  const accept = () => {
    if (!suggested) return;
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    router.replace(pathname, { locale: suggested });
  };

  if (!suggested) return null;
  const promptKey = PROMPT_KEYS[suggested];
  if (!promptKey) return null;

  return (
    <div
      role="region"
      aria-label={ta("languageSuggestion")}
      className="bg-[#24272a] text-white px-4 py-2 flex items-center justify-center gap-4 text-sm"
    >
      <span lang={suggested}>{t(promptKey)}</span>
      <button onClick={accept} className="underline font-medium" lang={suggested}>
        {t("switch")}
      </button>
      <button
        onClick={dismiss}
        className="opacity-70 hover:opacity-100 text-lg leading-none"
        aria-label={t("dismiss")}
      >
        ×
      </button>
    </div>
  );
}
