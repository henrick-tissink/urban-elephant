"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { BrandDivider } from "@/components/global/brand-divider";
import type { Property } from "@/types";

interface PropertyDetailContentProps {
  property: Property;
}

export function PropertyDetailContent({ property }: PropertyDetailContentProps) {
  const t = useTranslations("properties");

  const [showBookingBar, setShowBookingBar] = useState(false);
  useEffect(() => {
    const handler = () => setShowBookingBar(window.scrollY > window.innerHeight * 0.6);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const description = property.description ?? [];
  const lead = description[0];
  const body = description.slice(1);
  const galleryImages = property.gallery ?? [];

  // Image+text interleave: pair body paragraphs with gallery images, leaving
  // the rest of the gallery for the closing grid.
  const interleavedPairs = body.slice(0, 2).map((paragraph, i) => ({
    paragraph,
    image: galleryImages[i] ?? property.heroImage,
    flip: i % 2 === 1,
  }));
  const tailParagraphs = body.slice(2);
  const tailGallery = galleryImages.slice(2);

  const stars = property.starRating ?? 0;

  return (
    <article className="bg-white">
      {/* Hero — full-bleed image with type sitting OVER the photograph */}
      <header className="relative h-[88vh] min-h-[640px] w-full overflow-hidden bg-[#24272a]">
        {property.heroImage && (
          <Image
            src={property.heroImage}
            alt={property.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="container mx-auto px-6 lg:px-12 pb-16 lg:pb-20">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-6">
                {stars > 0 && (
                  <div className="flex items-center gap-1 text-[var(--color-brand-soft)]">
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                )}
                <span className="text-white/70 text-xs uppercase tracking-[0.3em]">
                  {property.location}
                </span>
              </div>
              <h1 className="text-white text-balance leading-[0.92]">
                <span className="block text-[clamp(3.5rem,11vw,11rem)] font-light tracking-[-0.04em]">
                  {property.name}
                </span>
              </h1>
              {property.tagline && (
                <p className="text-white/80 text-base md:text-lg max-w-xl mt-6 text-balance font-light leading-relaxed">
                  {property.tagline}
                </p>
              )}
            </ScrollReveal>
          </div>
        </div>
      </header>

      {/* Lead paragraph with drop cap */}
      {lead && (
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-x-12 gap-y-8">
              <ScrollReveal className="lg:col-span-3">
                <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs">
                  About
                </p>
                <p className="text-stone-400 text-xs uppercase tracking-[0.2em] mt-3">
                  Property no. {String((property.order ?? 0)).padStart(2, "0")}
                </p>
              </ScrollReveal>
              <ScrollReveal className="lg:col-span-9">
                <p className="drop-cap text-stone-700 text-xl md:text-2xl leading-[1.55] font-light">
                  {lead}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      <BrandDivider withMark />

      {/* Image + text interleaving */}
      {interleavedPairs.length > 0 && (
        <section className="py-24 lg:py-32 space-y-24 lg:space-y-32">
          {interleavedPairs.map((pair, i) => (
            <div key={i} className="container mx-auto px-6 lg:px-12">
              <div
                className={`grid lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                  pair.flip ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <ScrollReveal
                  direction={pair.flip ? "right" : "left"}
                  className="lg:col-span-7"
                >
                  {pair.image && (
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                      <Image
                        src={pair.image}
                        alt={`${property.name} — view ${i + 1}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                </ScrollReveal>
                <ScrollReveal
                  direction={pair.flip ? "left" : "right"}
                  className="lg:col-span-5"
                >
                  <p className="text-stone-600 text-base lg:text-lg leading-relaxed">
                    {pair.paragraph}
                  </p>
                </ScrollReveal>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Pull-quote moment + remaining narrative */}
      {tailParagraphs.length > 0 && (
        <>
          <section className="py-20 lg:py-28 bg-stone-50 relative overflow-hidden">
            <div
              className="absolute -top-1/2 -left-1/4 w-[60%] h-[180%] opacity-25 blur-3xl pointer-events-none"
              style={{ background: "var(--gradient-brand)" }}
            />
            <div className="container mx-auto px-6 lg:px-12 relative">
              <ScrollReveal className="max-w-4xl mx-auto text-center">
                <p className="pull-quote text-[#24272a]">
                  &ldquo;{tailParagraphs[0]}&rdquo;
                </p>
              </ScrollReveal>
            </div>
          </section>

          {tailParagraphs.slice(1).length > 0 && (
            <section className="py-24 lg:py-32">
              <div className="container mx-auto px-6 lg:px-12">
                <div className="max-w-3xl mx-auto space-y-6 text-stone-600 text-base lg:text-lg leading-relaxed">
                  {tailParagraphs.slice(1).map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <BrandDivider withMark />

      {/* The Details — three column editorial block */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs mb-4">
              The Details
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#24272a] tracking-tight">
              Practicalities
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12 max-w-4xl mx-auto">
            <div>
              <p className="text-stone-400 text-[10px] uppercase tracking-[0.3em] mb-3">Where</p>
              <p className="text-[#24272a] text-lg font-light leading-snug">
                {property.address || property.location}
              </p>
            </div>
            <div>
              <p className="text-stone-400 text-[10px] uppercase tracking-[0.3em] mb-3">Grading</p>
              <div className="flex items-center gap-1 text-[var(--color-brand-anchor)] mb-1">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-[#24272a] text-lg font-light leading-snug">
                {stars} Star Apartment Hotel
              </p>
            </div>
            <div>
              <p className="text-stone-400 text-[10px] uppercase tracking-[0.3em] mb-3">Booking</p>
              <p className="text-[#24272a] text-lg font-light leading-snug">
                Direct rate guaranteed.
                <br />
                <a
                  href={property.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-brand-anchor)] hover:opacity-70 transition-opacity"
                >
                  Check availability →
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities — typographic list */}
      {property.amenities && property.amenities.length > 0 && (
        <>
          <BrandDivider />
          <section className="py-20 lg:py-28 bg-stone-50">
            <div className="container mx-auto px-6 lg:px-12">
              <ScrollReveal className="grid lg:grid-cols-12 gap-x-12 gap-y-8 mb-12">
                <div className="lg:col-span-3">
                  <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs">
                    {t("amenities")}
                  </p>
                </div>
                <div className="lg:col-span-9">
                  <h2 className="text-3xl md:text-4xl text-[#24272a] tracking-tight max-w-xl">
                    Everything you need, considered.
                  </h2>
                </div>
              </ScrollReveal>

              <ScrollReveal className="grid lg:grid-cols-12 gap-x-12">
                <div className="lg:col-start-4 lg:col-span-9">
                  <ul className="editorial-list grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    {property.amenities.map((amenity, i) => (
                      <li key={i}>
                        <span className="text-[#24272a] font-light text-lg">
                          {amenity.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </>
      )}

      {/* Gallery */}
      {tailGallery.length > 0 && (
        <>
          <BrandDivider withMark />
          <section className="py-24 lg:py-32">
            <div className="container mx-auto px-6 lg:px-12">
              <ScrollReveal className="text-center mb-16">
                <p className="text-[var(--color-brand-anchor)] uppercase tracking-[0.3em] text-xs mb-4">
                  Gallery
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#24272a] tracking-tight">
                  More views.
                </h2>
              </ScrollReveal>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                {tailGallery.slice(0, 9).map((image, i) => {
                  // Mosaic: every 5th image spans 2 cols
                  const isWide = i % 5 === 2;
                  return (
                    <div
                      key={i}
                      className={`relative aspect-square overflow-hidden bg-stone-100 ${
                        isWide ? "md:col-span-2 md:aspect-[2/1]" : ""
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${property.name} — gallery ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover hover:scale-[1.02] transition-transform duration-700 ease-out"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Sticky booking bar — appears once user scrolls past hero */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 shadow-[0_-8px_32px_rgba(0,0,0,0.06)] transition-transform duration-500 ease-out ${
          showBookingBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 py-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">
              Book direct · best rate guarantee
            </p>
            <p className="text-[#24272a] text-base lg:text-lg font-light truncate">
              {property.name}
              <span className="text-stone-400 text-sm ml-2 hidden sm:inline">
                · {property.location}
              </span>
            </p>
          </div>
          <Button variant="primary" size="lg" asChild>
            <a
              href={property.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("checkAvailability")}
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>

      {/* Bottom spacer so sticky bar doesn't overlap footer content */}
      <div aria-hidden className="h-20" />
    </article>
  );
}
