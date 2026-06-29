import { LogoWordmark } from "@/components/brand/logo-wordmark";
import { pfCaption } from "@/lib/portfolio/typography";
import { dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function PortfolioFooter() {
  return (
    <footer className="border-t border-portfolio-border/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 text-center sm:px-10 lg:max-w-7xl lg:px-14 lg:py-24 xl:px-16">
        <p
          className={cn(
            pfCaption,
            "flex items-baseline justify-center gap-1.5",
          )}
        >
          <span>{dict.portfolio.builtWith}</span>
          <LogoWordmark height={20} className="translate-y-[0.18em]" />
        </p>
        <p className={cn(pfCaption, "mt-2 opacity-70")}>
          {dict.portfolio.builtWithTagline}
        </p>
      </div>
    </footer>
  );
}
