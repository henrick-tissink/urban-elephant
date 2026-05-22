import { setRequestLocale } from "next-intl/server";
import { CarHirePageContent } from "@/components/car-hire/car-hire-page-content";
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
  return pageMetadata("seo.carHire", "/car-hire", locale as Locale);
}

export default async function CarHirePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CarHirePageContent />;
}
