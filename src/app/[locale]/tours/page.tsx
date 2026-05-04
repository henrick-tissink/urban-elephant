import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { tours } from "@/data/content";
import { ToursPageContent } from "@/components/tour/tours-page-content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tours" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ToursPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ToursPageContent tours={tours} />;
}
