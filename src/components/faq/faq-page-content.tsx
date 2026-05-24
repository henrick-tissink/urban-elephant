"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { BrandDivider } from "@/components/global/brand-divider";
import { Button } from "@/components/ui/button";
import { TGCSAStars } from "@/components/atoms/tgcsa-stars";
import { properties } from "@/data/content";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";
import { pickOptional } from "@/lib/i18n-content";
import { Price } from "@/components/atoms/price";

type Group = {
  key: string;
  items: string[];
};

const FAQ_GROUPS: Group[] = [
  { key: "arrival", items: ["checkIn", "checkOut", "reception", "keys", "parking"] },
  {
    key: "stay",
    items: ["wifi", "aircon", "housekeeping", "laundry", "gymPool", "smoking", "views"],
  },
  {
    key: "neighbourhood",
    items: ["distances", "safety", "amenitiesNearby", "airportTours"],
  },
  { key: "family", items: ["cots"] },
];

interface FaqItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

function FaqItem({ question, answer, defaultOpen = false }: FaqItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-stone-200">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left"
        aria-expanded={open}
      >
        <span className="text-lg md:text-xl text-[#24272a] font-medium leading-snug pr-4">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-stone-500 mt-1 shrink-0 transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-10 text-stone-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqPageContent() {
  const t = useTranslations("faq");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#24272a]">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <p className="text-[var(--color-brand-mid)] uppercase tracking-[0.3em] text-sm mb-4">
              {t("eyebrow")}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-[1.05]">
              {t("title")}
            </h1>
            <p className="text-stone-300 text-lg md:text-xl leading-relaxed max-w-2xl">
              {t("subtitle")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <BrandDivider />

      {/* FAQ groups */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto space-y-16">
            {FAQ_GROUPS.map((group, groupIdx) => (
              <ScrollReveal key={group.key}>
                <h2 className="text-2xl md:text-3xl text-[#24272a] font-light mb-4">
                  {t(`groups.${group.key}.title`)}
                </h2>
                <div className="border-t border-stone-200">
                  {group.items.map((item, i) => (
                    <FaqItem
                      key={item}
                      question={t(`groups.${group.key}.items.${item}.q`)}
                      answer={t(`groups.${group.key}.items.${item}.a`)}
                      defaultOpen={groupIdx === 0 && i === 0}
                    />
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Property picker — convert FAQ traffic to property pages */}
      <BrandDivider />
      <section className="py-20 lg:py-28 bg-stone-50 border-t border-stone-200">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs mb-4">
              {t("pickerEyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#24272a] tracking-tight font-light">
              {t("pickerHeading")}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {properties.map((property) => (
              <ScrollReveal key={property._id}>
                <Link
                  href={`/properties/${property.slug}`}
                  className="group block bg-white border border-stone-200 hover:border-[var(--color-brand-anchor)] hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {property.heroImage && (
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                      <Image
                        src={property.heroImage}
                        alt={`Urban Elephant at ${property.name} — ${pickOptional(property.location, locale) ?? "Cape Town"}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <TGCSAStars count={property.starRating ?? 4} size={12} />
                      <span className="text-stone-400 text-[10px] uppercase tracking-[0.2em]">
                        TGCSA
                      </span>
                    </div>
                    <p className="text-[#24272a] font-medium text-lg leading-tight mb-1">
                      {property.name}
                    </p>
                    <p className="text-stone-500 text-sm mb-3">{pickOptional(property.location, locale)}</p>
                    {property.priceRange && (
                      <p className="text-[var(--color-brand-anchor)] text-sm font-medium">
                        From <Price zar={property.priceRange.min} suffix="/ night" />
                      </p>
                    )}
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Still have a question */}
      <section className="py-16 lg:py-24 bg-white border-t border-stone-200">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-[#24272a] mb-4">
              {t("askLabel")}
            </h2>
            <p className="text-stone-600 leading-relaxed mb-8">
              {t("askDescription")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="/contact">{tCommon("contactUs")}</Link>
              </Button>
              <Button asChild variant="outline">
                <a
                  href="https://wa.me/27726188140"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp Guest Relations
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
