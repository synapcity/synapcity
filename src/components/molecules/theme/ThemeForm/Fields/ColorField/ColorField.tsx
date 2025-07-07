// "use client";

// import { PopoverWrapper } from "@/components/molecules/PopoverWrapper";
// import { Button, Label } from "@/components/atoms";
// import { Controller, useFormContext, useWatch } from "react-hook-form";
// import SwatchPickerComponent from "@/components/molecules/theme/color/SwatchPickerComponent";
// import { getContrastingColor } from "@/theme/colors/utils";

// export const ColorField = ({ name, label }: { name: string; label: string }) => {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       control={control}
//       name={name}
//       render={({ field }) => {
//         return (
//           <div className="space-y-2">
//             <Label
//               className="size-full p-2"
//               style={{
//                 background: field.value,
//                 color: getContrastingColor(field.value),
//               }}
//             >
//               {label}
//             </Label>
//             <SwatchPickerComponent value={field.value} onChange={field.onBlur} />
//           </div>
//         );
//       }}
//     />
//   );
// };


// export function ColorFieldPopover({
//   name,
//   label,
// }: {
//   name: string;
//   label: string;
// }) {
//   const { control } = useFormContext();

//   const currentColor = useWatch({ control, name });

//   return (
//     <PopoverWrapper
//       trigger={
//         <Button
//           variant="outline"
//           className="w-full justify-start"
//           style={{
//             backgroundColor: currentColor,
//             color: currentColor ? "#fff" : undefined,
//           }}
//         >
//           {label}
//         </Button>
//       }
//       content={
//         <div className="w-64">
//           <ColorField name={name} label={label} />
//         </div>
//       }
//     />
//   );
// }

"use client";

import { PopoverWrapper } from "@/components/molecules/PopoverWrapper";
import { Button, Label } from "@/components/atoms";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import SwatchPickerComponent from "@/components/molecules/theme/color/SwatchPickerComponent";
import { getContrastingColor, convertToHexColor } from "@/theme/colors/utils";
import { useMemo } from "react";

export const ColorField = ({ name, label }: { name: string; label: string }) => {
  const { control } = useFormContext();

  const currentColor = useWatch({ control, name });

  const displayColor = useMemo(() => convertToHexColor(currentColor), [currentColor]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const handleChange = (newColor: string) => {
          field.onChange(newColor);
        };

        return (
          <div className="space-y-2">
            <Label
              className="size-full p-2"
              style={{
                background: displayColor,
                color: getContrastingColor(displayColor),
              }}
            >
              {label}
            </Label>
            <SwatchPickerComponent value={displayColor} onChange={handleChange} />
          </div>
        );
      }}
    />
  );
};

export function ColorFieldPopover({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  const { control } = useFormContext();

  // Using useWatch to track the color directly from the form state
  const currentColor = useWatch({ control, name });

  return (
    <PopoverWrapper
      trigger={
        <Button
          variant="outline"
          className="w-full justify-start"
          style={{
            backgroundColor: currentColor,
            color: currentColor ? "#fff" : undefined,
          }}
        >
          {label}
        </Button>
      }
      content={
        <div className="w-64">
          <ColorField name={name} label={label} />
        </div>
      }
    />
  );
}
