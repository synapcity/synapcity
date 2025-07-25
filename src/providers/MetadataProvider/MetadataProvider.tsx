"use client";

import { ReactNode } from "react";
import { MetadataContext } from "./metadata-context";
import { useMetadataStore } from "@/stores";
// import { EntityType } from "@/schemas/resources";
// import { useTabSync } from "@/hooks/notes/useNoteViews";

export type MetadataScope = "global" | "dashboard" | "note"

export const MetadataProvider: React.FC<{
  scope: MetadataScope
  entityId?: string;
  children: ReactNode;
}> = ({ scope = "global", entityId, children }) => {
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

  // useTabSync(scope as EntityType, entityId)

  return (
    <MetadataContext.Provider
      value={{
        scope,
        id: entityId,
        language,
        setLanguage,
        themeMode,
        setThemeMode,
        selected,
        setSelected,
        status,
        hasHydrated
      }}
    >
      {children}
    </MetadataContext.Provider>
  );
};
