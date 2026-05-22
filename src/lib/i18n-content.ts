// src/lib/i18n-content.ts
import type { Locale } from "@/i18n/routing";

export type Localized<T> = { en: T } & Partial<Record<Locale, T>>;

export function pickLocale<T>(field: Localized<T>, locale: Locale): T {
  return field[locale] ?? field.en;
}

export function pickOptional<T>(
  field: Localized<T> | undefined,
  locale: Locale,
): T | undefined {
  if (!field) return undefined;
  return field[locale] ?? field.en;
}

// These records include all 5 target locales. Until Task 2 extends the
// Locale type to include de/fr/da, we cast to satisfy TypeScript's excess
// property checking on object literals.
export const LOCALE_TO_BCP47 = {
  en: "en-ZA",
  af: "af-ZA",
  de: "de-DE",
  fr: "fr-FR",
  da: "da-DK",
} as unknown as Record<Locale, string>;

export const LOCALE_TO_OG = {
  en: "en_ZA",
  af: "af_ZA",
  de: "de_DE",
  fr: "fr_FR",
  da: "da_DK",
} as unknown as Record<Locale, string>;

export const LOCALE_NATIVE_NAME = {
  en: "English",
  af: "Afrikaans",
  de: "Deutsch",
  fr: "Français",
  da: "Dansk",
} as unknown as Record<Locale, string>;

type FxEntry = {
  code: "ZAR" | "EUR" | "DKK";
  rate: number;
  symbol: string;
  format: (zarAmount: number) => string;
};

// Indicative FX rates from ZAR. UI-only — actual billing is in ZAR.
// Update quarterly. Last updated: 2026-05-22.
const _INDICATIVE_FX_ALL: Record<string, FxEntry> = {
  en: {
    code: "ZAR",
    rate: 1,
    symbol: "R",
    format: (n) => `R${n.toLocaleString("en-ZA")}`,
  },
  af: {
    code: "ZAR",
    rate: 1,
    symbol: "R",
    format: (n) => `R${n.toLocaleString("af-ZA")}`,
  },
  de: {
    code: "EUR",
    rate: 0.050,
    symbol: "€",
    format: (n) => `€${Math.round(n * 0.050).toLocaleString("de-DE")}`,
  },
  fr: {
    code: "EUR",
    rate: 0.050,
    symbol: "€",
    format: (n) => `${Math.round(n * 0.050).toLocaleString("fr-FR")} €`,
  },
  da: {
    code: "DKK",
    rate: 0.37,
    symbol: "kr",
    format: (n) => `${Math.round(n * 0.37).toLocaleString("da-DK")} kr`,
  },
};
export const INDICATIVE_FX = _INDICATIVE_FX_ALL as unknown as Record<Locale, FxEntry>;

export function formatIndicative(zarAmount: number, locale: Locale): string | undefined {
  const fx = INDICATIVE_FX[locale];
  if (fx.code === "ZAR") return undefined;
  return fx.format(zarAmount);
}
