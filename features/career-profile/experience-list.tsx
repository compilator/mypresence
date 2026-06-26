import type { ExperienceItem } from "@/types/career-profile";
import { dict } from "@/lib/i18n";

function dateRange(start: string, end?: string) {
  if (!start && !end) return "";
  return [start, end || dict.profile.present].filter(Boolean).join(" – ");
}

export function ExperienceList({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="space-y-6">
      {items.map((item, index) => (
        <li key={`${item.company}-${index}`} className="flex gap-4">
          <div className="relative flex flex-col items-center pt-1.5">
            <span className="size-2.5 rounded-full bg-primary" />
            {index < items.length - 1 && (
              <span className="mt-1 w-px flex-1 bg-border" />
            )}
          </div>
          <div className="flex-1 pb-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="font-medium">{item.role}</p>
              <p className="text-sm text-muted-foreground">
                {dateRange(item.startDate, item.endDate)}
              </p>
            </div>
            <p className="text-sm text-primary">
              {item.company}
              {item.location ? ` · ${item.location}` : ""}
            </p>
            {item.highlights.length > 0 && (
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {item.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/60" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
