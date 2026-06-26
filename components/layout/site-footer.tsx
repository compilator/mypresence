import Link from "next/link";

import { dict } from "@/lib/i18n";
import { TRUST_LINKS } from "@/lib/legal/trust-links";
import { cn } from "@/lib/utils";

interface SiteFooterProps {
  className?: string;
}

export function SiteFooter({ className }: SiteFooterProps) {
  const nav = dict.legal.nav;

  return (
    <footer className={cn("w-full border-t border-border/40", className)}>
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        <nav
          aria-label="Trust Center"
          className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground"
        >
          {TRUST_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-opacity hover:text-foreground hover:opacity-80"
            >
              {nav[link.key]}
            </Link>
          ))}
        </nav>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border/30 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {dict.brand.name}
          </p>
          <p className="text-xs text-muted-foreground/80">{dict.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
