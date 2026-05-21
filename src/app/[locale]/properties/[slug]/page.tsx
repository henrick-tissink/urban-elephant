import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { properties, getPropertyBySlug } from "@/data/content";
import { PropertyDetailContent } from "@/components/property/property-detail-content";
import { buildAlternates, SITE_URL } from "@/lib/seo";
import { propertyFaqs } from "@/lib/property-faq";
import {
  JsonLd,
  hotelSchema,
  breadcrumbSchema,
  faqPageSchema,
} from "@/components/seo/structured-data";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

function propertyMetaDescription(p: ReturnType<typeof getPropertyBySlug>): string | undefined {
  if (!p) return undefined;
  const tagline = p.tagline?.trim();
  const price = p.priceRange
    ? p.priceRange.max
      ? ` From R${p.priceRange.min.toLocaleString("en-ZA")}–R${p.priceRange.max.toLocaleString("en-ZA")}/night.`
      : ` From R${p.priceRange.min.toLocaleString("en-ZA")}/night.`
    : "";
  const credential = ` Officially TGCSA-graded 4-star apartment hotel${p.location ? ` in ${p.location}` : ""}.`;
  const cta = " Book direct for the best rate.";
  return `${tagline ?? ""}${credential}${price}${cta}`.trim();
}

function propertyKeywords(p: ReturnType<typeof getPropertyBySlug>): string[] {
  if (!p) return [];
  return [
    `${p.name} Cape Town`,
    `Urban Elephant at ${p.name}`,
    `${p.name} apartment hotel`,
    p.location ? `${p.location} accommodation` : "",
    p.postalAddress?.locality ? `${p.postalAddress.locality} hotel` : "",
    "Cape Town apartment hotel",
    "TGCSA 4-star",
    "book direct Cape Town",
  ].filter(Boolean);
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
  const description = propertyMetaDescription(property);
  const ogTitle = `Urban Elephant at ${property.name} — 4-Star Apartment Hotel in Cape Town`;

  return {
    title: property.name,
    description,
    keywords: propertyKeywords(property),
    alternates,
    openGraph: {
      title: ogTitle,
      description,
      url: alternates.canonical,
      images: heroAbs
        ? [{ url: heroAbs, width: 1600, height: 900, alt: ogTitle }]
        : undefined,
      type: "website",
      locale: "en_ZA",
      siteName: "Urban Elephant",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: heroAbs ? [heroAbs] : undefined,
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const faqs = propertyFaqs(property);

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
          ...(locale === "en" && faqs.length
            ? [faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a })))]
            : []),
        ]}
      />
      <PropertyDetailContent property={property} faqs={locale === "en" ? faqs : []} />
    </>
  );
}
