"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { MagneticButton } from "@/components/animations/magnetic-button";

interface CTASectionProps {
  bookNowUrl?: string;
}

export function CTASection({ bookNowUrl }: CTASectionProps) {
  const t = useTranslations("cta");

  return (
    <section className="relative py-32 lg:py-40 overflow-hidden bg-[#24272a]">
      {/* Brand-gradient wash anchored to one edge — references the logo without screaming */}
      <div
        className="absolute -top-1/3 -right-1/4 w-[80%] h-[160%] opacity-25 blur-3xl pointer-events-none"
        style={{ background: "var(--gradient-brand)" }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              {t("title")}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-white/90 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton>
                <Button
                  variant="primary"
                  size="xl"
                  asChild
                >
                  <a href={bookNowUrl || "https://book.nightsbridge.com"} target="_blank" rel="noopener noreferrer">
                    {t("primary")}
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button variant="outlineLight" size="xl" asChild>
                  <Link href="/properties">{t("secondary")}</Link>
                </Button>
              </MagneticButton>
            </div>
          </ScrollReveal>

          {/* Trust Indicators */}
          <ScrollReveal delay={0.6} className="mt-12 flex flex-wrap justify-center gap-6 text-white/80 text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Best Rate Guarantee
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Flexible Cancellation
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No Hidden Fees
            </span>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
