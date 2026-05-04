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
              {/* Main Image */}
              <div className="aspect-[4/5] relative overflow-hidden bg-stone-100">
                <Image
                  src="/images/site/about.jpg"
                  alt="Urban Elephant — Cape Town hospitality"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  loading="eager"
                />
              </div>

              {/* Decorative gradient wash — references the logo without shouting */}
              <Parallax speed={0.2} direction="up" className="absolute -bottom-8 -right-8 w-48 h-48 -z-10">
                <div
                  className="w-full h-full opacity-60"
                  style={{ background: "var(--gradient-brand)" }}
                />
              </Parallax>

              {/* Quote Card */}
              <ScrollReveal delay={0.4} className="absolute -bottom-6 left-6 right-6 lg:left-12 lg:-right-12">
                <div className="bg-white p-6 shadow-xl">
                  <p className="text-stone-600 italic mb-3 text-balance">
                    &ldquo;{t("founderQuote")}&rdquo;
                  </p>
                  <p className="text-[var(--color-brand-anchor)] font-medium">— {t("founderName")}, {t("founderTitle")}</p>
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>

          {/* Content Side */}
          <ScrollReveal direction="right">
            <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-sm mb-4 font-bold">
              {t("subtitle")}
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-[#24272a] mb-6 leading-tight tracking-tight text-balance">
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
