import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { TheHerdPageContent } from "@/components/the-herd/the-herd-page-content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "theHerd" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function TheHerdPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TheHerdPageContent />;
}
