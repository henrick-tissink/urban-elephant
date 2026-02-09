import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import { siteSettingsQuery, propertiesQuery } from "@/lib/sanity/queries";
import type { SiteSettings, PropertyCard } from "@/types";
import { ContactPageContent } from "@/components/contact/contact-page-content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [settings, properties] = await Promise.all([
    sanityFetch<SiteSettings>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    }),
    sanityFetch<PropertyCard[]>({
      query: propertiesQuery,
      tags: ["property"],
    }),
  ]);

  return <ContactPageContent settings={settings} properties={properties} />;
}
