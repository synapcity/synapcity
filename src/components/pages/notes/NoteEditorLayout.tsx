'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import NoteEditor from '@/components/pages/NoteEditor/NoteEditor';
import { useNoteViewStore } from '@/stores/resources/noteViewStore/useNoteViewStore';
import { TabsContent } from '@/components/atoms/ui/tabs';
import { Loading } from '@/components/loading';
import { useNoteActiveTab, useNoteViews } from '@/hooks/notes/useNoteViews';
import { NoteEditorHeader } from '@/components/editor';
import { DynamicTabsWrapper } from '@/components/tables/Table/TableControls/DynamicTabsBar';
import { useNoteStore } from '@/stores';
import { NoteResource } from '@/types';
import { StatusField } from '@/types/ui';
import { useActiveNoteView } from '@/hooks/notes/useActiveNoteView/useActiveNoteView';

export default function NotePage() {
  const { noteId: raw } = useParams();
  const noteId = Array.isArray(raw) ? raw[0] : raw;
  const hasHydrated = useNoteViewStore((s) => s.hasHydrated);
  const setActive = useNoteViewStore((s) => s.setActive);
  const updateView = useNoteViewStore(s => s.updateResource)
  const updateResource = useNoteStore(s => s.updateResource)
  const finishStatus = useNoteStore(s => s.finishStatus)
  const startStatus = useNoteStore(s => s.startStatus)
  const failStatus = useNoteStore(s => s.failStatus)
  const { activeNote } = useActiveNoteView()
  const { activeTabId, activeTab } = useNoteActiveTab(noteId!);
  const noteViews = useNoteViews(noteId!);
  const note = activeNote

  if (!hasHydrated) return <Loading fullScreen size={10} />;
  if (!noteId) return null;

  const noteTags = note?.tags?.map((tag: string) => ({
    label: tag,
    value: tag,
  }))

  const handleUpdate = async (updates: Partial<NoteResource>, status: StatusField) => {
    try {
      await updateResource(noteId, updates)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      failStatus(status, err, "note", noteId)
    } finally {
      finishStatus(status, "note", noteId)
    }
  }
  if (!hasHydrated) return null;
  console.log("views", noteViews)
  return (
    <div className="flex flex-col size-full">
      <DynamicTabsWrapper
        value={activeTabId}
        onChange={(value: string) => setActive(noteId, value)}
        className="size-full"
      >
        <NoteEditorHeader
          noteId={noteId}
          title={note?.title ?? "Untitled"}
          onTitleSave={(newTitle: string) => {
            startStatus("saving", "note", noteId)
            handleUpdate({ title: newTitle }, "saving"
            )
          }}
          tags={noteTags ?? []}
          onTagClick={(tag: string) => console.log("clicked tag", tag)}
          onTagRemove={(tag: string) => {
            startStatus("deleting", "note", noteId)
            handleUpdate({ tags: (note?.tags || []).filter((t: string) => t !== tag) }, "deleting")
          }}
          createdAt={activeTab?.createdAt ?? note?.createdAt}
          updatedAt={activeTab?.updatedAt ?? note?.updatedAt}
        />
        <main className="flex-1 size-full flex flex-col">
          {noteViews.map((view) => (
            <TabsContent key={view.id} value={view.id} className="flex flex-col">
              <div className="flex-1 flex-col flex border">
                {view.type === 'editor' ? (
                  <NoteEditor noteId={noteId} viewId={view.id} content={view.editorState} />
                ) : view.type === 'code' ? (
                  <div>Code</div>
                ) : view.type === 'image' ? (
                  <div>Image</div>
                ) : (
                  <div>Custom</div>
                )}
              </div>
            </TabsContent>
          ))}
        </main>
      </DynamicTabsWrapper>
    </div>
  );
}
