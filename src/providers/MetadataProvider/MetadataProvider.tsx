"use client";

import { ReactNode } from "react";
import { MetadataContext } from "./metadata-context";
import { useMetadataStore } from "@/stores/metadataStore/useMetadataStore";
import { useShallow } from "zustand/shallow";

export type MetadataScope = "global" | "dashboard" | "note";

export const MetadataProvider: React.FC<{
  scope: MetadataScope;
  entityId?: string;
  children: ReactNode;
}> = ({ scope = "global", entityId, children }) => {
  const { language, setLanguage, themeMode, setThemeMode, selected, setSelected, hasHydrated } =
    useMetadataStore();
  const localStatus = useMetadataStore(useShallow((s) => s.status[entityId ?? "global"]));
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
        status: localStatus,
        hasHydrated,
      }}
    >
      {children}
    </MetadataContext.Provider>
  );
};
