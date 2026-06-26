"use client";

import { Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { dict } from "@/lib/i18n";

const ANALYSIS_STAGES = [
  dict.analysis.stage1,
  dict.analysis.stage2,
  dict.analysis.stage3,
  dict.analysis.stage4,
] as const;

export const ANALYSIS_STAGE_COUNT = ANALYSIS_STAGES.length;

interface AnalysisProgressProps {
  activeIndex: number;
  complete: boolean;
}

export function AnalysisProgress({
  activeIndex,
  complete,
}: AnalysisProgressProps) {
  return (
    <ul className="space-y-3">
      {ANALYSIS_STAGES.map((stage, index) => {
        const done = complete || index < activeIndex;
        const active = !complete && index === activeIndex;
        return (
          <motion.li
            key={stage}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className={cn(
              "flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors",
              active ? "bg-accent/50" : "bg-transparent",
            )}
          >
            <span
              className={cn(
                "grid size-7 place-items-center rounded-full transition-colors",
                done && "bg-primary text-primary-foreground",
                active && "bg-foreground text-background",
                !done && !active && "bg-secondary text-muted-foreground",
              )}
            >
              {done ? (
                <Check className="size-4" />
              ) : active ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <span className="size-1.5 rounded-full bg-current" />
              )}
            </span>
            <span
              className={cn(
                "text-sm",
                done || active
                  ? "font-medium text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {stage}
            </span>
          </motion.li>
        );
      })}
    </ul>
  );
}
