"use client";

import { PopoverWrapper } from "@/components/molecules/PopoverWrapper";
import { Button, Label } from "@/components/atoms";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import SwatchPickerComponent from "@/components/molecules/theme/color/SwatchPickerComponent";
import { getContrastingColor, convertToHexColor } from "@/theme/colors/utils";
import { useEffect, useState } from "react";

export const ColorField = ({ name, label }: { name: string; label: string }) => {
  const { control } = useFormContext();
  const [displayColor, setDisplayColor] = useState("#000000");

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        useEffect(() => {
          const hex = convertToHexColor(field.value);
          setDisplayColor(hex);
        }, [field.value]);

        const handleChange = (newColor: string) => {
          setDisplayColor(newColor);
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
