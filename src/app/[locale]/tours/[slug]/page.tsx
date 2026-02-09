import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityFetch, urlFor } from "@/lib/sanity";
import { tourBySlugQuery, tourSlugsQuery } from "@/lib/sanity/queries";
import type { Tour } from "@/types";
import { TourDetailContent } from "@/components/tour/tour-detail-content";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[] | null>({
    query: tourSlugsQuery,
    tags: ["tour"],
  });

  if (!slugs || slugs.length === 0) {
    return [];
  }

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const tour = await sanityFetch<Tour>({
    query: tourBySlugQuery,
    params: { slug },
    tags: ["tour"],
  });

  if (!tour) {
    return {
      title: "Tour Not Found",
    };
  }

  return {
    title: tour.seo?.title || tour.name,
    description: tour.seo?.description || tour.shortDescription,
    openGraph: {
      title: tour.name,
      description: tour.shortDescription || undefined,
      images: tour.image
        ? [{ url: urlFor(tour.image).width(1200).height(630).url() }]
        : undefined,
    },
  };
}

export default async function TourDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const tour = await sanityFetch<Tour>({
    query: tourBySlugQuery,
    params: { slug },
    tags: ["tour"],
  });

  if (!tour) {
    notFound();
  }

  return <TourDetailContent tour={tour} />;
}
