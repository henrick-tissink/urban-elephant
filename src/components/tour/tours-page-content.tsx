"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/animations/scroll-reveal";
import type { TourCard } from "@/types";

interface ToursPageContentProps {
  tours: TourCard[];
}

const categories = [
  { key: "all", value: undefined },
  { key: "adventure", value: "adventure" },
  { key: "wildlife", value: "wildlife" },
  { key: "cultural", value: "cultural" },
  { key: "wine-food", value: "wine-food" },
  { key: "sightseeing", value: "sightseeing" },
  { key: "water-sports", value: "water-sports" },
];

export function ToursPageContent({ tours }: ToursPageContentProps) {
  const t = useTranslations("tours");
  const tCommon = useTranslations("common");
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);

  const filteredTours = activeCategory
    ? tours.filter((tour) => tour.category === activeCategory)
    : tours;

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

      {/* Filters & Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Category Filters */}
          <ScrollReveal className="mb-12">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.value)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-all",
                    activeCategory === cat.value
                      ? "bg-[#ff00ff] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {t(`categories.${cat.key}`)}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Tours Grid */}
          <StaggerChildren staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <StaggerItem key={tour._id}>
                <Link href={`/tours/${tour.slug.current}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 mb-4">
                    {tour.image ? (
                      <Image
                        src={urlFor(tour.image).width(600).height(450).url()}
                        alt={tour.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
                    )}

                    {tour.category && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-[#24272a] capitalize">
                        {tour.category.replace("-", " & ")}
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-light text-[#24272a] group-hover:text-[#cc00cc] transition-colors mb-2">
                    {tour.name}
                  </h3>

                  {tour.shortDescription && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {tour.shortDescription}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-gray-500">
                      {tour.duration && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {tour.duration}
                        </span>
                      )}
                    </div>
                    {tour.price && (
                      <div className="text-[#cc00cc] font-medium">
                        {tCommon("from")} R{tour.price.toLocaleString()}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center text-[#cc00cc] font-medium text-sm mt-4">
                    <span>{t("viewTour")}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>

          {filteredTours.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No tours found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
