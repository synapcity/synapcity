import { LayoutItem, BreakpointType } from "@/stores/resources/gridStore/grid-schema";

export const handleLayoutChange = (
  layoutRef: React.RefObject<LayoutItem[]>,
  debouncedSetLayoutByBreakpointType: (bp: BreakpointType, layout: LayoutItem[]) => void,
  bp: BreakpointType,
  layout: LayoutItem[]
) => {
  layoutRef.current = layout;
  debouncedSetLayoutByBreakpointType(bp, layout);
};

export const handleBreakpointChange = (
  layoutRef: React.RefObject<LayoutItem[]>,
  layouts: Record<BreakpointType, LayoutItem[]> | undefined,
  bp: BreakpointType,
  setCurrentBreakpointType: (bp: BreakpointType) => void
) => {
  layoutRef.current = layouts?.[bp] ?? [];
  setCurrentBreakpointType(bp);
};
