"use client";

import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/atoms/ui/toggle-group";
import {
  Phone,
  Smartphone,
  TabletSmartphone,
  Tablet,
  Laptop,
  Monitor,
} from "lucide-react";

export type Breakpoint = "xxs" | "xs" | "sm" | "md" | "lg" | "xl";

interface BreakpointToggleProps {
  value: Breakpoint;
  onChange: (value: Breakpoint) => void;
  containerWidth?: number;
}

const breakpointSizes: Record<Breakpoint, number> = {
  xxs: 320,
  xs: 480,
  sm: 768,
  md: 996,
  lg: 1200,
  xl: 1500,
};

const breakpointIcons: Record<Breakpoint, React.ReactNode> = {
  xxs: <Phone className="h-4 w-4" />,
  xs: <Smartphone className="h-4 w-4" />,
  sm: <TabletSmartphone className="h-4 w-4" />,
  md: <Tablet className="h-4 w-4" />,
  lg: <Laptop className="h-4 w-4" />,
  xl: <Monitor className="h-4 w-4" />,
};

// const breakpointTooltipContent: Record<Breakpoint, string> = {
//   xxs: "Extra Extra Small (320px)",
//   xs: "Extra Small (480px)",
//   sm: "Small (768px)",
//   md: "Medium (996px)",
//   lg: "Large (1200px)",
//   xl: "Extra Large (1500px)",
// };

const BreakpointToggle: React.FC<BreakpointToggleProps> = ({
  value,
  onChange,
  containerWidth = Infinity,
}) => {
  const availableBreakpoints = (Object.keys(breakpointSizes) as Breakpoint[]).filter(
    (bp) => breakpointSizes[bp] <= containerWidth
  );

  React.useEffect(() => {
    if (!availableBreakpoints.includes(value)) {
      const fallback = availableBreakpoints[availableBreakpoints.length - 1];
      if (fallback) onChange(fallback);
    }
  }, [availableBreakpoints, value, onChange]);

  return (
    <ToggleGroup
      type="single"
      value={value}
      size="sm"
      onValueChange={(val) => {
        if (val) onChange(val as Breakpoint);
      }}
      className="gap-1 flex items-center group"
    >
      {availableBreakpoints.map((bp) => (
        <ToggleGroupItem
          key={bp}
          value={bp}
          aria-label={bp.toUpperCase()}
        // tooltip={breakpointTooltipContent[bp]}
        >
          {breakpointIcons[bp]}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default BreakpointToggle;
