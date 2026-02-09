"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import Image from "next/image";

export function ZolaStory() {
  const t = useTranslations("about.zola");

  return (
    <section className="py-20 lg:py-28 bg-[#24272a] text-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <ScrollReveal direction="left">
            <p className="text-[#ff00ff] uppercase tracking-[0.3em] text-sm mb-4 font-bold">
              {t("subtitle")}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-8 leading-tight">
              {t("title")}
            </h2>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-white font-medium">{t("intro")}</p>
              <p>{t("story1")}</p>
              <p>{t("story2")}</p>
              <p>{t("story3")}</p>
              <p className="text-white italic">{t("closing")}</p>
            </div>
          </ScrollReveal>

          {/* Image Side - Pink Elephant */}
          <ScrollReveal direction="right" className="flex justify-center">
            <div className="relative">
              {/* Decorative pink glow */}
              <div className="absolute inset-0 bg-[#ff00ff]/20 blur-3xl rounded-full" />

              {/* Elephant Icon */}
              <div className="relative bg-gradient-to-br from-[#fff0ff] to-[#ff00ff] p-12 rounded-full">
                <Image
                  src="/elephant-icon.svg"
                  alt={t("imageAlt")}
                  width={200}
                  height={200}
                  className="w-48 h-48 lg:w-64 lg:h-64"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
