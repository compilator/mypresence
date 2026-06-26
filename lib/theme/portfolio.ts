import type { ColorMode } from "@/lib/theme/themes";

export type EffectiveMode = "light" | "dark";

/** Resolve a possibly-"system" mode to a concrete light/dark value. */
export function resolveMode(
  mode: ColorMode,
  systemFallback: EffectiveMode = "light",
): EffectiveMode {
  if (mode === "light" || mode === "dark") return mode;
  return systemFallback;
}

/** CSS class that sets the portfolio token scope for a concrete mode. */
export function portfolioModeClass(effective: EffectiveMode): string {
  return effective === "dark" ? "portfolio-dark" : "portfolio-light";
}
