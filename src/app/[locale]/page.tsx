import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { WelcomeSection } from "@/components/sections/welcome-section";
import { WhyBook } from "@/components/sections/why-book";
import { WhyBookDirect } from "@/components/sections/why-book-direct";
import { PropertiesGrid } from "@/components/sections/properties-grid";
import { AboutPreview } from "@/components/sections/about-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { ServicesPreview } from "@/components/sections/services-preview";
import { CTASection } from "@/components/sections/cta-section";
import { PromoPopup } from "@/components/promo/promo-popup";
import { getFeaturedProperties, getFeaturedReviews } from "@/data/content";
import { buildAlternates } from "@/lib/seo";
import { JsonLd, itemListSchema } from "@/components/seo/structured-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: buildAlternates("/"),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const properties = getFeaturedProperties();
  const reviews = getFeaturedReviews();

  return (
    <>
      <JsonLd
        data={itemListSchema(
          properties.map((p) => ({
            name: `Urban Elephant at ${p.name}`,
            path: `/properties/${p.slug}`,
          })),
          "Featured Urban Elephant Properties",
        )}
      />
      <Hero />
      <TrustStrip />
      <WelcomeSection />
      <PropertiesGrid properties={properties} />
      <WhyBook />
      <WhyBookDirect />
      <AboutPreview />
      <Testimonials reviews={reviews} />
      <ServicesPreview />
      <CTASection />
      <PromoPopup />
    </>
  );
}
