"use client";

import React from "react";
import { Raised } from "./SwatchGroup/Raised";
import SwatchesGroup from "./SwatchGroup/SwatchesGroup";

const tailwindGroupedColors: string[][] = [
  ["#7f1d1d", "#b91c1c", "#ef4444", "#f87171", "#fee2e2"], // red
  ["#831843", "#be185d", "#ec4899", "#f472b6", "#fce7f3"], // pink
  ["#4c1d95", "#6d28d9", "#8b5cf6", "#a78bfa", "#ede9fe"], // violet
  ["#1e3a8a", "#2563eb", "#3b82f6", "#60a5fa", "#dbeafe"], // blue
  ["#064e3b", "#047857", "#10b981", "#34d399", "#d1fae5"], // green
  ["#78350f", "#b45309", "#f59e0b", "#fbbf24", "#fef3c7"], // amber
  ["#7c2d12", "#c2410c", "#fb923c", "#fdba74", "#ffedd5"], // orange
  ["#111827", "#4b5563", "#9ca3af", "#e5e7eb", "#ffffff"], // gray
];

interface SwatchPickerProps {
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

export const SwatchPicker: React.FC<SwatchPickerProps> = ({ value, onChange, className = "" }) => {
  const handleColorChange = (e: React.MouseEvent, color: string) => {
    onChange(color);
  };

  return (
    <div className={`swatches-picker ${className}`} style={{ width: 320 }}>
      <Raised>
        <div className="h-full overflow-y-scroll">
          <div className="p-4 pb-1.5">
            {tailwindGroupedColors.map((group, idx) => (
              <SwatchesGroup key={idx} group={group} active={value} onClick={handleColorChange} />
            ))}
            <div className="clear-both" />
          </div>
        </div>
      </Raised>
    </div>
  );
};
