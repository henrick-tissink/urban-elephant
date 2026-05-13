"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/animations/scroll-reveal";

const itemKeys = ["rates", "offers", "flex", "concierge"] as const;

export function WhyBookDirect() {
  const t = useTranslations("whyBookDirect");

  return (
    <section className="relative py-20 lg:py-28 bg-[#24272a] text-white overflow-hidden">
      <div
        className="absolute -top-1/3 -right-1/4 w-[80%] h-[160%] opacity-25 blur-3xl pointer-events-none"
        style={{ background: "var(--gradient-brand)" }}
        aria-hidden
      />
      <div className="relative container mx-auto px-6 lg:px-12">
        <ScrollReveal className="max-w-3xl mb-14 lg:mb-20">
          <p className="text-[var(--color-brand-mid)] uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-5">
            {t("eyebrow")}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white leading-tight tracking-tight text-balance">
            {t("title")}
          </h2>
          <p className="mt-6 text-white/80 text-lg leading-relaxed max-w-2xl">
            {t("intro")}
          </p>
        </ScrollReveal>

        <StaggerChildren staggerDelay={0.1} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {itemKeys.map((key, i) => (
            <StaggerItem key={key}>
              <article className="bg-white p-8 lg:p-10 h-full border border-white/10 relative">
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
