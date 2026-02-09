"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import Image from "next/image";

export function WelcomeSection() {
  const t = useTranslations("welcome");

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <ScrollReveal direction="left">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/hero-poster.jpg"
                alt="Cape Town cityscape"
                fill
                className="object-cover"
              />
              {/* 4 Star Badge */}
              <div className="absolute bottom-6 left-6 bg-[#ff00ff] text-white px-4 py-2 rounded">
                <p className="text-xs uppercase tracking-widest font-bold">{t("tagline")}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Content Side */}
          <ScrollReveal direction="right">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-[#24272a] mb-6 leading-tight">
              {t("title")}
            </h2>
            <p className="text-[#ff00ff] font-bold text-lg mb-4">
              {t("description")}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {t("body")}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
