/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { EntityType, ThemeMode } from "@/theme";
import { UIStatus } from "@/types/ui";

export type MetadataContextType = {
  language: string;
  setLanguage: (language: string) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  selected: Record<string, any>;
  setSelected: (scope: string, id: string | null) => void
  status: UIStatus;
  hasHydrated: boolean;
  scope: EntityType;
  entityId: string;
}
export const MetadataContext = createContext<MetadataContextType | null>(null);