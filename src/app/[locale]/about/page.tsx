import { setRequestLocale } from "next-intl/server";
import { AboutPageContent } from "@/components/about/about-page-content";
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
  return pageMetadata("seo.about", "/about", locale as Locale);
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutPageContent />;
}
