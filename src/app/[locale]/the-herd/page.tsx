import { setRequestLocale } from "next-intl/server";
import { TheHerdPageContent } from "@/components/the-herd/the-herd-page-content";
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
  return pageMetadata("seo.herd", "/the-herd", locale as Locale);
}

export default async function TheHerdPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TheHerdPageContent />;
}
