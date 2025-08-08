"use client"
import React, { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { OverlayToggle, Breakpoint, BreakpointToggle } from "@/components/molecules/toggles";
import { ColumnOverlay, RowOverlay } from "@/components/molecules/overlays";
import { gridConstants } from "@/grid/defaultGridLayout";

const widths: Record<Breakpoint, string> = {
  xxs: "max-w-[479px]",
  xs: "max-w-[767px]",
  sm: "max-w-[995px]",
  md: "max-w-[1199px]",
  lg: "max-w-[1499px]",
  xl: "max-w-full",
};

const BreakpointToggleWrapper = ({ children, containerRef: externalContainerRef }: { children: React.ReactNode; containerRef: RefObject<HTMLDivElement | null> }) => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("xl");
  const [rows, setRows] = useState(20);
  const [showCols, setShowCols] = useState(false);
  const [showRows, setShowRows] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

  const containerRef = useRef<HTMLDivElement>(null);

  const columnCount = gridConstants.cols[breakpoint];
  const containerWidthClass = widths[breakpoint];

  const rowHeight = gridConstants.rowHeight;
  const marginX = gridConstants.margin[0];
  const marginY = gridConstants.margin[1];
  const containerPaddingX = gridConstants.containerPadding[0];
  const containerPaddingY = gridConstants.containerPadding[1];

  const calculateRows = useCallback(() => {
    if (!containerRef.current) return;
    const height = containerRef.current.clientHeight;
    const availableHeight = height - 2 * containerPaddingY;
    const rowSpace = rowHeight + marginY;
    const newRows = Math.floor((availableHeight + marginY) / rowSpace);
    setRows(newRows > 0 ? newRows : 1);
  }, [containerPaddingY, marginY, rowHeight]);
  console.log("width", windowWidth)

  useEffect(() => {
    calculateRows();

    const handleResize = () => {
      setWindowWidth(externalContainerRef?.current?.clientWidth || window.innerWidth);
      calculateRows();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [calculateRows, externalContainerRef]);

  return (
    <>
      <div className={`flex items-center justify-between mx-auto w-full shrink-0 ${containerWidthClass} absolute top-0 right-0 left-0 z-30 px-4`}>
        <OverlayToggle
          showCols={showCols}
          showRows={showRows}
          toggleCols={() => setShowCols((prev) => !prev)}
          toggleRows={() => setShowRows((prev) => !prev)}
        />
        <BreakpointToggle value={breakpoint} onChange={setBreakpoint} containerWidth={windowWidth} />
      </div>

      <div
        ref={containerRef}
        className={`relative size-full ${containerWidthClass} flex flex-col transition-all duration-200 ease-linear m-auto`}
      >
        {showCols && (
          <ColumnOverlay
            cols={columnCount}
            marginX={marginX}
            containerPaddingX={containerPaddingX}
            containerWidth={windowWidth}
          />
        )}
        {showRows && (
          <RowOverlay
            rows={rows}
            marginY={marginY}
            containerPaddingY={containerPaddingY}
            rowHeight={rowHeight}
          />
        )}
        <>{children}</>
      </div>
    </>
  );
};

export default BreakpointToggleWrapper;