"use client";

import {
  FileText,
  MessageCircle,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

import { fadeUp, staggerContainer } from "@/lib/motion/presets";
import type { BrandMeaningItem, BrandLocale } from "@/lib/config/brand";
import { t } from "@/lib/config/brand";

const iconMap: Record<BrandMeaningItem["icon"], LucideIcon> = {
  document: FileText,
  conversation: MessageCircle,
  presence: Sparkles,
  growth: TrendingUp,
};

interface MeaningGridProps {
  items: BrandMeaningItem[];
  locale: BrandLocale;
}

export function MeaningGrid({ items, locale }: MeaningGridProps) {
  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
    >
      {items.map((item) => {
        const Icon = iconMap[item.icon];
        return (
          <motion.div
            key={item.icon}
            variants={fadeUp}
            className="rounded-3xl border border-brand-graphite/8 bg-white p-8"
          >
            <span className="grid size-11 place-items-center rounded-2xl bg-brand-bg text-brand-graphite">
              <Icon className="size-5" strokeWidth={1.5} />
            </span>
            <h3 className="mt-6 text-lg font-semibold tracking-tight">
              {t(item.label, locale)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-gray">
              {t(item.description, locale)}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
