"use client";

import { resetTheme } from "@/theme/utils/resetTheme";
import type { EntityType } from "@/theme/types/entity";
import { Tooltip } from "../../Tooltip";

type Props =
  | { scope?: undefined; id?: undefined; element?: undefined }
  | { scope: EntityType; id: string; element: HTMLElement };

export function ResetThemeButton(props: Props) {
  const handleClick = () => {
    resetTheme(props);
  };

  return (
    <Tooltip content="Reset Theme to Defaults" asChild>
      <button onClick={handleClick} data-testid="reset-theme-button" className="link">
        Reset
      </button>
    </Tooltip>
  );
}
