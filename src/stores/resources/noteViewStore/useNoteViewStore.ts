import rawTabs from "@/lib/data/tabs.json";
import { initItems } from "@/utils/initItems";
import { createResourceStore } from "@/stores/factories";
import { BaseResource } from "@/schemas";
import {
	createView,
	ViewResource,
	ViewResourceSchema,
} from "@/schemas/resources/view-schema";
import {
	createActiveSlice,
	createDirtySlice,
	createViewSlice,
} from "../../slices";

export type View = ViewResource & BaseResource;
export const useNoteViewStore = createResourceStore<View>({
	resourceName: "note-views",
	schema: ViewResourceSchema,
	persistKey: "synapcity-note-views",
	createItem: createView,
	initItems: (set) => (raw) => {
		const parsed = initItems<ViewResource>(raw, ViewResourceSchema, createView);
		set({ items: parsed });
	},
	afterHydrate: (state, err) => {
		state.setHasHydrated(true);
		if (!err && Object.values(state.items).length === 0) {
			state.initItems?.(rawTabs);
		}
	},
	slices: [createViewSlice<View>(), createDirtySlice, createActiveSlice],
	partialize: (state) => {
		return {
			activeByScope: state.activeByScope,
		};
	},
});
