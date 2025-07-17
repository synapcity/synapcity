/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StateCreator, StoreApi } from "zustand";
import { nanoid } from "nanoid";
import { withScopedStatusToast, showToast } from "@/lib/toast";
import {
	createHydrationSlice,
	createStatusSlice,
	createSelectionSlice,
} from "@/stores/slices";
import { HydrationSlice, SelectionSlice, StatusSlice } from "@/types/ui";

export interface EntityBase {
	id: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
}

export interface EntityState<T extends EntityBase> {
	items: Record<string, T>;
}

export interface EntityActions<T extends EntityBase> {
	addItem: (partial?: Partial<T>) => Promise<T | undefined>;
	updateItem: (id: string, updates: Partial<T>) => Promise<void>;
	getItemById: (id: string) => T | undefined;
	purgeItem: (id: string) => void;
	restoreItem: (id: string) => void;
}

/** Your full store type */
export type EntityStore<T extends EntityBase> = EntityState<T> &
	EntityActions<T> &
	HydrationSlice &
	StatusSlice &
	SelectionSlice;

/** Config for each entity store */
export interface CreateEntityStoreConfig<T extends EntityBase> {
	/** e.g. "note", "notebook", "library" */
	entityName: string;
	/** how to build a new item from partial data */
	createItem: (partial?: Partial<T>) => T;
	/** migration fn, if you change shape later */
	migrate?: (persisted: unknown, version: number) => EntityState<T>;
	/** optional extra methods */
	customActions?: (
		set: StoreApi<EntityStore<T>>["setState"],
		get: StoreApi<EntityStore<T>>["getState"],
		store: StoreApi<EntityStore<T>>
	) => Partial<Record<string, any>>;
}

/** The master factory — always includes hydration, status, selection */
export function createEntityStore<T extends EntityBase>(
	config: CreateEntityStoreConfig<T>
): StateCreator<EntityStore<T>> {
	return (set, get, store) => ({
		// ---- core state ----
		items: {},

		// ---- core actions ----
		addItem: async (partial = {}) => {
			const id = (partial as any).id ?? nanoid();
			const now = new Date().toISOString();
			const newItem = config.createItem({
				...partial,
				id,
				createdAt: now,
				updatedAt: now,
				deletedAt: null,
			} as T);

			showToast.info(`Creating ${config.entityName}…`);
			set((s) => ({ items: { ...s.items, [id]: newItem } }));
			showToast.success(`${config.entityName} created`);
			return newItem;
		},

		updateItem: async (id, updates) => {
			await withScopedStatusToast(
				"saving",
				config.entityName,
				id,
				async () => {
					const existing = get().items[id];
					if (!existing) throw new Error(`${config.entityName} not found`);

					set((s) => ({
						items: {
							...s.items,
							[id]: {
								...existing,
								...updates,
								updatedAt: new Date().toISOString(),
							},
						},
					}));
				},
				{
					loading: `Saving ${config.entityName}…`,
					success: `${config.entityName} saved`,
					error: `Failed to save ${config.entityName}`,
				}
			);
		},

		getItemById: (id) => get().items[id],

		purgeItem: (id) =>
			set((s) => {
				const copy = { ...s.items };
				delete copy[id];
				return { items: copy };
			}),

		restoreItem: (id) => {
			const itm = get().items[id];
			if (!itm) return;
			set((s) => ({
				items: {
					...s.items,
					[id]: { ...itm, deletedAt: null },
				},
			}));
		},

		// ---- built-in slices ----
		...createHydrationSlice(set, get, store),
		...createStatusSlice(set, get, store),
		...createSelectionSlice(set, get, store),

		// ---- any extra methods you passed in ----
		...(config.customActions?.(set, get, store) ?? {}),
	});
}

// import { StateCreator } from "zustand";
// import { nanoid } from "nanoid";
// import { withScopedStatusToast, showToast } from "@/lib/toast";
// import {
// 	createHydrationSlice,
// 	HydrationSlice,
// } from "@/stores/slices/hydrationSlice";
// import { createStatusSlice, StatusSlice } from "@/stores/slices/statusSlice";
// import {
// 	createSelectionSlice,
// 	SelectionSlice,
// } from "@/stores/slices/selectionSlice";

// export interface EntityBase {
// 	id: string;
// 	createdAt: string;
// 	updatedAt: string;
// 	deletedAt: string | null;
// }

// export interface EntityState<T extends EntityBase> {
// 	items: Record<string, T>;
// }

// export interface EntityActions<T extends EntityBase> {
// 	addItem: (partial?: Partial<T>) => Promise<T | undefined>;
// 	updateItem: (id: string, updates: Partial<T>) => Promise<void>;
// 	getItemById: (id: string) => T | undefined;
// 	purgeItem: (id: string) => void;
// 	restoreItem: (id: string) => void;
// }

// export type EntityStore<T extends EntityBase> = EntityState<T> &
// 	EntityActions<T> &
// 	HydrationSlice &
// 	StatusSlice &
// 	SelectionSlice;

