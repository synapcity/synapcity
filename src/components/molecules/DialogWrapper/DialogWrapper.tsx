"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/atoms/ui/dialog";

import { Button } from "@/components/atoms";
import { ButtonVariant } from "@/components/atoms/buttons/variants";
import { cn } from "@/utils";

export interface DialogWrapperProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: React.ReactNode;
  description: React.ReactNode;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  hideFooter?: boolean;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  loading?: boolean;
  footer?: React.ReactNode;
  variant?: ButtonVariant;
  showTitle?: boolean;
  showDescription?: boolean;
}

export function DialogWrapper({
  open,
  onOpenChange,
  title,
  description,
  trigger,
  children,
  showCloseButton = true,
  hideFooter = false,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  onConfirm,
  loading = false,
  footer,
  variant = "primary",
  showTitle = false,
  showDescription = false,
}: DialogWrapperProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent showCloseButton={showCloseButton}>
        <DialogHeader>
          <DialogTitle data-testid="dialog-title" className={cn({ "sr-only": !showTitle })}>
            {title}
          </DialogTitle>
          <DialogDescription className={cn({ "sr-only": !showDescription })}>
            {description}
          </DialogDescription>
        </DialogHeader>

        {children}

        {!hideFooter && (
          <DialogFooter>
            {footer ? (
              footer
            ) : (
              <>
                <DialogClose asChild>
                  <Button variant="outline" disabled={loading}>
                    {cancelLabel}
                  </Button>
                </DialogClose>
                <Button
                  onClick={onConfirm}
                  disabled={loading}
                  variant={variant}
                >
                  {confirmLabel}
                </Button>
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
