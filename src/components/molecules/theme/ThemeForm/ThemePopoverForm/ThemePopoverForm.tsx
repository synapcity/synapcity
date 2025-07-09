"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { themePreferencesSchema, ThemePreferencesFormValues } from "../../schema";
import { resolveThemeMetadata } from "@/theme/utils/resolveThemeMetadata";
import { useThemeStore } from "@/stores";
import { useEffect, useMemo } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import type { ThemeScope } from "@/theme/types";
import { cn } from "@/utils";
import dynamic from "next/dynamic";

const ResetThemeButton = dynamic(() => import("@/components/atoms/buttons/ResetThemeButton/ResetThemeButton").then(mod => mod.ResetThemeButton));
const Button = dynamic(() => import("@/components/atoms/buttons/Button/Button").then(mod => mod.Button));
const ThemeFormTabs = dynamic(() => import("../ThemeFormTabs/ThemeFormTabs").then(mod => mod.ThemeFormTabs), {
  ssr: false,
});

export const ThemePopoverForm = ({
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
  const scopedPreferences = useThemeStore(theme => theme.scopedPreferences);
  const globalPreferences = useThemeStore(theme => theme.globalPreferences);
  const { preferences: theme } = resolveThemeMetadata({
    entityType: scope,
    entityId,
    scopedPreferences,
    globalPreferences,
  });

  const formTheme = useMemo(() => {
    return {
      ...theme,
      primary: theme.primary.base,
      accent: theme.accent.base
    }
  }, [theme])

  const { isCustom } = useTheme();

  const methods = useForm<ThemePreferencesFormValues>({
    defaultValues: {
      ...formTheme
    },
    resolver: zodResolver(themePreferencesSchema),
  });

  const { reset } = methods;

  useEffect(() => {
    reset({ ...formTheme });
  }, [formTheme, reset]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={cn("space-y-6 flex-1 flex flex-col", className)}
      >
        <ThemeFormTabs />

        <div
          className={cn("w-full flex items-end justify-between")}
        >
          {isCustom && <ResetThemeButton />}
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </FormProvider>
  );
};
