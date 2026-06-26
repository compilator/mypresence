import Image from "next/image";

import { getActivePhotoUrl } from "@/lib/profile-photo";
import type { CareerProfile } from "@/types/career-profile";
import { cn } from "@/lib/utils";

export function profileInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface ProfileAvatarProps {
  profile: Pick<CareerProfile, "basics" | "media">;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "workspace" | "portfolio";
  className?: string;
}

/** Fixed dimensions — layout never shifts between photo and placeholder. */
const sizeStyles = {
  sm: { box: "size-10", text: "text-xs" },
  md: { box: "size-16", text: "text-base" },
  lg: { box: "size-24", text: "text-xl" },
  xl: { box: "size-[7.5rem] sm:size-36", text: "text-2xl sm:text-3xl" },
} as const;

/**
 * Circular professional portrait — single component for all mypresence surfaces.
 * Always reads from CareerProfile.media.professionalPhoto. Apple Contacts–inspired:
 * perfect circle, minimal border, no shadow.
 */
export function ProfileAvatar({
  profile,
  size = "md",
  variant = "portfolio",
  className,
}: ProfileAvatarProps) {
  const { basics } = profile;
  const initials = profileInitials(basics.name);
  const src = getActivePhotoUrl(profile);
  const { box, text } = sizeStyles[size];

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full border",
        box,
        variant === "workspace"
          ? "border-border bg-secondary/40"
          : "border-portfolio-border bg-portfolio-foreground/[0.04]",
        className,
      )}
      role="img"
      aria-label={src ? basics.name : `${basics.name}, ${initials}`}
    >
      {src ? (
        <Image
          src={src}
          alt={basics.name}
          fill
          className="object-cover"
          unoptimized
        />
      ) : (
        <span
          className={cn(
            "flex size-full items-center justify-center font-medium tracking-tight",
            text,
            variant === "workspace"
              ? "text-foreground/70"
              : "text-portfolio-muted",
          )}
        >
          {initials}
        </span>
      )}
    </div>
  );
}
