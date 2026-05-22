import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { tours, getTourBySlug } from "@/data/content";
import { TourDetailContent } from "@/components/tour/tour-detail-content";
import {
  JsonLd,
  touristTripSchema,
  breadcrumbSchema,
} from "@/components/seo/structured-data";
import { detailPageMetadata, pickLocale, pickOptional } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<import("next").Metadata> {
  const { locale, slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return {};
  const lc = locale as Locale;
  const title = pickLocale(tour.name, lc);
  const description =
    pickOptional(tour.shortDescription, lc)
    ?? pickOptional(tour.description, lc)?.[0]
    ?? "A curated Cape Town experience.";
  return detailPageMetadata({
    locale: lc,
    path: `/tours/${tour.slug}`,
    title,
    description,
    image: tour.image,
  });
}

export default async function TourDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  return (
    <>
      <JsonLd
        data={[
          touristTripSchema(tour, locale as Locale),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tours", path: "/tours" },
            { name: pickLocale(tour.name, locale as Locale), path: `/tours/${tour.slug}` },
          ], locale as Locale),
        ]}
      />
      <TourDetailContent tour={tour} />
    </>
  );
}
