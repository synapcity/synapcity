// // import type { EntityState } from "@/stores/refactor/factory-old";
// import { List } from "@/schemas/list-schema";

// export const migrateListStore = (
// 	persisted: unknown,
// 	version: number
// ): EntityState<List> => {
// 	const state = (persisted as Partial<EntityState<List>>) ?? {};
// 	if (version < 1) return { items: {} };
// 	return {
// 		items: state.items ?? {},
// 	};
// };
