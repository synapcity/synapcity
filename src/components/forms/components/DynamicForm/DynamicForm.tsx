"use client"

import { parseSchemaWithResolver } from "../../formEngine/parseSchemaWithResolver"
import { DynamicFormFields } from "../DynamicFormFields"
import { DynamicFormErrorsDisplay } from "../DynamicErrorDisplay"
import { Button } from "@/components/atoms"

import type { FieldDefinitionMap, FieldMeta } from "@/types/form"
import type { z, ZodObject, ZodRawShape, ZodTypeAny } from "zod"
import { DefaultValues, FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"


interface DynamicFormProps<Schema extends ZodObject<ZodRawShape>> {
  schema: Schema
  fieldMap: FieldDefinitionMap
  defaultValues?: DefaultValues<z.infer<Schema>>
  onSubmit: (values: z.infer<Schema>) => void | Promise<void>
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
  const fields = parseSchemaWithResolver(schema, key => fieldMap[key])
  const methods = useForm({
    resolver: zodResolver(schema as ZodTypeAny),
    defaultValues
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



















// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import { useForm, FormProvider } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { DynamicFormFields } from "../DynamicFormFields";
// import type { FieldDefinition } from "@/types/form";
// import type { ZodSchema, ZodTypeAny } from "zod";
// import { Button } from "@/components/atoms";

// interface DynamicFormProps {
//   fields: FieldDefinition[];
//   schema: ZodSchema<any>;
//   onSubmit: (data: any) => void;
//   className?: string;
// }

// export function DynamicForm({
//   fields,
//   schema,
//   onSubmit,
//   className,
// }: DynamicFormProps) {
//   const methods = useForm({
//     resolver: zodResolver(schema as ZodTypeAny),
//   });

//   return (
//     <FormProvider {...methods}>
//       <form
//         onSubmit={methods.handleSubmit(onSubmit)}
//         className={className ?? "space-y-6"}
//       >
//         <div className="size-full">
//           <DynamicFormFields fields={fields} />

//           <div className="flex justify-end">
//             <Button
//               type="submit"
//               className="btn btn-primary"
//             >
//               Submit
//             </Button>
//           </div>
//         </div>
//       </form>
//     </FormProvider>
//   );
// }
