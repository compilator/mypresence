import type { ColorMode } from "@/lib/theme/themes";

export interface AppearanceConfig {
  /** Light, dark or follow system. */
  mode: ColorMode;
  /** Portfolio design style id (see lib/theme/themes.ts). */
  styleId: string;
}
