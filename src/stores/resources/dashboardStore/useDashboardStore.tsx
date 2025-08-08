import rawDashboards from "./dashboards.json";
import { initItems } from "@/utils/initItems";
import { createResourceStore, ResourceStore } from "@/stores/resources/factory";
import {
  createDashboard,
  DashboardResourceSchema,
  type Dashboard as DashboardResource,
} from "@/stores/resources/dashboardStore/dashboard-schema";
import type { StoreApi, UseBoundStore } from "zustand";

export interface DashboardStore extends ResourceStore<DashboardResource> {
  updateName(id: string, name: string): void;
  resetAll(): void;
}

const _useDashboardStore = createResourceStore<DashboardResource>({
  resourceName: "Dashboard",
  schema: DashboardResourceSchema,
  persistKey: "synapcity-Dashboards",
  createItem: createDashboard,

  initItems: (set, get) => (raw) => {
    if (Object.values(get().items).length > 0 || !get().hasHydrated) return;
    const parsed = initItems<DashboardResource>(raw, DashboardResourceSchema, createDashboard);
    set({ items: parsed });
  },

  afterHydrate: (state, err) => {
    state.setHasHydrated(true);
    if (!err && Object.values(state.items).length === 0) {
      state.initItems?.(rawDashboards);
    }
  },

  customActions: (set) => ({
    updateName(id: string, name: string) {
      set((state) => ({
        items: { ...state.items, [id]: { ...state.items[id], name } },
      }));
    },
    resetAll() {
      set({ items: {} });
    },
  }),
});

export const useDashboardStore = _useDashboardStore as unknown as UseBoundStore<
  StoreApi<DashboardStore>
>;
