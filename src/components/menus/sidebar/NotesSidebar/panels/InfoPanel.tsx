"use client";

import { useNoteStore } from "@/stores/resources/noteStore";
import { useParams } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/atoms/ui/badge";
import { Skeleton } from "@/components/atoms/ui/skeleton";
import { SearchableMultiSelect } from "@/components/search";
import { Separator } from "@/components/atoms/ui/separator";
import { useShallow } from "zustand/shallow";
import { EditableText } from "@/components/molecules/EditableText";
import { useNoteViewStore } from "@/stores";

export default function InfoPanel() {
  const { noteId } = useParams();
  const id = (Array.isArray(noteId) ? noteId.join() : noteId) ?? "global"
  const note = useNoteStore(useShallow(s => s.items[id]));
  const update = useNoteStore(s => s.updateResource)
  const startStatus = useNoteStore(s => s.startStatus)
  const finishStatus = useNoteStore(s => s.finishStatus)
  const activeViewId = useNoteViewStore(useShallow(s => s.activeByScope[id]))
  const activeView = useNoteViewStore(useShallow(s => s.items[activeViewId!]))
  const updateView = useNoteViewStore(s => s.updateResource)

  if (!note) return <Skeleton className="p-6" />;

  const created = new Date(note.createdAt);
  const updated = new Date(note.updatedAt);

  return (
    <div className="flex flex-col justify-between gap-6 p-6 text-sm text-[var(--muted-foreground)] h-5/6">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-4">
          <section className="flex flex-col justify-between space-y-4">
            <h2 className="text-xs uppercase tracking-wide text-[var(--muted-foreground) mb-1">Title</h2>
            <EditableText
              value={note.title}
              onEdit={() => {
                startStatus("editing", note.id)
              }}
              onSave={(newTitle: string) => {
                update(note.id, { title: newTitle })
                finishStatus("editing", note.id)
              }}
              as="h4"
            />
          </section>
          {activeView && (
            <section className="flex flex-col justify-between space-y-4">
              <h2 className="text-xs uppercase tracking-wide text-[var(--muted-foreground) mb-1">Current Tab</h2>
              <EditableText
                value={activeView?.label}
                onEdit={() => {
                  startStatus("editing", note.id)
                }}
                onSave={(newLabel: string) => {
                  updateView(activeView.id, { label: newLabel })
                  finishStatus("editing", note.id)
                }}
                as="p"
              />
            </section>
          )}

          <Separator
            orientation="horizontal"
            className="my-2 data-[orientation=horizontal]:w-full"
          />
        </div>
        <section className="flex flex-col justify-between space-y-4">
        </section>
        {
          <section className="flex flex-col gap-2">
            <h2 className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] mb-1">Tags</h2>
            <SearchableMultiSelect renderTagsBelow value={note.tags ?? []} onCreateOption={(tag: string) => update(note.id, { tags: [...(note.tags || []), tag] })} />
            <div className="flex flex-wrap gap-2">
              {(note.tags || [])?.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs px-2 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
          </section>
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
        <h2 className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] mb-1">Note ID</h2>
        <p className="text-xs font-mono text-[var(--muted)] break-all">{note.id}</p>
      </section>
    </div>
  );
}