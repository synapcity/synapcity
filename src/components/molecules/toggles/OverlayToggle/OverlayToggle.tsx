"use client";

import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/atoms/ui/toggle-group";
import { Rows, Columns } from "lucide-react";

interface OverlayToggleProps {
  showRows: boolean;
  showCols: boolean;
  toggleRows: () => void;
  toggleCols: () => void;
}

const OverlayToggle: React.FC<OverlayToggleProps> = ({
  showRows,
  showCols,
  toggleRows,
  toggleCols,
}) => {
  const selectedValues = [];
  if (showRows) selectedValues.push("rows");
  if (showCols) selectedValues.push("cols");

  return (
    <ToggleGroup
      type="multiple"
      value={selectedValues}
      size="sm"
      onValueChange={(val) => {

        if (val.includes("rows") && !showRows) {
          toggleRows();
        }
        if (!val.includes("rows") && showRows) {
          toggleRows();
        }

        if (val.includes("cols") && !showCols) {
          toggleCols();
        }
        if (!val.includes("cols") && showCols) {
          toggleCols();
        }
      }}
      className="gap-1 flex items-center"
    >
      <ToggleGroupItem value="cols" aria-label="Toggle columns overlay" >
        <span className="sr-only">Toggle Columns Overlay</span>
        <Columns className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="rows" aria-label="Toggle rows overlay" >
        <span className="sr-only">Toggle Rows Overlay</span>
        <Rows className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup >
  );
};

export default OverlayToggle;
