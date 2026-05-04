import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { tours, getTourBySlug } from "@/data/content";
import { TourDetailContent } from "@/components/tour/tour-detail-content";

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

  return {
    title: tour.name,
    description: tour.shortDescription,
    openGraph: {
      title: tour.name,
      description: tour.shortDescription,
      images: tour.image ? [{ url: tour.image }] : undefined,
    },
  };
}

export default async function TourDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  return <TourDetailContent tour={tour} />;
}
