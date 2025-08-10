"use client";
import { SidebarScope } from "@/stores/ui/sidebarStore";
// import { useMemo } from "react";
// import { generateScopeKey } from "@/stores/";
import type { UseBoundStore, StoreApi } from "zustand";
// import type { Annotation, Connection, Resource } from "@/stores";

export function useEntityData<
  T,
  MetaStore extends {
    getItemById: (id: string) => T | undefined;
    // getAnnotations: (key: string) => Annotation[];
    // getConnections: (key: string) => { from: Connection[]; to: Connection[] };
    // getResources: (key: string) => Resource[];
  },
>(
  storeHook: UseBoundStore<StoreApi<MetaStore & { getItemById(id: string): T }>>,
  scope: SidebarScope,
  id: string
) {
  // const scopeKey = useMemo(() => generateScopeKey(scope, id), [scope, id]);

  const entity = storeHook((s) => s.getItemById)(id);
  // const annotations = storeHook((s) => s.getAnnotations)(scopeKey);
  // const { from, to } = storeHook((s) => s.getConnections)(scopeKey);
  // const resources = storeHook((s) => s.getResources)(scopeKey);

  return {
    entity,
    // annotations,
    // connections: { from, to },
    // resources,
    // scopeKey,
    scopeKey: `${scope}:${id}`,
  };
}
