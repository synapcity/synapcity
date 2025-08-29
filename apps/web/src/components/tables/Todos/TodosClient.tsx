// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useEffect } from "react";
// import { todoColumns } from "./columns";
// import { DataTable } from "@/components/tables/DataTable";
// import { Loading } from "@/components/loading";
// import { withStatusAndToast } from "@/lib/toast";
// import { getData } from "@/utils/fetch-utils";
// import type { TodoItem } from "@/schemas/data/todo-schema";
// import type { List } from "@/schemas/list-schema";
// // import { useListStore } from "@/stores/listsStore";

// export default function TodosClient({ id }: { id: string }) {
//   const hasHydrated = useListStore((s) => s.hasHydrated);
//   const setHasHydrated = useListStore((s) => s.setHasHydrated);
//   const initItems = useListStore((s) => s.initItems);
//   const startStatus = useListStore((s) => s.startStatus);
//   const finishStatus = useListStore((s) => s.finishStatus);
//   const failStatus = useListStore((s) => s.failStatus);
//   const getListById = useListStore((s) => s.getItemById);

//   const list = getListById(id);

//   useEffect(() => {
//     if (list) {
//       setHasHydrated(true);
//       return;
//     }

//     startStatus("fetching", "lists", id);
//     withStatusAndToast<List[]>(
//       "fetching",
//       async () => {
//         const mod = await getData("lists");
//         return (mod as any).default as List[];
//       },
//       {
//         loading: "Loading lists…",
//         success: "Lists loaded!",
//         error: "Failed to load lists.",
//         entityId: "lists",
//       }
//     )
//       .then((allLists) => {
//         if (allLists) {
//           initItems(allLists);
//           setHasHydrated(true);
//         }
//       })
//       .catch((err) => {
//         failStatus("fetching", err as Error, "lists");
//       })
//       .finally(() => {
//         finishStatus("fetching", "lists", id);
//       });
//   }, [
//     id,
//     list,
//     initItems,
//     startStatus,
//     finishStatus,
//     failStatus,
//     setHasHydrated,
//   ]);

//   if (!hasHydrated) {
//     return (
//       <div className="w-full h-48 flex items-center justify-center">
//         <Loading />
//       </div>
//     );
//   }

//   const todos: TodoItem[] = list?.items ?? [];

//   return (
//     <div>
//       <DataTable columns={todoColumns} data={todos} />
//     </div>
//   );
// }
