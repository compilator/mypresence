"use client";

import type { BrandColorTile, BrandLocale } from "@/lib/config/brand";
import { brandColors, getBrandColor, t } from "@/lib/config/brand";

interface ColorGridProps {
  tiles: BrandColorTile[];
  locale: BrandLocale;
}

export function ColorGrid({ tiles, locale }: ColorGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tiles.map((tile) => {
        const hex = getBrandColor(tile.key);
        const isLight = tile.key === "background" || tile.key === "white";
        return (
          <div
            key={tile.key}
            className="overflow-hidden rounded-3xl border border-brand-graphite/8 bg-white"
          >
            <div
              className="flex h-36 items-end p-6"
              style={{ backgroundColor: hex }}
            >
              <span
                className="font-mono text-sm"
                style={{ color: isLight ? brandColors.graphite : brandColors.white }}
              >
                {hex}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-semibold tracking-tight">{t(tile.name, locale)}</h3>
              <p className="mt-1 text-sm text-brand-gray">{t(tile.usage, locale)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
