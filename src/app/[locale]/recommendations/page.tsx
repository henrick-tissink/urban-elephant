import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { attractions, restaurants, recommendationsLetter } from "@/data/content";
import { RecommendationsPageContent } from "@/components/recommendations/recommendations-page-content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "recommendations" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RecommendationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <RecommendationsPageContent
      attractions={attractions}
      restaurants={restaurants}
      letter={recommendationsLetter}
    />
  );
}
