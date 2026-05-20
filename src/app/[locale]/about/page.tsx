import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/about-page-content";
import { buildAlternates } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("title"),
    description: t("tagline"),
    alternates: buildAlternates("/about"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutPageContent />;
}
