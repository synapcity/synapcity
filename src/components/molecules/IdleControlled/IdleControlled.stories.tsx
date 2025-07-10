import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IdleControlled } from "./IdleControlled";

const meta: Meta<typeof IdleControlled> = {
  component: IdleControlled,
  title: "Components/Interaction/IdleControlled",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof IdleControlled>;

export const Default: Story = {
  args: {
    id: "demo-bar",
    stateKey: "isCollapsed",
    delay: 5000,
    enabled: true,
    hoverOverlay: true,
    className: "fixed top-0 left-0 right-0 h-12 bg-gray-900 text-white flex items-center justify-center shadow-md z-50",
    children: "IdleControlled Header (Auto-Hides)",
  },
};

export const CustomAnimation: Story = {
  args: {
    id: "animated-bar",
    stateKey: "isHidden",
    delay: 3000,
    hoverOverlay: true,
    animation: {
      initial: { opacity: 1, y: 0 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    className: "fixed top-0 left-0 right-0 h-10 bg-accent text-white flex items-center justify-center shadow z-50",
    children: "Animated Auto-Hiding Bar",
  },
};