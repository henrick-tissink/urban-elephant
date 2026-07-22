import { setRequestLocale } from "next-intl/server";
import { GivingBackContent } from "@/components/giving-back/giving-back-content";
import { detailPageMetadata } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<import("next").Metadata> {
  const { locale } = await params;
  return detailPageMetadata({
    locale: locale as Locale,
    path: "/giving-back",
    title: "Giving Back — Rachel's Wishes",
    description:
      "Urban Elephant proudly partners with Rachel's Wishes, a Western Cape charity improving the lives of vulnerable children and families — founded in memory of Rachel Adcock.",
  });
}

export default async function GivingBackPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GivingBackContent />;
}
