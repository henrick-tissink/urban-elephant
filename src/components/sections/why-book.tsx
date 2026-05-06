"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/animations/scroll-reveal";

const itemKeys = ["graded", "locations", "comfort", "managed"] as const;

export function WhyBook() {
  const t = useTranslations("whyBook");

  return (
    <section className="py-20 lg:py-28 bg-stone-50">
      <div className="container mx-auto px-6 lg:px-12">
        <ScrollReveal className="max-w-3xl mb-14 lg:mb-20">
          <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-5">
            {t("eyebrow")}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#24272a] leading-tight tracking-tight text-balance">
            {t("title")}
          </h2>
        </ScrollReveal>

        <StaggerChildren staggerDelay={0.1} className="grid md:grid-cols-2 gap-x-12 gap-y-12 lg:gap-y-16">
          {itemKeys.map((key) => (
            <StaggerItem key={key}>
              <article>
                <h3 className="text-xl md:text-2xl text-[#24272a] mb-3 tracking-tight">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-stone-600 leading-relaxed max-w-md">
                  {t(`items.${key}.description`)}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
