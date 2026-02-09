"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CarouselApi = UseEmblaCarouselType[1];

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  showArrows?: boolean;
  showDots?: boolean;
  loop?: boolean;
}

export function Carousel({
  children,
  className,
  autoplay = false,
  autoplayDelay = 5000,
  showArrows = true,
  showDots = true,
  loop = true,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop, align: "start" },
    autoplay ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: true })] : []
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className={cn("relative", className)}>
      {/* Viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">{children}</div>
      </div>

      {/* Arrows */}
      {showArrows && (
        <>
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev && !loop}
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 z-10",
              "w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg",
              "flex items-center justify-center",
              "hover:bg-white transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-[#24272a]" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext && !loop}
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 z-10",
              "w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg",
              "flex items-center justify-center",
              "hover:bg-white transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-[#24272a]" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && scrollSnaps.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === selectedIndex
                  ? "bg-[#ff00ff] w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface CarouselSlideProps {
  children: React.ReactNode;
  className?: string;
}

export function CarouselSlide({ children, className }: CarouselSlideProps) {
  return (
    <div className={cn("flex-[0_0_100%] min-w-0 pl-4 first:pl-0", className)}>
      {children}
    </div>
  );
}
