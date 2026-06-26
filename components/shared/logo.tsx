import Image from "next/image";
import Link from "next/link";

import { LogoHorizontal } from "@/components/brand/logo-horizontal";
import { brandAssets } from "@/lib/config/brand";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  className?: string;
  /** Use SVG component lockup (default) or raster/SVG file asset. */
  variant?: "component" | "asset";
}

export function Logo({ href = "/", className, variant = "asset" }: LogoProps) {
  const content =
    variant === "asset" ? (
      <Image
        src={brandAssets.logoMain}
        alt="mypresence"
        width={180}
        height={32}
        className="h-7 w-auto sm:h-8"
        priority
      />
    ) : (
      <LogoHorizontal markSize={28} />
    );

  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center", className)}
    >
      {content}
    </Link>
  );
}
