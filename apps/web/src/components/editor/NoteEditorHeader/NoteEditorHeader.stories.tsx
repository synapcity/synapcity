import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NoteEditorHeader, NoteEditorHeaderProps } from "./NoteEditorHeader";
import { DynamicTabsWrapper } from "../../tables/Table/TableControls/DynamicTabsBar/DynamicTabsBar";
import { useState } from "react";
import { useNoteStore } from "@/stores/resources/noteStore";

const meta: Meta<NoteEditorHeaderProps> = {
  title: "Components/NoteEditorHeader",
  component: NoteEditorHeader,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;
type Story = StoryObj<NoteEditorHeaderProps>;

const baseArgs: NoteEditorHeaderProps = {
  noteId: "note-123",
  onTitleSave: (savedTitle) => console.log("Title saved", savedTitle),
  tags: [
    { label: "Research", value: "research", color: "#6366f1" },
    { label: "Todo", value: "todo", color: "#f59e42" },
    { label: "Idea", value: "idea", color: "#10b981" },
  ],
  onTagClick: (val) => console.log("Tag clicked", val),
  onTagRemove: (val) => useNoteStore.getState().removeTag("note-123", val),
  createdAt: new Date(2025, 6, 15),
  updatedAt: new Date(2025, 6, 19),
  wordCount: 1207,
};
function withTabsList(status?: "idle" | "saving" | "syncing" | "error") {
  return (args: NoteEditorHeaderProps) => {
    const noteId = args.noteId || "note-123";
    const store = useNoteStore.getState();

    if (status === "saving") {
      store.startStatus("saving", noteId);
    } else if (status === "syncing") {
      store.startStatus("syncing", noteId);
    } else if (status === "error") {
      store.failStatus("saving", new Error("Failed to save!"), noteId);
    } else {
      store.resetStatus(noteId);
    }

    const [currentTab, setCurrentTab] = useState("edit");
    return (
      <DynamicTabsWrapper value={currentTab} onChange={setCurrentTab}>
        <NoteEditorHeader {...args} />
      </DynamicTabsWrapper>
    );
  };
}

withTabsList.displayName = "withTabsList";

export const Default: Story = {
  args: { ...baseArgs },
  render: withTabsList("idle"),
};

export const SavingState: Story = {
  args: { ...baseArgs },
  render: withTabsList("saving"),
};

export const SyncingState: Story = {
  args: { ...baseArgs },
  render: withTabsList("syncing"),
};

export const ErrorState: Story = {
  args: { ...baseArgs },
  render: withTabsList("error"),
};

export const NoTags: Story = {
  args: { ...baseArgs, tags: [] },
  render: withTabsList(),
};

export const LongTitle: Story = {
  args: {
    ...baseArgs,
  },
  render: () => {
    const store = useNoteStore.getState();
    store.updateTitle(
      "note-123",
      "This is an extremely long note title to test wrapping and overflow behavior in the header component which might break layouts"
    );
    return <>{withTabsList()}</>;
  },
};

export const MinimalMetadata: Story = {
  args: {
    ...baseArgs,
    createdAt: undefined,
    updatedAt: undefined,
    wordCount: undefined,
  },
  render: withTabsList(),
};
