import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { CommandMenu } from "./CommandMenu";
import { BookOpen, Plus, Settings } from "lucide-react";

const meta: Meta<typeof CommandMenu> = {
  title: "Molecules/CommandMenu",
  component: CommandMenu,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof CommandMenu>;

const sampleGroups = [
  {
    heading: "General",
    items: [
      {
        label: "New Note",
        icon: <Plus />,
        shortcut: "N",
        onSelect: () => alert("Creating new note..."),
      },
      {
        label: "Open Library",
        icon: <BookOpen />,
        shortcut: "L",
        onSelect: () => alert("Opening library..."),
      },
    ],
  },
  {
    heading: "Settings",
    items: [
      {
        label: "Preferences",
        icon: <Settings />,
        shortcut: "⌘ ,",
        onSelect: () => alert("Opening preferences..."),
      },
    ],
  },
];

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <CommandMenu
        open={open}
        onOpenChange={setOpen}
        title="Storybook Command Palette"
        description="This is an example using CMDK"
        groups={sampleGroups}
      />
    );
  },
};
