"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { CarHireWidget } from "@/components/car-hire/car-hire-widget";

export function CarHirePageContent() {
  const t = useTranslations("carHire");

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#24272a]">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <p className="text-[var(--color-brand-mid)] uppercase tracking-[0.3em] text-sm mb-4">
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

      {/* Enterprise partner intro + embedded booking widget */}
      <section className="py-16 lg:py-24 bg-[var(--color-brand-wash)]/40">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto mb-10 lg:mb-12 text-center">
              <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs mb-4 font-bold">
                {t("enterprise.kicker")}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#24272a] mb-5 tracking-tight text-balance">
                {t("enterprise.title")}
              </h2>
              <p className="text-stone-600 text-base md:text-lg leading-relaxed text-balance">
                {t("enterprise.body")}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="max-w-5xl mx-auto bg-white shadow-sm border border-stone-200/70 p-4 sm:p-6 lg:p-8">
              <CarHireWidget />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <p className="max-w-2xl mx-auto mt-10 lg:mt-12 text-center text-stone-500 text-sm leading-relaxed">
              {t("enterprise.footnote")}
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
