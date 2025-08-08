/* eslint-disable @typescript-eslint/no-explicit-any */
import { breakpoints, defaultBreakpoints, BreakpointType, LayoutItem, Layouts, LayoutsSchema } from "@/stores/resources/gridStore/grid-schema"
/**
 * Returns the largest breakpoint whose value is <= width.
 * Falls back to the smallest breakpoint if none matches.
 * @param width - The current container or window width
 * @param breakpoints - A mapping of breakpoint names to min widths (default: your defaultBreakpoints)
 */
export function getBreakpointForWidth(
  width: number,
  breakpoints: Record<BreakpointType, number> = defaultBreakpoints,
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

/**
 * Strict parse via Zod defaults (fills required fields).
 * Use when loading/hydrating from storage/API/unknown.
 */
export function ensureLayouts(raw: unknown): Layouts {
  return LayoutsSchema.parse(raw);
}

type IncomingItem = LayoutItem;
type Incoming =
  | Partial<Record<BreakpointType, IncomingItem | IncomingItem[] | IncomingItem[][]>>
  | undefined;

export function normalizeLayouts(input: Incoming): Layouts {
  const out = {} as Layouts;
  for (const bp of breakpoints) {
    const val = input?.[bp];
    let arr: IncomingItem[] = [];
    if (!val) arr = [];
    else if (Array.isArray(val)) arr = (val as any[]).flat(Infinity) as IncomingItem[];
    else arr = [val as IncomingItem];

    out[bp] = arr.map((item: any) => ({
      ...item,
      // ensure strict booleans for state:
      isDraggable: item?.isDraggable ?? false,
      isResizable: item?.isResizable ?? false,
      isBounded: item?.isBounded ?? false,
    })) as LayoutItem[];
  }
  return out;
}