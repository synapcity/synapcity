"use client";

import { X } from "lucide-react";
import { cn } from "@/utils";
import { Button, type ButtonVariant } from "@/components/atoms/buttons";
import {
  DialogClose,
  DialogContent,
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/atoms/ui/dialog";

export type DialogAction = {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (data: any) => void;
  type?: "submit" | "button";
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
};

export type DialogWrapperProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  actions?: DialogAction[];
  size?: "sm" | "md" | "lg" | "xl";
  hideClose?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  trigger?: React.ReactNode;
  footer?: React.ReactNode;
  asChild?: boolean;
};

export function DialogWrapper({
  open,
  onOpenChange,
  title,
  description,
  children,
  actions,
  size = "md",
  hideClose = false,
  showDescription = false,
  showTitle = false,
  trigger,
  asChild = false,
  footer,
}: DialogWrapperProps) {
  return (
    <Dialog open={open ?? undefined} onOpenChange={onOpenChange ?? undefined}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
        {trigger && <DialogTrigger asChild={asChild}>{trigger}</DialogTrigger>}
        <DialogContent
          className={cn(
            "fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white dark:bg-neutral-950 p-6 shadow-xl transition-all duration-300",
            "opacity-0 scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100",
            {
              "w-full max-w-sm": size === "sm",
              "w-full max-w-md": size === "md",
              "w-full max-w-lg": size === "lg",
              "w-full max-w-2xl": size === "xl",
            }
          )}
        >
          {!hideClose && (
            <DialogClose asChild>
              <button
                className="absolute right-4 top-4 rounded-md p-2 text-neutral-500 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-500"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </DialogClose>
          )}

          {title && (
            <DialogTitle
              data-testid="dialog-title"
              className={cn("text-lg font-semibold text-neutral-900 dark:text-white", {
                "sr-only": !showTitle,
              })}
            >
              {title}
            </DialogTitle>
          )}
          {description && (
            <DialogDescription
              className={cn("mt-1 text-sm text-neutral-500 dark:text-neutral-400", {
                "sr-only": !showDescription,
              })}
            >
              {description}
            </DialogDescription>
          )}

          {children}
          {actions && actions?.length > 0 && (
            <div className="mt-6 flex justify-end gap-2">
              {actions.map((action, idx) => {
                const {
                  label,
                  onClick,
                  type = "button",
                  variant,
                  disabled,
                  className,
                  icon,
                  iconPosition,
                  loading,
                } = action;

                const btn = (
                  <Button
                    key={idx}
                    type={type}
                    variant={variant}
                    onClick={onClick}
                    disabled={disabled || loading}
                    className={className}
                    isLoading={loading}
                  >
                    {iconPosition === "left" && icon}
                    {label}
                    {iconPosition === "right" && icon}
                  </Button>
                );

                return label.toLowerCase() === "cancel" ? (
                  <DialogClose key={idx} asChild>
                    {btn}
                  </DialogClose>
                ) : (
                  btn
                );
              })}
            </div>
          )}
        </DialogContent>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogPortal>
    </Dialog>
  );
}
