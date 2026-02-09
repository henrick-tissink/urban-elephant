import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityFetch, urlFor } from "@/lib/sanity";
import { propertyBySlugQuery, propertySlugsQuery } from "@/lib/sanity/queries";
import type { Property } from "@/types";
import { PropertyDetailContent } from "@/components/property/property-detail-content";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[] | null>({
    query: propertySlugsQuery,
    tags: ["property"],
  });

  if (!slugs || slugs.length === 0) {
    return [];
  }

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const property = await sanityFetch<Property>({
    query: propertyBySlugQuery,
    params: { slug },
    tags: ["property"],
  });

  if (!property) {
    return {
      title: "Property Not Found",
    };
  }

  return {
    title: property.seo?.title || property.name,
    description: property.seo?.description || property.tagline,
    openGraph: {
      title: property.name,
      description: property.tagline || undefined,
      images: property.heroImage
        ? [{ url: urlFor(property.heroImage).width(1200).height(630).url() }]
        : undefined,
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const property = await sanityFetch<Property>({
    query: propertyBySlugQuery,
    params: { slug },
    tags: ["property"],
  });

  if (!property) {
    notFound();
  }

  return <PropertyDetailContent property={property} />;
}
