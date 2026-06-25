import { setRequestLocale } from "next-intl/server";
import { properties, siteSettings } from "@/data/content";
import { ContactPageContent } from "@/components/contact/contact-page-content";
import { pageMetadata } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tour?: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<import("next").Metadata> {
  const { locale } = await params;
  return pageMetadata("seo.contact", "/contact", locale as Locale);
}

export default async function ContactPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { tour } = await searchParams;
  setRequestLocale(locale);

  return (
    <ContactPageContent
      settings={siteSettings}
      properties={properties}
      initialTour={tour}
    />
  );
}
