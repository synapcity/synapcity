// /* eslint-disable @typescript-eslint/no-explicit-any */
// import type { StateCreator } from "zustand";
// import { Dashboard } from "@/types/refactor/dashboard";
// // import { useUIStore } from "@/stores/utils/persistStore";
// // import { useGridStore } from "../persistStore";
// import {
// 	createHydrationSlice,
// 	createStatusSlice,
// 	createSelectionSlice,
// 	createDashboardMapSlice,
// 	createWidgetIdSlice,
// 	createCreateDashboardSlice,
// } from "@/stores/refactor/slices";
// // =============================
// import { create, create as createZ } from "zustand";
// import { persist, persist as persistZ } from "zustand/middleware";

// export interface DashboardStoreState {
// 	dashboards: Record<string, Dashboard>;
// 	selectedDashboardId: string | null;
// 	hasHydrated: boolean;
// }

// export function createPersistedStore<T>(
//   initializer: StateCreator<T>,
//   config: {
//     name: string;
//     version?: number;
//     migrate?: (persisted: unknown, version: number) => T;
//     partialize?: (state: T) => Partial<T>;
//     onRehydrateStorage?: (state: T, err?: unknown) => void;
//   }
// ) {
//   return create<T>(
//     persist(initializer, {
//       name: config.name,
//       version: config.version,
//       migrate: config.migrate,
//       partialize: config.partialize,
//       onRehydrateStorage: config.onRehydrateStorage,
//     })
//   );
// }

// export const dashboardInitializer: StateCreator<DashboardStoreState & any> = (
// 	set,
// 	get,
// 	store
// ) => ({
// 	...createHydrationSlice(set, get, store),
// 	...createStatusSlice(set, get, store),
// 	...createSelectionSlice(set, get, store),
// 	...createDashboardMapSlice(set, get, store),
// 	...createWidgetIdSlice(set, get, store),
// 	...createCreateDashboardSlice(set, get, store),
// });
