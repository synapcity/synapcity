import { colord, extend } from "colord";
import { COLOR_SHADE_KEYS } from "@/theme/constants";
import type { ColorShade } from "@/theme/types";
import mixPlugin from "colord/plugins/mix";
import labPlugin from "colord/plugins/lab";

extend([mixPlugin, labPlugin]);

const scaleCache = new Map<string, Record<ColorShade, string>>();

export function generateColorScale(base: string): Record<ColorShade, string> {
  const key = base.toLowerCase();
  if (scaleCache.has(key)) return scaleCache.get(key)!;

  if (!colord(base).isValid()) {
    console.warn(`[generateColorScale] Invalid base color: ${base}`, base);
    base = "#999999";
  }

  const tints = colord(base)
    .tints(6)
    .map((t) => t.toHex())
    .reverse();
  const shades = colord(base)
    .shades(5)
    .map((s) => s.toHex());

  const merged = [...tints, ...shades];

  const result = COLOR_SHADE_KEYS.reduce(
    (acc, label, i) => {
      acc[label as ColorShade] = merged[i] ?? base;
      return acc;
    },
    {} as Record<ColorShade, string>
  );

  scaleCache.set(key, result);
  return result;
}
