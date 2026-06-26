"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { fadeUp, staggerContainer } from "@/lib/motion/presets";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger direct children that are also Reveal items. */
  stagger?: boolean;
}

export function Reveal({ children, className, stagger = false }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={stagger ? staggerContainer : fadeUp}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
