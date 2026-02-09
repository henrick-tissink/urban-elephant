"use client";

import Image from "next/image";
import { MapPin, Star, ExternalLink, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@/lib/sanity/portable-text";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/animations/scroll-reveal";
import type { Property } from "@/types";

interface PropertyDetailContentProps {
  property: Property;
}

export function PropertyDetailContent({ property }: PropertyDetailContentProps) {
  const t = useTranslations("properties");
  const tCommon = useTranslations("common");

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px]">
        {property.heroImage ? (
          <Image
            src={urlFor(property.heroImage).width(1920).height(1080).url()}
            alt={property.name}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-6 lg:px-12 pb-12">
            <ScrollReveal>
              {property.starRating && (
                <div className="flex items-center gap-1 text-[#ff6eff] mb-4">
                  {Array.from({ length: property.starRating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-2">
                {property.name}
              </h1>
              {property.tagline && (
                <p className="text-xl text-white/80 mb-4">{property.tagline}</p>
              )}
              <div className="flex items-center gap-2 text-white/60">
                <MapPin className="w-5 h-5" />
                <span>{property.location}</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              {property.description && (
                <ScrollReveal className="mb-12">
                  <h2 className="text-2xl font-light text-[#24272a] mb-6">About This Property</h2>
                  <PortableText value={property.description} className="prose max-w-none" />
                </ScrollReveal>
              )}

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <ScrollReveal className="mb-12">
                  <h2 className="text-2xl font-light text-[#24272a] mb-6">{t("amenities")}</h2>
                  <StaggerChildren staggerDelay={0.05} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.amenities.map((amenity, index) => (
                      <StaggerItem key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#fff0ff] rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-[#cc00cc]" />
                        </div>
                        <span className="text-gray-600">{amenity.name}</span>
                      </StaggerItem>
                    ))}
                  </StaggerChildren>
                </ScrollReveal>
              )}

              {/* Gallery */}
              {property.gallery && property.gallery.length > 0 && (
                <ScrollReveal className="mb-12">
                  <h2 className="text-2xl font-light text-[#24272a] mb-6">{t("gallery")}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.gallery.slice(0, 6).map((image, index) => (
                      <div key={index} className="aspect-square relative overflow-hidden bg-gray-100">
                        <Image
                          src={urlFor(image).width(400).height(400).url()}
                          alt={image.alt || `${property.name} gallery ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <ScrollReveal className="bg-gray-50 p-6 lg:p-8">
                  <h3 className="text-xl font-medium text-[#24272a] mb-6">
                    {t("bookThisProperty")}
                  </h3>

                  {property.address && (
                    <div className="mb-6">
                      <p className="text-sm text-gray-500 mb-1">{t("location")}</p>
                      <p className="text-[#24272a]">{property.address}</p>
                    </div>
                  )}

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    asChild
                  >
                    <a
                      href={property.nightsBridgeUrl || "https://book.nightsbridge.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("checkAvailability")}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Book direct for best rate guarantee
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
