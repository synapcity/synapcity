import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Dropdown } from "./Dropdown";

const meta: Meta = {
  title: "Components/molecules/Dropdowns/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Dropdown
      trigger={{ label: "Open menu", icon: "ChevronDown", variant: "outline" }}
      items={[
        {
          label: "Edit",
          icon: "Pencil",
          onSelect: () => alert("Edit clicked"),
        },
        {
          label: "Duplicate",
          icon: "Copy",
          onSelect: () => alert("Duplicate clicked"),
        },
        "separator",
        {
          label: "Delete",
          icon: "Trash",
          onSelect: () => alert("Deleted"),
          destructive: true,
        },
      ]}
    />
  ),
};
