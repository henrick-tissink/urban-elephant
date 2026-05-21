import type { MetadataRoute } from "next";
import { properties, tours } from "@/data/content";
import { routing } from "@/i18n/routing";
import { localizedUrl } from "@/lib/seo";

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

function withAlternates(entry: Entry, lastModified: Date) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = localizedUrl(locale, entry.path);
  }
  return {
    url: localizedUrl(routing.defaultLocale, entry.path),
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: Entry[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/properties", changeFrequency: "weekly", priority: 0.9 },
    { path: "/the-herd", changeFrequency: "monthly", priority: 0.8 },
    { path: "/tours", changeFrequency: "weekly", priority: 0.8 },
    { path: "/recommendations", changeFrequency: "monthly", priority: 0.7 },
    { path: "/car-hire", changeFrequency: "weekly", priority: 0.7 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
    ...properties.map(
      (p): Entry => ({
        path: `/properties/${p.slug}`,
        changeFrequency: "weekly",
        priority: 0.8,
      }),
    ),
    ...tours.map(
      (t): Entry => ({
        path: `/tours/${t.slug}`,
        changeFrequency: "weekly",
        priority: 0.7,
      }),
    ),
  ];

  return entries.map((entry) => withAlternates(entry, now));
}