// export interface CreateEntityStoreConfig<T extends EntityBase> {
// 	/** e.g. "note", "notebook", "library" */
// 	entityName: string;
// 	/** how to build a new entity from partial */
// 	createItem: (partial?: Partial<T>) => T;
// 	/** persist version */
// 	version?: number;
// 	/** optional migration fn */
// 	migrate?: (persisted: unknown, version: number) => EntityState<T>;
// 	/** custom actions to merge in */
// 	customActions?: (
// 		set: StateCreator<EntityStore<T>>["setState"],
// 		get: StateCreator<EntityStore<T>>["getState"],
// 		store: T
// 	) => Partial<Record<string, T>>;
// 	/** which slices to enable */
// 	enableStatus?: boolean;
// 	enableSelection?: boolean;
// }
// export interface Entity<T> {
//   id: string;
//   deletedAt?: string | null;
//   createdAt?: string;
//   updatedAt?: string;
// }
// /** The master factory */
// // export function createEntityStore<T extends EntityBase>(
// // 	config: CreateEntityStoreConfig<T>
// // ): StateCreator<EntityStore<T>> {
// // 	return (set, get, store) => ({
// export const createEntitySlice =
//   <T extends Entity<T>>(): StateCreator<EntityStore<T>, [], [], EntitySlice<T>> =>
//   (set, get) => ({
// 		items: {},
// 		addItem: async (partial = {}) => {
// 			const id = (partial as any).id || nanoid();
// 			const now = new Date().toISOString();
// 			const newItem = config.createItem({
// 				...partial,
// 				id,
// 				createdAt: now,
// 				updatedAt: now,
// 				deletedAt: null,
// 			} as T);

// 			showToast.info(`Creating ${config.entityName}…`);
// 			set((s) => ({ items: { ...s.items, [id]: newItem } }));
// 			showToast.success(`${config.entityName} created`);
// 			return newItem;
// 		},

// 		updateItem: async (id, updates) => {
// 			await withScopedStatusToast(
// 				"saving",
// 				config.entityName,
// 				id,
// 				async () => {
// 					const existing = get().items[id];
// 					if (!existing) throw new Error(`${config.entityName} not found`);
// 					const updated = {
// 						...existing,
// 						...updates,
// 						updatedAt: new Date().toISOString(),
// 					};
// 					set((s) => ({ items: { ...s.items, [id]: updated } }));
// 				},
// 				{
// 					loading: `Saving ${config.entityName}…`,
// 					success: `${config.entityName} saved`,
// 					error: `Failed to save ${config.entityName}`,
// 				}
// 			);
// 		},

// 		getItemById: (id) => get().items[id],

// 		purgeItem: (id) =>
// 			set((s) => {
// 				const nxt = { ...s.items };
// 				delete nxt[id];
// 				return { items: nxt };
// 			}),

// 		restoreItem: (id) => {
// 			const item = get().items[id];
// 			if (!item) return;
// 			set((s) => ({
// 				items: { ...s.items, [id]: { ...item, deletedAt: null } },
// 			}));
// 		},

// 		// ---- SLICES ----
// 		// hydration is always on
// 		...createHydrationSlice(set, get, store),
// 		// optional status slice
// 		...(config.enableStatus ? createStatusSlice(set, get, store) : {}),
// 		// optional selection slice
// 		...(config.enableSelection ? createSelectionSlice(set, get, store) : {}),
// 		// custom actions
// 		...(config.customActions?.(set, get, store) ?? {}),
// 	});
// }

// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { StateCreator } from "zustand";
// // import { createHydrationSlice, HydrationSlice } from "@/stores/slices";
// // import { showToast, withScopedStatusToast } from "@/lib/toast";
// // import { useUIStore } from "@/stores/uiStore";

// // export interface Entity {
// // 	id: string;
// // 	deletedAt?: string | null;
// // 	[key: string]: any;
// // }

// // export interface EntityState<T extends Entity> {
// // 	items: Record<string, T>;
// // }

// // export interface EntityActions<T extends Entity> {
// // 	addItem: (item?: Partial<T>) => Promise<T | undefined>;
// // 	updateItem: (id: string, updates: Partial<T>) => void;
// // 	getItemById: (id: string) => T | undefined;
// // 	purgeItem: (id: string) => void;
// // 	restoreItem: (id: string) => void;
// // }

// // export type EntityStore<T extends Entity> = EntityState<T> &
// // 	EntityActions<T> &
// // 	HydrationSlice &
// // 	Record<string, any>;

// // export interface CreateEntityStoreConfig<T extends Entity> {
// // 	entityName: string;
// // 	createItem: (partial?: Partial<T>) => T;
// // 	migrate?: (persisted: unknown, version: number) => EntityState<T>;
// // 	customActions?: (
// // 		set: (fn: (state: any) => Partial<any>) => void,
// // 		get: () => any
// // 	) => Record<string, any>;
// // 	persistPartialize?: (state: EntityStore<T>) => Partial<EntityStore<T>>;
// // 	version?: number;
// // }

// // export function createEntityStore<T extends Entity>(
// // 	config: CreateEntityStoreConfig<T>
// // ): StateCreator<EntityStore<T>> {
// // 	return (set, get, store) => ({
// // 		items: {},

