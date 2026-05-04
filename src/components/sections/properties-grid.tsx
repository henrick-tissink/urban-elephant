"use client";

import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { BrandDivider } from "@/components/global/brand-divider";
import type { PropertyCard } from "@/types";

interface PropertiesGridProps {
  properties: PropertyCard[];
}

/**
 * The home page's signature moment. Each property gets a full-width editorial
 * spread — image on one side, oversized name + meta + tagline on the other,
 * alternating left/right per property. Replaces the 2x2 OTA grid pattern with
 * a coffee-table-book rhythm.
 */
export function PropertiesGrid({ properties }: PropertiesGridProps) {
  const t = useTranslations("properties");
  const tCommon = useTranslations("common");

  return (
    <section className="bg-stone-50">
      <div className="container mx-auto px-6 lg:px-12 pt-24 lg:pt-32 pb-16">
        <ScrollReveal className="max-w-3xl">
          <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs mb-5">
            {t("subtitle")}
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-[#24272a] tracking-tight text-balance">
            {t("title")}
          </h2>
          <p className="text-stone-500 text-base md:text-lg mt-6 max-w-xl text-balance">
            {t("description")}
          </p>
        </ScrollReveal>
      </div>

      <BrandDivider withMark className="my-8" />

      {/* Editorial property spreads — alternating L/R */}
      <div>
        {properties.map((property, index) => {
          const flip = index % 2 === 1;
          const stars = property.starRating ?? 0;
          const indexLabel = String(index + 1).padStart(2, "0");

          return (
            <div key={property._id}>
              <article className="py-20 lg:py-32">
                <div className="container mx-auto px-6 lg:px-12">
                  <div
                    className={`grid lg:grid-cols-12 gap-x-12 gap-y-10 items-center ${
                      flip ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <ScrollReveal
                      direction={flip ? "right" : "left"}
                      className="lg:col-span-7"
                    >
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
                              sizes="(max-width: 1024px) 100vw, 60vw"
                              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                            />
                          )}
                        </div>
                      </Link>
                    </ScrollReveal>

                    <ScrollReveal
                      direction={flip ? "left" : "right"}
                      className="lg:col-span-5"
                    >
                      <Link
                        href={`/properties/${property.slug}`}
                        className="group block"
                      >
                        <div className="flex items-center gap-4 mb-5">
                          <span className="text-stone-400 text-xs uppercase tracking-[0.3em] font-medium">
                            № {indexLabel}
                          </span>
                          {stars > 0 && (
                            <div className="flex items-center gap-0.5 text-[var(--color-brand-anchor)]">
                              {Array.from({ length: stars }).map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                              ))}
                            </div>
                          )}
                          <span className="text-stone-400 text-xs uppercase tracking-[0.2em]">
                            {property.location}
                          </span>
                        </div>

                        <h3 className="text-[clamp(2.75rem,5.5vw,5rem)] font-light text-[#24272a] tracking-[-0.025em] leading-[0.95] group-hover:text-[var(--color-brand-anchor)] transition-colors duration-700">
                          {property.name}
                        </h3>

                        {property.tagline && (
                          <p className="mt-6 text-stone-600 text-base lg:text-lg leading-relaxed max-w-md text-balance font-light">
                            {property.tagline}
                          </p>
                        )}

                        <span className="mt-8 inline-flex items-center gap-3 text-[#24272a] text-sm uppercase tracking-[0.25em] font-medium">
                          <span className="w-8 h-px bg-[#24272a] group-hover:w-14 group-hover:bg-[var(--color-brand-anchor)] transition-all duration-500" />
                          {t("viewProperty")}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-[var(--color-brand-anchor)] transition-all duration-500" />
                        </span>
                      </Link>
                    </ScrollReveal>
                  </div>
                </div>
              </article>

              {/* Divider between properties — but not after the last one */}
              {index < properties.length - 1 && <BrandDivider withMark />}
            </div>
          );
        })}
      </div>

      <div className="container mx-auto px-6 lg:px-12 pb-24 lg:pb-32 pt-16 text-center">
        <ScrollReveal>
          <Button variant="outline" size="lg" asChild>
            <Link href="/properties">{tCommon("viewAll")}</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
