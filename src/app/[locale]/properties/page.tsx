import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { properties } from "@/data/content";
import { PropertiesPageContent } from "@/components/property/properties-page-content";
import { buildAlternates, SITE_URL } from "@/lib/seo";
import {
  JsonLd,
  itemListSchema,
  breadcrumbSchema,
  hotelSchema,
} from "@/components/seo/structured-data";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "properties" });
  const tNav = await getTranslations({ locale, namespace: "navigation" });
  const alternates = buildAlternates("/properties");
  const description =
    "Four officially TGCSA-graded 4-star apartment hotels in Cape Town — 16 On Bree, The Rose, The Docklands and Flamingo Express. From R1,250/night. Book direct.";

  return {
    title: t("title"),
    description,
    keywords: [
      "Cape Town apartment hotels",
      "TGCSA 4-star",
      "luxury Cape Town accommodation",
      "De Waterkant hotels",
      "Sea Point apartments",
      "Cape Town CBD hotels",
      "Urban Elephant properties",
    ],
    alternates,
    openGraph: {
      title: tNav("properties"),
      description,
      url: alternates.canonical,
      type: "website",
      siteName: "Urban Elephant",
      locale: "en_ZA",
      images: [{ url: `${SITE_URL}/images/site/og.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: tNav("properties"),
      description,
      images: [`${SITE_URL}/images/site/og.jpg`],
    },
  };
}

export default async function PropertiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations({ locale, namespace: "navigation" });

  return (
    <>
      <JsonLd
        data={[
          itemListSchema(
            properties.map((p) => ({
              name: `Urban Elephant at ${p.name}`,
              path: `/properties/${p.slug}`,
            })),
            locale as Locale,
            "Urban Elephant Properties",
          ),
          breadcrumbSchema([
            { name: tNav("home"), path: "/" },
            { name: tNav("properties"), path: "/properties" },
          ], locale as Locale),
          ...properties.map((p) => hotelSchema(p, locale as Locale)),
        ]}
      />
      <PropertiesPageContent properties={properties} />
    </>
  );
}
