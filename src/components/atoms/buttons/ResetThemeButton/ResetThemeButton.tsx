"use client";

import { resetTheme } from "@/theme/utils/resetTheme";
import type { EntityType } from "@/theme/types/entity";

type Props =
  | { scope?: undefined; id?: undefined; element?: undefined }
  | { scope: EntityType; id: string; element: HTMLElement };

export function ResetThemeButton(props: Props) {
  const handleClick = () => {
    resetTheme(props);
  };

  return (
    <button onClick={handleClick} data-testid="reset-theme-button">
      Reset Theme
    </button>
  );
}
