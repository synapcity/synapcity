"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonProps, Tooltip } from "@/components/atoms";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";

interface TransitionButtonProps extends Omit<ButtonProps, "icon"> {
  /** The work to run on click. If it returns a Promise, loading is shown until it settles. */
  action?: () => void | Promise<void>;

  /** Text shown while loading (visually or SR-only depending on mode). */
  loadingText?: string;

  /** Controlled loading override. If provided, internal loading is ignored. */
  isLoading?: boolean;

  /** Leading icon (idle state). */
  icon?: React.ReactNode | null;

  /** Icon shown on success (when `action` resolves). */
  successIcon?: React.ReactNode;

  /** Force the success icon to render (useful for controlled flows). */
  showSuccessIcon?: boolean;

  /** Text to show briefly after success (replaces children while visible). */
  successText?: string;

  /** Tooltip content (also used as aria-label fallback for icon-only). */
  tooltip?: string;

  /** Hide text while loading (spinner/icon only). */
  hideTextOnLoading?: boolean;

  /** Hide text on small screens. */
  hideTextOnSmallScreens?: boolean;

  /** How long to keep the success state visible (ms). */
  successDuration?: number;

  /** Called after `action` settles successfully. */
  onSuccess?: () => void;

  /** Called if `action` throws/rejects. (Button clears loading even on error.) */
  onError?: (err: unknown) => void;

  /** Force icon-only mode; otherwise auto when no children. */
  isIconButton?: boolean;

  /** Accessible label (required for icon-only if there’s no visible text). */
  srLabel?: string;

  /** Extra classes for the icon wrapper. */
  iconClassName?: string;
}

export function TransitionButton({
  action,
  type = "button",
  loadingText = "Loading...",
  isLoading,
  icon,
  successIcon,
  showSuccessIcon = false,
  successText,
  tooltip,
  hideTextOnLoading = false,
  hideTextOnSmallScreens = false,
  successDuration = 1500,
  onSuccess,
  onError,
  children,
  isIconButton,
  srLabel,
  iconClassName,
  ...props
}: TransitionButtonProps) {
  // Internal state
  const [internalLoading, setInternalLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const successTimer = useRef<number | null>(null);

  // Effective "controlled-or-uncontrolled" loading
  const loading = typeof isLoading === "boolean" ? isLoading : internalLoading;

  const computedIsIconButton =
    typeof isIconButton === "boolean"
      ? isIconButton
      : !children || (Array.isArray(children) && children.length === 0);

  // Clean up success timer
  useEffect(() => {
    return () => {
      if (successTimer.current) window.clearTimeout(successTimer.current);
    };
  }, []);

  const triggerSuccessFlash = () => {
    if (!successIcon && !successText && !showSuccessIcon) return; // nothing to show
    setShowSuccess(true);
    if (successTimer.current) window.clearTimeout(successTimer.current);
    successTimer.current = window.setTimeout(() => setShowSuccess(false), successDuration);
  };

  const handleClick = async (e: React.MouseEvent) => {
    if (type === "submit") return; // let forms handle submit buttons

    e.preventDefault();
    if (!action) return;

    try {
      setInternalLoading(true);
      await action();
      onSuccess?.();
      triggerSuccessFlash();
    } catch (err) {
      onError?.(err);
      // still clear loading; leave success off
    } finally {
      setInternalLoading(false);
    }
  };

  // Choose which icon to show
  const iconToRender = loading ? (
    <Loader2 className="h-4 w-4 animate-spin" />
  ) : (showSuccessIcon || showSuccess) && successIcon ? (
    successIcon
  ) : (
    icon
  );

  // Whether to render visible text alongside the icon
  const showTextVisually = !computedIsIconButton && (!hideTextOnLoading || !loading);

  const iconWrapperClass = cn(
    "flex items-center justify-center",
    showTextVisually && iconToRender && "mr-2",
    iconClassName
  );

  const content = (
    <>
      <AnimatePresence initial={false} mode="wait">
        {iconToRender && (
          <motion.span
            key={`icon-${loading ? "loading" : showSuccess ? "success" : "idle"}`}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.12 }}
            className={iconWrapperClass}
            aria-hidden
          >
            {iconToRender}
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showTextVisually ? (
          <motion.span
            key={`text-${loading ? "loading" : showSuccess ? "success" : "idle"}`}
            className={cn(hideTextOnSmallScreens && "hidden sm:inline")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {loading ? loadingText : showSuccess && successText ? successText : children}
          </motion.span>
        ) : (
          // SR-only fallback so assistive tech hears state changes
          <span key="sr-only" className="sr-only" aria-live="polite">
            {loading
              ? loadingText
              : showSuccess && successText
                ? successText
                : srLabel || tooltip || (typeof children === "string" ? children : "Action")}
          </span>
        )}
      </AnimatePresence>
    </>
  );

  const ariaLabel =
    showTextVisually && typeof children === "string" && children.trim()
      ? undefined
      : srLabel || tooltip || (typeof children === "string" ? children : "Action");

  const buttonEl = (
    <Button
      type={type}
      onClick={handleClick}
      disabled={loading || props.disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {content}
    </Button>
  );

  const shouldWrapWithTooltip =
    !!tooltip && (computedIsIconButton || hideTextOnLoading || hideTextOnSmallScreens);

  if (shouldWrapWithTooltip) {
    return <Tooltip asChild content={tooltip} trigger={buttonEl} />;
  }

  return buttonEl;
}
TransitionButton.displayName = "TransitionButton";
