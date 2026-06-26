import type { Metadata } from "next";

import { LegalLayout } from "@/components/legal/legal-layout";
import { dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const t = dict.legal.roadmap;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
};

const statusStyles = {
  shipped: "bg-primary/10 text-primary",
  in_progress: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  planned: "bg-muted text-muted-foreground",
} as const;

export default function RoadmapPage() {
  return (
    <LegalLayout title={t.title} intro={t.intro}>
      <ol className="space-y-4">
        {t.stages.map((stage) => (
          <li
            key={stage.stage}
            className="flex flex-col gap-3 rounded-2xl border border-border/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {stage.stage}
              </p>
              <p className="mt-1 text-base font-medium text-foreground">{stage.title}</p>
            </div>
            <span
              className={cn(
                "inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium",
                statusStyles[stage.status as keyof typeof statusStyles],
              )}
            >
              {t.statusLabels[stage.status as keyof typeof t.statusLabels]}
            </span>
          </li>
        ))}
      </ol>
    </LegalLayout>
  );
}
