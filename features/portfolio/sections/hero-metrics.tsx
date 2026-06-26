import type { SnapshotMetric } from "@/lib/portfolio/derive";
import { pfMeta } from "@/lib/portfolio/typography";
import { cn } from "@/lib/utils";

interface HeroMetricsProps {
  metrics: SnapshotMetric[];
}

/** Executive stat cards — large value, quiet label. Not dashboard widgets. */
export function HeroMetrics({ metrics }: HeroMetricsProps) {
  if (metrics.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5 lg:gap-6">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="min-w-0 rounded-2xl border border-portfolio-border/45 px-5 py-3.5 text-center sm:px-6 sm:py-4 sm:text-left"
        >
          <p className="text-2xl font-semibold leading-none tracking-tight text-portfolio-fg sm:text-[1.875rem] lg:text-[2rem]">
            {metric.value}
          </p>
          <p className={cn(pfMeta, "mt-2.5 normal-case tracking-[0.14em]")}>
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  );
}
