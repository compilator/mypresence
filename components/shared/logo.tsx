import Link from "next/link";

import { LogoHorizontal } from "@/components/brand/logo-horizontal";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  className?: string;
  height?: number;
}

export function Logo({ href = "/", className, height = 28 }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center", className)}
    >
      <LogoHorizontal height={height} priority />
    </Link>
  );
}
