import { setRequestLocale } from "next-intl/server";
import { tours } from "@/data/content";
import { ToursPageContent } from "@/components/tour/tours-page-content";
import { JsonLd, itemListSchema } from "@/components/seo/structured-data";
import { pickLocale, pageMetadata } from "@/lib/i18n-content";
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
  return pageMetadata("seo.tours", "/tours", locale as Locale);
}

export default async function ToursPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={itemListSchema(
          tours.map((t) => ({ name: pickLocale(t.name, locale as Locale), path: `/tours/${t.slug}` })),
          locale as Locale,
          "Cape Town Tours and Experiences",
        )}
      />
      <ToursPageContent tours={tours} />
    </>
  );
}
