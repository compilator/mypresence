import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { pfMeta } from "@/lib/portfolio/typography";
import { cn } from "@/lib/utils";

interface PortfolioSectionProps {
  id: string;
  label: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}

/** Full-viewport divider + centered content — editorial chapter rhythm. */
export function PortfolioSection({
  id,
  label,
  icon: Icon,
  children,
  className,
}: PortfolioSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("border-t border-portfolio-border/40", className)}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-28 lg:max-w-7xl lg:px-14 lg:py-32 xl:px-16">
        <header className="mb-14 flex items-baseline gap-2 lg:mb-16">
          {Icon && (
            <Icon
              className="size-4 shrink-0 translate-y-px text-portfolio-muted/45"
              strokeWidth={1.5}
              aria-hidden
            />
          )}
          <h2 id={headingId} className={pfMeta}>
            {label}
          </h2>
        </header>
        {children}
      </div>
    </section>
  );
}
