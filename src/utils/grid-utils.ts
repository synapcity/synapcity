import { BreakpointType, defaultBreakpoints } from "@/stores/resources/gridStore";

/**
 * Returns the largest breakpoint whose value is <= width.
 * Falls back to the smallest breakpoint if none matches.
 * @param width - The current container or window width
 * @param breakpoints - A mapping of breakpoint names to min widths (default: your defaultBreakpoints)
 */
export function getBreakpointForWidth(
  width: number,
  breakpoints: Record<BreakpointType, number> = defaultBreakpoints
): BreakpointType {
  // Convert to array and sort by breakpoint value ascending
  const sorted = Object.entries(breakpoints)
    .sort((a, b) => a[1] - b[1]) as [BreakpointType, number][];

  // Find the largest breakpoint that is <= width
  let matched: BreakpointType = sorted[0][0];
  for (const [key, minWidth] of sorted) {
    if (width >= minWidth) {
      matched = key;
    }
  }
  return matched;
}
