/* eslint-disable @typescript-eslint/no-explicit-any */
import { create, StateCreator, StoreApi } from "zustand";
import { devtools, persist, PersistOptions, subscribeWithSelector } from "zustand/middleware";
import { nanoid } from "nanoid";
import type { ZodTypeAny } from "zod";
import { BaseResource } from "@/stores/resources/factory/base-schema";
import {
  createHydrationSlice,
  type HydrationSlice,
  createSelectionSlice,
  type SelectionSlice,
  createStatusSlice,
  type StatusSlice,
  defaultStatus,
} from "@/stores/slices";
import { mergeSlices } from "@/stores/slices/mergeSlices";

export interface ResourceStore<T extends BaseResource>
  extends HydrationSlice,
    StatusSlice,
    SelectionSlice {
  items: Record<string, T>;
  addResource(data?: Partial<T>): Promise<T>;
  updateResource(id: string, patch: Partial<T>): Promise<T>;
  deleteResource(id: string): void;
  softDeleteResource(id: string): void;
  getResourceById(id: string): T | undefined;
  getAllResources(): T[];
  /**
   * Optionally initialize the store with a raw list of items (used in afterHydrate).
   */
  initItems?(raw: T[]): void;
  [key: string]: any;
}

export interface ResourceStoreConfig<T extends BaseResource> {
  resourceName: string;
  schema: ZodTypeAny;
  persistKey?: string;
  version?: number;
  createItem: (partial: any) => T;
  /**
   * Additional slices to merge into the store
   */
  slices?: Array<StateCreator<any, any, any, any>>;
  /**
   * Pick which pieces of state to persist (besides items)
   */
  partialize?: (state: ResourceStore<T>) => Partial<ResourceStore<T>>;
  /**
   * Optional migration strategy for persisted state
   */
  migrate?: PersistOptions<ResourceStore<T>, any>["migrate"];
  /**
   * Called after rehydration if no persisted items present
   */
  afterHydrate?: (state: ResourceStore<T>, err?: unknown) => void;
  /**
   * Initialize the store with raw data (e.g. on first load)
   */
  initItems?: (
    set: (patch: Partial<ResourceStore<T>>, replace?: boolean) => void,
    get: () => ResourceStore<T>
  ) => (raw: T[]) => void;
  /**
   * Custom actions to merge into the store
   */
  customActions?: (
    set: StoreApi<ResourceStore<T>>["setState"],
    get: StoreApi<ResourceStore<T>>["getState"],
    api: StoreApi<ResourceStore<T>>
  ) => Partial<ResourceStore<T>>;
}

export function createResourceStore<T extends BaseResource>(config: ResourceStoreConfig<T>) {
  type RS = ResourceStore<T>;

  const {
    resourceName,
    schema,
    createItem,
    persistKey,
    version = 1,
    partialize = (s: RS) => ({ items: s.items }),
    migrate,
    afterHydrate,
    slices = [],
  } = config;

  const baseCreator: StateCreator<RS> = (set, get, api) => {
    const slice: RS = {
      items: {} as Record<string, T>,
      ...createHydrationSlice(set, get, api),
      ...createStatusSlice(set, get, api),
      ...createSelectionSlice(set, get, api),

      async addResource(data = {}) {
        const now = new Date().toISOString();
        const id = (data as any).id ?? nanoid();
        const raw = {
          ...data,
          id,
          createdAt: now,
          updatedAt: now,
          deletedAt: null,
        };
        const item = createItem(raw);
        const status = { ...defaultStatus };
        set((s) => ({ items: { ...s.items, [id]: item }, localStatus: { [id]: status } }));
        return item;
      },

      async updateResource(id, patch) {
        const existing = get().items[id];
        if (!existing) throw new Error(`${resourceName} ${id} not found`);
        set({ localStatus: { [id]: { ...defaultStatus, isSaving: true } } });
        const now = new Date().toISOString();
        const updated = schema.parse({ ...existing, ...patch, updatedAt: now });
        set((s) => ({ items: { ...s.items, [id]: updated }, localStatus: defaultStatus }));
        return updated as T;
      },

      deleteResource(id) {
        set((s) => {
          const { [id]: _, ...rest } = s.items;
          return { items: rest };
        });
      },

      softDeleteResource(id) {
        const existing = get().items[id];
        if (!existing) return;
        set({ localStatus: { [id]: { ...defaultStatus, isDeleting: true } } });
        const now = new Date().toISOString();
        const soft = schema.parse({ ...existing, deletedAt: now });
        set((s) => ({ items: { ...s.items, [id]: soft }, localStatus: defaultStatus }));
      },

      getResourceById(id) {
        return get().items[id];
      },

      getAllResources() {
        return Object.values(get().items);
      },
    };

    if (config.initItems) {
      slice.initItems = config.initItems(
        set as unknown as (patch: Partial<RS>, replace?: boolean) => void,
        () => get()
      );
    }
    // support customActions config
    if (config.customActions) {
      Object.assign(
        slice,
        config.customActions(set as StoreApi<RS>["setState"], get as StoreApi<RS>["getState"], api)
      );
    }

    // merge any extra slices
    mergeSlices(slice, slices, set, get, api);
    return slice;
  };

  let pipeline: StateCreator<any> = baseCreator;
  if (persistKey) {
    const opts: PersistOptions<any, any> = {
      name: persistKey,
      version,
      partialize: (state) => ({ ...partialize(state), items: state.items }),
      migrate,
      onRehydrateStorage: (state) => (storage, err) => {
        state.setHasHydrated(true);
        if (!storage?.items || Object.keys(storage.items).length === 0) {
          afterHydrate?.(state, err);
        }
      },
    };
    pipeline = (set, get, api) => persist(baseCreator, opts)(set, get, api);
  }

  const finalCreator = subscribeWithSelector(devtools(pipeline, { name: resourceName }));

  return create<RS, [["zustand/subscribeWithSelector", never], ["zustand/devtools", never]]>(
    finalCreator
  );
}
