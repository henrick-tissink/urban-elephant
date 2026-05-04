"use client";

import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ScrollReveal,
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/scroll-reveal";
import type { PropertyCard } from "@/types";

interface PropertiesPageContentProps {
  properties: PropertyCard[];
}

export function PropertiesPageContent({ properties }: PropertiesPageContentProps) {
  const t = useTranslations("properties");

  return (
    <>
      <section className="pt-32 pb-20 bg-[#24272a] relative overflow-hidden">
        <div
          className="absolute -top-1/2 -right-1/3 w-[60%] h-[180%] opacity-20 blur-3xl pointer-events-none"
          style={{ background: "var(--gradient-brand)" }}
        />
        <div className="container mx-auto px-6 lg:px-12 relative">
          <ScrollReveal className="max-w-3xl">
            <p className="text-[var(--color-brand-soft)] uppercase tracking-[0.3em] text-xs mb-5">
              {t("subtitle")}
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight text-balance">
              {t("title")}
            </h1>
            <p className="text-white/60 text-lg max-w-xl text-balance">
              {t("description")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <StaggerChildren
            staggerDelay={0.1}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16"
          >
            {properties.map((property) => (
              <StaggerItem key={property._id}>
                <Link
                  href={`/properties/${property.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[5/4] overflow-hidden bg-stone-100">
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

                      <h2 className="text-3xl md:text-4xl text-[#24272a] tracking-tight group-hover:text-[var(--color-brand-anchor)] transition-colors duration-500">
                        {property.name}
                      </h2>

                      {property.tagline && (
                        <p className="text-stone-500 text-sm mt-3 line-clamp-2 max-w-md">
                          {property.tagline}
                        </p>
                      )}
                    </div>

                    <ArrowRight className="w-5 h-5 text-[#24272a] flex-shrink-0 mt-2 group-hover:translate-x-1 group-hover:text-[var(--color-brand-anchor)] transition-all duration-500" />
                  </div>

                  <span className="sr-only">{t("viewProperty")}</span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
