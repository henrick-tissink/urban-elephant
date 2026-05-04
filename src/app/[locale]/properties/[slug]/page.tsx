import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { properties, getPropertyBySlug } from "@/data/content";
import { PropertyDetailContent } from "@/components/property/property-detail-content";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    return { title: "Property Not Found" };
  }

  return {
    title: property.name,
    description: property.tagline,
    openGraph: {
      title: property.name,
      description: property.tagline,
      images: property.heroImage ? [{ url: property.heroImage }] : undefined,
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  return <PropertyDetailContent property={property} />;
}
