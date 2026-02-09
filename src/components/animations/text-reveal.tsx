"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
  splitBy?: "word" | "character";
  once?: boolean;
}

export function TextReveal({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  splitBy = "word",
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  const items = splitBy === "word" ? text.split(" ") : text.split("");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: splitBy === "word" ? 0.08 : 0.03,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <Tag ref={ref} className={cn("overflow-hidden", className)}>
      <motion.span
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="inline-flex flex-wrap"
        style={{ perspective: 1000 }}
      >
        {items.map((item, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            className="inline-block"
            style={{ transformOrigin: "bottom" }}
          >
            {item}
            {splitBy === "word" && index < items.length - 1 && "\u00A0"}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

// Line-by-line reveal for paragraphs
interface LineRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  once?: boolean;
}

export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  once = true,
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: delay,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden">
          <motion.p variants={lineVariants} className={lineClassName}>
            {line}
          </motion.p>
        </div>
      ))}
    </motion.div>
  );
}
