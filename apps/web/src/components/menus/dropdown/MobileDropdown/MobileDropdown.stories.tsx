import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MobileDropdown } from "./MobileDropdown";
import { Button } from "@/components/atoms";

const meta: Meta<typeof MobileDropdown> = {
  title: "Components/molecules/Dropdowns/MobileDropdown",
  component: MobileDropdown,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof MobileDropdown>;

export const Default: Story = {
  args: {
    trigger: {
      icon: "MenuIcon",
      label: "Menu",
    },
    value: "menu",
    children: (
      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          Home
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          About
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          Contact
        </Button>
      </div>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    trigger: {
      icon: "MenuIcon",
      label: "Menu",
    },
    value: "menu",
    isIconOnly: true,
    children: (
      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          Logout
        </Button>
      </div>
    ),
  },
};
