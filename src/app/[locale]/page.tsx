import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { PropertiesGrid } from "@/components/sections/properties-grid";
import { AboutPreview } from "@/components/sections/about-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { ServicesPreview } from "@/components/sections/services-preview";
import { CTASection } from "@/components/sections/cta-section";
import { sanityFetch } from "@/lib/sanity";
import {
  featuredPropertiesQuery,
  featuredReviewsQuery,
  siteSettingsQuery,
} from "@/lib/sanity/queries";
import type { PropertyCard, Review, SiteSettings } from "@/types";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Fetch data in parallel
  const [properties, reviews, settings] = await Promise.all([
    sanityFetch<PropertyCard[]>({
      query: featuredPropertiesQuery,
      tags: ["property"],
    }),
    sanityFetch<Review[]>({
      query: featuredReviewsQuery,
      tags: ["review"],
    }),
    sanityFetch<SiteSettings>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    }),
  ]);

  return (
    <>
      <Hero />
      <PropertiesGrid properties={properties} />
      <AboutPreview />
      <Testimonials reviews={reviews} />
      <ServicesPreview />
      <CTASection bookNowUrl={settings?.bookNowUrl} />
    </>
  );
}
