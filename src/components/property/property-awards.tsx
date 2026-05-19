"use client";

import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import type { PropertyAward } from "@/types";

interface PropertyAwardsProps {
  awards: PropertyAward[];
}

export function PropertyAwards({ awards }: PropertyAwardsProps) {
  const t = useTranslations("awards");
  if (!awards.length) return null;

  return (
    <section className="py-20 lg:py-28 bg-[#24272a] relative overflow-hidden">
      <div
        className="absolute -top-1/3 -right-1/4 w-[60%] h-[160%] opacity-30 blur-3xl pointer-events-none"
        style={{ background: "var(--gradient-brand)" }}
      />
      <div className="relative container mx-auto px-6 lg:px-12">
        <ScrollReveal className="max-w-3xl">
          <p className="text-[var(--color-brand-soft)] uppercase tracking-[0.3em] text-xs mb-5">
            {t("eyebrow")}
          </p>
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-8 items-end">
            {awards.map((award) => (
              <div
                key={`${award.provider}-${award.year}`}
                className="lg:col-span-7"
              >
                <p className="font-display text-white/90 text-2xl md:text-3xl font-light leading-tight mb-4 text-balance">
                  {t("bookingTitle")} · {award.year}
                </p>
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-[var(--color-brand-anchor)] text-6xl md:text-7xl font-light tracking-tight">
                    {award.score.toFixed(1)}
                  </span>
                  <span className="text-white/60 text-sm uppercase tracking-[0.25em]">
                    {t("scoreSuffix")}
                  </span>
                </div>
                <Button variant="tertiary" size="lg" asChild>
                  <a
                    href={award.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("viewCertificate")}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
