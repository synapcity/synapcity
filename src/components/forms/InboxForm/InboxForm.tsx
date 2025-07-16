/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { DynamicErrorDisplay, DynamicFormFields } from "../components"
import { useFormEngine } from "../formEngine/useFormEngine"
import { parseSchemaWithResolver } from "../formEngine/parseSchemaWithResolver"
import { inboxFormSchema } from "./inboxFormSchema"
import { getInboxFieldMap } from "./getInboxFields"
import { FormLayoutWrapper } from "../components/FormLayoutWrapper"
import { FormProvider } from "react-hook-form"

export const InboxForm = ({
  onSubmit,
  onCancel,
  defaultValues,
  layout = "vertical"
}: {
  onSubmit: (values: any) => void
  onCancel?: () => void
  defaultValues?: any
  layout?: "vertical" | "grid" | "inline"
}) => {
  const fieldMap = getInboxFieldMap(defaultValues?.type ?? "text")
  const fields = parseSchemaWithResolver(inboxFormSchema, (k) => fieldMap[k])
  const { form, handleSubmit } = useFormEngine({
    schema: inboxFormSchema,
    defaultValues,
    onSubmit,
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
        <FormLayoutWrapper
          layout={layout}
          showCancel={!!onCancel}
          onCancel={onCancel}
          submitLabel="Save"
          cancelLabel="Cancel"
        >
          <DynamicFormFields fields={fields} layout={layout} meta={{}} />
          <DynamicErrorDisplay />
        </FormLayoutWrapper>
      </form>
    </FormProvider>
  )
}