import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { carHireVehicles } from "@/data/content";
import { CarHirePageContent } from "@/components/car-hire/car-hire-page-content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "carHire" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function CarHirePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CarHirePageContent vehicles={carHireVehicles} />;
}
