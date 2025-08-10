"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { convertFormToPrefs } from "@/theme";
import type { ThemeScope } from "@/theme/types";
import dynamic from "next/dynamic";
import { ThemePreferencesFormValues } from "../schema";

const IconButtonSkeleton = dynamic(
  () =>
    import("@/components/loading/skeletons/IconButtonSkeleton/IconButtonSkeleton").then(
      (mod) => mod.IconButtonSkeleton
    ),
  {
    ssr: true,
  }
);

const Drawer = dynamic(() =>
  import("@/components/molecules/Drawer/Drawer").then((mod) => mod.Drawer)
);
const ThemeForm = dynamic(
  () => import("@/components/theme/ThemeForm/ThemeForm").then((mod) => mod.ThemeForm),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);
const IconButton = dynamic(
  () => import("@/components/atoms/buttons/IconButton/IconButton").then((mod) => mod.IconButton),
  {
    ssr: true,
    loading: () => <IconButtonSkeleton />,
  }
);

export const ThemeSheet = ({
  entityId,
  scope,
  triggerStyles,
}: {
  entityId?: string;
  scope: ThemeScope;
  triggerStyles?: string;
}) => {
  const { updateThemePreferences, applyThemeStyles } = useTheme();
  const handleSubmit = (data: ThemePreferencesFormValues) => {
    const finalData = convertFormToPrefs(data);
    updateThemePreferences(finalData);
    applyThemeStyles(finalData);
  };
  return (
    <Drawer
      trigger={
        <IconButton
          variant="ghost"
          icon="palette"
          aria-label="Font & Theme"
          tooltip="Font & Theme"
          className={triggerStyles}
        />
      }
      title="Theme"
    >
      <div className="mt-4">
        <ThemeForm entityId={entityId} scope={scope} onSubmit={handleSubmit} />
      </div>
    </Drawer>
  );
};
