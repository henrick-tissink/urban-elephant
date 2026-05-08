import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { WelcomeSection } from "@/components/sections/welcome-section";
import { WhyBook } from "@/components/sections/why-book";
import { PropertiesGrid } from "@/components/sections/properties-grid";
import { AboutPreview } from "@/components/sections/about-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { ServicesPreview } from "@/components/sections/services-preview";
import { CTASection } from "@/components/sections/cta-section";
import { PromoPopup } from "@/components/promo/promo-popup";
import { getFeaturedProperties, getFeaturedReviews, siteSettings } from "@/data/content";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const properties = getFeaturedProperties();
  const reviews = getFeaturedReviews();

  return (
    <>
      <Hero />
      <TrustStrip />
      <WelcomeSection />
      <PropertiesGrid properties={properties} />
      <WhyBook />
      <AboutPreview />
      <Testimonials reviews={reviews} />
      <ServicesPreview />
      <CTASection bookNowUrl={siteSettings.bookNowUrl} />
      <PromoPopup />
    </>
  );
}
