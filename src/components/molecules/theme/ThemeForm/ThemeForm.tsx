"use client";

import { Button } from "@/components/atoms";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { themePreferencesSchema, ThemePreferencesFormValues } from "../schema";
import { cn } from "@/utils";
import { ThemeFormFields } from "./ThemeFormFields/ThemeFormFields";
import { ThemePreview } from "../ThemePreview/ThemePreview";
import { useEffect } from "react";
import { ThemePreferences } from "@/theme/types";

export const ThemeForm = ({
  theme,
  className,
  onSubmit,
}: {
  theme: ThemePreferencesFormValues;
  className?: string;
  onSubmit: (values: ThemePreferencesFormValues) => void;
}) => {
  const methods = useForm<ThemePreferencesFormValues>({
    defaultValues: theme,
    resolver: zodResolver(themePreferencesSchema),
  });
  const { reset } = methods;

  useEffect(() => {
    reset(theme);
  }, [theme, reset]);


  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
      >
        <ThemeFormFields />
        <div className="border rounded-md p-4">
          <ThemePreview initialTheme={theme as ThemePreferences} />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </FormProvider>
  );
};
