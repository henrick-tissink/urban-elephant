"use client";

import Image from "next/image";
import { Phone, Mail, Star, Heart, ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

// Deterministic star field (no Math.random → no hydration mismatch). Biased to
// the upper "sky" where Rachel's shooting star flies. Twinkle is CSS-only and
// respects prefers-reduced-motion (see .rw-star in globals.css).
const STARS = Array.from({ length: 34 }, (_, i) => ({
  top: (i * 53 + 11) % 72,
  left: (i * 29 + 7) % 100,
  size: 1 + (i % 3),
  delay: ((i * 7) % 40) / 10,
}));

// What Rachel's Wishes does — kept as a plain, dignified list, not gaudy cards.
const FOCUS = [
  "Everyday essentials — food, clothing, books, toys and toiletries",
  "Premature babies and their mothers",
  "Early-literacy projects for young children",
  "Fundraising for other organisations that help children",
  "Support across hospitals, townships and early-childhood-development centres",
];

export function GivingBackContent() {
  return (
    <>
      {/* Hero — a night sky, where the shooting star belongs */}
      <section className="relative overflow-hidden bg-[#14161a] pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div aria-hidden className="absolute inset-0">
          {STARS.map((s, i) => (
            <span
              key={i}
              className="rw-star"
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </div>
        {/* soft pink wash — the thread that ties the two brands together */}
        <div
          aria-hidden
          className="absolute -top-1/4 right-0 w-[70%] h-[150%] opacity-20 blur-3xl pointer-events-none"
          style={{ background: "var(--gradient-brand)" }}
        />

        <div className="relative container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[var(--color-brand-mid)] uppercase tracking-[0.3em] text-xs font-bold mb-8">
              Giving Back
            </p>
            <Image
              src="/images/partners/rachels-wishes.png"
              alt="Rachel's Wishes"
              width={1595}
              height={591}
              priority
              className="mx-auto w-full max-w-sm sm:max-w-md h-auto mb-10"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] text-balance">
              A Legacy of Love
            </h1>
            <p className="mt-7 text-white/75 text-lg leading-relaxed max-w-2xl mx-auto">
              At Urban Elephant, we believe a successful business should make a
              difference beyond its own front door. We&rsquo;re proud to partner
              with Rachel&rsquo;s Wishes — a Western Cape charity improving the
              lives of vulnerable children and families.
            </p>
          </div>
        </div>
      </section>

      {/* The story */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto space-y-6 text-lg leading-relaxed text-stone-600">
            <ScrollReveal>
              <p>
                <span className="text-[#24272a]">
                  Rachel&rsquo;s Wishes was founded by Christine Adcock in 2014
                </span>
                , in memory of her daughter Rachel, who passed away at just three
                years old. In the years since, Rachel&rsquo;s legacy has touched
                tens of thousands of children.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p>
                The charity works across hospitals, townships and
                early-childhood-development centres — providing food, clothing,
                books, toys, toiletries and other essentials. It supports
                premature babies and their mothers, develops early-literacy
                projects, and raises funds for other organisations helping
                children.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p>
                Urban Elephant is proud to support this remarkable work, and to
                help Rachel&rsquo;s legacy reach even more children.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal className="max-w-2xl mx-auto mt-14">
            <h2 className="text-sm uppercase tracking-[0.25em] text-[var(--color-brand-anchor)] font-bold mb-6">
              How they help
            </h2>
            <ul className="space-y-4">
              {FOCUS.map((item, i) => (
                <li key={i} className="flex items-start gap-3.5">
                  <Star
                    className="w-4 h-4 text-[var(--color-brand-anchor)] fill-[var(--color-brand-anchor)] flex-shrink-0 mt-1.5"
                    aria-hidden
                  />
                  <span className="text-stone-700">{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Get involved */}
      <section className="py-20 lg:py-28 bg-[var(--color-brand-wash)]">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="max-w-2xl mx-auto text-center">
            <Heart
              className="w-8 h-8 text-[var(--color-brand-anchor)] mx-auto mb-6"
              aria-hidden
            />
            <h2 className="text-3xl md:text-4xl font-light text-[#24272a] leading-tight mb-4">
              Get Involved
            </h2>
            <p className="text-stone-600 text-lg mb-10">
              To donate, sponsor a project, or offer practical support, reach out
              to Christine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+27769199629"
                className="inline-flex items-center justify-center gap-2.5 border border-[var(--color-brand-soft)] bg-white px-5 py-3.5 rounded-full text-[#24272a] font-medium hover:border-[var(--color-brand-anchor)] hover:text-[var(--color-brand-anchor)] transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden />
                076 919 9629
              </a>
              <a
                href="mailto:christine@rachelswishes.com"
                className="inline-flex items-center justify-center gap-2.5 border border-[var(--color-brand-soft)] bg-white px-5 py-3.5 rounded-full text-[#24272a] font-medium hover:border-[var(--color-brand-anchor)] hover:text-[var(--color-brand-anchor)] transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden />
                christine@rachelswishes.com
              </a>
            </div>
            <a
              href="https://rachelswishes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-8 text-sm font-medium text-[var(--color-brand-anchor)] hover:underline underline-offset-4"
            >
              Visit rachelswishes.com
              <ExternalLink className="w-3.5 h-3.5" aria-hidden />
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
