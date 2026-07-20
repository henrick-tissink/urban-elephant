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

// Deterministic thousands grouping. We intentionally avoid Number.toLocaleString
// for displayed prices: Node (full ICU) and the browser can group the same locale
// differently (e.g. "1 500" vs "1,500"), which triggers React hydration mismatches.
function groupDigits(n: number, separator: string): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/** ZAR price for display, e.g. formatZar(1500) → "R1 500". Deterministic across server/client. */
export function formatZar(amount: number): string {
  return `R${groupDigits(amount, " ")}`;
}

// Indicative FX rates from ZAR. UI-only — actual billing is in ZAR.
// Update quarterly. Last updated: 2026-05-22.
export const INDICATIVE_FX = {
  en: {
    code: "ZAR" as const,
    rate: 1,
    symbol: "R",
    format: (n: number) => formatZar(n),
  },
  af: {
    code: "ZAR" as const,
    rate: 1,
    symbol: "R",
    format: (n: number) => formatZar(n),
  },
  de: {
    code: "EUR" as const,
    rate: 0.050,
    symbol: "€",
    format: (n: number) => `€${groupDigits(n * 0.050, ".")}`,
  },
  fr: {
    code: "EUR" as const,
    rate: 0.050,
    symbol: "€",
    format: (n: number) => `${groupDigits(n * 0.050, " ")} €`,
  },
  da: {
    code: "DKK" as const,
    rate: 0.37,
    symbol: "kr",
    format: (n: number) => `${groupDigits(n * 0.37, ".")} kr`,
  },
};

export function formatIndicative(zarAmount: number, locale: Locale): string | undefined {
  const fx = INDICATIVE_FX[locale];
  if (fx.code === "ZAR") return undefined;
  return fx.format(zarAmount);
}

// The root layout applies a "%s | Urban Elephant Hotel and Tours" title
// template. A title that already carries the brand (home, property pages)
// must opt out of the suffix, so we emit it as an absolute title instead.
function brandedTitle(title: string): Metadata["title"] {
  return title.includes("Urban Elephant") ? { absolute: title } : title;
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
    title: brandedTitle(t("title")),
    description: t("description"),
    alternates: buildAlternates(path, locale),
    openGraph: {
      type: "website",
      locale: og,
      alternateLocale: alternates,
      url: localizedUrl(locale, path),
      siteName: "Urban Elephant Hotel and Tours",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [{ url: "/images/site/og-v3.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: ["/images/site/og-v3.jpg"],
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
  const image = args.image ?? "/images/site/og-v3.jpg";
  return {
    title: brandedTitle(args.title),
    description: args.description,
    alternates: buildAlternates(args.path, args.locale),
    openGraph: {
      type: "website",
      locale: og,
      alternateLocale: alternates,
      url: localizedUrl(args.locale, args.path),
      siteName: "Urban Elephant Hotel and Tours",
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
