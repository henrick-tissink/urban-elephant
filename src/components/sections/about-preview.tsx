"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Parallax } from "@/components/animations/parallax";
import Image from "next/image";

export function AboutPreview() {
  const t = useTranslations("about");
  const tCommon = useTranslations("common");

  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <ScrollReveal direction="left" className="relative">
            <div className="relative">
              {/* Main Image - Placeholder */}
              <div className="aspect-[4/5] relative overflow-hidden bg-gradient-to-br from-[var(--color-brand-wash)] to-[var(--color-brand-soft)] flex items-center justify-center">
                <div className="text-center p-8">
                  <Image
                    src="/elephant-icon.svg"
                    alt="Urban Elephant"
                    width={120}
                    height={120}
                    className="mx-auto mb-4 opacity-60"
                  />
                  <p className="text-[var(--color-brand-anchor)]/60 text-sm uppercase tracking-widest">Founder Image</p>
                </div>
              </div>

              {/* Decorative Element - Pink */}
              <Parallax speed={0.2} direction="up" className="absolute -bottom-8 -right-8 w-48 h-48 -z-10">
                <div className="w-full h-full bg-[var(--color-brand-anchor)]" />
              </Parallax>

              {/* Quote Card */}
              <ScrollReveal delay={0.4} className="absolute -bottom-6 left-6 right-6 lg:left-12 lg:-right-12">
                <div className="bg-white p-6 shadow-xl">
                  <p className="text-stone-600 italic mb-3">
                    &ldquo;{t("founderQuote")}&rdquo;
                  </p>
                  <p className="text-[var(--color-brand-anchor)] font-bold">— {t("founderName")}, {t("founderTitle")}</p>
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>

          {/* Content Side */}
          <ScrollReveal direction="right">
            <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-sm mb-4 font-bold">
              {t("subtitle")}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase text-[#24272a] mb-6 leading-tight">
              {t("title")}
            </h2>

            <div className="space-y-4 text-stone-600 mb-8 leading-relaxed">
              <p>{t("intro")}</p>
              <p>{t("story1")}</p>
              <p>{t("story2")}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" asChild>
                <Link href="/about">{tCommon("learnMore")}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">{tCommon("contactUs")}</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
