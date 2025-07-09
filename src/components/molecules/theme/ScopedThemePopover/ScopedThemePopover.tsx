"use client";

import dynamic from "next/dynamic";
import type { ThemeScope } from "@/theme/types";
import { useTheme } from "@/providers";

const IconButton = dynamic(() => import("@/components/atoms/buttons/IconButton/IconButton").then(mod => mod.IconButton));
const PopoverWrapper = dynamic(() => import("@/components/molecules/PopoverWrapper/PopoverWrapper").then(mod => mod.PopoverWrapper));
const ThemeForm = dynamic(() => import("../ThemeForm/ThemePopoverForm/ThemePopoverForm").then(mod => mod.ThemePopoverForm), {
  ssr: false,
  loading: () => <div className="p-4 text-sm">Loading theme settings...</div>,
});

export const ScopedThemePopover = ({
  scope,
  entityId,
}: {
  scope: ThemeScope;
  entityId: string;
}) => {
  const { updateTheme, updatePreviewTheme } = useTheme();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (data: any) => {
    updatePreviewTheme(data);
    updateTheme();
  };

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
        <div className="w-[320px] h-128 max-h-[calc(100vh-12rem)] overflow-hidden p-2 flex flex-col">
          <ThemeForm scope={scope} entityId={entityId} onSubmit={handleSubmit} />
        </div>
      }
    />
  );
};
