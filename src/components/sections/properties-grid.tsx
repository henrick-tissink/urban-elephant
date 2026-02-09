"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/lib/sanity";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/animations/scroll-reveal";
import type { PropertyCard } from "@/types";

interface PropertiesGridProps {
  properties: PropertyCard[];
}

export function PropertiesGrid({ properties }: PropertiesGridProps) {
  const t = useTranslations("properties");
  const tCommon = useTranslations("common");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <p className="text-[#cc00cc] uppercase tracking-[0.3em] text-sm mb-4">
            {t("subtitle")}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#24272a] mb-6">
            {t("title")}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t("description")}
          </p>
        </ScrollReveal>

        {/* Properties Grid */}
        <StaggerChildren staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {properties.map((property) => (
            <StaggerItem key={property._id}>
              <Link href={`/properties/${property.slug.current}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                  {property.heroImage ? (
                    <Image
                      src={urlFor(property.heroImage).width(800).height(600).url()}
                      alt={property.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">{property.name}</span>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Highlight Badge */}
                  {property.highlights?.[0] && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-[#24272a]">
                      {property.highlights[0].title}
                    </div>
                  )}

                  {/* Rating */}
                  {property.starRating && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#ff00ff] text-white px-2.5 py-1 text-xs font-medium">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{property.starRating} Star</span>
                    </div>
                  )}

                  {/* Bottom Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-light text-white mb-1">
                      {property.name}
                    </h3>
                    {property.tagline && (
                      <p className="text-white/80 text-sm">{property.tagline}</p>
                    )}
                  </div>
                </div>

                <div className="pt-4 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                  </div>

                  <div className="flex items-center text-[#cc00cc] text-sm font-medium">
                    <span>{t("viewProperty")}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* CTA */}
        <ScrollReveal delay={0.4} className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/properties">{tCommon("viewAll")}</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
