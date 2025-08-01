'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import NoteEditor from '@/components/pages/NoteEditor/NoteEditor';
import { useNoteViewStore } from '@/stores/resources/noteViewStore/useNoteViewStore';
import { TabsContent } from '@/components/atoms/ui/tabs';
import { Loading } from '@/components/loading';
import { useNoteTabs } from '@/hooks/notes/useNoteViews';
import { NoteEditorHeader } from '@/components/editor';
import { DynamicTabsWrapper } from '@/components/tables/Table/TableControls/DynamicTabsBar';
import { useNoteStore } from '@/stores';
import { NoteResource } from '@/types';
import { StatusField } from '@/types/ui';
import { useActiveNoteView } from '@/hooks/notes/useActiveNoteView/useActiveNoteView';
import { ViewResource } from '@/schemas';
import { fallbackEditorState } from '@/lexical/constants';

export default function NotePage() {
  const { noteId: raw } = useParams();
  const noteId = Array.isArray(raw) ? raw[0] : raw;
  const hasHydrated = useNoteViewStore((s) => s.hasHydrated);
  const updateResource = useNoteStore(s => s.updateResource)
  const finishStatus = useNoteStore(s => s.finishStatus)
  const startStatus = useNoteStore(s => s.startStatus)
  const failStatus = useNoteStore(s => s.failStatus)
  const { activeNote } = useActiveNoteView()
  const {
    views, activeTabId, activeTab, setActiveTab
  } = useNoteTabs(noteId!);
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
      failStatus(status, err, noteId)
    } finally {
      finishStatus(status, noteId)
    }
  }
  if (!hasHydrated || !noteId || !activeTabId) return null;
  return (
    <div className="flex flex-col size-full">
      <DynamicTabsWrapper
        value={activeTabId}
        onChange={(value: string) => setActiveTab(value)}
        className="size-full"
      >
        <NoteEditorHeader
          noteId={noteId}
          onTitleSave={(newTitle: string) => {
            startStatus("saving", noteId)
            handleUpdate({ title: newTitle }, "saving"
            )
          }}
          tags={noteTags ?? []}
          onTagClick={(tag: string) => console.log("clicked tag", tag)}
          onTagRemove={(tag: string) => {
            startStatus("deleting", noteId)
            handleUpdate({ tags: (note?.tags || []).filter((t: string) => t !== tag) }, "deleting")
          }}
          createdAt={activeTab?.createdAt ?? note?.createdAt}
          updatedAt={activeTab?.updatedAt ?? note?.updatedAt}
        />
        <main className="flex-1 size-full flex flex-col">
          {Object.values(views as ViewResource[]).map((view) => (
            <TabsContent key={view.id} value={view.id} className="flex flex-col">
              <div className="flex-1 flex-col flex border">
                {view.type === 'editor' ? (
                  <NoteEditor noteId={noteId} viewId={view.id} content={view.editorState ?? fallbackEditorState} />
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
