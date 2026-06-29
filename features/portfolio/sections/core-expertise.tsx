import type { ExpertiseArea } from "@/lib/portfolio/derive";
import { pfBodyMuted, pfCaption, pfCardTitle } from "@/lib/portfolio/typography";
import { cn } from "@/lib/utils";

interface CoreExpertiseProps {
  areas: ExpertiseArea[];
  variant?: "section" | "hero" | "hero-compact";
}

export function CoreExpertise({ areas, variant = "section" }: CoreExpertiseProps) {
  if (areas.length === 0) return null;

  const isCompact = variant === "hero-compact";

  return (
    <div
      className={cn(
        "grid sm:grid-cols-2",
        isCompact
          ? "gap-x-8 gap-y-5"
          : variant === "hero"
            ? "gap-12 lg:gap-x-14 lg:gap-y-12"
            : "gap-12 lg:gap-x-16 lg:gap-y-14",
      )}
    >
      {areas.slice(0, isCompact ? 4 : undefined).map((area) => (
        <article key={area.title}>
          <h3
            className={cn(
              isCompact
                ? "text-base font-semibold leading-snug text-portfolio-fg"
                : pfCardTitle,
            )}
          >
            {area.title}
          </h3>
          {area.description && (
            <p
              className={cn(
                pfBodyMuted,
                isCompact
                  ? "mt-1.5 line-clamp-2 max-w-none text-[0.875rem] leading-[1.65]"
                  : "mt-3 max-w-none text-[1.08rem]",
              )}
            >
              {area.description}
            </p>
          )}
          {!isCompact && area.technologies.length > 0 && (
            <p className={cn(pfCaption, "mt-4 tracking-normal")}>
              {area.technologies.slice(0, 6).join(" · ")}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}
