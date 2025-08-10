"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { themePreferencesSchema, ThemePreferencesFormValues } from "../schema";
import { cn } from "@/utils";
import { useThemeStore } from "@/stores";
import { useEffect, useMemo } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import type { EntityType, ThemeScope } from "@/theme/types";
import dynamic from "next/dynamic";
import { ResetThemeButton } from "@/components/atoms/buttons/ResetThemeButton";
import { useShallow } from "zustand/shallow";

const ThemeFormFields = dynamic(() => import("@/components/theme/ThemeForm/ThemeFormFields/ThemeFormFields").then((mod) => mod.ThemeFormFields), {
  ssr: true,
  loading: () => <div>Loading...</div>
})

const ThemePreview = dynamic(() => import("@/components/theme/ThemePreview/ThemePreview").then((mod) => mod.ThemePreview), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

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
  const hasHydrated = useThemeStore(s => s.hasHydrated)
  const scopedPreferences = useThemeStore(useShallow(theme => theme.scopedPreferences[scope as EntityType]?.[entityId ?? ""]))
  const globalPreferences = useThemeStore(theme => theme.globalPreferences)
  const theme = scope === "global" ? globalPreferences : scopedPreferences
  const { isCustom } = useTheme()
  const formTheme = useMemo(() => {
    return {
      ...theme,
      primary: theme.primary.base,
      accent: theme.accent.base
    }
  }, [theme])
  const methods = useForm<ThemePreferencesFormValues>({
    defaultValues: {
      ...formTheme,
      primary: theme.primary.base,
      accent: theme.accent.base
    },
    resolver: zodResolver(themePreferencesSchema),
  });
  const { reset } = methods;

  useEffect(() => {
    if (!hasHydrated) return
  }, [hasHydrated])

  useEffect(() => {
    reset(formTheme);
  }, [formTheme, reset]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={cn("space-y-6 text-[var(--foreground)]", className)}
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
            <ResetThemeButton />
          )}
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </FormProvider>
  );
};
