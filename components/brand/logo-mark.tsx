import Image from "next/image";

import { brandAssets } from "@/lib/config/brand";
import { cn } from "@/lib/utils";

/** Official mark asset — never redrawn in code. */
const MARK_WIDTH = 220;
const MARK_HEIGHT = 220;

interface LogoMarkProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

export function LogoMark({
  size = 32,
  className,
  priority = false,
}: LogoMarkProps) {
  return (
    <Image
      src={brandAssets.logoMark}
      alt="mypresence"
      width={MARK_WIDTH}
      height={MARK_HEIGHT}
      aria-label="mypresence"
      priority={priority}
      className={cn("brand-logo shrink-0", className)}
      style={{ width: size, height: size }}
    />
  );
}

export { MARK_WIDTH, MARK_HEIGHT };
