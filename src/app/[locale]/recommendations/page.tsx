import { setRequestLocale } from "next-intl/server";
import { attractions, restaurants, recommendationsLetter } from "@/data/content";
import { RecommendationsPageContent } from "@/components/recommendations/recommendations-page-content";
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
  return pageMetadata("seo.recommendations", "/recommendations", locale as Locale);
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
