import type { ColorShade } from "../types";

export const COLOR_SHADE_KEYS: ColorShade[] = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
];

/**
 * For quick lookup or validation, e.g. if (SHADE_SET.has(shade))
 */
export const COLOR_SHADE_SET = new Set(COLOR_SHADE_KEYS);
