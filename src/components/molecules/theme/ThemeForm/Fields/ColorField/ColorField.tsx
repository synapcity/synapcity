"use client";

import { Controller, useFormContext, useWatch } from "react-hook-form";
import { getContrastingColor } from "@/theme/utils";
import dynamic from "next/dynamic";

const SwatchPickerComponent = dynamic(() => import("@/components/molecules/theme/color/SwatchPickerComponent").then((mod) => mod.default))
const PopoverWrapper = dynamic(() => import("@/components/molecules/PopoverWrapper/PopoverWrapper").then(mod => mod.PopoverWrapper))
const Button = dynamic(() => import("@/components/atoms/buttons/Button/Button").then((mod) => mod.Button))
const Label = dynamic(() => import("@/components/atoms/Label/Label").then((mod) => mod.Label))

export const ColorField = ({ name, label }: { name: string; label: string }) => {
  const { control } = useFormContext();
  const currentColor = useWatch({ control, name });
  console.log("[ColorField] currentColor", currentColor)
  console.log("[ColorField] name", name)
  console.log("[ColorField] field value", control.getFieldState)

  // const displayColor = useMemo(() => convertToHexColor(currentColor), [currentColor]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {

        return (
          <div className="space-y-2">
            <Label
              className="size-full p-2"
              style={{
                background: currentColor,
                color: getContrastingColor(currentColor),
              }}
            >
              {label}
            </Label>
            <SwatchPickerComponent value={currentColor} onChange={field.onChange} />
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

  const currentColor = useWatch({ control, name });

  return (
    <PopoverWrapper
      trigger={
        <Button
          variant="outline"
          className="w-full justify-start"
          style={{
            backgroundColor: currentColor,
            color: getContrastingColor(currentColor),
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
