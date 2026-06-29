import { BarChart2 } from "lucide-react";

import type { SnapshotMetric } from "@/lib/portfolio/derive";
import { HeroMetrics } from "@/features/portfolio/sections/hero-metrics";
import { pfMeta } from "@/lib/portfolio/typography";
import { dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface SnapshotMetricsBandProps {
  metrics: SnapshotMetric[];
  className?: string;
}

/** Full-width proof strip — metrics after the hero, never inside it. */
export function SnapshotMetricsBand({ metrics, className }: SnapshotMetricsBandProps) {
  if (metrics.length === 0) return null;

  const headingId = "snapshot-heading";

  return (
    <section
      id="snapshot"
      className={cn("border-t border-portfolio-border/40", className)}
      aria-labelledby={headingId}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-[59px] sm:px-10 sm:py-[75px] lg:max-w-7xl lg:px-14 xl:px-16">
        <header className="mb-10 flex items-baseline gap-2 lg:mb-12">
          <BarChart2
            className="size-4 shrink-0 translate-y-px text-portfolio-muted/45"
            strokeWidth={1.5}
            aria-hidden
          />
          <h2 id={headingId} className={pfMeta}>
            {dict.portfolio.sectionSnapshot}
          </h2>
        </header>
        <HeroMetrics metrics={metrics} />
      </div>
    </section>
  );
}
