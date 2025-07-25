/* eslint-disable @typescript-eslint/no-explicit-any */
import { create, StateCreator, StoreApi } from "zustand";
import {
	devtools,
	persist,
	PersistOptions,
	subscribeWithSelector,
} from "zustand/middleware";
import { nanoid } from "nanoid";
import type { ZodTypeAny } from "zod";
import { BaseResource } from "@/schemas/resources/base-schema";
import {
	createHydrationSlice,
	type HydrationSlice,
	createSelectionSlice,
	type SelectionSlice,
	createStatusSlice,
	type StatusSlice,
} from "@/stores/slices";
import { mergeSlices } from "@/stores/slices/mergeSlices";
import { useNoteViewStore } from "@/stores/resources";

export interface ResourceStore<T extends BaseResource>
	extends HydrationSlice,
		StatusSlice,
		SelectionSlice {
	items: Record<string, T>;

	addResource(data?: unknown): Promise<T>;
	updateResource(id: string, patch: Partial<T>): Promise<void>;
	deleteResource(id: string): void;
	softDeleteResource(id: string): void;
	getResourceById(id: string): T | undefined;
	getAllResources(): T[];

	initItems?(raw: unknown[]): void;
	[key: string]: any;
}

export interface ResourceStoreConfig<T extends BaseResource> {
	resourceName: string;
	schema: ZodTypeAny;
	persistKey?: string;
	version?: number;
	createItem: (partial?: Partial<T>) => T;

	partialize?: (s: ResourceStore<T>) => Partial<ResourceStore<T>>;
	migrate?: PersistOptions<
		ResourceStore<T>,
		Partial<ResourceStore<T>>
	>["migrate"];
	afterHydrate?: (state: ResourceStore<T>, error?: unknown) => void;
	initItems?: (
		set: (s: Partial<ResourceStore<T>>) => void,
		get: () => ResourceStore<T>
	) => (raw: unknown[]) => void;

	customActions?: (
		set: (patch: Partial<ResourceStore<T>>) => void,
		get: () => ResourceStore<T>,
		store: StoreApi<ResourceStore<T>>
	) => Partial<ResourceStore<T>>;
	slices?: Array<StateCreator<any, any, any, any>>;
}

export function createResourceStore<T extends BaseResource>(
	config: ResourceStoreConfig<T>
) {
	type RS = ResourceStore<T>;

	const {
		resourceName,
		schema,
		partialize = (s: RS) => ({ items: s.items }),
		migrate,
		afterHydrate = () => {},
		initItems: makeInit,
		createItem,
		slices = [],
	} = config;

	const baseCreator: StateCreator<RS, any, any, any> = (set, get, store) => {
		const slice: RS = {
			items: {} as Record<string, T>,

			...createHydrationSlice(set, get, store),
			...createStatusSlice(set, get, store),
			...createSelectionSlice(set, get, store),

			async addResource(data: Partial<T>) {
				const now = new Date().toISOString();
				const id = data.id ?? nanoid();
				const raw = {
					...data,
					id,
					createdAt: now,
					updatedAt: now,
					deletedAt: null,
				};
				const item = createItem(raw);
				set((s) => ({ items: { ...s.items, [id]: item } }));
				return item;
			},

			async updateResource(id, patch) {
				const ex = get().items[id];
				console.log("PATCH", patch);
				if (!ex) throw new Error(`${resourceName} ${id} not found`);
				const now = new Date().toISOString();
				const updated = schema.parse({ ...ex, ...patch, updatedAt: now });
				set((s) => ({ items: { ...s.items, [id]: updated } }));
			},

			deleteResource(id) {
				set((s) => {
					const { [id]: _, ...rest } = s.items;
					return { items: rest };
				});
			},

			softDeleteResource(id) {
				const ex = get().items[id];
				if (!ex) return;
				const now = new Date().toISOString();
				const soft = schema.parse({ ...ex, deletedAt: now });
				set((s) => ({ items: { ...s.items, [id]: soft } }));
			},

			getResourceById(id) {
				return get().items[id];
			},

			getAllResources() {
				return Object.values(get().items);
			},
		};

		if (makeInit) {
			slice.initItems = makeInit(set, get);
		}

		if (config.customActions) {
			Object.assign(slice, config.customActions(set, get, store));
		}

		mergeSlices(slice, slices, set, get, store);

		return slice;
	};
	let opts: PersistOptions<RS, Partial<RS>> = {
		name: config.persistKey || resourceName,
	};
	// let pipeline: StateCreator<RS> = baseCreator;

	if (config.persistKey) {
		opts = {
			name: config.persistKey,
			version: config.version ?? 1,
			partialize: (state) => ({ ...partialize(state), items: state.items }),
			migrate,
			onRehydrateStorage: (state) => (persisted, err) => {
				state.setHasHydrated(true);
				if (persisted?.items && Object.keys(persisted.items).length > 0) {
					return;
				}
				afterHydrate?.(state, err);
			},
		};
		// pipeline = persist(baseCreator, opts) as StateCreator<RS>;
	}

	// const withSelectors = subscribeWithSelector<RS>(pipeline);

	return create(
		devtools(
			subscribeWithSelector(
				persist(baseCreator, {
					...opts,
					name: config.persistKey || resourceName,
					version: config.version ?? 1,
					partialize: (state) => ({ ...partialize(state), items: state.items }),
					migrate,
					onRehydrateStorage: (state) => (persisted, err) => {
						state.setHasHydrated(true);
						if (persisted?.items && Object.keys(persisted.items).length > 0) {
							return;
						}
						afterHydrate?.(state, err);
					},
				})
			)
		)
	);
}
