import { setRequestLocale } from "next-intl/server";
import { siteSettings } from "@/data/content";
import { PropertyApplicationContent } from "@/components/property-application/property-application-content";
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
  return pageMetadata(
    "seo.propertyApplication",
    "/property-application",
    locale as Locale,
  );
}

export default async function PropertyApplicationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PropertyApplicationContent settings={siteSettings} />;
}
