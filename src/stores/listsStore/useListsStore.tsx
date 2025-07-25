// import { create } from "zustand";
// import { createEntityStore, EntityStore } from "@/stores/factory";
// import { ListSchema, createList, type List } from "@/schemas/data/list-schema";
// import { loadLists } from "@/utils/list-utils";
// import { persist } from "zustand/middleware";
// import { migrateListStore } from "@/components/tables/Todos/useTodosStore/migrateListStore";
// import rawLists from "@/lib/data/lists.json";

// /**
//  * Store for List entities, using the generic entity store pattern.
//  * Provides hydration from JSON, plus helpers to query by parent.
//  */
// type ListStore = EntityStore<List>;
// export const useListStore = create<ListStore>()(
//   persist(
//     createEntityStore<List>({
//       entityName: "list",
//       schema: ListSchema,
//       createItem: createList,
//       customActions: (_set, _get, store) => ({
//         hydrateFromJSON: () => {
//           store.getState().initItems(loadLists(rawLists));
//         },
//         getListsByParent: (parentType: string, parentId: string) => {
//           return Object.values(store.getState().items).filter(
//             (l) => l.meta.parentType === parentType && l.meta.parentId === parentId
//           );
//         },
//       }),

//     }), {
//     name: "list-store",
//     version: 2,
//     migrate: migrateListStore,
//     partialize: (state) => ({ items: state.items }),
//     onRehydrateStorage: () => (state, err) => {
//       if (!err) state?.setHasHydrated(true);
//       console.warn(`Error hydrating state: ${err}`)
//     }
//   }

//   )
// );
