"use client";

import Image from "next/image";
import { Clock, Users, MapPin, Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/animations/scroll-reveal";
import type { Tour } from "@/types";

interface TourDetailContentProps {
  tour: Tour;
}

export function TourDetailContent({ tour }: TourDetailContentProps) {
  const t = useTranslations("tours");
  const tCommon = useTranslations("common");

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        {tour.image ? (
          <Image
            src={tour.image}
            alt={tour.name}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-300 to-stone-400" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-6 lg:px-12 pb-12">
            <ScrollReveal>
              {tour.category && (
                <span className="inline-block bg-[var(--color-brand-anchor)] text-white px-3 py-1 text-sm mb-4 capitalize">
                  {tour.category.replace("-", " & ")}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
                {tour.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                {tour.duration && (
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    {tour.duration}
                  </span>
                )}
                {tour.groupSize && (
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    {tour.groupSize.min}-{tour.groupSize.max} people
                  </span>
                )}
                {tour.meetingPoint && (
                  <span className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {tour.meetingPoint}
                  </span>
                )}
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
              {tour.description && tour.description.length > 0 && (
                <ScrollReveal className="mb-12">
                  <div className="prose max-w-none space-y-4 text-stone-600 leading-relaxed">
                    {tour.description.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </ScrollReveal>
              )}

              {/* Highlights */}
              {tour.highlights && tour.highlights.length > 0 && (
                <ScrollReveal className="mb-12">
                  <h2 className="text-2xl text-[#24272a] mb-6">{t("highlights")}</h2>
                  <StaggerChildren staggerDelay={0.05} className="space-y-3">
                    {tour.highlights.map((highlight, index) => (
                      <StaggerItem key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[var(--color-brand-soft)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-[var(--color-brand-anchor)]" />
                        </div>
                        <span className="text-stone-600">{highlight}</span>
                      </StaggerItem>
                    ))}
                  </StaggerChildren>
                </ScrollReveal>
              )}

              {/* What's Included / Excluded */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {tour.includes && tour.includes.length > 0 && (
                  <ScrollReveal>
                    <h2 className="text-xl font-medium text-[#24272a] mb-4">{t("includes")}</h2>
                    <ul className="space-y-2">
                      {tour.includes.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-stone-600">
                          <Check className="w-4 h-4 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>
                )}

                {tour.excludes && tour.excludes.length > 0 && (
                  <ScrollReveal delay={0.1}>
                    <h2 className="text-xl font-medium text-[#24272a] mb-4">{t("excludes")}</h2>
                    <ul className="space-y-2">
                      {tour.excludes.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-stone-600">
                          <X className="w-4 h-4 text-red-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <ScrollReveal className="bg-stone-50 p-6 lg:p-8">
                  {tour.price && (
                    <div className="mb-6">
                      <p className="text-sm text-stone-500">{tCommon("from")}</p>
                      <p className="text-4xl font-light text-[#24272a]">
                        R{tour.price.toLocaleString()}
                      </p>
                      {tour.priceNote && (
                        <p className="text-sm text-stone-500">{tour.priceNote}</p>
                      )}
                    </div>
                  )}

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full mb-4"
                    asChild
                  >
                    <Link href="/contact">{t("bookTour")}</Link>
                  </Button>

                  <p className="text-xs text-stone-500 text-center">
                    Contact us to book this tour
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
