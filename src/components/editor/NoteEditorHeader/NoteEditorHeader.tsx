"use client"

import {
  FileTextIcon,
  CalendarIcon,
  ClockIcon,
} from 'lucide-react';
import { DynamicTabsBar } from '@/components/tables/Table/TableControls/DynamicTabsBar/DynamicTabsBar';
import { TagPills } from '@/components/tables/pills/TagPills';
import { useNoteViews } from '@/hooks/notes';
import { useNoteStore, useNoteViewStore } from '@/stores';
import { EditableText } from '@/components/molecules/EditableText/EditableText';
import { StatusWrapper } from '@/components/molecules/StatusWrapper/StatusWrapper';
import { useUpdateNote } from '@/hooks/notes/useUpdateNote/useUpdateNote';
import { CombinedEditor } from '@/schemas';

export interface NoteEditorHeaderProps {
  noteId: string;
  onTitleSave?: (newTitle: string) => void;
  tags: { label: string; value: string; color?: string }[];
  onTagClick?: (value: string) => void;
  onTagRemove?: (value: string) => void;
  createdAt?: string;
  updatedAt?: string;
  wordCount?: number;
}

export function NoteEditorHeader({
  noteId,
  onTagRemove,
  onTagClick,
  wordCount,
}: NoteEditorHeaderProps) {
  const getNotes = useNoteStore(s => s.getResourceById)
  const note = getNotes(noteId)
  const noteViews = useNoteViews(noteId!)
  const {
    editNote,
    updateNote
  } = useUpdateNote(noteId);
  const tabOptions = noteViews.map((view: CombinedEditor) => {
    return {
      label: view.label,
      value: view.id
    }
  })

  const formatDate = (date: Date) =>
    date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  if (!note) return;


  return (
    <div className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex items-center justify-between pr-4">
        <StatusWrapper id={noteId}>
          <EditableText
            value={note.title}
            onSave={(value) => updateNote({ title: value }, "saving")}
            onEdit={editNote}
            as="h3"
          />
        </StatusWrapper>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 gap-3 pb-3 text-xs text-muted-foreground">
        <div className="flex flex-wrap items-center gap-4">
          {note.createdAt && <span className="flex items-center gap-1"><CalendarIcon className="w-4 h-4" /> {formatDate(new Date(note.createdAt))}</span>}
          {note.updatedAt && <span className="flex items-center gap-1"><ClockIcon className="w-4 h-4" /> {formatDate(new Date(note.updatedAt))}</span>}
          {wordCount != null && <span className="flex items-center gap-1"><FileTextIcon className="w-4 h-4" /> {wordCount} words</span>}
        </div>
        <TagPills tags={(note.tags || []).map((t) => ({ label: t, value: t }))} onClick={onTagClick} onRemove={onTagRemove} />
      </div>

      <div className="px-4 pb-3">
        <DynamicTabsBar
          tabs={tabOptions}
          onAdd={() => useNoteViewStore.getState().addView(noteId, "editor")}
        />
      </div>
    </div>

  );
}