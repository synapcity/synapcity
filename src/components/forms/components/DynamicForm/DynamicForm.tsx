/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { parseSchemaWithResolver } from "../../formEngine/parseSchemaWithResolver"
import { DynamicFormFields } from "../DynamicFormFields"
import { DynamicFormErrorsDisplay } from "../DynamicErrorDisplay"
import { Button } from "@/components/atoms"

import type { FieldDefinitionMap, FieldMeta } from "@/types/form"
import type { z, ZodObject, ZodRawShape } from "zod"
import { DefaultValues, FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"


interface DynamicFormProps<Schema extends ZodObject<ZodRawShape>> {
  schema: Schema;
  fieldMap: FieldDefinitionMap;
  defaultValues?: DefaultValues<z.input<Schema>>;
  onSubmit: (values: z.output<Schema>) => void | Promise<void>;
  onCancel?: () => void
  className?: string
  layout?: "vertical" | "grid" | "inline"
  submitLabel?: string
  cancelLabel?: string
  showSubmit?: boolean
  showCancel?: boolean
  meta?: FieldMeta
}

export function DynamicForm<Schema extends ZodObject<ZodRawShape>>({
  schema,
  fieldMap,
  defaultValues,
  onSubmit,
  onCancel,
  layout = "vertical",
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  showSubmit = true,
  showCancel = false,
  meta = {}
}: DynamicFormProps<Schema>) {
  const fields = parseSchemaWithResolver(schema, key => fieldMap[key]);
  const methods = useForm<z.input<Schema>, any, z.output<Schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });


  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="size-full flex flex-col justify-space-around"
        onKeyDown={(e) => {
          console.log("Key pressed:", e.key, e.target);
        }}
      >
        <DynamicFormErrorsDisplay />
        <DynamicFormFields fields={fields} layout={layout} meta={meta} />
        {(showSubmit || showCancel) && (
          <div className="flex justify-end gap-2">
            {showCancel && (
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
              >
                {cancelLabel}
              </Button>
            )}
            {showSubmit && (
              <Button type="submit" className="btn btn-primary">
                {submitLabel}
              </Button>
            )}
          </div>
        )}
        <button type="submit" style={{ display: "none" }} aria-hidden="true" />
      </form>
    </FormProvider>

  )
}