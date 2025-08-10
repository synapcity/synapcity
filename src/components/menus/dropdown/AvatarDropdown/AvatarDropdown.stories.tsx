import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AvatarDropdown } from "./AvatarDropdown";

const meta: Meta<typeof AvatarDropdown> = {
  title: "Components/molecules/Dropdowns/AvatarDropdown",
  component: AvatarDropdown,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AvatarDropdown>;

export const Basic: Story = {
  args: {
    avatarUrl: "https://i.pravatar.cc/150?img=23",
    username: "JD",
  },
};
