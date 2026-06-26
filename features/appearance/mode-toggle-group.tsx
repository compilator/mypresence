"use client";

import { Monitor, Moon, Sun } from "lucide-react";

import type { ColorMode } from "@/lib/theme/themes";
import { dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const OPTIONS: { value: ColorMode; label: string; icon: typeof Sun }[] = [
  { value: "light", label: dict.appearance.modeLight, icon: Sun },
  { value: "dark", label: dict.appearance.modeDark, icon: Moon },
  { value: "system", label: dict.appearance.modeSystem, icon: Monitor },
];

interface ModeToggleGroupProps {
  value: ColorMode;
  onChange: (mode: ColorMode) => void;
}

export function ModeToggleGroup({ value, onChange }: ModeToggleGroupProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Color mode"
      className="grid grid-cols-3 gap-1 rounded-full bg-secondary p-1"
    >
      {OPTIONS.map(({ value: option, label, icon: Icon }) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option)}
            className={cn(
              "flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
              active
                ? "bg-card text-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
