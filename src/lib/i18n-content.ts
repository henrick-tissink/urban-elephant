import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { buildAlternates, localizedUrl } from "@/lib/seo";

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

export async function pageMetadata(
  namespace: string,
  path: string,
  locale: Locale,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const og = LOCALE_TO_OG[locale];
  const alternates = routing.locales
    .filter((l) => l !== locale)
    .map((l) => LOCALE_TO_OG[l]);
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(path),
    openGraph: {
      type: "website",
      locale: og,
      alternateLocale: alternates,
      url: localizedUrl(locale, path),
      siteName: "Urban Elephant",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [{ url: "/images/site/og.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: ["/images/site/og.jpg"],
    },
  };
}

export function detailPageMetadata(args: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const og = LOCALE_TO_OG[args.locale];
  const alternates = routing.locales
    .filter((l) => l !== args.locale)
    .map((l) => LOCALE_TO_OG[l]);
  const image = args.image ?? "/images/site/og.jpg";
  return {
    title: args.title,
    description: args.description,
    alternates: buildAlternates(args.path),
    openGraph: {
      type: "website",
      locale: og,
      alternateLocale: alternates,
      url: localizedUrl(args.locale, args.path),
      siteName: "Urban Elephant",
      title: args.title,
      description: args.description,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: args.title,
      description: args.description,
      images: [image],
    },
  };
}
