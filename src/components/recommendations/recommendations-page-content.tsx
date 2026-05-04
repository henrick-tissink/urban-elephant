"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  ScrollReveal,
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/scroll-reveal";
import { BrandDivider } from "@/components/global/brand-divider";
import type { Attraction, Restaurant } from "@/types";

interface RecommendationsPageContentProps {
  attractions: Attraction[];
  restaurants: Restaurant[];
  letter: {
    intro: string[];
    signature: string;
    signatureRole: string;
  };
}

const mealTimeLabel: Record<NonNullable<Restaurant["mealType"]>, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

export function RecommendationsPageContent({
  attractions,
  restaurants,
  letter,
}: RecommendationsPageContentProps) {
  const t = useTranslations("recommendations");

  return (
    <article className="bg-white">
      {/* Hero */}
      <header className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-[#24272a] text-white overflow-hidden">
        <div
          className="absolute -top-1/3 -right-1/4 w-[70%] h-[180%] opacity-25 blur-3xl pointer-events-none"
          style={{ background: "var(--gradient-brand)" }}
        />
        <div className="container mx-auto px-6 lg:px-12 relative">
          <ScrollReveal className="max-w-4xl">
            <p className="text-[var(--color-brand-soft)] uppercase tracking-[0.3em] text-xs mb-5">
              {t("eyebrow")}
            </p>
            <h1 className="text-balance leading-[0.92]">
              <span className="block text-[clamp(3.5rem,9vw,8rem)] font-light tracking-[-0.035em]">
                Beyond the
                <br />
                <em className="not-italic text-gradient-brand">front door.</em>
              </span>
            </h1>
            <p className="text-white/65 text-base md:text-lg mt-8 max-w-xl text-balance leading-relaxed font-light">
              {t("subtitle")}
            </p>
          </ScrollReveal>
        </div>
      </header>

      {/* Founder's Letter */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-8">
            <ScrollReveal className="lg:col-span-3">
              <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs">
                {t("letterEyebrow")}
              </p>
            </ScrollReveal>
            <ScrollReveal className="lg:col-span-9">
              <div className="space-y-6 text-stone-700 text-xl md:text-2xl leading-[1.5] font-light">
                {letter.intro.map((paragraph, i) => (
                  <p key={i} className={i === 0 ? "drop-cap" : undefined}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-stone-200">
                <p className="font-display text-2xl italic font-light text-[#24272a]">
                  {letter.signature}
                </p>
                <p className="text-stone-400 text-xs uppercase tracking-[0.25em] mt-2">
                  {letter.signatureRole}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <BrandDivider withMark />

      {/* Attractions */}
      <section className="py-24 lg:py-32 bg-stone-50">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="max-w-3xl mb-16 lg:mb-20">
            <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs mb-5">
              {t("attractionsEyebrow")}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#24272a] tracking-tight text-balance">
              {t("attractionsTitle")}
            </h2>
            <p className="text-stone-500 text-base md:text-lg mt-5 max-w-xl text-balance">
              {t("attractionsDescription")}
            </p>
          </ScrollReveal>

          <StaggerChildren
            staggerDelay={0.1}
            className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14"
          >
            {attractions.map((attraction, i) => (
              <StaggerItem key={attraction._id}>
                <article className="group h-full flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 mb-6">
                    {attraction.image && (
                      <Image
                        src={attraction.image}
                        alt={attraction.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-stone-400 text-[10px] uppercase tracking-[0.25em] font-medium">
                      № {String(i + 1).padStart(2, "0")}
                    </span>
                    {attraction.category && (
                      <span className="text-stone-400 text-[10px] uppercase tracking-[0.25em]">
                        · {attraction.category}
                      </span>
                    )}
                  </div>

                  <h3 className="text-3xl text-[#24272a] tracking-tight mb-3">
                    {attraction.name}
                  </h3>

                  {attraction.description && (
                    <p className="text-stone-500 text-sm leading-relaxed mb-5">
                      {attraction.description}
                    </p>
                  )}

                  {attraction.hostNote && (
                    <div className="mt-auto pt-5 border-t border-stone-200">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-brand-anchor)] mb-2">
                        {t("hostNote")}
                      </p>
                      <p className="font-display italic font-light text-[#24272a] text-base leading-snug text-balance">
                        &ldquo;{attraction.hostNote}&rdquo;
                      </p>
                    </div>
                  )}
                </article>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <BrandDivider withMark />

      {/* Restaurants */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="max-w-3xl mb-16 lg:mb-20">
            <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs mb-5">
              {t("restaurantsEyebrow")}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#24272a] tracking-tight text-balance">
              {t("restaurantsTitle")}
            </h2>
            <p className="text-stone-500 text-base md:text-lg mt-5 max-w-xl text-balance">
              {t("restaurantsDescription")}
            </p>
          </ScrollReveal>

          <StaggerChildren
            staggerDelay={0.1}
            className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14"
          >
            {restaurants.map((restaurant, i) => (
              <StaggerItem key={restaurant._id}>
                <article className="group h-full flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 mb-6">
                    {restaurant.image && (
                      <Image
                        src={restaurant.image}
                        alt={restaurant.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-stone-400 text-[10px] uppercase tracking-[0.25em] font-medium">
                      № {String(i + 1).padStart(2, "0")}
                    </span>
                    {restaurant.mealType && (
                      <span className="text-[var(--color-brand-anchor)] text-[10px] uppercase tracking-[0.25em] font-medium">
                        · {mealTimeLabel[restaurant.mealType]}
                      </span>
                    )}
                  </div>

                  <h3 className="text-3xl text-[#24272a] tracking-tight mb-3">
                    {restaurant.name}
                  </h3>

                  {restaurant.description && (
                    <p className="text-stone-500 text-sm leading-relaxed mb-5">
                      {restaurant.description}
                    </p>
                  )}

                  {restaurant.hostNote && (
                    <div className="mt-auto pt-5 border-t border-stone-200">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-brand-anchor)] mb-2">
                        {t("hostNote")}
                      </p>
                      <p className="font-display italic font-light text-[#24272a] text-base leading-snug text-balance">
                        &ldquo;{restaurant.hostNote}&rdquo;
                      </p>
                    </div>
                  )}
                </article>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <BrandDivider />

      {/* Closing */}
      <section className="py-24 lg:py-32 bg-stone-50">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal className="max-w-2xl mx-auto">
            <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs mb-5">
              {t("ctaEyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#24272a] tracking-tight text-balance mb-8">
              {t("ctaTitle")}
            </h2>
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">{t("ctaButton")}</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </article>
  );
}
