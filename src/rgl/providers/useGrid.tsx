// "use client"

// import { useCallback, useEffect, useMemo } from "react";
// import { useGridStore } from "../stores/gridStore/useGridStore";
// import type { GridConfig, GridState } from "../stores/gridStore/useGridStore";
// import { useShallow } from "zustand/shallow";

// export function useGrid(gridId: string, scope?: string, parentId?: string) {
//   const hasInitialized = useGridStore(useShallow(s => s.grids[gridId].state.isInitialized))
//   const initGrid = useGridStore(s => s.initGrid)

//   useEffect(() => {
//     if(!hasInitialized) {
//     initGrid({ gridId, scope, parentId  })
//     }
//   }, [gridId, hasInitialized, initGrid, parentId, scope])

//   const width = useGridStore(useShallow(s => s.grids[gridId].state.width))
//   const activeBreakpoint = useGridStore(useShallow(s => s.grids[gridId].state.activeBreakpoint))

//   const grid = useGridStore((s) => s.getGrid(gridId));
//   const config = grid?.config;
//   const state = grid?.state;

//   const setState = useGridStore((s) => s.updateGridState);
//   const setConfig = useGridStore((s) => s.updateGridConfig);
//   const removeGrid = useGridStore((s) => s.removeGrid);
//   const exportGrid = useGridStore((s) => s.exportGrid);
//   const importGrid = useGridStore((s) => s.importGrid);
//   const cloneGrid = useGridStore((s) => s.cloneGrid);

//   // Memoized helpers
//   const updateState = useCallback((patch: Partial<GridState>) => setState(gridId, patch), [setState, gridId]);
//   const updateConfig = useCallback((patch: Partial<GridConfig>) => setConfig(gridId, patch), [setConfig, gridId]);
//   const clone = useCallback((opts?: { scope?: string; parentId?: string; label?: string }) => cloneGrid(gridId, opts), [cloneGrid, gridId]);

//   return useMemo(
//     () => ({
//       gridId,
//       grid,
//       config,
//       state,
//       setState: updateState,
//       setConfig: updateConfig,
//       remove: () => removeGrid(gridId),
//       exportGrid: () => exportGrid(gridId),
//       importGrid,
//       clone,
//       width,
//       activeBreakpoint,
//       hasInitialized
//     }),
//     [gridId, grid, config, state, updateState, updateConfig, removeGrid, exportGrid, importGrid, clone, width, activeBreakpoint, hasInitialized]
//   );
// }
"use client"

import React, { createContext, useContext, useMemo, useCallback, useEffect } from "react";
import { useGridStore } from "../stores/gridStore/useGridStore";
import type { GridConfig, GridState, SingleGrid } from "../types";
import { useShallow } from "zustand/shallow";
import { nanoid } from "@/__mocks__/nanoid";

const GridIdContext = createContext<string | undefined>(undefined);

export function GridProvider({ gridId, children }: { gridId?: string; children: React.ReactNode }) {
  return <GridIdContext.Provider value={gridId}>{children}</GridIdContext.Provider>;
}
export function useCurrentGrid() {
  const gridId = useContext(GridIdContext);
  // if (!gridId) throw new Error("useCurrentGrid must be used within a <GridProvider>");
  return useGrid(gridId);
}

export function useGrid(id?: string, scope?: string, parentId?: string) {
  const gridId = id ?? nanoid()
  const hasInitialized = useGridStore(useShallow(s => !!s.grids[gridId] && !!s.grids[gridId]?.state.isInitialized));
  const initGrid = useGridStore(s => s.initGrid);

  useEffect(() => {
    if (!hasInitialized && scope && parentId) {
      initGrid({ gridId, scope, parentId });
    }
  }, [gridId, hasInitialized, initGrid, parentId, scope]);

  const grid = useGridStore(useShallow((s) => s.getGrid(gridId)));
  const config = useGridStore(useShallow(s => s.getFullConfig(gridId)))
  const state = useGridStore(useShallow((s) => s.getState(gridId)))
  const setState = useGridStore((s) => s.updateGridState);
  const setConfig = useGridStore((s) => s.updateGridConfig);
  const removeGrid = useGridStore((s) => s.removeGrid);
  const exportGrid = useGridStore((s) => s.exportGrid);
  const importGrid = useGridStore((s) => s.importGrid);
  const cloneGrid = useGridStore((s) => s.cloneGrid);

  const updateState = useCallback((patch: Partial<GridState>) => setState(gridId, patch), [setState, gridId]);
  const updateConfig = useCallback((patch: Partial<GridConfig>) => setConfig(gridId, patch), [setConfig, gridId]);
  const clone = useCallback((opts?: { scope?: string; parentId?: string; label?: string }) => cloneGrid(gridId, opts), [cloneGrid, gridId]);

  return useMemo(
    () => ({
      gridId,
      grid,
      config,
      state,
      setState: updateState,
      setConfig: updateConfig,
      remove: () => removeGrid(gridId),
      exportGrid: () => exportGrid(gridId),
      importGrid,
      clone,
    }),
    [gridId, grid, config, state, updateState, updateConfig, removeGrid, exportGrid, importGrid, clone]
  );
}

export function useGridsByParent(parentId: string, scope?: string): SingleGrid[] {
  return useGridStore((s) => s.findAllByParent(parentId, scope));
}
