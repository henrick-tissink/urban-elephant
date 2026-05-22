import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { properties, getPropertyBySlug } from "@/data/content";
import { PropertyDetailContent } from "@/components/property/property-detail-content";
import { propertyFaqs } from "@/lib/property-faq";
import {
  JsonLd,
  hotelSchema,
  breadcrumbSchema,
  faqPageSchema,
} from "@/components/seo/structured-data";
import { detailPageMetadata, pickLocale, pickOptional } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<import("next").Metadata> {
  const { locale, slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};
  const lc = locale as Locale;
  const title = `Urban Elephant at ${property.name}`;
  const description =
    pickOptional(property.tagline, lc)
    ?? pickOptional(property.description, lc)?.[0]
    ?? "Luxury apartment hotel in Cape Town.";
  return detailPageMetadata({
    locale: lc,
    path: `/properties/${property.slug}`,
    title,
    description,
    image: property.heroImage,
  });
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
          hotelSchema(property, locale as Locale),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Properties", path: "/properties" },
            { name: property.name, path: `/properties/${property.slug}` },
          ], locale as Locale),
          ...(faqs.length
            ? [
                faqPageSchema(
                  faqs.map((f) => ({
                    question: pickLocale(f.q, locale as Locale),
                    answer: pickLocale(f.a, locale as Locale),
                  })),
                ),
              ]
            : []),
        ]}
      />
      <PropertyDetailContent property={property} faqs={faqs} />
    </>
  );
}
