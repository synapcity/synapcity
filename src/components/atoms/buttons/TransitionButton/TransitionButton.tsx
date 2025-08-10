"use client";

import { useTransition, useState, useEffect } from "react";
import { Button, ButtonProps, Tooltip } from "@/components/atoms";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { cn } from "@/utils";

interface TransitionButtonProps extends Omit<ButtonProps, "icon"> {
  action?: () => void;
  loadingText?: string;
  isLoading?: boolean;
  icon?: React.ReactNode | null;
  successIcon?: React.ReactNode;
  showSuccessIcon?: boolean;
  successText?: string;
  tooltip?: string;
  hideTextOnLoading?: boolean;
  hideTextOnSmallScreens?: boolean;
  successDuration?: number;
  onSuccess?: () => void;
}

export function TransitionButton({
  action,
  type = "button",
  loadingText = "Loading...",
  isLoading = false,
  icon,
  successIcon,
  showSuccessIcon = false,
  successText,
  tooltip,
  hideTextOnLoading = false,
  hideTextOnSmallScreens = false,
  successDuration = 1500,
  onSuccess,
  children,
  ...props
}: TransitionButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastLoading, setLastLoading] = useState(false);

  const loading = isPending || isLoading;

  useEffect(() => {
    if (lastLoading && !loading && successIcon) {
      setShowSuccess(true);
      const timeout = setTimeout(() => setShowSuccess(false), successDuration);
      return () => clearTimeout(timeout);
    }
    setLastLoading(loading);
  }, [loading, lastLoading, successIcon, successDuration]);

  const handleClick = (e: React.MouseEvent) => {
    if (type === "submit") return;
    e.preventDefault();

    startTransition(() => {
      if (action) action();
    });
    if (onSuccess) onSuccess();
  };

  const iconToRender = loading ? (
    <Loader2 className="w-4 h-4 animate-spin" />
  ) : (showSuccessIcon || showSuccess) && successIcon ? (
    successIcon
  ) : (
    icon
  );

  const buttonContent = (
    <>
      <AnimatePresence initial={false} mode="wait">
        {iconToRender && (
          <motion.span
            key="icon"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1 }}
            className={cn("flex items-center justify-center", !isLoading && iconToRender && "mr-2")}
          >
            {iconToRender}
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!hideTextOnLoading || !loading ? (
          <motion.span
            key="text"
            className={cn(hideTextOnSmallScreens && "hidden sm:inline")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {loading ? loadingText : showSuccess && successText ? successText : children}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </>
  );

  const buttonEl = (
    <Button
      type={type}
      onClick={handleClick}
      disabled={loading || props.disabled}
      aria-label={tooltip || (typeof children === "string" ? children : "Action")}
      {...props}
    >
      {buttonContent}
    </Button>
  );

  if ((hideTextOnLoading || hideTextOnSmallScreens) && tooltip) {
    return <Tooltip asChild content={tooltip} trigger={buttonEl} />;
  }

  return buttonEl;
}
TransitionButton.displayName = "TransitionButton";
