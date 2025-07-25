/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DynamicForm } from "@/components/forms/components";
import { DialogWrapper } from "@/components/molecules/DialogWrapper";
import { BaseModalProps } from "@/stores";
import { FieldDefinitionMap } from "@/types/form";
import { z } from "zod";

export type ConfirmModalProps = BaseModalProps & {
  submitText?: string;
  cancelText?: string;
  onSubmit?: (values: { fileName: string; }) => void | Promise<void>;
  onCancel?: () => void;
  defaultValues?: any;
}

const fileSchema = z.object({
  fileName: z.string().min(1, "File name is required").default(""),
})

const fileFieldMap: FieldDefinitionMap = {
  fileName: {
    name: "fileName",
    label: "File Name",
    type: "text",
    meta: { required: true }
  }
}
export const ConfirmModal = ({
  open,
  onOpenChange,
  trigger,
  triggerAsChild = false,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onSubmit,
  onCancel,
  submitText,
  defaultValues,
  ...props
}: ConfirmModalProps) => {
  if (!onCancel || !onSubmit) return null;
  return (
    <DialogWrapper
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      trigger={trigger}
      asChild={triggerAsChild}
    >
      <DynamicForm
        schema={fileSchema}
        fieldMap={fileFieldMap}
        onSubmit={onSubmit}
        onCancel={onCancel}
        showSubmit
        showCancel
        submitLabel={submitText}
        defaultValues={defaultValues}
        {...props}
      />
    </DialogWrapper>
  );
};
