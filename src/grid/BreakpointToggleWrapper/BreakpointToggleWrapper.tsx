"use client"
import React, { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { OverlayToggle, BreakpointToggle } from "@/components/molecules/toggles";
import { ColumnOverlay, RowOverlay } from "@/components/molecules/overlays";
import { gridConstants } from "@/grid/defaultGridLayout";
import { getBreakpointForWidth } from "@/utils/grid-utils";
import { BreakpointType, defaultCols, defaultContainerPadding, defaultMargin } from "@/stores";

const widths: Record<BreakpointType, string> = {
  xxs: "max-w-[479px]",
  xs: "max-w-[767px]",
  sm: "max-w-[995px]",
  md: "max-w-[1199px]",
  lg: "max-w-[1499px]",
  xl: "max-w-full",
  xxl: "max-w-full"
};

const BreakpointToggleWrapper = ({ children, containerRef: externalContainerRef }: { children: React.ReactNode; containerRef: RefObject<HTMLDivElement | null> }) => {
  const [breakpoint, setBreakpoint] = useState<BreakpointType>("xl");
  const [rows, setRows] = useState(20);
  const [showCols, setShowCols] = useState(false);
  const [showRows, setShowRows] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

  const containerRef = useRef<HTMLDivElement>(null);

  const columnCount = defaultCols[breakpoint];
  const containerWidthClass = widths[breakpoint];

  const rowHeight = gridConstants.rowHeight;
  const marginX = defaultMargin[breakpoint][0];
  const marginY = defaultMargin[breakpoint][1];
  const containerPaddingX = defaultContainerPadding[breakpoint][0];
  const containerPaddingY = defaultContainerPadding[breakpoint][1];

  const calculateRows = useCallback(() => {
    if (!containerRef.current) return;
    const height = containerRef.current.clientHeight;
    const availableHeight = height - 2 * containerPaddingY;
    const rowSpace = rowHeight + marginY;
    const newRows = Math.floor((availableHeight + marginY) / rowSpace);
    setRows(newRows > 0 ? newRows : 1);
  }, [containerPaddingY, marginY, rowHeight]);

  useEffect(() => {
    if (containerRef && containerRef.current && containerRef.current.clientWidth > windowWidth) {
      const width = containerRef.current.clientWidth - containerPaddingX
      setWindowWidth(width)
      const breakpoint = getBreakpointForWidth(windowWidth)
      setBreakpoint(breakpoint)
    }
  }, [containerPaddingX, containerRef, windowWidth])

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