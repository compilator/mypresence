"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { LogoMark } from "@/components/brand/logo-mark";
import { brandColors } from "@/lib/config/brand";

interface MarkRevealProps {
  title: string;
}

/** Scroll-driven reveal: green fold → outline → full mark. */
export function MarkReveal({ title }: MarkRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const foldOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [0, 1, 1]);
  const outlineOpacity = useTransform(scrollYProgress, [0.2, 0.45, 0.6], [0, 1, 1]);
  const markOpacity = useTransform(scrollYProgress, [0.45, 0.7, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.02]);

  if (reduceMotion) {
    return (
      <div className="flex flex-col items-center text-center">
        <p className="mb-16 text-sm font-medium tracking-[0.2em] text-brand-gray uppercase">
          {title}
        </p>
        <LogoMark size={160} />
      </div>
    );
  }

  return (
    <div ref={ref} className="relative min-h-[200vh]">
      <div className="sticky top-0 flex min-h-dvh flex-col items-center justify-center">
        <p className="mb-16 text-sm font-medium tracking-[0.2em] text-brand-gray uppercase">
          {title}
        </p>
        <motion.div style={{ scale }} className="relative size-40 sm:size-48">
          <motion.div
            style={{ opacity: foldOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg viewBox="0 0 48 48" className="size-full" aria-hidden>
              <path fill={brandColors.green} d="M8 8h14l-6 6H8V8Z" />
            </svg>
          </motion.div>

          <motion.div
            style={{ opacity: outlineOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg viewBox="0 0 48 48" className="size-full" aria-hidden>
              <path
                fill="none"
                stroke={brandColors.graphite}
                strokeWidth="2"
                d="M8 8h18c6.627 0 12 5.373 12 12s-5.373 12-12 12H20v-8h6c2.209 0 4-1.791 4-4s-1.791-4-4-4h-6V8H8Z"
              />
            </svg>
          </motion.div>

          <motion.div
            style={{ opacity: markOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <LogoMark size={192} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
