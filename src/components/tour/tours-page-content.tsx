"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  ScrollReveal,
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/scroll-reveal";
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

      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="mb-14 border-b border-stone-200">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pb-1">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.value;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.value)}
                    className={cn(
                      "relative pb-3 -mb-px text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300",
                      isActive
                        ? "text-[var(--color-brand-anchor)]"
                        : "text-stone-500 hover:text-[#24272a]"
                    )}
                  >
                    {t(`categories.${cat.key}`)}
                    {isActive && (
                      <span className="absolute left-0 right-0 -bottom-px h-px bg-[var(--color-brand-anchor)]" />
                    )}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          <StaggerChildren
            staggerDelay={0.08}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
          >
            {filteredTours.map((tour) => (
              <StaggerItem key={tour._id}>
                <Link href={`/tours/${tour.slug}`} className="group block">
                  <div className="relative aspect-[5/4] overflow-hidden bg-stone-100">
                    {tour.image && (
                      <Image
                        src={tour.image}
                        alt={tour.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                  </div>

                  <div className="pt-5">
                    {tour.category && (
                      <p className="text-stone-400 text-[10px] uppercase tracking-[0.25em] mb-2">
                        {tour.category.replace("-", " & ")}
                      </p>
                    )}

                    <h3 className="text-2xl text-[#24272a] tracking-tight group-hover:text-[var(--color-brand-anchor)] transition-colors duration-500 mb-2">
                      {tour.name}
                    </h3>

                    {tour.shortDescription && (
                      <p className="text-stone-500 text-sm mb-4 line-clamp-2">
                        {tour.shortDescription}
                      </p>
                    )}

                    <div className="flex items-baseline justify-between text-sm pt-3 border-t border-stone-100">
                      <div className="flex items-center gap-1.5 text-stone-500">
                        {tour.duration ? (
                          <>
                            <Clock className="w-3.5 h-3.5" />
                            <span className="text-xs">{tour.duration}</span>
                          </>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[var(--color-brand-anchor)] font-medium">
                            {t("viewTour")}
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        )}
                      </div>
                      {tour.price && (
                        <div className="text-[#24272a] font-medium text-sm">
                          <span className="text-stone-400 text-xs uppercase tracking-wider mr-1.5">
                            {tCommon("from")}
                          </span>
                          R{tour.price.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>

          {filteredTours.length === 0 && (
            <div className="text-center py-12">
              <p className="text-stone-500">No tours found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
