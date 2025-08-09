// "use client"

// import { cn } from "@/utils";
// import { useMemo } from "react";
// import { widgetRegistry } from "./registry";

// export const WidgetCategoryTabs = ({ activeCategory, setActiveCategory }: { activeCategory: string; setActiveCategory: (category: string) => void; }) => {

//   const categories = useMemo(
//     () =>
//       Array.from(
//         new Set(
//           Object.values(widgetRegistry)
//             .map((w) => w.category)
//             .filter(Boolean)
//         )
//       ),
//     []
//   );

//   return (
//     <div className="flex gap-2 border-b border-muted mb-2 px-4">
//       <button
//         onClick={() => setActiveCategory("all")}
//         className={cn(
//           "text-sm px-4 py-2 border-b-2 -mb-px",
//           activeCategory === "all"
//             ? "border-primary font-bold"
//             : "border-transparent text-muted-foreground hover:text-primary"
//         )}
//       >
//         All
//       </button>
//       {categories.map((cat) => (
//         <button
//           key={cat}
//           onClick={() => setActiveCategory(cat)}
//           className={cn(
//             "text-sm px-4 py-2 border-b-2 -mb-px capitalize",
//             activeCategory === cat
//               ? "border-primary font-bold"
//               : "border-transparent text-muted-foreground hover:text-primary"
//           )}
//         >
//           {cat}
//         </button>
//       ))}
//     </div>
//   )
// }