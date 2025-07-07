"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { themePreferencesSchema, ThemePreferencesFormValues } from "../schema";
import { cn } from "@/utils";
import { resolveThemeMetadata } from "@/theme/utils/resolveThemeMetadata";
import { useThemeStore } from "@/stores";
import { useEffect } from "react";
import { useTheme } from "@/providers";
import type { ThemeScope } from "@/theme/types";
import dynamic from "next/dynamic";

const ThemeFormFields = dynamic(() => import("@/components/molecules/theme/ThemeForm/ThemeFormFields/ThemeFormFields").then((mod) => mod.ThemeFormFields), {
  ssr: true,
  loading: () => <div>Loading...</div>
})

const ThemePreview = dynamic(() => import("@/components/molecules/theme/ThemePreview/ThemePreview").then((mod) => mod.ThemePreview), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

const IconButton = dynamic(() => import("@/components/atoms/buttons/IconButton/IconButton").then((mod) => mod.IconButton))
const Button = dynamic(() => import("@/components/atoms/buttons/Button/Button").then((mod) => mod.Button))

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
