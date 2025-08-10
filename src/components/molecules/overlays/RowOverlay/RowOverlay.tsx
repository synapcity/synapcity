import React from "react";

interface RowOverlayProps {
  rows: number;
  marginY: number;
  containerPaddingY: number;
  rowHeight: number;
}

const RowOverlay: React.FC<RowOverlayProps> = ({ rows, marginY, containerPaddingY, rowHeight }) => {
  return (
    <div
      className="absolute inset-0 z-10 pointer-events-none flex flex-col px-[10px]"
      style={{ paddingTop: containerPaddingY, paddingBottom: containerPaddingY }}
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="bg-red-500/20 w-full rounded-sm"
          style={{
            height: rowHeight,
            marginBottom: i === rows - 1 ? 0 : marginY,
          }}
        />
      ))}
    </div>
  );
};

export default RowOverlay;
