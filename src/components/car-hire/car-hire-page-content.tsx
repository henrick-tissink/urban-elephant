"use client";

import { useState } from "react";
import Image from "next/image";
import { Users, Briefcase, Cog } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/animations/scroll-reveal";
import type { CarHireVehicle } from "@/types";

interface CarHirePageContentProps {
  vehicles: CarHireVehicle[];
}

const categories = [
  { key: "all", value: undefined },
  { key: "compact", value: "compact" },
  { key: "sedan", value: "sedan" },
  { key: "suv", value: "suv" },
  { key: "luxury", value: "luxury" },
];

export function CarHirePageContent({ vehicles }: CarHirePageContentProps) {
  const t = useTranslations("carHire");
  const tCommon = useTranslations("common");
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);

  const filteredVehicles = activeCategory
    ? vehicles.filter((v) => v.category === activeCategory)
    : vehicles;

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

          {/* Vehicles Grid */}
          <StaggerChildren staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <StaggerItem key={vehicle._id}>
                <div className="bg-gray-50 overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {vehicle.image ? (
                      <Image
                        src={urlFor(vehicle.image).width(600).height(450).url()}
                        alt={vehicle.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-400">{vehicle.name}</span>
                      </div>
                    )}

                    {vehicle.category && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-[#24272a] capitalize">
                        {vehicle.category}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-medium text-[#24272a] mb-3">
                      {vehicle.name}
                    </h3>

                    {vehicle.specs && (
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        {vehicle.specs.passengers && (
                          <span className="flex items-center gap-1.5">
                            <Users className="w-4 h-4" />
                            {vehicle.specs.passengers}
                          </span>
                        )}
                        {vehicle.specs.luggage && (
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="w-4 h-4" />
                            {vehicle.specs.luggage}
                          </span>
                        )}
                        {vehicle.specs.transmission && (
                          <span className="flex items-center gap-1.5">
                            <Cog className="w-4 h-4" />
                            {vehicle.specs.transmission}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      {vehicle.pricePerDay && (
                        <div>
                          <span className="text-2xl font-light text-[#24272a]">
                            R{vehicle.pricePerDay.toLocaleString()}
                          </span>
                          <span className="text-gray-500 text-sm">/{tCommon("perDay")}</span>
                        </div>
                      )}
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/contact">{t("inquire")}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No vehicles found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
