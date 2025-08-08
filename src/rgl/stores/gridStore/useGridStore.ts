// // import { CompactType, Layout, LayoutItem, ResizeHandleAxis } from "@/types";
// // import { Layouts } from "react-grid-layout";
// // import { create, StateCreator } from "zustand";
// // import { defaultCurrentState, defaultResponsiveConfig } from "./defaultConfig";

// // export type BreakpointType = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
// // export type GridFlags = {
// //   isDraggable?: boolean;
// //   isResizable?: boolean;
// //   isBounded?: boolean;
// //   useCSSTransforms:  boolean;
// //   allowOverlap?: boolean;
// //   preventCollision?: boolean;
// //   isDroppable?: boolean;
// // }
// // export type GridAtts = {
// // autoSize?: boolean;
// // draggableCancel?: string;
// // draggableHandle?: string;
// // compactType: CompactType;
// // rowHeight: number;
// // resizeHandle?: string;
// // } & GridFlags

// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { nanoid } from "nanoid";
// import { deepMerge } from "@/utils/deepMerge"; // adjust import as needed
// import {   DEFAULT_GRID_CONFIG,
//   DEFAULT_GRID_STATE} from "./defaultConfig"
// import { BreakpointType, CompactType, ResizeHandleAxis } from "@/types";
// import { Layout, Layouts } from "react-grid-layout";

// export type GridHandles = {
//   draggableCancel?: string;
//   draggableHandle?: string;
//   resizeHandle?: string;
// }
// export type GridFlags = {
//   isDraggable?: boolean;
//   isResizable?: boolean;
//   isBounded?: boolean;
//   useCSSTransforms?: boolean;
//   allowOverlap?: boolean;
//   preventCollision?: boolean;
//   isDroppable?: boolean;
// };

// export type GridConfig = {
//   id: string;
//   breakpoints: { [P in BreakpointType]: number };
//   cols: { [P in BreakpointType]: number };
//   margin: Record<BreakpointType, [number, number]>;
//   containerPadding: Record<BreakpointType, [number, number]>;
//   rowHeight: number;
//   compactType: CompactType;
//   resizeHandles: ResizeHandleAxis[];
//   autoSize?: boolean;
//   flags: GridFlags;
//   handles: GridHandles;
// };

// export type GridState = {
//   id: string;
//   activeBreakpoint: BreakpointType;
//   width: number;
//   layout: Layout[];
//   layouts: Layouts;
//   isInitialized: boolean;
// };

// export type SingleGrid = {
//   config: GridConfig;
//   state: GridState;
//   parentId?: string;
//   scope?: string;
//   label?: string;
//   id?: string;
// };
// type ExportedGrid = SingleGrid;

// type FullConfig = {
//     breakpoint: BreakpointType;
//   width: number;
//   layout: Layout[];
//   layouts: Layouts;
// } & Omit<GridConfig, "flags" | "handles"> & GridFlags & GridHandles;


// export type GridStore = {
//   grids: Record<string, SingleGrid>;
//   initGrid: (args: InitGridArgs) => string;
//   updateGridState: (gridId: string, patch: Partial<GridState>) => void;
//   updateGridConfig: (gridId: string, patch: Partial<GridConfig>) => void;
//   removeGrid: (gridId: string) => void;
//   getGrid: (gridId: string) => SingleGrid | undefined;
//   getConfig: (gridId: string) => GridConfig | undefined;
//   getFullConfig: (gridid: string) => FullConfig | undefined;
//   getState: (gridId: string) => GridState | undefined;
//   findByParent: (parentId: string) => SingleGrid | undefined;
//    exportGrid: (id: string) => ExportedGrid | undefined;
//   importGrid: (data: ExportedGrid, opts?: { scope?: string; parentId?: string; label?: string }) => string;
//   cloneGrid: (id: string, opts?: { scope?: string; parentId?: string; label?: string }) => string | undefined;
// };

// export type InitGridArgs = {
//   config?: Partial<GridConfig>;
//   state?: Partial<GridState>;
//   parentId?: string;
//   scope?: string;
//   label?: string;
//   gridId?: string;
// };


// export const useGridStore = create<GridStore>()(
//   persist(
//   (set, get) => ({
//   grids: {},

