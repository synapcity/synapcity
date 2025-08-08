import type { Layout } from "react-grid-layout";
import { BreakpointType } from "@/types";

export const handleLayoutChange = (
  layoutRef: React.RefObject<Layout[]>,
  debouncedSetLayoutByBreakpointType: (bp: BreakpointType, layout: Layout[]) => void,
  bp: BreakpointType,
  layout: Layout[]
) => {
  layoutRef.current = layout;
  debouncedSetLayoutByBreakpointType(bp, layout);
};

export const handleBreakpointChange = (
  layoutRef: React.RefObject<Layout[]>,
  layouts: Record<BreakpointType, Layout[]> | undefined,
  bp: BreakpointType,
  setCurrentBreakpointType: (bp: BreakpointType) => void
) => {
  layoutRef.current = layouts?.[bp] ?? [];
  setCurrentBreakpointType(bp);
};