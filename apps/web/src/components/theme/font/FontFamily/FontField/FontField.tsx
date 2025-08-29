"use client";

import { Controller, useFormContext } from "react-hook-form";
import { FontFamilyCombobox } from "../FontFamilyComboBox";
import { Label } from "@/components";
import { FontFamilyName } from "@/theme";
import { cn } from "@/utils";

export const FontField = ({
  name,
  label,
  className,
}: {
  name: FontFamilyName;
  label: string;
  className?: string;
}) => {
  const { control } = useFormContext();

  return (
    <div
      className={cn(
        "space-y-2 text-foreground flex justify-between w-full items-center",
        className
      )}
    >
      <Label>{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <FontFamilyCombobox
            value={field.value}
            onChange={(value: string) => {
              field.onChange(value);
            }}
            className="text-primary-foreground w-full flex-1"
          />
        )}
      />
    </div>
  );
};