//   initGrid: ({ config = {}, state = {}, scope, parentId, label , gridId}) => {
//     const id = gridId ?? nanoid();
//     const fullConfig: GridConfig = {
//       ...deepMerge(DEFAULT_GRID_CONFIG, config),
//       id,
//     };
//     const fullState: GridState = {
//       ...deepMerge(DEFAULT_GRID_STATE, state),
//       id,
//       isInitialized: true,
//     };
//     set((store) => ({
//       grids: {
//         ...store.grids,
//         [id]: { config: fullConfig, state: fullState, scope, label, id, parentId },
//       },
//     }));
//     return id;
//   },

//   updateGridState: (gridId, patch) =>
//     set((store) => {
//       const grid = store.grids[gridId];
//       if (!grid) return {};
//       return {
//         grids: {
//           ...store.grids,
//           [gridId]: {
//             ...grid,
//             state: { ...grid.state, ...patch },
//           },
//         },
//       };
//     }),

//   updateGridConfig: (gridId, patch) =>
//     set((store) => {
//       const grid = store.grids[gridId];
//       if (!grid) return {};
//       return {
//         grids: {
//           ...store.grids,
//           [gridId]: {
//             ...grid,
//             config: { ...grid.config, ...patch },
//           },
//         },
//       };
//     }),

//   removeGrid: (gridId) =>
//     set((store) => {
//       const next = { ...store.grids };
//       delete next[gridId];
//       return { grids: next };
//     }),

//   getGrid: (gridId) => get().grids[gridId],
//   getConfig: (gridId) => get().grids[gridId]?.config,
//   getFullConfig: (gridId) => {
//     const fullGrid = get().grids[gridId]
//     const { handles, flags, ...restConfig } = fullGrid.config;
//     const { layout, layouts, activeBreakpoint: breakpoint, width } = fullGrid.state
// return {
//   ...restConfig,
//   ...handles,
//   ...flags,
//   layout,
//   layouts,
//   breakpoint,
//   width,
// }
//   },
//   getState: (gridId) => get().grids[gridId]?.state,
//   findByParent: (parentId) => {
//     const all = get().grids;
//     return Object.values(all).find((g) => g.parentId === parentId);
//   },
//   exportGrid: (id) => {
//     const grid = get().grids[id];
//     if (!grid) return undefined;
//     return JSON.parse(JSON.stringify(grid)); // deep clone for export
//   },

//   importGrid: (data, opts = {}) => {
//     const id = data.id ?? nanoid();
//     const details = {
//       scope: opts.scope ?? data.scope,
//       parentId: opts.parentId ?? data.parentId,
//       label: opts.label ?? data.label,
//       id
//     }
//     const config: GridConfig = {
//       ...deepMerge(DEFAULT_GRID_CONFIG, data.config),
//       id,
//     };
//     const state: GridState = {
//       ...deepMerge(DEFAULT_GRID_STATE, data.state),
//       id,
//       isInitialized: true,
//     };
//     set((store) => ({
//       grids: {
//         ...store.grids,
//         [id]: { config, state, ...details },
//       },
//     }));
//     return id;
//   },

//   cloneGrid: (id, opts = {}) => {
//     const data = get().grids[id];
//     if (!data) return undefined;
//     return get().importGrid(data, opts);
//   },
// }), 
// {
//   name: "synapcity-grid-store"
// }

// ));



import { create } from "zustand";
import { persist } from "zustand/middleware"
import { nanoid } from "nanoid";
import { deepMerge } from "@/utils/deepMerge";
import {
  SingleGrid,
  ExportedGrid,
  InitGridArgs,
  GridConfig,
  GridState,
  GridFlags,
  GridHandles,
} from "../../../rgl/types";
import { DEFAULT_GRID_CONFIG, DEFAULT_GRID_STATE } from "../../../rgl/defaults";
import { createHydrationSlice, HydrationSlice } from "@/stores/slices";

