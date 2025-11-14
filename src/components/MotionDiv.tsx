'use client';

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MotionDivProps {
  className?: string;
  children: ReactNode;
  delay?: number;
  variant?: "up" | "down" | "left" | "right" | "fade";
}

export function MotionDiv({ className, children, delay = 0, variant = "up" }: MotionDivProps) {
  const shouldReduceMotion = useReducedMotion();

  const initialOffset =
    variant === "left"
      ? { x: -24, y: 0 }
      : variant === "right"
        ? { x: 24, y: 0 }
        : variant === "down"
          ? { x: 0, y: -24 }
          : variant === "fade"
            ? { x: 0, y: 0 }
            : { x: 0, y: 24 };

  return (
    <motion.div
      className={cn(className)}
      initial={shouldReduceMotion ? false : { opacity: 0, ...initialOffset }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}
