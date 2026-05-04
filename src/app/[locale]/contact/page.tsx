import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { properties, siteSettings } from "@/data/content";
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

  return <ContactPageContent settings={siteSettings} properties={properties} />;
}
