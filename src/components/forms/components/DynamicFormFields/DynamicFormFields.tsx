// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { FC } from "react"
// import { Controller, useFormContext, type UseFormReturn } from "react-hook-form"
// import type { FieldDefinition, FieldMeta } from "@/types/form"

// interface Props {
//   fields: FieldDefinition[]
//   layout?: "vertical" | "grid" | "inline"
//   form?: UseFormReturn<any>;
//   meta?: FieldMeta
// }

// export const DynamicFormFields: FC<Props> = ({ fields, layout = "vertical", form, meta }) => {
//   const context = useFormContext()
//   const control = form?.control ?? context.control
//   const trigger = form?.trigger ?? context.trigger
//   return (
//     <div
//       className={
//         layout === "grid"
//           ? "grid grid-cols-1 md:grid-cols-2 gap-4"
//           : layout === "inline"
//             ? "flex flex-wrap items-center gap-4"
//             : "space-y-4"
//       }
//     >
//       {fields.map((def) => {
//         return (
//           <Controller
//             key={def.name}
//             name={def.name as any}
//             control={control}
//             render={({ field, fieldState, ...props }) => (
//               // <DynamicField
//               //   field={field}
//               //   fieldState={fieldState}
//               //   label={def.label}
//               //   config={def}
//               //   trigger={trigger}
//               //   meta={meta}
//               //   type={def.type}
//               //   {...props}
//               // />
//             )}
//           />
//         )
//       })}
//     </div>
//   )
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FC } from "react"
import { Controller, useFormContext, type UseFormReturn } from "react-hook-form"
import type { FieldDefinition, FieldMeta } from "@/types/form"
import { fieldRegistry } from "../../fields/fieldRegistry"

interface Props {
  fields: FieldDefinition[]
  layout?: "vertical" | "grid" | "inline"
  form?: UseFormReturn<any>;
  meta?: FieldMeta
}

export const DynamicFormFields: FC<Props> = ({ fields, layout = "vertical", form, meta }) => {
  const context = useFormContext()
  const control = form?.control ?? context.control
  const trigger = form?.trigger ?? context.trigger

  return (
    <div
      className={
        layout === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 gap-4"
          : layout === "inline"
            ? "flex flex-wrap items-center gap-4"
            : "space-y-4"
      }
    >
      {fields.map((def) => {
        const Component = fieldRegistry[def.type]
        if (!Component) {
          console.warn(`No component for field type \"${def.type}\"`)
          return null
        }

        return (
          <Controller
            key={def.name}
            name={def.name as any}
            control={control}
            render={({ field }) => (
              <Component
                config={def}
                field={field}
                trigger={trigger}
                meta={meta}
              />
            )}
          />
        )
      })}
    </div>
  )
}