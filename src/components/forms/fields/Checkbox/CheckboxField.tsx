// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import {
//   UIFormControl,
//   UICheckbox,
//   UITooltip,
//   UITooltipTrigger,
//   UITooltipContent,
//   UIFormMessage,
//   UIFormField,
// } from "@/components";
// import type { FieldConfig, FieldMeta } from "@/types/form";
// import { useFieldError } from "@/hooks/";

// interface Props {
//   config: FieldConfig;
//   meta?: FieldMeta;
//   field: {
//     name: string;
//     value: any;
//     onChange: (value: any) => void;
//     onBlur: () => void;
//     ref?: React.Ref<any>;
//   };
// }

// export function CheckboxField({ config, meta, field }: Props) {
//   const { message } = useFieldError(config.name);
//   const {
//     name,
//     label,
//     options,
//   } = config;

//   const {
//     tooltip,
//     helpText,
//     disabled = false,
//     required = false,
//   } = meta ?? {};

//   const id = `checkbox-${name}`;
//   const labelId = `${id}-label`;

//   const isGroup = Array.isArray(options) && options.length > 0;

//   const renderSingleCheckbox = () => (
//     <div className="flex items-center space-x-2">
//       <UICheckbox
//         id={id}
//         name={name}
//         checked={!!field.value}
//         onCheckedChange={(checked) => field.onChange(checked === true)}
//         disabled={disabled}
//         required={required}
//         aria-labelledby={labelId}
//       />
//       <label id={labelId} htmlFor={id} className="text-sm font-medium">
//         {label}
//       </label>
//     </div>
//   );

//   const renderCheckboxGroup = () => (
//     <fieldset id={id} className="space-y-2">
//       <legend className="font-medium text-sm">{label}</legend>
//       {options!.map((opt, i) => {
//         const checked = field.value?.includes(opt.value);
//         return (
//           <div key={i} className="flex items-center space-x-2">
//             <UICheckbox
//               id={`${id}-${opt.value}`}
//               checked={checked}
//               onCheckedChange={(checked) => {
//                 const newVal = [...(field.value || [])];
//                 if (checked) {
//                   newVal.push(opt.value);
//                 } else {
//                   const index = newVal.indexOf(opt.value);
//                   if (index > -1) newVal.splice(index, 1);
//                 }
//                 field.onChange(newVal);
//               }}
//               disabled={disabled}
//             />
//             <label htmlFor={`${id}-${opt.value}`} className="text-sm">
//               {opt.label}
//             </label>
//           </div>
//         );
//       })}
//     </fieldset>
//   );

//   const content = isGroup ? renderCheckboxGroup() : renderSingleCheckbox();

//   return (
//     <UIFormControl>
//       <UIFormField name={name} render={({ field, fieldState, formState }) => {
//         console.log("field", field, "fieldState", fieldState, "formState", formState)
//         return (
//           <div className="relative group">
//             {tooltip ? (
//               <UITooltip>
//                 <UITooltipTrigger asChild>{content}</UITooltipTrigger>
//                 <UITooltipContent>{tooltip}</UITooltipContent>
//               </UITooltip>
//             ) : (
//               content
//             )}
//             {helpText && (
//               <p id={`${name}-help`} className="mt-1 text-xs text-muted-foreground">
//                 {helpText}
//               </p>
//             )}
//             {message && (
//               <UIFormMessage id={`${id}-error`} className="text-red-600 mt-1">
//                 {message}
//               </UIFormMessage>
//             )}

//           </div>
//         )
//       }} />
//     </UIFormControl >
//   );
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  UIFormControl,
  UICheckbox,
  UITooltip,
  UITooltipTrigger,
  UITooltipContent,
  // UIFormMessage,
} from "@/components";
import { FieldConfig, FieldMeta } from "@/types/form";
// import { useFieldError } from "../../components/DynamicErrorDisplay/DynamicErrorDisplay";

interface Props {
  config: FieldConfig;
  meta?: FieldMeta;
  field: {
    name: string;
    value: any;
    onChange: (value: any) => void;
    onBlur: () => void;
    ref?: React.Ref<any>;
  };
}

export function CheckboxField({ config, meta, field }: Props) {
  // const { message } = useFieldError(config.name);
  const {
    name,
    label,
    options,
  } = config;

  const {
    tooltip,
    helpText,
    disabled = false,
    required = false,
  } = meta ?? {};

  const id = `checkbox-${name}`;
  const labelId = `${id}-label`;

  const isGroup = Array.isArray(options) && options.length > 0;

  const renderSingleCheckbox = () => (
    <div className="flex items-center space-x-2">
      <UICheckbox
        id={id}
        name={name}
        checked={!!field.value}
        onCheckedChange={(checked) => field.onChange(checked === true)}
        disabled={disabled}
        required={required}
        aria-labelledby={labelId}
      />
      <label id={labelId} htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
    </div>
  );

  const renderCheckboxGroup = () => (
    <fieldset id={id} className="space-y-2">
      <legend className="font-medium text-sm">{label}</legend>
      {options!.map((opt, i) => {
        const checked = field.value?.includes(opt.value);
        return (
          <div key={i} className="flex items-center space-x-2">
            <UICheckbox
              id={`${id}-${opt.value}`}
              checked={checked}
              onCheckedChange={(checked) => {
                const newVal = [...(field.value || [])];
                if (checked) {
                  newVal.push(opt.value);
                } else {
                  const index = newVal.indexOf(opt.value);
                  if (index > -1) newVal.splice(index, 1);
                }
                field.onChange(newVal);
              }}
              disabled={disabled}
            />
            <label htmlFor={`${id}-${opt.value}`} className="text-sm">
              {opt.label}
            </label>
          </div>
        );
      })}
    </fieldset>
  );

  const content = isGroup ? renderCheckboxGroup() : renderSingleCheckbox();

  return (
    <UIFormControl>
      <div className="relative group">
        {tooltip ? (
          <UITooltip>
            <UITooltipTrigger asChild>{content}</UITooltipTrigger>
            <UITooltipContent>{tooltip}</UITooltipContent>
          </UITooltip>
        ) : (
          content
        )}
        {helpText && (
          <p id={`${name}-help`} className="mt-1 text-xs text-muted-foreground">
            {helpText}
          </p>
        )}
        {/* {message && (
          <UIFormMessage id={`${id}-error`} className="text-red-600 mt-1">
            {message}
          </UIFormMessage>
        )} */}

      </div>
    </UIFormControl>
  );
}
