import Image from "next/image";

import { brandAssets } from "@/lib/config/brand";
import { cn } from "@/lib/utils";

/** Official horizontal lockup — never redrawn in code. */
const HORIZONTAL_WIDTH = 644;
const HORIZONTAL_HEIGHT = 124;

interface LogoHorizontalProps {
  height?: number;
  className?: string;
  priority?: boolean;
}

export function LogoHorizontal({
  height = 32,
  className,
  priority = false,
}: LogoHorizontalProps) {
  const width = Math.round((HORIZONTAL_WIDTH / HORIZONTAL_HEIGHT) * height);

  return (
    <Image
      src={brandAssets.logoHorizontal}
      alt="mypresence"
      width={width}
      height={height}
      aria-label="mypresence"
      priority={priority}
      className={cn("brand-logo h-auto w-auto shrink-0", className)}
      style={{ height, width: "auto" }}
    />
  );
}

export { HORIZONTAL_WIDTH, HORIZONTAL_HEIGHT };
