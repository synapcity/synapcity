"use client";

import { Button } from "@/components/atoms";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { themePreferencesSchema, ThemePreferencesFormValues } from "../schema";
import { cn } from "@/utils";
import { ThemeFormFields } from "./ThemeFormFields/ThemeFormFields";
import { ThemePreview } from "../ThemePreview/ThemePreview";
import { ThemeScope } from "@/theme/types";
import { resolveThemeMetadata } from "@/theme/utils/resolveThemeMetadata";
import { useThemeStore } from "@/stores";
// import { usePreviewTheme } from "@/hooks";
import { useEffect } from "react";
import { useTheme } from "@/providers";
import { IconButton } from "@/components/atoms";

export const ThemeForm = ({
  entityId,
  scope,
  className,
  onSubmit,
}: {
  scope: ThemeScope;
  entityId?: string;
  className?: string;
  onSubmit: (values: ThemePreferencesFormValues) => void;
}) => {
  const scopedPreferences = useThemeStore(theme => theme.scopedPreferences)
  const globalPreferences = useThemeStore(theme => theme.globalPreferences)
  const { preferences: theme } = resolveThemeMetadata({ entityType: scope, entityId, scopedPreferences, globalPreferences })
  const { resetTheme, isCustom } = useTheme()
  const methods = useForm<ThemePreferencesFormValues>({
    defaultValues: theme,
    resolver: zodResolver(themePreferencesSchema),
  });
  const { reset } = methods;

  useEffect(() => {
    reset(theme);
    console.log("prefs", theme)
  }, [theme, reset]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
      >
        <ThemeFormFields />
        <div className="border rounded-md p-4">
          <ThemePreview />
        </div>

        <div className={cn("w-full flex items-center", {
          "justify-between": isCustom,
          "justify-end": !isCustom
        })}>
          {isCustom && (
            <IconButton
              icon="RotateCcw"
              onClick={() => resetTheme()}
            />
          )}
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </FormProvider>
  );
};
