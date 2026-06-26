"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { LogoHorizontal } from "@/components/brand/logo-horizontal";
import { LogoMark } from "@/components/brand/logo-mark";
import { brandColors } from "@/lib/config/brand";
import type { BrandLocale } from "@/lib/config/brand";
import { brandContent, t } from "@/lib/config/brand";

interface LogoMotionProps {
  locale: BrandLocale;
}

/** Scroll story using official logo assets for mark and lockup stages. */
export function LogoMotion({ locale }: LogoMotionProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const docOpacity = useTransform(scrollYProgress, [0, 0.12, 0.2], [1, 1, 0]);
  const foldOpacity = useTransform(scrollYProgress, [0.15, 0.28, 0.38], [0, 1, 0]);
  const bubbleOpacity = useTransform(scrollYProgress, [0.32, 0.48, 0.58], [0, 1, 0]);
  const markOpacity = useTransform(scrollYProgress, [0.52, 0.68, 0.82], [0, 1, 1]);
  const lockupOpacity = useTransform(scrollYProgress, [0.72, 0.88, 1], [0, 1, 1]);
  const lockupX = useTransform(scrollYProgress, [0.72, 0.9], [24, 0]);

  const { motion: motionCopy } = brandContent;

  if (reduceMotion) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <LogoHorizontal height={96} />
        <p className="mt-8 text-sm text-white/60">{t(motionCopy.subtitle, locale)}</p>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative min-h-[250vh]">
      <div className="sticky top-0 flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-medium tracking-[0.2em] text-white/50 uppercase">
          {t(motionCopy.title, locale)}
        </p>
        <p className="mb-16 text-sm text-white/60">{t(motionCopy.subtitle, locale)}</p>

        <div className="relative flex h-48 w-full max-w-lg items-center justify-center">
          <motion.div
            style={{ opacity: docOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="h-32 w-24 rounded-lg border-2 border-white/30 bg-white/5" />
          </motion.div>

          <motion.div
            style={{ opacity: foldOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative h-32 w-24 rounded-lg border-2 border-white/30 bg-white/5">
              <div
                className="absolute top-0 left-0 size-8"
                style={{
                  background: `linear-gradient(135deg, ${brandColors.green} 50%, transparent 50%)`,
                }}
              />
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: bubbleOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg viewBox="0 0 80 80" className="size-32" aria-hidden>
              <path
                fill="none"
                stroke="white"
                strokeWidth="2"
                d="M20 16h40v40H36l-8 8v-8H20V16Z"
              />
            </svg>
          </motion.div>

          <motion.div
            style={{ opacity: markOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <LogoMark size={256} />
          </motion.div>

          <motion.div
            style={{ opacity: lockupOpacity, x: lockupX }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <LogoHorizontal height={112} />
          </motion.div>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-6 text-xs tracking-wide text-white/40 uppercase">
          {motionCopy.steps.map((step) => (
            <span key={step.en}>{t(step, locale)}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
