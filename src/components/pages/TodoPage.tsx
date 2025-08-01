// import { todoColumns, TodoItem } from "@/components/tables/Todos/columns"
// import { DataTable } from "@/components/tables/DataTable/data-table";
// import { withStatusAndToast } from "@/lib/toast";

// async function getData(): Promise<TodoItem[]> {
//   const data = await import("@/lib/data/todo.json")
//   return data as unknown as TodoItem[]
// }

// export default async function TodosPage() {
//   const todos = async () => await getData()

//   const data = withStatusAndToast(
//     "fetching",
//     () => todos(),
//     {
//       loading: "Loading todos...",
//       success: "Todos loaded!",
//       error: "Failed to fetch todos.",
//       entityId: "todo-list"
//     }
//   )

//   return (
//     <div className="container mx-auto py-10">
//     </div>
//   )
// }
// {/* <DataTable columns={todoColumns} data={data} /> */}