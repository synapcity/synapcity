'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useLazyMountWithExpiry } from '@/hooks';

export interface CardItemBase {
  id: string;
  title?: string;
  subtitle?: string;
  onClick?: () => void;
}

interface CardSlotProps<T extends CardItemBase> {
  item: T | null;
  index: number;
  renderCard: (item: T) => React.ReactNode;
  renderAddNew?: () => React.ReactNode;
  estimatedCardHeight: number;
  lazyRootMargin: string;
  expiryMs: number;
}

export function MasonryGridCardSlot<T extends CardItemBase>({
  item,
  index,
  renderCard,
  renderAddNew,
  estimatedCardHeight,
  lazyRootMargin,
  expiryMs,
}: CardSlotProps<T>) {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const isMounted = useLazyMountWithExpiry(wrapperRef as React.RefObject<HTMLDivElement>, lazyRootMargin, expiryMs);

  const key = item === null ? `add-${index}` : item.id;

  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, delay: index * 0.015 }}
      className="break-inside-avoid"
      ref={wrapperRef}
    >
      {isMounted ? (item === null ? renderAddNew?.() : renderCard(item)) : (
        <div style={{ minHeight: estimatedCardHeight, width: '100%' }} aria-hidden="true" />
      )}
    </motion.div>
  );
}
