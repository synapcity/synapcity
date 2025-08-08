// "use client";

// import { useNotesStore } from "@/stores";
// import { useParams } from "next/navigation";
// import { formatDistanceToNow } from "date-fns";
// // import { Badge } from "@/components/atoms/ui/badge";
// import { Skeleton } from "@/components/atoms/ui/skeleton";
// // import { NoteTagsEditor } from "@/components/NoteTagsEditor";
// import { Separator } from "@/components/atoms/ui/separator";

// export default function InfoPanel() {
//   const { noteId } = useParams();
//   const note = useNotesStore((s) => s.getNoteById(noteId as string));
//   const update = useNotesStore(state => state.updateNote)

//   if (!note) return <Skeleton className="p-6" />;

//   const created = new Date(note.createdAt);
//   const updated = new Date(note.updatedAt);

//   return (
//     <div className="flex flex-col justify-between gap-6 p-6 text-sm text-[var(--muted-foreground)] h-5/6">
//       <div className="flex flex-col space-y-8">
//         <div className="flex justify-between items-center">
//           <section className="flex flex-col justify-between space-y-4">
//             <h2 className="text-xs uppercase tracking-wide text-[var(--muted-foreground) mb-1">Title</h2>
//             <p className="text-base font-medium text-[var(--foreground)]">{note.title}</p>
//             <div className="flex flex-wrap gap-2">
//               {note.tags.map((tag) => (
//                 // <Badge key={tag} variant="outline" className="text-xs px-2 py-1">
//                   {tag}
//                 // </Badge>
//               ))}
//             </div>
//           </section>

//           <section>
//             <h2 className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] mb-1">Timestamps</h2>
//             <div className="flex flex-col gap-1">
//               <div>
//                 <span className="font-medium text-[var(--foreground)]">Created: </span>
//                 {formatDistanceToNow(created, { addSuffix: true })}
//               </div>
//               <div>
//                 <span className="font-medium text-[var(--foreground)]">Updated: </span>
//                 {formatDistanceToNow(updated, { addSuffix: true })}
//               </div>
//             </div>
//           </section>
//           <Separator
//             orientation="vertical"
//             className="mr-2 data-[orientation=vertical]:h-4"
//           />
//         </div>
//         {
//           <section className="flex flex-col gap-2">
//             <h2 className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] mb-1">Tags</h2>
//             <NoteTagsEditor tags={note.tags} onChange={(tags) => update(note.id, { tags })} />
//           </section>
//         }
//       </div>

//       <section>
//         <h2 className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] mb-1">Note ID</h2>
//         <p className="text-xs font-mono text-[var(--muted)] break-all">{note.id}</p>
//       </section>
//     </div>
//   );
// }
"use client";

import { useNoteStore } from "@/stores/resources/noteStore";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/atoms/ui/badge";
import { Skeleton } from "@/components/atoms/ui/skeleton";
import { SearchableMultiSelect } from "@/components/search";
import { Separator } from "@/components/atoms/ui/separator";
import { useShallow } from "zustand/shallow";
import { EditableText } from "@/components/molecules/EditableText";
import { useDashboardStore } from "@/stores";
import { useMetadata } from "@/providers";

export default function InfoPanel() {
  const { id } = useMetadata()
  const dashboard = useDashboardStore(useShallow(s => s.items[id!]))
  const update = useDashboardStore(s => s.updateResource)
  const startStatus = useDashboardStore(s => s.startStatus)
  const finishStatus = useDashboardStore(s => s.finishStatus)

  if (!dashboard) return <Skeleton className="p-6" />;

  const created = new Date(dashboard.createdAt);
  const updated = new Date(dashboard.updatedAt);

  return (
    <div className="flex flex-col justify-between gap-6 p-6 text-sm text-[var(--muted-foreground)] h-5/6">
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between items-center">
          <section className="flex flex-col justify-between space-y-4">
            <h2 className="text-xs uppercase tracking-wide text-[var(--muted-foreground) mb-1">Title</h2>
            <EditableText
              value={dashboard.name}
              onEdit={() => {
                startStatus("editing", dashboard.id)
              }}
              onSave={(newName: string) => {
                update(dashboard.id, { name: newName })
                finishStatus("editing", dashboard.id)
              }}
              as="p"
            />
            {/* <div className="flex flex-wrap gap-2">
              {(note.tags || [])?.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs px-2 py-1">
                  {tag}
                </Badge>
              ))}
            </div> */}
          </section>

          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </div>
        {
          // <section className="flex flex-col gap-2">
          // {/* <h2 className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] mb-1">Tags</h2> */ }
          // {/* <SearchableMultiSelect renderTagsBelow value={note.tags ?? []} onCreateOption={(tag: string) => update(note.id, { tags: [...(note.tags || []), tag] })} /> */}
          // </section>
        }
        <section>
          <h2 className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] mb-1">Timestamps</h2>
          <div className="flex flex-col gap-1">
            <div>
              <span className="font-medium text-[var(--foreground)]">Created: </span>
              {formatDistanceToNow(created, { addSuffix: true })}
            </div>
            <div>
              <span className="font-medium text-[var(--foreground)]">Updated: </span>
              {formatDistanceToNow(updated, { addSuffix: true })}
            </div>
          </div>
        </section>
      </div>


      <section>
        <h2 className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] mb-1">Dashboard ID</h2>
        <p className="text-xs font-mono text-[var(--muted)] break-all">{dashboard.id}</p>
      </section>
    </div>
  );
}