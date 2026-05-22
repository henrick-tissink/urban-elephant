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

export const LOCALE_TO_BCP47 = {
  en: "en-ZA",
  af: "af-ZA",
  de: "de-DE",
  fr: "fr-FR",
  da: "da-DK",
} satisfies Record<string, string>;

export const LOCALE_TO_OG = {
  en: "en_ZA",
  af: "af_ZA",
  de: "de_DE",
  fr: "fr_FR",
  da: "da_DK",
} satisfies Record<string, string>;

export const LOCALE_NATIVE_NAME = {
  en: "English",
  af: "Afrikaans",
  de: "Deutsch",
  fr: "Français",
  da: "Dansk",
} satisfies Record<string, string>;

// Indicative FX rates from ZAR. UI-only — actual billing is in ZAR.
// Update quarterly. Last updated: 2026-05-22.
export const INDICATIVE_FX = {
  en: {
    code: "ZAR" as const,
    rate: 1,
    symbol: "R",
    format: (n: number) => `R${n.toLocaleString("en-ZA")}`,
  },
  af: {
    code: "ZAR" as const,
    rate: 1,
    symbol: "R",
    format: (n: number) => `R${n.toLocaleString("af-ZA")}`,
  },
  de: {
    code: "EUR" as const,
    rate: 0.050,
    symbol: "€",
    format: (n: number) => `€${Math.round(n * 0.050).toLocaleString("de-DE")}`,
  },
  fr: {
    code: "EUR" as const,
    rate: 0.050,
    symbol: "€",
    format: (n: number) => `${Math.round(n * 0.050).toLocaleString("fr-FR")} €`,
  },
  da: {
    code: "DKK" as const,
    rate: 0.37,
    symbol: "kr",
    format: (n: number) => `${Math.round(n * 0.37).toLocaleString("da-DK")} kr`,
  },
};

export function formatIndicative(zarAmount: number, locale: Locale): string | undefined {
  const fx = INDICATIVE_FX[locale];
  if (fx.code === "ZAR") return undefined;
  return fx.format(zarAmount);
}
