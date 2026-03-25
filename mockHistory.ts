import type { VersionEntry, VersionAction } from "./types"

export type NoteState = {
  title: string
  content: string
  metadata?: Record<string, unknown>
}

const makeEntry = (
  id: string,
  action: VersionAction,
  daysAgo: number,
  state: NoteState,
  prev?: NoteState,
): VersionEntry<NoteState> => {
  const now = new Date()
  const timestamp = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
  return {
    id,
    userId: action === "create" ? "user_01" : "user_02",
    entityId: "note_92fa13c2",
    entityType: "note",
    action,
    entityState: state,
    previousState: prev,
    timestamp,
  }
}

export const mockVersionEntries: VersionEntry<NoteState>[] = [
  makeEntry("v1", "create", 7, {
    title: "Biology notes — draft",
    content: "The mitochondria is the powerhouse of the cell.",
    metadata: { label: "initial" },
  }),
  makeEntry(
    "v2",
    "update",
    5,
    {
      title: "Biology notes — draft",
      content: "The mitochondria is the powerhouse of the cell.\nCellular respiration occurs in mitochondria.",
      metadata: { label: "added details" },
    },
    {
      title: "Biology notes — draft",
      content: "The mitochondria is the powerhouse of the cell.",
      metadata: { label: "initial" },
    },
  ),
  makeEntry(
    "v3",
    "update",
    3,
    {
      title: "Biology notes",
      content:
        "# Biology notes\n\n- The mitochondria is the powerhouse of the cell.\n- Cellular respiration occurs in mitochondria.",
      metadata: { label: "formatted" },
    },
    {
      title: "Biology notes — draft",
      content: "The mitochondria is the powerhouse of the cell.\nCellular respiration occurs in mitochondria.",
      metadata: { label: "added details" },
    },
  ),
  makeEntry(
    "v4",
    "update",
    1,
    {
      title: "Biology notes",
      content:
        "# Biology notes\n\n- The mitochondria is the powerhouse of the cell.\n- Cellular respiration occurs in mitochondria (Smith et al., 1999).",
      metadata: { label: "citation added" },
    },
    {
      title: "Biology notes",
      content:
        "# Biology notes\n\n- The mitochondria is the powerhouse of the cell.\n- Cellular respiration occurs in mitochondria.",
      metadata: { label: "formatted" },
    },
  ),
]

export const mockHistory = mockVersionEntries
