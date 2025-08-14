import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TransitionButton } from "./TransitionButton";
import { Save, CheckCircle2 } from "lucide-react";

const meta: Meta<typeof TransitionButton> = {
  title: "Buttons/TransitionButton",
  component: TransitionButton,
  tags: ["autodocs"],
  argTypes: {
    // Non-serializable or function props -> disable controls
    icon: { control: false },
    successIcon: { control: false },
    action: { control: false },
    onSuccess: { control: false },
    onError: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof TransitionButton>;

export const Default: Story = {
  args: { children: "Save" },
  render: (args) => <TransitionButton {...args} icon={<Save />} />,
};

export const TextOnly: Story = {
  args: { children: "Text Only" },
};

export const Disabled: Story = {
  args: { children: "Disabled", disabled: true },
  render: (args) => <TransitionButton {...args} icon={<Save />} />,
};

export const SubmitType: Story = {
  args: { children: "Submit", type: "submit" },
  render: (args) => <TransitionButton {...args} icon={<Save />} />,
};

export const ControlledLoading: Story = {
  args: { children: "Saving…", isLoading: true, hideTextOnLoading: false, loadingText: "Saving…" },
  render: (args) => <TransitionButton {...args} icon={<Save />} />,
};

export const HideTextOnLoading: Story = {
  args: { children: "Save", isLoading: true, loadingText: "Saving…", hideTextOnLoading: true },
  render: (args) => <TransitionButton {...args} icon={<Save />} />,
};

export const WithSuccessIcon: Story = {
  args: {
    children: "Saved!",
    showSuccessIcon: true,
    successText: "Saved successfully",
    successDuration: 1500,
  },
  render: (args) => (
    <TransitionButton
      {...args}
      icon={<Save />}
      successIcon={<CheckCircle2 className="text-green-500" />}
    />
  ),
};

export const WithTooltip: Story = {
  args: { children: "Hidden Text", tooltip: "Click to save", hideTextOnSmallScreens: true },
  render: (args) => <TransitionButton {...args} icon={<Save />} />,
};

/** Uses internal loading+success (async action) */
export const AsyncSuccess: Story = {
  args: { children: "Save", loadingText: "Saving…", successText: "Saved!" },
  render: (args) => (
    <TransitionButton
      {...args}
      icon={<Save />}
      successIcon={<CheckCircle2 className="text-green-500" />}
      action={() => new Promise((res) => setTimeout(res, 1200))}
    />
  ),
};

/** Icon-only button (idle) */
export const IconOnly: Story = {
  args: { isIconButton: true, srLabel: "Save", tooltip: "Save" },
  render: (args) => <TransitionButton {...args} icon={<Save />} />,
};

/** Icon-only showing controlled loading */
export const IconOnlyLoading: Story = {
  args: {
    isIconButton: true,
    srLabel: "Save",
    tooltip: "Save",
    isLoading: true,
    loadingText: "Saving…",
  },
  render: (args) => <TransitionButton {...args} icon={<Save />} />,
};

/** Icon-only with internal async success flash */
export const IconOnlyAsyncSuccess: Story = {
  args: { isIconButton: true, srLabel: "Save", tooltip: "Save", loadingText: "Saving…" },
  render: (args) => (
    <TransitionButton
      {...args}
      icon={<Save />}
      successIcon={<CheckCircle2 className="text-green-500" />}
      action={() => new Promise((res) => setTimeout(res, 1000))}
    />
  ),
};
