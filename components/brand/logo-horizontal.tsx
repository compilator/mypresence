import { cn } from "@/lib/utils";

import { LogoMark, type LogoVariant } from "@/components/brand/logo-mark";
import { BrandWordmark } from "@/components/brand/logo-wordmark";

interface LogoHorizontalProps {
  markSize?: number;
  variant?: LogoVariant;
  className?: string;
  wordmarkClassName?: string;
}

/** Primary horizontal lockup: mark + wordmark. */
export function LogoHorizontal({
  markSize = 32,
  variant = "color",
  className,
  wordmarkClassName,
}: LogoHorizontalProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="mypresence"
    >
      <LogoMark size={markSize} variant={variant} />
      <BrandWordmark
        className={cn("text-xl sm:text-2xl", wordmarkClassName)}
        variant={variant}
      />
    </span>
  );
}
