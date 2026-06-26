"use client";

import { Check, Lock } from "lucide-react";

import type { CareerProfile } from "@/types/career-profile";
import type { EffectiveMode } from "@/lib/theme/portfolio";
import { PreviewThumb } from "@/features/appearance/preview-thumb";
import { dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface StyleCardProps {
  id: string;
  name: string;
  description: string;
  available: boolean;
  selected: boolean;
  mode: EffectiveMode;
  profile: Pick<CareerProfile, "basics" | "media">;
  onSelect: (id: string) => void;
}

export function StyleCard({
  id,
  name,
  description,
  available,
  selected,
  mode,
  profile,
  onSelect,
}: StyleCardProps) {
  const disabled = !available;

  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      onClick={() => onSelect(id)}
      className={cn(
        "group relative flex flex-col gap-4 rounded-3xl border border-border/50 bg-card p-4 text-left shadow-soft transition-all outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring/60",
        selected ? "ring-2 ring-primary" : "hover:-translate-y-0.5",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <PreviewThumb mode={mode} profile={profile} />
      <div className="flex items-start justify-between gap-2 px-1 pb-1">
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {selected ? (
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <Check className="size-3.5" />
          </span>
        ) : disabled ? (
          <Lock className="size-4 shrink-0 text-muted-foreground" />
        ) : null}
      </div>
      {disabled && (
        <span className="absolute right-4 top-4 rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground">
          {dict.appearance.soon}
        </span>
      )}
    </button>
  );
}
