"use client";

import Image from "next/image";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/lib/sanity";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/animations/scroll-reveal";
import type { PropertyCard } from "@/types";

interface PropertiesPageContentProps {
  properties: PropertyCard[];
}

export function PropertiesPageContent({ properties }: PropertiesPageContentProps) {
  const t = useTranslations("properties");

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#24272a]">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <p className="text-[#ff6eff] uppercase tracking-[0.3em] text-sm mb-4">
              {t("subtitle")}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
              {t("title")}
            </h1>
            <p className="text-white/70 text-lg">
              {t("description")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <StaggerChildren staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {properties.map((property) => (
              <StaggerItem key={property._id}>
                <Link href={`/properties/${property.slug.current}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    {property.heroImage ? (
                      <Image
                        src={urlFor(property.heroImage).width(800).height(600).url()}
                        alt={property.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {property.starRating && (
                      <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#ff00ff] text-white px-2.5 py-1 text-xs font-medium">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{property.starRating} Star</span>
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h2 className="text-2xl md:text-3xl font-light text-white mb-2">
                        {property.name}
                      </h2>
                      {property.tagline && (
                        <p className="text-white/80 text-sm mb-3">{property.tagline}</p>
                      )}
                      <div className="flex items-center gap-1.5 text-white/60 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{property.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <div className="flex items-center text-[#cc00cc] font-medium text-sm">
                      <span>{t("viewProperty")}</span>
                      <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
