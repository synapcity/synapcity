// // components/search/SearchResultsPanel.tsx
// "use client";

// import { Input } from "@/components/atoms/ui/input";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/atoms/ui/tabs";
// import { useState } from "react";
// import { useSearchAll } from "@/hooks/search/scoped/useSearchAll";
// import { useSearchNotes } from "@/hooks/search/scoped/useSearchNotes";
// import { useSearchTabsInNote } from "@/hooks/search/scoped/useSearchTabsInNote";
// import { useSearchWidgetsInDashboard } from "@/hooks/search/scoped/useSearchWidgetsInDashboard";
// import { useDashboardStore } from "@/stores/dashboard/dashboardStore";
// import { useParams } from "next/navigation";
// import { SearchableEntry } from "@/types/search";

// type ResultGroupProps = {
//   label: string;
//   results: SearchableEntry[];
// };

// const ResultGroup = ({ label, results }: ResultGroupProps) => (
//   <div className="space-y-2">
//     <h3 className="text-sm font-semibold text-muted-foreground">{label}</h3>
//     {results.length > 0 ? (
//       <div className="space-y-1">
//         {results.map((res) => (
//           <div key={res.id} className="p-2 rounded border bg-muted">
//             <p className="font-medium">{res.title}</p>
//             <p className="text-xs text-muted-foreground line-clamp-2">{res.content}</p>
//           </div>
//         ))}
//       </div>
//     ) : (
//       <p className="text-xs text-muted-foreground">No results</p>
//     )}
//   </div>
// );

// export function SearchResultsPanel() {
//   const [query, setQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("all");

//   const { noteId } = useParams();
//   const currentNoteId = noteId as string;

//   const currentDashboardId = useDashboardStore((s) => s.selectedDashboardId);
//   const notes = useSearchNotes(query);
//   const tabs = useSearchTabsInNote(currentNoteId, query);
//   const searchWidgetsFn = useSearchWidgetsInDashboard;
//   let widgets
//   if (currentDashboardId) {
//     widgets = searchWidgetsFn(currentDashboardId, query);
//   }
//   const everything = useSearchAll(query);

//   return (
//     <div className="space-y-4">
//       <Input
//         placeholder="Search..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         className="w-full"
//       />

//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList className="grid grid-cols-5 w-full">
//           <TabsTrigger value="all">All</TabsTrigger>
//           <TabsTrigger value="notes">Notes</TabsTrigger>
//           <TabsTrigger value="tabs">Tabs</TabsTrigger>
//           <TabsTrigger value="widgets">Widgets</TabsTrigger>
//           <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
//         </TabsList>

//         <TabsContent value="all">
//           <div className="space-y-6">
//             <ResultGroup label="Notes" results={notes} />
//             <ResultGroup label="Tabs" results={tabs} />
//             <ResultGroup label="Widgets" results={widgets as SearchableEntry[]} />
//           </div>
//         </TabsContent>

//         <TabsContent value="notes">
//           <ResultGroup label="Notes" results={notes} />
//         </TabsContent>

//         <TabsContent value="tabs">
//           <ResultGroup label="Tabs" results={tabs} />
//         </TabsContent>

//         <TabsContent value="widgets">
//           <ResultGroup label="Widgets" results={widgets as SearchableEntry[]} />
//         </TabsContent>

//         <TabsContent value="dashboards">
//           <ResultGroup
//             label="Dashboards"
//             results={everything.filter((r) => r.type === "dashboard")}
//           />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

export default function SearchResultsPanel() {
  return <div>Search Results</div>;
}
