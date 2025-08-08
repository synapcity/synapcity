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
import { BreakpointType, defaultBreakpoints } from "@/stores";


interface BreakpointToggleProps {
  value: BreakpointType;
  onChange: (value: BreakpointType) => void;
  containerWidth?: number;
}

const breakpointIcons: Record<BreakpointType, React.ReactNode> = {
  xxs: <Phone className="h-4 w-4" />,
  xs: <Smartphone className="h-4 w-4" />,
  sm: <TabletSmartphone className="h-4 w-4" />,
  md: <Tablet className="h-4 w-4" />,
  lg: <Laptop className="h-4 w-4" />,
  xl: <Monitor className="h-4 w-4" />,
  xxl: <Monitor className="h-4 w-4" />
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
  const availableBreakpoints = (Object.keys(defaultBreakpoints) as BreakpointType[]).filter(
    (bp) => defaultBreakpoints[bp] <= containerWidth
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
        if (val) onChange(val as BreakpointType);
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