export type FullConfig = Omit<GridConfig, "handles" | "flags"> & GridFlags & GridHandles;
export type GridStore = {
  grids: Record<string, SingleGrid>;
  initGrid: (args: InitGridArgs) => string;
  updateGridState: (gridId: string, patch: Partial<GridState>) => void;
  updateGridConfig: (gridId: string, patch: Partial<GridConfig>) => void;
  removeGrid: (gridId: string) => void;
  getGrid: (gridId: string) => SingleGrid | undefined;
  getConfig: (gridId: string) => GridConfig | undefined;
  getState: (gridId: string) => GridState | undefined;
  findByParent: (parentId: string, scope?: string) => SingleGrid | undefined; // returns array
  findAllByParent: (parentId: string, scope?: string) => SingleGrid[]; // returns array
  exportGrid: (gridId: string) => ExportedGrid | undefined;
  importGrid: (data: ExportedGrid, opts?: { scope?: string; parentId?: string; label?: string }) => string;
  cloneGrid: (gridId: string, opts?: { scope?: string; parentId?: string; label?: string }) => string | undefined;
  getFullConfig: (gridId: string) => FullConfig | undefined;
} & HydrationSlice

export const useGridStore = create<GridStore>()(
  persist(
    (set, get, api) => ({
      ...createHydrationSlice(set, get, api),
  grids: {},

  initGrid: ({ config = {}, state = {}, scope, parentId, label, gridId }) => {
    const id = gridId ?? nanoid();
    const details = {
            scope,
      parentId,
      label,
      gridId: id
    }
    const fullConfig: GridConfig = {
      ...deepMerge(DEFAULT_GRID_CONFIG, config),
    };
    const fullState: GridState = {
      ...deepMerge(DEFAULT_GRID_STATE, state),
      gridId: id,
      isInitialized: true,
    };
    set((store) => ({
      grids: {
        ...store.grids,
        [id]: { config: fullConfig, state: fullState, ...details },
      },
    }));
    return id;
  },

  updateGridState: (gridId, patch) =>
    set((store) => {
      const grid = store.grids[gridId];
      if (!grid) return {};
      return {
        grids: {
          ...store.grids,
          [gridId]: {
            ...grid,
            state: { ...grid.state, ...patch },
          },
        },
      };
    }),

  updateGridConfig: (gridId, patch) =>
    set((store) => {
      const grid = store.grids[gridId];
      if (!grid) return {};
      return {
        grids: {
          ...store.grids,
          [gridId]: {
            ...grid,
            config: { ...grid.config, ...patch },
          },
        },
      };
    }),

  removeGrid: (gridId) =>
    set((store) => {
      const next = { ...store.grids };
      delete next[gridId];
      return { grids: next };
    }),

  getGrid: (gridId) => get().grids[gridId],
  getConfig: (gridId) => get().grids[gridId]?.config,
  getState: (gridId) => get().grids[gridId]?.state,
findByParent: (parentId, scope) => {
  const all = get().grids;
  return Object.values(all).find((g) => g.parentId === parentId && g.scope === scope);
},
findAllByParent: (parentId, scope) => {
  const all = get().grids;
  return Object.values(all).filter((g) => g.parentId === parentId && g.scope === scope);
},
  exportGrid: (gridId) => {
    const grid = get().grids[gridId];
    if (!grid) return undefined;
    return JSON.parse(JSON.stringify(grid)); // deep clone
  },

  importGrid: (data, opts = {}) => {
    const id = nanoid();
    const details = {
            gridId: id,
      scope: opts.scope ?? data.scope,
      parentId: opts.parentId ?? data.parentId,
      label: opts.label ?? data.label,
    }
    const config: GridConfig = {
      ...deepMerge(DEFAULT_GRID_CONFIG, data.config),
    };
    const state: GridState = {
      ...deepMerge(DEFAULT_GRID_STATE, data.state),
      gridId: id,
      isInitialized: true,
    };
    set((store) => ({
      grids: {
        ...store.grids,
        [id]: { config, state, ...details },
      },
    }));
    return id;
  },

  cloneGrid: (gridId, opts = {}) => {
    const data = get().grids[gridId];
    if (!data) return undefined;
    return get().importGrid(data, opts);
  },
    getFullConfig: (gridId) => {
    const grid = get().grids[gridId];
    if (!grid) return undefined;
    const { handles, flags, ...restConfig } = grid.config;
    const { layout, layouts, activeBreakpoint: breakpoint, width } = grid.state;
    return {
      ...restConfig,
      ...handles,
      ...flags,
      layout,
      layouts,
      breakpoint,
      width,
    } as FullConfig;
  },
}), 
{
  name: "synapcity-grid-store",
        onRehydrateStorage: () => (state) => {
       if(!state?.hasHydrated){
        state?.setHasHydrated(true)
       }
      }
}));
