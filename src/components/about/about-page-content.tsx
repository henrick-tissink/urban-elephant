"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/animations/scroll-reveal";
import { Parallax } from "@/components/animations/parallax";
import { ZolaStory } from "@/components/sections/zola-story";
import { TGCSAStars } from "@/components/atoms/tgcsa-stars";

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
            <p className="text-[var(--color-brand-mid)] uppercase tracking-[0.3em] text-sm mb-4">
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
              <div className="aspect-[4/5] bg-stone-200 relative overflow-hidden">
                <Image
                  src="/images/site/founder.png"
                  alt={`${t("founderName")} — ${t("founderTitle")}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
              <Parallax speed={0.2} direction="up" className="absolute -bottom-8 -right-8 w-48 h-48 -z-10">
                <div className="w-full h-full bg-[var(--color-brand-anchor)]" />
              </Parallax>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <h2 className="text-3xl md:text-4xl font-light text-[#24272a] mb-6">
                {t("title")}
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p className="text-[#24272a] font-medium">{t("intro")}</p>
                <p>{t("story1")}</p>
                <p>{t("story2")}</p>
                <p>{t("story3")}</p>
                <p>{t("story4")}</p>
                <p className="text-[#24272a]/80">{t("team")}</p>
              </div>

              {/* Credential — family voice meets official grading */}
              <div className="mt-10 pt-8 border-t border-stone-200 flex items-start gap-4">
                <TGCSAStars count={4} size={24} className="mt-0.5" />
                <p className="text-stone-500 text-xs uppercase tracking-[0.2em] leading-snug">
                  {tCommon("gradedCredential")}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Credentials — TGCSA plaque + Cape Town Tourism, with downloadable certificates */}
      <section className="py-16 lg:py-24 bg-stone-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <ScrollReveal direction="left">
              <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-5">
                {t("credentials.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#24272a] leading-tight tracking-tight text-balance mb-6">
                {t("credentials.title")}
              </h2>
              <p className="text-stone-600 text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
                {t("credentials.intro")}
              </p>

              <ul className="space-y-5">
                <li>
                  <a
                    href="/documents/tgcsa-certificate.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-4 bg-white border border-stone-200/70 hover:border-[var(--color-brand-anchor)] transition-colors"
                  >
                    <Image
                      src="/badges/tgcsa-star.png"
                      alt=""
                      width={48}
                      height={48}
                      className="shrink-0 object-contain"
                      aria-hidden="true"
                    />
                    <div className="flex-1">
                      <p className="font-bold uppercase tracking-[0.18em] text-xs text-[#24272a]">
                        {t("credentials.tgcsaLabel")}
                      </p>
                      <p className="text-stone-500 text-sm mt-1 leading-snug">
                        {t("credentials.tgcsaDescription")}
                      </p>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[var(--color-brand-anchor)] group-hover:underline">
                        {t("credentials.tgcsaCta")} →
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="/documents/ctt-membership-certificate.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-4 bg-white border border-stone-200/70 hover:border-[var(--color-brand-anchor)] transition-colors"
                  >
                    <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-[var(--color-brand-anchor)] text-white font-bold tracking-tight">
                      CTT
                    </div>
                    <div className="flex-1">
                      <p className="font-bold uppercase tracking-[0.18em] text-xs text-[#24272a]">
                        {t("credentials.cttLabel")}
                      </p>
                      <p className="text-stone-500 text-sm mt-1 leading-snug">
                        {t("credentials.cttDescription")}
                      </p>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[var(--color-brand-anchor)] group-hover:underline">
                        {t("credentials.cttCta")} →
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </ScrollReveal>

            <ScrollReveal direction="right" className="space-y-6">
              <div className="bg-white p-4 lg:p-6 border border-stone-200/70 shadow-sm">
                <div className="relative aspect-[4/3] bg-stone-100">
                  <Image
                    src="/images/about/tgcsa-plaque.jpg"
                    alt={t("credentials.plaqueAlt")}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
                <p className="mt-4 text-stone-500 text-xs uppercase tracking-[0.2em] text-center">
                  {t("credentials.plaqueAlt")}
                </p>
              </div>

              {/* Official Urban Elephant master mark — pink lockup with TGCSA stars baked in */}
              <div className="bg-white p-6 lg:p-8 border border-stone-200/70 shadow-sm flex items-center gap-6">
                <div className="relative w-28 h-32 shrink-0">
                  <Image
                    src="/badges/urban-elephant-master-lockup.jpg"
                    alt={t("credentials.lockupAlt")}
                    fill
                    sizes="112px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="font-bold uppercase tracking-[0.18em] text-xs text-[#24272a]">
                    {t("credentials.lockupLabel")}
                  </p>
                  <p className="text-stone-500 text-sm mt-1 leading-snug">
                    {t("credentials.lockupDescription")}
                  </p>
                </div>
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
              <p className="text-[var(--color-brand-mid)] font-medium text-lg">{t("founderName")}</p>
              <p className="text-white/60 text-sm">{t("founderTitle")}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-stone-50">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-[#24272a] mb-4">
              {t("values.title")}
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
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
                  <p className="text-stone-600 leading-relaxed">
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
            <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
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
