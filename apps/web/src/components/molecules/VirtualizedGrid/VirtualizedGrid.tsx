"use client";

import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";

export interface CardItemBase {
  id: string;
  title: string;
  subtitle?: string;
  onClick?: () => void;
}
interface VirtualizedGridProps<T extends CardItemBase> {
  items: T[];
  renderCard: (item: T) => React.ReactNode;
  renderAddNew?: () => React.ReactNode;
  estimatedRowHeight?: number;
  gap?: number;
  minColumnWidth?: number;
  containerClassName?: string;
  "aria-label"?: string;
}

export function VirtualizedGrid<T extends CardItemBase>({
  items,
  renderCard,
  renderAddNew,
  estimatedRowHeight = 220,
  gap = 16,
  minColumnWidth = 280,
  containerClassName = "",
  "aria-label": ariaLabel = "Virtualized grid of items",
}: VirtualizedGridProps<T>) {
  const parentRef = React.useRef<HTMLDivElement | null>(null);
  const [columns, setColumns] = React.useState(1);

  React.useLayoutEffect(() => {
    if (!parentRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const e of entries) {
        const width = e.contentRect.width;
        const cols = Math.max(1, Math.floor(width / minColumnWidth));
        setColumns(cols);
      }
    });
    resizeObserver.observe(parentRef.current);
    return () => resizeObserver.disconnect();
  }, [minColumnWidth]);

  const rows: Array<Array<T | null>> = [];
  const allItems = renderAddNew ? ([null] as Array<null | T>).concat(items) : items.slice();
  for (let i = 0; i < allItems.length; i += columns) {
    rows.push(allItems.slice(i, i + columns) as Array<T | null>);
  }

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimatedRowHeight + gap,
    overscan: 3,
  });

  return (
    <div
      aria-label={ariaLabel}
      ref={parentRef}
      className={cn("relative overflow-auto h-full w-full", containerClassName)}
      style={{ padding: gap / 2 }}
    >
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const rowItems = rows[virtualRow.index] || [];
          return (
            <div
              key={virtualRow.key}
              style={{
                position: "absolute",
                top: virtualRow.start,
                left: 0,
                width: "100%",
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                gap: gap,
                paddingBottom: gap,
              }}
              aria-rowindex={virtualRow.index + 1}
            >
              {rowItems.map((item, colIdx) => {
                if (item === null) {
                  return (
                    <div key={`add-${colIdx}`} className="break-inside-avoid">
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          layout
                        >
                          {renderAddNew?.()}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <div key={item.id} className="break-inside-avoid">
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        layout
                      >
                        {renderCard(item)}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                );
              })}
              {rowItems.length < columns &&
                Array.from({ length: columns - rowItems.length }).map((_, i) => (
                  <div key={`filler-${i}`} aria-hidden="true" />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
