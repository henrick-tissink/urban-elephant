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
    <section className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff00ff] to-[#cc00cc]" />
        {/* Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

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
                  size="xl"
                  className="bg-white text-[#ff00ff] hover:bg-[#fff0ff]"
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
