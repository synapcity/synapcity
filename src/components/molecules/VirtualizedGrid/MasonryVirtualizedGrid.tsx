"use client";

import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/utils";
import dynamic from "next/dynamic";
import { SkeletonOrLoading } from "@/components/loading";

export interface CardItemBase {
  id: string;
  title?: string;
  subtitle?: string;
  onClick?: () => void;
}

interface MasonryWindowProps<T extends CardItemBase> {
  items: T[];
  renderCard: (item: T) => React.ReactNode;
  renderAddNew?: () => React.ReactNode;
  containerClassName?: string;
  columnClassName?: string;
  estimatedCardHeight?: number;
  overscanScreens?: number;
  "aria-label"?: string;
  lazyRootMargin?: string;
  expiryMs?: number;
}

const MasonryGridCardSlot = dynamic(
  () => import("./MasonryGridCardSlot").then((mod) => mod.MasonryGridCardSlot),
  { ssr: false, loading: ({ isLoading }) => <SkeletonOrLoading isLoading={isLoading} /> }
);

export function MasonryVirtualWindow<T extends CardItemBase>({
  items,
  renderCard,
  renderAddNew,
  containerClassName = "",
  columnClassName = "",
  estimatedCardHeight = 220,
  overscanScreens = 1,
  "aria-label": ariaLabel = "Masonry grid",
  lazyRootMargin = "300px",
  expiryMs = 5000,
}: MasonryWindowProps<T>) {
  const allItems: Array<null | T> = React.useMemo(
    () => (renderAddNew ? ([null] as Array<null | T>).concat(items) : (items as Array<null | T>)),
    [items, renderAddNew]
  );

  return (
    <div
      aria-label={ariaLabel}
      className={cn(
        "relative overflow-y-auto p-6 flex-1 @container no-scrollbar",
        containerClassName
      )}
      style={{ minHeight: 0 }}
    >
      <div className={cn("columns-1 @lg:columns-2 @xl:columns-3 gap-4 space-y-4", columnClassName)}>
        <AnimatePresence initial={false}>
          {allItems.map((item, idx) => (
            <MasonryGridCardSlot
              key={`${item?.id}-${idx}`}
              item={item}
              index={idx}
              renderCard={(item: CardItemBase) => renderCard(item as T)}
              renderAddNew={renderAddNew}
              estimatedCardHeight={estimatedCardHeight}
              lazyRootMargin={lazyRootMargin}
              expiryMs={expiryMs}
            />
          ))}
        </AnimatePresence>
        <div aria-hidden="true" style={{ height: estimatedCardHeight * overscanScreens }} />
      </div>
    </div>
  );
}
