import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import { propertiesQuery } from "@/lib/sanity/queries";
import type { PropertyCard } from "@/types";
import { PropertiesPageContent } from "@/components/property/properties-page-content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "properties" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PropertiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const properties = await sanityFetch<PropertyCard[]>({
    query: propertiesQuery,
    tags: ["property"],
  });

  return <PropertiesPageContent properties={properties} />;
}
