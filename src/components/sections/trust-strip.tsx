"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

function TGCSABadge() {
  return (
    <Image
      src="/badges/tgcsa-star.png"
      alt="Tourism Grading Council of South Africa"
      width={44}
      height={44}
      className="shrink-0 w-11 h-11 object-contain"
      priority
    />
  );
}

export function TrustStrip() {
  const t = useTranslations("trust");

  const items = [
    { titleKey: "gradedTitle", descKey: "gradedDescription", icon: <TGCSABadge /> },
    {
      titleKey: "managedTitle",
      descKey: "managedDescription",
      icon: (
        <Check
          strokeWidth={1.6}
          className="w-9 h-9 text-[var(--color-brand-anchor)] shrink-0"
          aria-hidden="true"
        />
      ),
    },
    {
      titleKey: "directTitle",
      descKey: "directDescription",
      icon: (
        <Check
          strokeWidth={1.6}
          className="w-9 h-9 text-[var(--color-brand-anchor)] shrink-0"
          aria-hidden="true"
        />
      ),
    },
  ];

  return (
    <section
      aria-label="Credentials"
      className="bg-white border-b border-stone-200/70"
    >
      <div className="container mx-auto px-6 lg:px-12 py-8 lg:py-10">
        <ScrollReveal>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {items.map((item) => (
              <li
                key={item.titleKey}
                className="flex items-center gap-4 md:justify-center"
              >
                {item.icon}
                <div>
                  <p className="font-bold uppercase tracking-[0.18em] text-xs text-[#24272a]">
                    {t(item.titleKey)}
                  </p>
                  <p className="text-stone-500 text-[11px] mt-0.5 leading-snug">
                    {t(item.descKey)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
