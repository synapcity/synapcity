import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TransitionButton } from "./TransitionButton";
import { Save, CheckCircle2 } from "lucide-react";

const meta: Meta<typeof TransitionButton> = {
  title: "Atoms/Buttons/TransitionButton",
  component: TransitionButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TransitionButton>;

export const Default: Story = {
  args: {
    children: "Save",
    icon: <Save />,
  },
};

export const TextOnly: Story = {
  args: {
    children: "Text Only",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    icon: <Save />,
    disabled: true,
  },
};


export const SubmitType: Story = {
  args: {
    children: "Submit",
    type: "submit",
    icon: <Save />,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    hideTextOnLoading: false,
    loadingText: "Saving...",
    icon: <Save />,
  },
};

export const HideTextOnLoading: Story = {
  args: {
    children: "Save",
    isLoading: true,
    loadingText: "Saving...",
    hideTextOnLoading: true,
    icon: <Save />,
  },
};

export const WithSuccessIcon: Story = {
  args: {
    children: "Saved!",
    icon: <Save />,
    successIcon: <CheckCircle2 className="text-green-500" />,
    showSuccessIcon: true,
    successText: "Saved successfully",
    successDuration: 1500,
  },
};

export const WithTooltip: Story = {
  args: {
    children: "Hidden Text",
    icon: <Save />,
    tooltip: "Click to save",
    hideTextOnSmallScreens: true,
  },
};

export const InteractiveSuccess: Story = {
  render: () => {
    return (
      <TransitionButton
        action={() => new Promise((res) => setTimeout(res, 10000))}
        icon={<Save />}
        loadingText="Saving..."
        successIcon={<CheckCircle2 className="text-green-500" />}
        successText="Saved successfully!"
        tooltip="Click to save"
        hideTextOnSmallScreens
      >
        Save
      </TransitionButton>
    );
  },
};
