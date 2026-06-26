import { cn } from "@/lib/utils";
import { brandColors } from "@/lib/config/brand";

export type LogoVariant = "color" | "monochrome" | "inverse";

interface BrandWordmarkProps {
  className?: string;
  variant?: LogoVariant;
}

/** Lowercase mypresence wordmark with split brand colors. */
export function BrandWordmark({
  className,
  variant = "color",
}: BrandWordmarkProps) {
  const myColor =
    variant === "inverse"
      ? brandColors.green
      : variant === "monochrome"
        ? brandColors.graphite
        : brandColors.green;
  const presenceColor =
    variant === "inverse" ? brandColors.white : brandColors.graphite;

  return (
    <span
      className={cn(
        "inline-flex items-baseline font-semibold tracking-tight lowercase",
        className,
      )}
      aria-label="mypresence"
    >
      <span style={{ color: myColor }}>my</span>
      <span style={{ color: presenceColor }}>presence</span>
    </span>
  );
}

interface LogoWordmarkProps extends BrandWordmarkProps {
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-4xl sm:text-5xl",
} as const;

export function LogoWordmark({
  size = "md",
  className,
  variant = "color",
}: LogoWordmarkProps) {
  return (
    <BrandWordmark
      className={cn(sizeClasses[size], className)}
      variant={variant}
    />
  );
}
