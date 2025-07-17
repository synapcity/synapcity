"use client"

import { useMetadataStore } from "@/stores";
import { ReactNode } from "react";
import { MetadataContext } from "./metadata-context";
import { SidebarScope } from "@/types/sidebar";

export const MetadataProvider: React.FC<{ scope: SidebarScope; entityId: string; children: ReactNode }> = ({ scope, entityId, children }) => {
  const {
    language,
    setLanguage,
    themeMode,
    setThemeMode,
    selected,
    setSelected,
    status,
    hasHydrated,
  } = useMetadataStore();

  return (
    <MetadataContext.Provider
      value={{
        language,
        setLanguage,
        themeMode,
        setThemeMode,
        selected,
        setSelected,
        status,
        hasHydrated,
        scope,
        entityId
      }}
    >
      {children}
    </MetadataContext.Provider>
  );
};
