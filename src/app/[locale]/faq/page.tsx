import { setRequestLocale, getTranslations } from "next-intl/server";
import { FaqPageContent } from "@/components/faq/faq-page-content";
import { JsonLd, faqPageSchema, breadcrumbSchema } from "@/components/seo/structured-data";
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
  return pageMetadata("seo.faq", "/faq", locale as Locale);
}

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
