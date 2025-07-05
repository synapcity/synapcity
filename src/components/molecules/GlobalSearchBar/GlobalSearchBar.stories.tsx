import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { GlobalSearchBar } from "./GlobalSearchBar"
import { FileTextIcon, TagIcon, UserIcon } from "lucide-react"
import type { SearchItem } from "@/types/search"

const meta: Meta<typeof GlobalSearchBar> = {
  title: "Molecules/GlobalSearchBar",
  component: GlobalSearchBar,
  tags: ["autodocs"],
  argTypes: {
    items: { control: false },
  },
}

export default meta

type Story = StoryObj<typeof GlobalSearchBar>

// 🔍 Dummy data for the stories
const mockItems: SearchItem[] = [
  {
    id: "note-1",
    label: "Meeting Notes",
    type: "note",
    icon: <FileTextIcon className="size-4" />,
    onSelect: () => alert("Selected: Meeting Notes"),
  },
  {
    id: "note-2",
    label: "Project Plan",
    type: "note",
    icon: <FileTextIcon className="size-4" />,
    onSelect: () => alert("Selected: Project Plan"),
  },
  {
    id: "tag-1",
    label: "Work",
    type: "tag",
    icon: <TagIcon className="size-4" />,
    onSelect: () => alert("Selected: Tag - Work"),
  },
  {
    id: "tag-2",
    label: "Personal",
    type: "tag",
    icon: <TagIcon className="size-4" />,
    onSelect: () => alert("Selected: Tag - Personal"),
  },
  {
    id: "user-1",
    label: "Alice",
    type: "user",
    icon: <UserIcon className="size-4" />,
    onSelect: () => alert("Selected: Alice"),
  },
  {
    id: "user-2",
    label: "Bob",
    type: "user",
    icon: <UserIcon className="size-4" />,
    onSelect: () => alert("Selected: Bob"),
  },
]

export const Default: Story = {
  args: {
    items: mockItems,
    placeholder: "Search notes, tags, users...",
  },
}

export const EmptyState: Story = {
  args: {
    items: [], // triggers "No results found."
    placeholder: "Try searching nothing",
  },
}

export const FilteredNotesOnly: Story = {
  args: {
    items: mockItems.filter((item) => item.type === "note"),
    placeholder: "Search notes...",
  },
}

export const FilteredTagsOnly: Story = {
  args: {
    items: mockItems.filter((item) => item.type === "tag"),
    placeholder: "Search tags...",
  },
}

export const FilteredUsersOnly: Story = {
  args: {
    items: mockItems.filter((item) => item.type === "user"),
    placeholder: "Search users...",
  },
}
