import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { properties, getPropertyBySlug } from "@/data/content";
import { PropertyDetailContent } from "@/components/property/property-detail-content";
import { buildAlternates, SITE_URL } from "@/lib/seo";
import {
  JsonLd,
  hotelSchema,
  breadcrumbSchema,
} from "@/components/seo/structured-data";

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

  const path = `/properties/${slug}`;
  const alternates = buildAlternates(path);
  const heroAbs = property.heroImage
    ? `${SITE_URL}${property.heroImage}`
    : undefined;

  return {
    title: property.name,
    description: property.tagline,
    alternates,
    openGraph: {
      title: property.name,
      description: property.tagline,
      url: alternates.canonical,
      images: heroAbs ? [{ url: heroAbs }] : undefined,
      type: "website",
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  return (
    <>
      <JsonLd
        data={[
          hotelSchema(property),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Properties", path: "/properties" },
            { name: property.name, path: `/properties/${property.slug}` },
          ]),
        ]}
      />
      <PropertyDetailContent property={property} />
    </>
  );
}
