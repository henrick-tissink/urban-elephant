"use client";

import { Building, Map, Car, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/animations/scroll-reveal";

const services = [
  {
    key: "accommodation",
    icon: Building,
    href: "/properties",
  },
  {
    key: "tours",
    icon: Map,
    href: "/tours",
  },
  {
    key: "carHire",
    icon: Car,
    href: "/car-hire",
  },
];

export function ServicesPreview() {
  const t = useTranslations("services");

  return (
    <section className="py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <p className="text-[#cc00cc] uppercase tracking-[0.3em] text-sm mb-4">
            {t("subtitle")}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#24272a]">
            {t("title")}
          </h2>
        </ScrollReveal>

        {/* Services Grid */}
        <StaggerChildren staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.key}>
                <Link href={service.href} className="group block h-full">
                  <div className="bg-white p-8 lg:p-10 h-full border border-gray-200 hover:border-[#ff00ff] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-14 h-14 bg-[#fff0ff] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#ff00ff] transition-colors duration-300">
                      <Icon className="w-6 h-6 text-[#cc00cc] group-hover:text-white transition-colors duration-300" />
                    </div>

                    <h3 className="text-2xl font-light text-[#24272a] mb-4 group-hover:text-[#cc00cc] transition-colors">
                      {t(`${service.key}.title`)}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {t(`${service.key}.description`)}
                    </p>

                    <div className="flex items-center text-[#cc00cc] font-medium">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
