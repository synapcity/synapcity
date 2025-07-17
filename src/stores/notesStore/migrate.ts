import type { EntityState } from "../createEntityStore";
import type { Note } from "@/types/note";

export const migrateNotesStore = (
	persisted: unknown,
	version: number
): EntityState<Note> => {
	const state = (persisted as Partial<EntityState<Note>>) ?? {};
	if (version < 1) return { items: {} };
	return {
		items: state.items ?? {},
	};
};
