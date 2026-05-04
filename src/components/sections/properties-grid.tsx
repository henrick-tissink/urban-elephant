"use client";

import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  ScrollReveal,
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/scroll-reveal";
import type { PropertyCard } from "@/types";

interface PropertiesGridProps {
  properties: PropertyCard[];
}

export function PropertiesGrid({ properties }: PropertiesGridProps) {
  const t = useTranslations("properties");
  const tCommon = useTranslations("common");

  return (
    <section className="py-24 lg:py-32 bg-stone-50">
      <div className="container mx-auto px-6 lg:px-12">
        <ScrollReveal className="text-center mb-16 lg:mb-20">
          <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs mb-4">
            {t("subtitle")}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#24272a] tracking-tight text-balance">
            {t("title")}
          </h2>
          <p className="text-stone-500 text-base mt-5 max-w-xl mx-auto text-balance">
            {t("description")}
          </p>
        </ScrollReveal>

        <StaggerChildren
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14"
        >
          {properties.map((property) => (
            <StaggerItem key={property._id}>
              <Link
                href={`/properties/${property.slug}`}
                className="group block"
              >
                <div className="relative aspect-[5/4] overflow-hidden bg-stone-200">
                  {property.heroImage && (
                    <Image
                      src={property.heroImage}
                      alt={property.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </div>

                <div className="pt-6 flex items-baseline justify-between gap-6">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {property.starRating && (
                        <div className="flex items-center gap-0.5 text-[var(--color-brand-anchor)]">
                          {Array.from({ length: property.starRating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      )}
                      <span className="text-stone-400 text-xs uppercase tracking-[0.2em]">
                        {property.location}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl text-[#24272a] tracking-tight group-hover:text-[var(--color-brand-anchor)] transition-colors duration-500">
                      {property.name}
                    </h3>

                    {property.tagline && (
                      <p className="text-stone-500 text-sm mt-2 line-clamp-2 max-w-md">
                        {property.tagline}
                      </p>
                    )}
                  </div>

                  <ArrowRight className="w-5 h-5 text-[#24272a] flex-shrink-0 mt-2 group-hover:translate-x-1 group-hover:text-[var(--color-brand-anchor)] transition-all duration-500" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <ScrollReveal delay={0.2} className="text-center mt-16 lg:mt-20">
          <Button variant="outline" size="lg" asChild>
            <Link href="/properties">{tCommon("viewAll")}</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
