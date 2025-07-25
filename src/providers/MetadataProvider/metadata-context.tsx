/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { ThemeMode } from "@/theme";
import { UILocalStatus } from "@/types/ui";
import { MetadataScope } from "./MetadataProvider";

export type MetadataContextType = {
  language: string;
  setLanguage: (language: string) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  selected: Record<string, any>;
  setSelected: (scope: string, id: string | null) => void
  status: UILocalStatus;
  hasHydrated: boolean;
  scope: MetadataScope
  id?: string;
}
export const MetadataContext = createContext<MetadataContextType | null>(null);