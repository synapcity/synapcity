'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { useIdle } from '@/hooks/interaction/useIdle';
import { cn } from '@/utils';

export interface IdleFadeProps extends HTMLMotionProps<'div'> {
  /** Milliseconds before children fade out */
  delay?: number;
  /** Disable the idle fade behavior */
  disabled?: boolean;
  /** When true, children stay visible (regardless of idle) */
  forceVisible?: boolean;
  /** If you only want to track idle after some condition */
  enabled?: boolean;
}

/**
 * Wrap any UI you want to auto-fade on idle.
 * By default, it will:
 *  - fade to opacity 0 after `delay` ms of no activity
 *  - restore to opacity 1 on any mouse/keyboard activity
 */
export function IdleFade({
  children,
  className,
  delay,
  disabled,
  forceVisible,
  enabled,
  style,
  ...rest
}: IdleFadeProps) {
  const { ref, isIdle } = useIdle({ delay, disabled, enabled });

  // if forceVisible, ignore idle
  const shouldHide = !forceVisible && isIdle;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 1 }}
      animate={{ opacity: shouldHide ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      className={cn(className, 'pointer-events-auto')}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
