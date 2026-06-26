import type { EffectiveMode } from "@/lib/theme/portfolio";
import { portfolioModeClass } from "@/lib/theme/portfolio";
import { ProfileAvatar } from "@/components/shared/profile-avatar";
import type { CareerProfile } from "@/types/career-profile";
import { cn } from "@/lib/utils";

interface PreviewThumbProps {
  mode: EffectiveMode;
  profile: Pick<CareerProfile, "basics" | "media">;
  className?: string;
}

/** Miniature portfolio preview reflecting the chosen mode/style. */
export function PreviewThumb({ mode, profile, className }: PreviewThumbProps) {
  const { basics } = profile;

  return (
    <div
      className={cn(
        portfolioModeClass(mode),
        "overflow-hidden rounded-2xl border border-portfolio-border bg-portfolio-bg p-5",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <ProfileAvatar profile={profile} size="sm" variant="portfolio" />
        <div className="min-w-0 pt-0.5">
          <p className="truncate text-sm font-semibold leading-tight text-portfolio-fg">
            {basics.name}
          </p>
          <p className="truncate text-xs text-portfolio-muted">{basics.title}</p>
        </div>
      </div>
      <div className="mt-4 space-y-1.5">
        <span className="block h-1.5 w-3/4 rounded-full bg-portfolio-foreground/15" />
        <span className="block h-1.5 w-1/2 rounded-full bg-portfolio-foreground/15" />
      </div>
    </div>
  );
}
