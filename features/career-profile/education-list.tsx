import type { EducationItem } from "@/types/career-profile";

function dateRange(start?: string, end?: string) {
  return [start, end].filter(Boolean).join(" – ");
}

export function EducationList({ items }: { items: EducationItem[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li
          key={`${item.institution}-${index}`}
          className="flex flex-wrap items-baseline justify-between gap-x-3"
        >
          <div>
            <p className="font-medium">{item.institution}</p>
            <p className="text-sm text-muted-foreground">{item.degree}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            {dateRange(item.startDate, item.endDate)}
          </p>
        </li>
      ))}
    </ul>
  );
}
