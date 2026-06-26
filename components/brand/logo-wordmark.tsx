import Image from "next/image";

import { brandAssets } from "@/lib/config/brand";
import { cn } from "@/lib/utils";

/** Official wordmark asset — never redrawn in code. */
const WORDMARK_WIDTH = 463;
const WORDMARK_HEIGHT = 67;

interface LogoWordmarkProps {
  height?: number;
  className?: string;
  priority?: boolean;
}

export function LogoWordmark({
  height = 24,
  className,
  priority = false,
}: LogoWordmarkProps) {
  const width = Math.round((WORDMARK_WIDTH / WORDMARK_HEIGHT) * height);

  return (
    <Image
      src={brandAssets.logoWordmark}
      alt="mypresence"
      width={width}
      height={height}
      aria-label="mypresence"
      priority={priority}
      className={cn("h-auto w-auto shrink-0", className)}
      style={{ height, width: "auto" }}
    />
  );
}

export { WORDMARK_WIDTH, WORDMARK_HEIGHT };
