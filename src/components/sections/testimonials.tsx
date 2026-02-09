"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import type { Review } from "@/types";

interface TestimonialsProps {
  reviews: Review[];
}

const sourceLabels: Record<string, string> = {
  google: "Google",
  booking: "Booking.com",
  tripadvisor: "TripAdvisor",
  airbnb: "Airbnb",
  client: "Direct",
};

export function Testimonials({ reviews }: TestimonialsProps) {
  const t = useTranslations("testimonials");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Fallback to static data if no reviews from Sanity
  const displayReviews = reviews.length > 0 ? reviews : [
    {
      _id: "1",
      author: "Sarah M.",
      content: "Absolutely stunning apartment with the most incredible views of Table Mountain. The attention to detail was impeccable.",
      rating: 5,
      source: "google" as const,
      property: { name: "16 On Bree", slug: { _type: "slug" as const, current: "16-on-bree" } },
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#24272a] text-white" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <p className="text-[#ff6eff] uppercase tracking-[0.3em] text-sm mb-4">
            {t("subtitle")}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light">
            {t("title")}
          </h2>
        </ScrollReveal>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Quote Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
            className="absolute -top-4 left-0"
          >
            <Quote className="w-16 h-16 text-[#ff00ff]/20" />
          </motion.div>

          <div className="relative overflow-hidden min-h-[280px] pt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50, rotateY: -10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -50, rotateY: 10 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center"
                style={{ perspective: 1000 }}
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-5 h-5 transition-colors",
                        i < displayReviews[currentIndex].rating
                          ? "text-[#ff6eff] fill-[#ff6eff]"
                          : "text-gray-600"
                      )}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-8">
                  &ldquo;{displayReviews[currentIndex].content}&rdquo;
                </p>

                {/* Author */}
                <div>
                  <p className="text-[#ff6eff] font-medium text-lg">
                    {displayReviews[currentIndex].author}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {displayReviews[currentIndex].property?.name}
                    {displayReviews[currentIndex].source && (
                      <> · via {sourceLabels[displayReviews[currentIndex].source!] || displayReviews[currentIndex].source}</>
                    )}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {displayReviews.length > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-12 h-12 border border-[#24272a] rounded-full flex items-center justify-center hover:border-[#ff00ff] hover:text-[#ff6eff] transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {displayReviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      index === currentIndex
                        ? "bg-[#ff00ff] w-8"
                        : "bg-[#24272a] w-2 hover:bg-gray-600"
                    )}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-12 h-12 border border-[#24272a] rounded-full flex items-center justify-center hover:border-[#ff00ff] hover:text-[#ff6eff] transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-8 mt-16 pt-16 border-t border-[#1a1c1e]"
        >
          {[
            { value: "4.9", label: "Google Rating" },
            { value: "9.4", label: "Booking.com" },
            { value: "500+", label: "Happy Guests" },
            { value: "4 Star", label: "TGCSA Graded" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl font-light text-[#ff6eff]">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
