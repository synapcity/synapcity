/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldDefinition, FieldMeta, FieldType } from "@/types/form";
import { Label } from "@/components/atoms";
import { ControllerFieldState, ControllerRenderProps, FieldValues, UseFormTrigger } from "react-hook-form"
import { fieldRegistry } from "@/components/forms/fields/fieldRegistry";

interface DynamicFieldProps {
  field: ControllerRenderProps<any, any>
  fieldState: ControllerFieldState;
  label: string;
  trigger: UseFormTrigger<any> | UseFormTrigger<FieldValues>;
  meta?: FieldMeta;
  config?: FieldDefinition;
  type: FieldType;
  [key: string]: any
}

export const DynamicField = ({ label, field, meta, config, fieldState, trigger, type, ...props }: DynamicFieldProps) => {
  const Component = fieldRegistry[type];


  if (!Component || typeof Component !== 'function') {
    console.error("❌ Invalid component for field:", type, Component);
    return null;
  }

  if (!config) {
    return null;
  }

  return (
    <div>
      <Label>{label}</Label>
      <Component
        field={field}
        trigger={trigger}
        meta={meta}
        config={config}
        {...props}
      />
    </div>

  )
}