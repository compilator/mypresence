/**
 * Theme registry seam.
 *
 * The MVP ships two surfaces (workspace + portfolio), each in light/dark.
 * Future versions will introduce multiple portfolio "design styles". They
 * register here so screens can enumerate options without code changes
 * elsewhere. Keep this list data-only.
 */

export type ColorMode = "light" | "dark" | "system";

export type DesignSurface = "workspace" | "portfolio";

export interface PortfolioStyle {
  id: string;
  name: string;
  description: string;
  /** Reserved for future per-style token overrides. */
  available: boolean;
}

export const PORTFOLIO_STYLES: PortfolioStyle[] = [
  {
    id: "editorial",
    name: "Editorial",
    description: "Apple-like, large display type, hairline structure.",
    available: true,
  },
  // Future styles plug in here (e.g. "minimal", "glass", "brutalist").
];

export const DEFAULT_PORTFOLIO_STYLE = PORTFOLIO_STYLES[0].id;
