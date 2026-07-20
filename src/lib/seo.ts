import { routing } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://urbanelephant.co.za";

function joinPath(path: string): string {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

export function localizedUrl(locale: string, path: string = "/"): string {
  const suffix = joinPath(path);
  if (locale === routing.defaultLocale) {
    return suffix ? `${SITE_URL}${suffix}` : SITE_URL;
  }
  return `${SITE_URL}/${locale}${suffix}`;
}

export function buildAlternates(
  path: string = "/",
  locale: string = routing.defaultLocale,
) {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = localizedUrl(l, path);
  }
  languages["x-default"] = localizedUrl(routing.defaultLocale, path);
  return {
    // Self-referencing canonical per locale. Pairing a self-canonical with the
    // hreflang `languages` map is the correct multilingual signal; pointing every
    // locale's canonical at the default locale would tell Google the translated
    // pages are duplicates and drop them from the index.
    canonical: localizedUrl(locale, path),
    languages,
  };
}
