"use client";

import { Controller, useFormContext, useWatch } from "react-hook-form";
import { convertToHexColor, getContrastingColor } from "@/theme/utils";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const SwatchPickerComponent = dynamic(() => import("@/components/molecules/theme/color/SwatchPickerComponent").then((mod) => mod.default), {
  loading: () => <div className="h-52" />,
  ssr: false
})
const PopoverWrapper = dynamic(() => import("@/components/molecules/PopoverWrapper/PopoverWrapper").then(mod => mod.PopoverWrapper))
const Button = dynamic(() => import("@/components/atoms/buttons/Button/Button").then((mod) => mod.Button))
const Label = dynamic(() => import("@/components/atoms/Label/Label").then((mod) => mod.Label))


export const ColorField = ({ name, label }: { name: string; label: string }) => {
  const { control } = useFormContext();
  const currentColor = useWatch({ control, name });

  const displayColor = useMemo(() => convertToHexColor(currentColor), [currentColor]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {

        return (
          <div
            className="flex justify-around items-center w-full"
            style={{
              background: displayColor,
              color: getContrastingColor(displayColor),
            }}
          >
            <SwatchPickerComponent value={currentColor} onChange={field.onChange} />
            <Label>
              {label}
            </Label>
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
      size="lg"
      className="flex items-center justify-center p-2"
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
        <div className="size-full">
          <ColorField name={name} label={label} />
        </div>
      }
    />
  );
}
