import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { tours } from "@/data/content";
import { ToursPageContent } from "@/components/tour/tours-page-content";
import { buildAlternates } from "@/lib/seo";
import { JsonLd, itemListSchema } from "@/components/seo/structured-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tours" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates("/tours"),
  };
}

export default async function ToursPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={itemListSchema(
          tours.map((t) => ({ name: t.name, path: `/tours/${t.slug}` })),
          "Cape Town Tours and Experiences",
        )}
      />
      <ToursPageContent tours={tours} />
    </>
  );
}
