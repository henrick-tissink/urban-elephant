import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { tours, getTourBySlug } from "@/data/content";
import { TourDetailContent } from "@/components/tour/tour-detail-content";
import { buildAlternates, SITE_URL } from "@/lib/seo";
import {
  JsonLd,
  touristTripSchema,
  breadcrumbSchema,
} from "@/components/seo/structured-data";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    return { title: "Tour Not Found" };
  }

  const path = `/tours/${slug}`;
  const alternates = buildAlternates(path);
  const imageAbs = tour.image ? `${SITE_URL}${tour.image}` : undefined;

  return {
    title: tour.name,
    description: tour.shortDescription,
    alternates,
    openGraph: {
      title: tour.name,
      description: tour.shortDescription,
      url: alternates.canonical,
      images: imageAbs ? [{ url: imageAbs }] : undefined,
      type: "website",
    },
  };
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
          touristTripSchema(tour),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tours", path: "/tours" },
            { name: tour.name, path: `/tours/${tour.slug}` },
          ]),
        ]}
      />
      <TourDetailContent tour={tour} />
    </>
  );
}
