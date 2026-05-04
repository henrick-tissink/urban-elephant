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
                src="/images/site/welcome.png"
                alt="Cape Town"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="eager"
              />
              {/* 4 Star eyebrow — restrained */}
              <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-anchor)]" />
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/95">{t("tagline")}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Content Side */}
          <ScrollReveal direction="right">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#24272a] mb-6 leading-tight tracking-tight text-balance">
              {t("title")}
            </h2>
            <p className="text-[var(--color-brand-anchor)] font-bold text-lg mb-4">
              {t("description")}
            </p>
            <p className="text-stone-600 leading-relaxed">
              {t("body")}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
