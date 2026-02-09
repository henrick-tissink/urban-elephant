"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/animations/scroll-reveal";
import { Parallax } from "@/components/animations/parallax";
import { ZolaStory } from "@/components/sections/zola-story";

export function AboutPageContent() {
  const t = useTranslations("about");
  const tCommon = useTranslations("common");

  const valueKeys = ["authentic", "detail", "local", "sustainable"] as const;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#24272a]">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <p className="text-[#ff6eff] uppercase tracking-[0.3em] text-sm mb-4">
              {t("subtitle")}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
              {t("tagline")}
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left" className="relative">
              <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <span className="text-gray-500">Founder Image</span>
                </div>
              </div>
              <Parallax speed={0.2} direction="up" className="absolute -bottom-8 -right-8 w-48 h-48 -z-10">
                <div className="w-full h-full bg-[#ff00ff]" />
              </Parallax>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <h2 className="text-3xl md:text-4xl font-light text-[#24272a] mb-6">
                {t("title")}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-[#24272a] font-medium">{t("intro")}</p>
                <p>{t("story1")}</p>
                <p>{t("story2")}</p>
                <p>{t("story3")}</p>
                <p>{t("story4")}</p>
                <p className="text-[#24272a]/80">{t("team")}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Zola's Story Section */}
      <ZolaStory />

      {/* Quote Section */}
      <section className="py-16 lg:py-24 bg-[#24272a]">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="max-w-4xl mx-auto text-center">
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-8">
              &ldquo;{t("founderQuote")}&rdquo;
            </blockquote>
            <div>
              <p className="text-[#ff6eff] font-medium text-lg">{t("founderName")}</p>
              <p className="text-white/60 text-sm">{t("founderTitle")}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-[#24272a] mb-4">
              {t("values.title")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("values.subtitle")}
            </p>
          </ScrollReveal>

          <StaggerChildren staggerDelay={0.1} className="grid md:grid-cols-2 gap-8">
            {valueKeys.map((key) => (
              <StaggerItem key={key}>
                <div className="bg-white p-8 lg:p-10 h-full">
                  <h3 className="text-xl font-medium text-[#24272a] mb-4">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(`values.${key}.description`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-light text-[#24272a] mb-6">
              {t("cta.title")}
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" asChild>
                <Link href="/properties">{tCommon("viewDetails")}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">{tCommon("contactUs")}</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