// // 		addItem: async (partial = {}) => {
// // 			const { startStatus, finishStatus, failStatus } = useUIStore.getState();
// // 			try {
// // 				startStatus("saving");
// // 				showToast.info(`Creating ${config.entityName}...`);

// // 				const newItem = config.createItem(partial);
// // 				set((state) => ({
// // 					items: { ...state.items, [newItem.id]: newItem },
// // 				}));

// // 				finishStatus("saving");
// // 				showToast.success(`${config.entityName} created`);
// // 				return newItem;
// // 			} catch (err) {
// // 				failStatus("saving", err as Error);
// // 				showToast.error(`Failed to create ${config.entityName}`);
// // 				return undefined;
// // 			}
// // 		},

// // 		updateItem: async (id, updates) => {
// // 			await withScopedStatusToast(
// // 				"saving",
// // 				config.entityName,
// // 				id,
// // 				async () => {
// // 					const existing = get().items[id];
// // 					if (!existing) throw new Error(`${config.entityName} not found`);

// // 					const updated = {
// // 						...existing,
// // 						...updates,
// // 						updatedAt: new Date().toISOString(),
// // 					};

// // 					set((state) => ({
// // 						items: { ...state.items, [id]: updated },
// // 					}));
// // 				},
// // 				{
// // 					loading: `Saving ${config.entityName}...`,
// // 					success: `${config.entityName} saved`,
// // 					error: `Failed to save ${config.entityName}`,
// // 				}
// // 			);
// // 		},

// // 		getItemById: (id) => get().items[id],

// // 		purgeItem: (id) =>
// // 			set((state) => {
// // 				const next = { ...state.items };
// // 				delete next[id];
// // 				return { items: next };
// // 			}),

// // 		restoreItem: (id) => {
// // 			const item = get().items[id];
// // 			if (!item) return;
// // 			set((state) => ({
// // 				items: {
// // 					...state.items,
// // 					[id]: {
// // 						...item,
// // 						deletedAt: null,
// // 					},
// // 				},
// // 			}));
// // 		},

// // 		...createHydrationSlice(set, get, store),
// // 		...(config.customActions?.(set, get) ?? {}),
// // 	});
// // }
// // stores/factory/createEntityStore.ts
// import { StateCreator } from "zustand";
// import { nanoid } from "nanoid";
// import { withScopedStatusToast, showToast } from "@/lib/toast";
// import { createHydrationSlice, type HydrationSlice } from "@/stores/slices";

// type EntityBase = {
// 	id: string;
// 	createdAt: string;
// 	updatedAt: string;
// 	deletedAt: string | null;
// };

// interface EntityState<T> {
// 	entities: Record<string, T>;
// }

// interface EntityActions<T> {
// 	add: (data?: Partial<T>) => Promise<T | undefined>;
// 	update: (id: string, updates: Partial<T>) => Promise<void>;
// 	remove: (id: string) => void;
// 	restore: (id: string) => void;
// 	getById: (id: string) => T | undefined;
// }

// export type CreateEntityStore<T extends EntityBase> = EntityState<T> &
// 	EntityActions<T> &
// 	HydrationSlice;

// export function createEntityStore<T extends EntityBase>(
// 	name: string,
// 	entityDefaults: Partial<T>
// ): StateCreator<CreateEntityStore<T>> {
// 	return (set, get, store) => ({
// 		entities: {},

// 		add: async (data = {}) => {
// 			const id = data.id || nanoid();
// 			const now = new Date().toISOString();
// 			const newEntity: T = {
// 				...entityDefaults,
// 				...data,
// 				id,
// 				createdAt: now,
// 				updatedAt: now,
// 				deletedAt: null,
// 			} as T;

// 			showToast.info(`Creating ${name}...`);
// 			set((state) => ({
// 				entities: { ...state.entities, [id]: newEntity },
// 			}));
// 			showToast.success(`${name} created`);
// 			return newEntity;
// 		},

// 		update: async (id, updates) => {
// 			await withScopedStatusToast(
// 				"saving",
// 				name,
// 				id,
// 				async () => {
// 					const existing = get().entities[id];
// 					if (!existing) throw new Error(`${name} not found`);

// 					set((state) => ({
// 						entities: {
// 							...state.entities,
// 							[id]: {
// 								...existing,
// 								...updates,
// 								updatedAt: new Date().toISOString(),
// 							},
// 						},
// 					}));
// 				},
// 				{
// 					success: "Saved!",
// 					error: `An error occured while updating ${name}:${id}`,
// 				}
// 			);
// 		},

// 		remove: (id) => {
// 			set((state) => {
// 				const next = { ...state.entities };
// 				delete next[id];
// 				return { entities: next };
// 			});
// 		},

// 		restore: (id) => {
// 			const item = get().entities[id];
// 			if (!item) return;
// 			set((state) => ({
// 				entities: {
// 					...state.entities,
// 					[id]: { ...item, deletedAt: null },
// 				},
// 			}));
// 		},

// 		getById: (id) => get().entities[id],
// 		...createHydrationSlice(set, get, store),
// 	});
// }
