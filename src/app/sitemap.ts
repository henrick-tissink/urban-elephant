import type { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanity";
import { propertySlugsQuery, tourSlugsQuery } from "@/lib/sanity/queries";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.urbanelephant.co.za";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all dynamic slugs
  const [propertySlugs, tourSlugs] = await Promise.all([
    sanityFetch<string[] | null>({ query: propertySlugsQuery, tags: ["property"] }),
    sanityFetch<string[] | null>({ query: tourSlugsQuery, tags: ["tour"] }),
  ]);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tours`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/car-hire`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Property pages
  const propertyPages: MetadataRoute.Sitemap = (propertySlugs || []).map((slug) => ({
    url: `${baseUrl}/properties/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Tour pages
  const tourPages: MetadataRoute.Sitemap = (tourSlugs || []).map((slug) => ({
    url: `${baseUrl}/tours/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...propertyPages, ...tourPages];
}
