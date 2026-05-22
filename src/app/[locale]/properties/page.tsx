import { setRequestLocale, getTranslations } from "next-intl/server";
import { properties } from "@/data/content";
import { PropertiesPageContent } from "@/components/property/properties-page-content";
import {
  JsonLd,
  itemListSchema,
  breadcrumbSchema,
  hotelSchema,
} from "@/components/seo/structured-data";
import { pageMetadata } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<import("next").Metadata> {
  const { locale } = await params;
  return pageMetadata("seo.properties", "/properties", locale as Locale);
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
