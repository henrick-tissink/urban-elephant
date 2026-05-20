import { routing } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.urbanelephant.co.za";

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

export function buildAlternates(path: string = "/") {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = localizedUrl(locale, path);
  }
  languages["x-default"] = localizedUrl(routing.defaultLocale, path);
  return {
    canonical: localizedUrl(routing.defaultLocale, path),
    languages,
  };
}
