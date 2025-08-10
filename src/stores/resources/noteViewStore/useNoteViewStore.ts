import rawViews from "./views.json";
import { initItems } from "@/utils/initItems";
import { createResourceStore, ResourceStore } from "@/stores/resources/factory";
import { createView, type ViewResource, ViewResourceSchema } from "./view-schema";
import { createViewSlice, createDirtySlice, createActiveSlice } from "@/stores/slices";
import type { StoreApi, UseBoundStore } from "zustand";
import { useNoteStore } from "../noteStore";

export type NoteViewStore = ResourceStore<ViewResource> &
  ReturnType<typeof createViewSlice<ViewResource>> &
  ReturnType<typeof createDirtySlice> &
  ReturnType<typeof createActiveSlice>;

const _useNoteViewStore = createResourceStore<ViewResource>({
  resourceName: "note-views",
  schema: ViewResourceSchema,
  persistKey: "synapcity-note-views",
  createItem: (partial) => {
    useNoteStore
      .getState()
      .updateResource(partial.entityId, { updatedAt: new Date().toISOString() });
    return createView(partial);
  },

  initItems: (set) => (raw) => {
    const parsed = initItems<ViewResource>(raw, ViewResourceSchema, createView);
    set({ items: parsed as Record<string, ViewResource> });
  },

  afterHydrate: (state, err) => {
    state.setHasHydrated(true);
    if (!err && Object.values(state.items).length === 0) {
      state.initItems?.(rawViews as ViewResource[]);
    }
  },

  slices: [createViewSlice<ViewResource>(), createDirtySlice, createActiveSlice],

  partialize: (state) => ({ activeByScope: state.activeByScope }),
});

export const useNoteViewStore = _useNoteViewStore as unknown as UseBoundStore<
  StoreApi<NoteViewStore>
>;
