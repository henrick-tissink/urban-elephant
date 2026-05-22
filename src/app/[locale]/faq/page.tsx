import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { FaqPageContent } from "@/components/faq/faq-page-content";
import { buildAlternates } from "@/lib/seo";
import { JsonLd, faqPageSchema, breadcrumbSchema } from "@/components/seo/structured-data";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

const FAQ_GROUPS = [
  { key: "arrival", items: ["checkIn", "checkOut", "reception", "keys", "parking"] },
  {
    key: "stay",
    items: ["wifi", "aircon", "housekeeping", "laundry", "gymPool", "smoking", "views"],
  },
  {
    key: "neighbourhood",
    items: ["distances", "safety", "amenitiesNearby", "airportTours"],
  },
  { key: "family", items: ["cots"] },
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/faq"),
  };
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "faq" });
  const tNav = await getTranslations({ locale, namespace: "navigation" });

  const qa: { question: string; answer: string }[] = [];
  for (const group of FAQ_GROUPS) {
    for (const item of group.items) {
      qa.push({
        question: t(`groups.${group.key}.items.${item}.q`),
        answer: t(`groups.${group.key}.items.${item}.a`),
      });
    }
  }

  return (
    <>
      <JsonLd
        data={[
          faqPageSchema(qa),
          breadcrumbSchema([
            { name: tNav("home"), path: "/" },
            { name: tNav("faq"), path: "/faq" },
          ], locale as Locale),
        ]}
      />
      <FaqPageContent />
    </>
  );
}
