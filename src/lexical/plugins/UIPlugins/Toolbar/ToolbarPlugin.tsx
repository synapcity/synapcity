"use client";

import { Button } from "@/components";
import UndoRedoTools from "./UndoRedoTools";
import ListTools from "./ListTools";
import TextFormat from "./TextFormat";
import AlignmentTools from "./AlignmentTools";
import BlockStyleTools from "./BlockStyleTools";
import clsx from "clsx";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback } from "react";
// import { useNotesStore, useTabDirtyStatus, useTabStore } from "@/stores/editor";
// import { useSelectedNoteUI } from "@/stores/UIStore/selectionSlice";
// import { getNotePreview } from "@/utils/editor";
// import { useStatusDisplay } from "@/stores/hooks";

export default function Toolbar() {
  const [editor] = useLexicalComposerContext();
  // const { noteId } = useSelectedNoteUI()
  // const updateTabContent = useTabStore((s) => s.updateTab);
  // const getTabsForNote = useTabStore((s) => s.getTabsForNote);
  // const tabs = getTabsForNote(noteId ?? "");
  // const activeTab = useTabStore(state => state.getActiveTab)(noteId!)
  // const tabId = activeTab?.id
  // const { clearDirty } = useTabDirtyStatus(tabId ?? "");
  // const selectTab = useTabStore((state) => state.setActiveTab)
  // const defaultTab = useTabStore((state) => state.getDefaultTab)(noteId!)
  // const getNoteById = useNotesStore((state) => state.getNoteById)
  // const currentNote = noteId && getNoteById(noteId)
  // const isSaving = useStatusDisplay("note", noteId!).status.isSaving

  // if (!activeTab) {
  //   const currentTab = tabId ?? defaultTab ?? null
  //   if (noteId) {
  //     selectTab(noteId, typeof currentTab === "string" ? currentTab : currentTab?.id)
  //   }
  // }

  // const { isSaving, startSaving, finishSaving, failSaving, resetStatus } = useUIStatus()


  // const handleSave = useCallback(async () => {
  // if (!tabId) return;

  // startSaving();

  // editor.getEditorState().read(() => {
  // const json = editor.getEditorState().toJSON();
  // const content = JSON.stringify(json);
  // const preview = getNotePreview(tabs, "default")
  // const updatedAt = new Date().toISOString();
  //  try {
  // startSaving()
  // if (!noteId) throw new Error("No note found for saving");
  // updateTabContent(noteId, tabId, { content });
  // localStorage.setItem(`note:${noteId}:${tabId}`, JSON.stringify({ ...activeTab, content, updatedAt }));

  // localStorage.setItem(`note:${noteId}`, JSON.stringify({ ...currentNote, content, preview, updatedAt }));
  // // finishSaving();
  // } catch (error) {
  //   // failSaving(error as Error);
  //   console.error("Manual save error:", error);
  //   return;
  // } finally {
  //   clearDirty();
  //   // resetStatus();
  // }
  //   });
  // }, [tabId, editor, tabs, noteId, updateTabContent, activeTab, clearDirty, currentNote]);

  // if (!currentNote || !tabId) return null;

  return (
    <div
      className={clsx(
        "fixed left-0 bottom-0 justify-evenly md:relative w-full flex gap-4 p-2 border-t md:border-t-0 md:border-r shadow-lg",
        "overflow-x-auto overscroll-contain h-12 no-scrollbar max-w-screen shrink-0 group opacity-50 group-hover:opacity-100"
      )}
    >
      <ToolbarSection>
        <UndoRedoTools />
      </ToolbarSection>

      <ToolbarDivider />

      <ToolbarSection>
        <TextFormat />
      </ToolbarSection>

      <ToolbarDivider />

      <ToolbarSection>
        <ListTools />
      </ToolbarSection>

      <ToolbarDivider />

      <ToolbarSection>
        <AlignmentTools />
      </ToolbarSection>

      <ToolbarDivider />

      <ToolbarSection>
        <BlockStyleTools />
      </ToolbarSection>

      <ToolbarDivider />

      <ToolbarSection>
        <></>
        {/* <Button
          variant="primary"
          onClick={handleSave}
          disabled={isSaving}
          className="w-full"
        >
          {isSaving ? "Saving..." : "Save"}
        </Button> */}
      </ToolbarSection>
    </div>
  );
}

const ToolbarSection = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-wrap justify-center items-center gap-2">{children}</div>
);

const ToolbarDivider = () => <div className="w-full bg-gray-300 md:w-px md:h-full" />;
