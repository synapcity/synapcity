import type { SemanticColor } from "@/theme/types";
import { generateColorScale } from "../generateColorScale";
import { reverseColorScale } from "../reverseColorScale";

/**
 * Generates a full SemanticColor from a single base hex string.
 */
const semanticCache = new Map<string, SemanticColor>();

export function generateSemanticColor(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  base: any
): SemanticColor {
  const key = (base as string).toLowerCase();
  if (semanticCache.has(key)) return semanticCache.get(key)!;

  const scale = generateColorScale(base as string);

  const result: SemanticColor = {
    base,
    light: {
      background: scale["100"],
      foreground: scale["900"],
      scale,
    },
    dark: {
      background: scale["950"],
      foreground: scale["50"],
      scale: reverseColorScale(scale),
    },
  };
  semanticCache.set(key, result);
  return result;
}
