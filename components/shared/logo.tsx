import Link from "next/link";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config/site";

interface LogoProps {
  href?: string;
  className?: string;
}

export function Logo({ href = "/", className }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-semibold tracking-tight",
        className,
      )}
    >
      <span className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground shadow-soft">
        <span className="size-2.5 rounded-full bg-primary-foreground/90" />
      </span>
      <span className="text-foreground">{siteConfig.name}</span>
    </Link>
  );
}
