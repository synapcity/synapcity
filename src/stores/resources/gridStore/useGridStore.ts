import { StoreApi, UseBoundStore } from "zustand";
import { createResourceStore, ResourceStore } from "../factory";
import {
  Grid,
  GridResourceSchema,
  createGrid,
} from "./grid-schema"; // Update this import if needed
import { nanoid } from "nanoid";
import { deepMerge } from "@/utils/deepMerge";
import { defaultFlags, handles } from "@/stores/resources/gridStore/defaults";

// --- Use the InitGridArgs type for argument typing ---
export type InitGridArgs = {
  config?: Partial<Grid["config"]>;
  state?: Partial<Grid["state"]>;
  scope: string;
  parentId: string;
  label?: string;
  gridId?: string;
};


// -- Type signature for the store with all custom actions --
export interface GridStore extends ResourceStore<Grid> {
  initGrid(args: InitGridArgs): string;
  updateGridState(gridId: string, patch: Partial<Grid["state"]>): void;
  updateGridConfig(gridId: string, patch: Partial<Grid["config"]>): void;
  removeGrid(gridId: string): void;
  getGrid(gridId: string): Grid | undefined;
  getConfig(gridId: string): Grid["config"] | undefined;
  getState(gridId: string): Grid["state"] | undefined;
  findByParent(parentId: string, scope?: string): Grid | undefined;
  findAllByParent(parentId: string, scope?: string): Grid[];
  exportGrid(gridId: string): Grid | undefined;
  importGrid(data: Grid, opts?: { scope?: string; parentId?: string; label?: string }): string;
  cloneGrid(gridId: string, opts?: { scope?: string; parentId?: string; label?: string }): string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFullConfig(gridId: string): any | undefined;
}

const _useGridStore = createResourceStore<Grid>({
  resourceName: "Grid",
  schema: GridResourceSchema,
  persistKey: "synapcity-grids",
  createItem: createGrid,

  customActions: (set, get) => ({
    // 1. Create/init a new grid
    initGrid: ({
      config = {},
      state = {},
      scope,
      parentId,
      label,
      gridId,
    }: InitGridArgs): string => {
      const id = gridId ?? nanoid();
      const grid: Grid = createGrid({
        id,
        gridId: id,
        scope,
        parentId,
        label,
        config: deepMerge(
          {
            breakpoints: {},
            cols: {},
            margin: {},
            containerPadding: {},
            rowHeight: 0,
            resizeHandles: [],
            flags: defaultFlags,
            handles,
          },
          config
        ),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        state: { ...state, gridId: id, isInitialized: true } as any,   
      });
      set((store) => ({
        items: { ...store.items, [id]: grid }
      }));
      return id;
    },

    // 2. Patch only grid state
updateGridState: (gridId: string, patch: Partial<Grid["state"]>): void => {
  const grid = get().items[gridId];
  if (!grid) return;
  set((store) => ({
    items: {
      ...store.items,
      [gridId]: {
        ...grid,
        state: { ...grid.state, ...patch },
        updatedAt: new Date().toISOString(),
      }
    }
  }));
},

    // 3. Patch only grid config
    updateGridConfig: (gridId: string, patch: Partial<Grid["config"]>): void => {
      const grid = get().items[gridId];
      if (!grid) return;
      set((store) => ({
        items: {
          ...store.items,
          [gridId]: {
            ...grid,
            config: { ...grid.config, ...patch },
            updatedAt: new Date().toISOString(),
          }
        }
      }));
    },

    // 4. Remove grid by id
    removeGrid: (gridId: string): void => {
      set((store) => {
        const { [gridId]: _, ...rest } = store.items;
        return { items: rest };
      });
    },

    // 5. Getters (grid, config, state)
    getGrid: (gridId: string): Grid | undefined => get().items[gridId],
    getConfig: (gridId: string): Grid["config"] | undefined => get().items[gridId]?.config,
    getState: (gridId: string): Grid["state"] | undefined => get().items[gridId]?.state,

    // 6. Finders by parent
    findByParent: (parentId: string, scope?: string): Grid | undefined => {
      return Object.values(get().items).find(
        (g) => g.parentId === parentId && (scope ? g.scope === scope : true)
      );
    },
    findAllByParent: (parentId: string, scope?: string): Grid[] => {
      return Object.values(get().items).filter(
        (g) => g.parentId === parentId && (scope ? g.scope === scope : true)
      );
    },

    // 7. Export/import/clone
    exportGrid: (gridId: string): Grid | undefined => {
      const grid = get().items[gridId];
      return grid ? JSON.parse(JSON.stringify(grid)) : undefined;
    },
    importGrid: (
      data: Grid,
      opts?: { scope?: string; parentId?: string; label?: string }
    ): string => {
      const id = nanoid();
      const grid: Grid = createGrid({
        ...data,
        id,
        gridId: id,
        scope: opts?.scope ?? data.scope,
        parentId: opts?.parentId ?? data.parentId,
        label: opts?.label ?? data.label,
      });
      set((store) => ({
        items: { ...store.items, [id]: grid }
      }));
      return id;
    },
    cloneGrid: (
      gridId: string,
      opts?: { scope?: string; parentId?: string; label?: string }
    ): string | undefined => {
      const data = get().items[gridId];
      if (!data) return undefined;
      return get().importGrid(data, opts);
    },

    // 8. FullConfig getter
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getFullConfig: (gridId: string): any | undefined => {
      const grid = get().items[gridId];
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
      };
    },
  }),
});

// --- Final export: cast to correct store type for full intellisense ---
export const useGridStore = _useGridStore as unknown as UseBoundStore<StoreApi<GridStore>>;
