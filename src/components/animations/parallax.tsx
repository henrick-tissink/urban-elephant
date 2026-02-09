"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  direction?: "up" | "down";
}

export function Parallax({
  children,
  speed = 0.5,
  className,
  direction = "up",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const multiplier = direction === "up" ? -1 : 1;
  const yRange = 100 * speed * multiplier;

  const y = useTransform(scrollYProgress, [0, 1], [yRange, -yRange]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ y: smoothY }}>{children}</motion.div>
    </div>
  );
}

// Image parallax specifically for background images
interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}

export function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.3,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${30 * speed}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}

// Section with parallax background
interface ParallaxSectionProps {
  children: React.ReactNode;
  backgroundImage?: string;
  backgroundColor?: string;
  className?: string;
  overlayOpacity?: number;
  speed?: number;
}

export function ParallaxSection({
  children,
  backgroundImage,
  backgroundColor = "transparent",
  className,
  overlayOpacity = 0.5,
  speed = 0.3,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${20 * speed}%`]);

  return (
    <section
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{ backgroundColor }}
    >
      {backgroundImage && (
        <>
          <motion.div
            className="absolute inset-0 w-full h-[120%] -top-[10%]"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              y,
            }}
          />
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
