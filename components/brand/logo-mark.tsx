import { cn } from "@/lib/utils";
import { brandColors } from "@/lib/config/brand";

export type LogoVariant = "color" | "monochrome" | "inverse";

interface LogoMarkProps {
  size?: number;
  variant?: LogoVariant;
  className?: string;
  "aria-label"?: string;
}

function resolveColors(variant: LogoVariant) {
  if (variant === "inverse") {
    return { graphite: brandColors.white, green: brandColors.green };
  }
  if (variant === "monochrome") {
    return { graphite: brandColors.graphite, green: brandColors.graphite };
  }
  return { graphite: brandColors.graphite, green: brandColors.green };
}

/** Stylized P mark with folded corner and speech-bubble counter. */
export function LogoMark({
  size = 32,
  variant = "color",
  className,
  "aria-label": ariaLabel = "MyPresence",
}: LogoMarkProps) {
  const { graphite, green } = resolveColors(variant);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      role="img"
      aria-label={ariaLabel}
      className={cn("shrink-0", className)}
    >
      <path fill={green} d="M8 8h14l-6 6H8V8Z" />
      <path
        fill={graphite}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 8h18c6.627 0 12 5.373 12 12s-5.373 12-12 12H20v-8h6c2.209 0 4-1.791 4-4s-1.791-4-4-4h-6V8H8Zm8 10.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5Z"
      />
    </svg>
  );
}
