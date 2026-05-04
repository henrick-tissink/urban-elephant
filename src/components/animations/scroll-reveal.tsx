"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
  threshold?: number;
}

/**
 * Visible-by-default scroll reveal. Content is always rendered with
 * opacity 1; the only animated property is a small translate. This means
 * if the IntersectionObserver hasn't fired yet (slow-scroll, smooth-scroll
 * libraries, screenshot tools), content is still readable instead of
 * stuck invisible. The translate gives a subtle "settling" motion.
 */
export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  distance = 16,
  once = true,
  className,
  threshold = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, {
    once,
    amount: threshold,
    margin: "0px 0px 200px 0px",
  });

  const getInitialPosition = (): { x: number; y: number } => {
    if (reduceMotion) return { x: 0, y: 0 };
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
      default:
        return { x: 0, y: 0 };
    }
  };

  const initial = getInitialPosition();

  const variants: Variants = {
    hidden: {
      opacity: 1,
      x: initial.x,
      y: initial.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerChildrenProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
}

export function StaggerChildren({
  children,
  staggerDelay = 0.08,
  className,
  once = true,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: 0,
    margin: "0px 0px 200px 0px",
  });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  direction?: Direction;
  className?: string;
}

export function StaggerItem({
  children,
  direction = "up",
  className,
}: StaggerItemProps) {
  const getInitialY = () => {
    switch (direction) {
      case "up":
        return 12;
      case "down":
        return -12;
      default:
        return 0;
    }
  };

  const getInitialX = () => {
    switch (direction) {
      case "left":
        return 12;
      case "right":
        return -12;
      default:
        return 0;
    }
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 1,
      y: getInitialY(),
      x: getInitialX(),
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
