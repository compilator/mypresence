"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { LogoMark } from "@/components/brand/logo-mark";

interface MarkRevealProps {
  title: string;
}

/** Scroll-driven reveal of the official mark asset. */
export function MarkReveal({ title }: MarkRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.45, 0.85], [0, 0.6, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 0.96, 1]);

  if (reduceMotion) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <p className="mb-16 text-sm font-medium tracking-[0.2em] text-brand-gray uppercase">
          {title}
        </p>
        <LogoMark size={320} />
      </div>
    );
  }

  return (
    <div ref={ref} className="relative min-h-[180vh]">
      <div className="sticky top-0 flex min-h-dvh flex-col items-center justify-center">
        <p className="mb-16 text-sm font-medium tracking-[0.2em] text-brand-gray uppercase">
          {title}
        </p>
        <motion.div style={{ opacity, scale }}>
          <LogoMark size={384} />
        </motion.div>
      </div>
    </div>
  );
}
