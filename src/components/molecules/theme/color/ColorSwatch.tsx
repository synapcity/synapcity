"use client"

import React from 'react';
import clsx from 'clsx';
import { getContrastingColor } from '@/theme/generateValues/utils/getContrastingColor/getContrastingColor';

interface ColorSwatchProps {
  color: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent, color: string) => void;
  onSwatchHover?: (e: React.MouseEvent, color: string) => void;
  className?: string;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  active = false,
  onClick,
  onSwatchHover,
  className = '',
}) => {
  const handleClick = (e: React.MouseEvent) => onClick?.(e, color);
  const handleHover = (e: React.MouseEvent) => onSwatchHover?.(e, color);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Color swatch: ${color}`}
      onClick={handleClick}
      onMouseOver={handleHover}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(e as any, color)}
      className={clsx(
        'w-6 h-6 rounded ring-2 transition cursor-pointer',
        active ? 'ring-black dark:ring-white' : 'ring-transparent',
        className
      )}
      style={{ backgroundColor: color }}
    >
      {active && (
        <div
          className="flex items-center justify-center w-full h-full text-xs font-bold"
          style={{ color: getContrastingColor(color) }}
        >
          ✓
        </div>
      )}
    </div>
  );
};
