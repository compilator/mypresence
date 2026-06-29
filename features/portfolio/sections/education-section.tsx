import type { EducationItem } from "@/types/career-profile";
import { pfCaption, pfCardTitle } from "@/lib/portfolio/typography";
import { cn } from "@/lib/utils";

function dateRange(start?: string, end?: string) {
  return [start, end].filter(Boolean).join(" – ");
}

interface EducationSectionProps {
  items: EducationItem[];
}

export function EducationSection({ items }: EducationSectionProps) {
  if (items.length === 0) return null;

  return (
    <ul className="space-y-10 lg:space-y-12">
      {items.map((item, index) => (
        <li
          key={`${item.institution}-${index}`}
          className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1"
        >
          <div>
            <p className={pfCardTitle}>{item.institution}</p>
            <p className={cn(pfCaption, "mt-2 text-[0.93rem]")}>{item.degree}</p>
          </div>
          <span className={cn(pfCaption, "tabular-nums")}>
            {dateRange(item.startDate, item.endDate)}
          </span>
        </li>
      ))}
    </ul>
  );
}
