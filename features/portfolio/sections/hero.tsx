import { MapPin } from "lucide-react";
import type { ReactNode } from "react";

import { ProfileAvatar } from "@/components/shared/profile-avatar";
import { resolveShortPositioning } from "@/lib/portfolio/derive";
import {
  pfBullet,
  pfDisplay,
  pfHeroHeadline,
  pfHeroPositioning,
  pfIcon,
  pfListItem,
  pfMeta,
  pfPillButton,
} from "@/lib/portfolio/typography";
import type { CareerProfile } from "@/types/career-profile";
import { dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface PortfolioHeroProps {
  profile: CareerProfile;
  topAchievements?: string[];
  /** Preview clamps summary; public pages show full text for crawlers. */
  clampSummary?: boolean;
}

function PortfolioLinkButton({
  href,
  children,
  external = true,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={pfPillButton}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function PortfolioHero({
  profile,
  topAchievements = [],
  clampSummary = true,
}: PortfolioHeroProps) {
  const { basics } = profile;
  const headline = basics.headline ?? basics.title;
  const positioning = resolveShortPositioning(profile);

  return (
    <header className="pb-12 pt-10 sm:pb-14 sm:pt-11 lg:pb-16 lg:pt-12">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-x-16 xl:gap-x-24">
        {/* Left — identity only */}
        <div className="flex flex-col items-center text-center lg:col-span-4 lg:items-start lg:text-left xl:col-span-4">
          <ProfileAvatar profile={profile} size="lg" variant="portfolio" />

          <div className="mt-6 w-full lg:mt-7">
            <h1 className={pfDisplay}>{basics.name}</h1>

            {positioning && (
              <p className={cn(pfHeroHeadline, "mt-3")}>{positioning}</p>
            )}

            {headline && (
              <p className={cn(pfHeroPositioning, "mt-3 line-clamp-3")}>
                {headline}
              </p>
            )}

            <div className="mt-6 flex flex-col items-center gap-3.5 lg:items-start">
              {basics.location && (
                <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-normal leading-none text-portfolio-muted">
                  <MapPin className={pfIcon} strokeWidth={1.5} aria-hidden />
                  {basics.location}
                </span>
              )}

              {(basics.email || basics.links.length > 0) && (
                <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                  {basics.email && (
                    <PortfolioLinkButton href={`mailto:${basics.email}`} external={false}>
                      Email
                    </PortfolioLinkButton>
                  )}
                  {basics.links.map((link) => (
                    <PortfolioLinkButton key={link.url} href={link.url}>
                      {link.label}
                    </PortfolioLinkButton>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right — about + achievements only */}
        <div className="space-y-10 lg:col-span-8 lg:space-y-11 xl:col-span-8">
          {basics.summary && (
            <section aria-labelledby="hero-about-heading">
              <h2 id="hero-about-heading" className={cn(pfMeta, "mb-4")}>
                {dict.portfolio.executiveSummary}
              </h2>
              <p
                className={cn(
                  "max-w-[42rem] text-pretty text-[0.9375rem] font-normal leading-[1.75] text-portfolio-fg/88 sm:text-base sm:leading-[1.8]",
                  clampSummary && "line-clamp-[8]",
                )}
              >
                {basics.summary}
              </p>
            </section>
          )}

          {topAchievements.length > 0 && (
            <section aria-labelledby="hero-achievements-heading">
              <h2 id="hero-achievements-heading" className={cn(pfMeta, "mb-4")}>
                {dict.portfolio.achievements}
              </h2>
              <ul className="max-w-[42rem] space-y-2.5">
                {topAchievements.slice(0, 5).map((item) => (
                  <li key={item} className={cn(pfListItem, "text-[0.9375rem] leading-[1.7]")}>
                    <span className={pfBullet} aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </header>
  );
}
