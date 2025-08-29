"use client";

import { ReactNode } from "react";
import { Button } from "@/components/atoms";

interface FormLayoutWrapperProps {
  layout?: "vertical" | "grid" | "inline";
  children: ReactNode;
  showSubmit?: boolean;
  showCancel?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
}

export const FormLayoutWrapper = ({
  layout = "vertical",
  children,
  showSubmit = true,
  showCancel = false,
  onCancel,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
}: FormLayoutWrapperProps) => {
  const layoutClass =
    layout === "grid"
      ? "grid grid-cols-1 md:grid-cols-2 gap-4"
      : layout === "inline"
        ? "flex flex-wrap items-center gap-4"
        : "space-y-6";

  return (
    <div className={layoutClass}>
      {children}
      {(showSubmit || showCancel) && (
        <div className="flex justify-end gap-2 col-span-full w-full">
          {showCancel && (
            <Button type="button" variant="ghost" onClick={onCancel}>
              {cancelLabel}
            </Button>
          )}
          {showSubmit && <Button type="submit">{submitLabel}</Button>}
        </div>
      )}
    </div>
  );
};
