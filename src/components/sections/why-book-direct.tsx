"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/animations/scroll-reveal";

const itemKeys = ["rates", "offers", "flex", "concierge"] as const;

export function WhyBookDirect() {
  const t = useTranslations("whyBookDirect");

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <ScrollReveal className="max-w-3xl mb-14 lg:mb-20">
          <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-5">
            {t("eyebrow")}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#24272a] leading-tight tracking-tight text-balance">
            {t("title")}
          </h2>
          <p className="mt-6 text-stone-600 text-lg leading-relaxed max-w-2xl">
            {t("intro")}
          </p>
        </ScrollReveal>

        <StaggerChildren staggerDelay={0.1} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {itemKeys.map((key, i) => (
            <StaggerItem key={key}>
              <article className="bg-stone-50 p-8 lg:p-10 h-full border border-stone-200/70 relative">
                <p className="text-[var(--color-brand-anchor)] font-bold text-sm mb-4">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-lg md:text-xl text-[#24272a] mb-3 tracking-tight">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
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
