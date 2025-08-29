"use client";

import React, { useEffect, useState } from "react";

interface ColumnOverlayProps {
  cols: number;
  marginX: number;
  containerPaddingX: number;
  containerWidth: number;
}

const ColumnOverlay: React.FC<ColumnOverlayProps> = ({
  cols,
  marginX,
  containerPaddingX,
  containerWidth,
}) => {
  const [columnWidth, setColumnWidth] = useState(0);

  useEffect(() => {
    if (containerWidth <= 0) return;

    const usableWidth = containerWidth - containerPaddingX * 2 - marginX * (cols - 1);
    setColumnWidth(usableWidth / cols);
  }, [cols, marginX, containerPaddingX, containerWidth]);

  return (
    <div
      className="absolute inset-0 z-10 pointer-events-none flex"
      style={{
        paddingLeft: containerPaddingX,
        paddingRight: containerPaddingX,
      }}
    >
      {Array.from({ length: cols }).map((_, i) => (
        <div
          key={i}
          style={{
            width: `${columnWidth}px`,
            marginRight: i === cols - 1 ? 0 : `${marginX}px`,
          }}
          className="bg-blue-500/10 h-full rounded-sm"
        />
      ))}
    </div>
  );
};

export default ColumnOverlay;
