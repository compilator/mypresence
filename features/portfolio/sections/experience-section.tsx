import type { ExperienceItem } from "@/types/career-profile";
import { splitExperienceHighlights } from "@/lib/portfolio/derive";
import { dict } from "@/lib/i18n";
import {
  pfBody,
  pfBullet,
  pfCaption,
  pfCardTitle,
  pfMeta,
  pfSectionTitle,
  pfSubtitle,
} from "@/lib/portfolio/typography";
import { cn } from "@/lib/utils";

function experienceRange(start: string, end?: string) {
  return [start, end || dict.portfolio.present].filter(Boolean).join(" – ");
}

interface ExperienceSectionProps {
  items: ExperienceItem[];
}

function ExperienceEntry({
  item,
  featured = false,
}: {
  item: ExperienceItem;
  featured?: boolean;
}) {
  const { achievements, responsibilities } = splitExperienceHighlights(
    item.highlights,
  );

  return (
    <article
      className={cn(
        "grid gap-5 sm:grid-cols-[1fr_auto]",
        featured &&
          "rounded-2xl border border-portfolio-border/45 p-9 sm:p-10 lg:p-12",
      )}
    >
      <div>
        <p className={featured ? pfSectionTitle : pfCardTitle}>{item.company}</p>
        <p
          className={cn(
            pfSubtitle,
            "mt-2 text-portfolio-muted",
            featured && "text-portfolio-fg/80",
          )}
        >
          {item.role}
        </p>
        {item.location && (
          <p className={cn(pfCaption, "mt-2")}>{item.location}</p>
        )}
      </div>
      <p className={cn(pfCaption, "tabular-nums sm:text-right")}>
        {experienceRange(item.startDate, item.endDate)}
      </p>

      {achievements.length > 0 && (
        <div className="sm:col-span-2">
          {!featured && (
            <p className={cn(pfMeta, "mb-4")}>{dict.portfolio.achievements}</p>
          )}
          <ul className="space-y-4">
            {achievements.map((line, i) => (
              <li key={i} className={cn(pfBody, "flex max-w-none gap-2.5")}>
                <span className={pfBullet} aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </div>
      )}

      {responsibilities.length > 0 && (
        <div className="sm:col-span-2">
          <p className={cn(pfMeta, "mb-4")}>{dict.portfolio.responsibilities}</p>
          <ul className="space-y-3.5">
            {responsibilities.map((line, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-[1.15rem] font-normal leading-[1.8] text-portfolio-muted"
              >
                <span
                  className="mt-[0.65rem] size-1 shrink-0 rounded-full bg-portfolio-muted/35"
                  aria-hidden
                />
                {line}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export function ExperienceSection({ items }: ExperienceSectionProps) {
  if (items.length === 0) return null;

  const [current, ...past] = items;

  return (
    <div className="space-y-20 lg:space-y-24">
      {current && <ExperienceEntry item={current} featured />}

      {past.length > 0 && (
        <ol className="space-y-16 lg:space-y-20">
          {past.map((item, index) => (
            <li key={`${item.company}-${index}`}>
              <ExperienceEntry item={item} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
