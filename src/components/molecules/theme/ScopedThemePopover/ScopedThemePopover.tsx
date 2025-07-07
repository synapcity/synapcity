/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import { PopoverWrapper } from "@/components/molecules/PopoverWrapper";
import { IconButton } from "@/components/atoms";
import type { ThemeScope } from "@/theme/types";
import { useTheme } from "@/providers";

const ThemeForm = dynamic(
  () =>
    import("@/components/molecules/theme/ThemeForm/ThemeForm").then(
      (mod) => mod.ThemeForm
    ),
  {
    ssr: false,
    loading: () => <div className="p-4 text-sm">Loading theme settings...</div>,
  }
);

export const ScopedThemePopover = ({
  scope,
  entityId,
}: {
  scope: ThemeScope;
  entityId: string;
}) => {

  const { updateTheme } = useTheme()
  const handleSubmit = (data: any) => {
    console.log(" scoped data", data)
    updateTheme()
  }
  return (
    <PopoverWrapper
      side="bottom"
      align="end"
      sideOffset={8}
      trigger={
        <IconButton
          icon="Palette"
          size="sm"
          variant="ghost"
          tooltip="Edit Theme"
          aria-label="Edit Theme"
        />
      }
      content={
        <div className="w-full max-h-[calc(100vh-8rem)] overflow-auto p-2">
          <ThemeForm
            scope={scope}
            entityId={entityId}
            onSubmit={handleSubmit}
          />
        </div>
      }
    />
  );
};
