"use client";

import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Toggle, ToggleProps } from "./Toggle";

const meta: Meta = {
  title: "Components/atoms/Toggle",
  component: Toggle,
  argTypes: {
    label: { control: "text" },
    description: { control: "text" },
    error: { control: "boolean" },
    showIcons: { control: "boolean" },
    pressed: { control: "boolean" },
  },
};

export default meta;

export const Default: StoryObj = (args: ToggleProps) => <Toggle {...args}>Toggle me!</Toggle>;
Default.args = {
  label: "Enable feature",
  description: "This toggle enables or disables a specific feature.",
};

// export const WithIcons: StoryObj = (args: ToggleProps) => (
//   <Toggle {...args} showIcons={true}>
//     Toggle me!
//   </Toggle>
// )
// WithIcons.args = {
//   label: "Show/Hide Details",
//   description: "Toggle to reveal or hide additional details.",
//   showIcons: true,
// }

// export const WithError: StoryObj = (args: ToggleProps) => (
//   <Toggle {...args} error={true}>
//     Toggle me!
//   </Toggle>
// )
// WithError.args = {
//   label: "Enable Notifications",
//   description: "There seems to be an issue with enabling notifications.",
//   error: true,
// }

// export const Controlled: StoryObj<ToggleProps> = {
//   render: (args) => {
//     return <ControlledToggle {...args} />;
//   },
// };

// const ControlledToggle: React.FC<ToggleProps> = (args) => {
//   const [pressed, setPressed] = React.useState(false);
//   return (
//     <Toggle
//       {...args}
//       pressed={pressed}
//       onPressedChange={setPressed}
//     >
//       Controlled Toggle
//     </Toggle>
//   );
// };
// export const Outline: StoryObj<ToggleProps> = {
//   render: (args) => <OutlineToggle {...args} />,
//   args: {
//     label: "Enabled Feature",
//     description: "This toggle is controlled by React state.",
//   },
// };

// const OutlineToggle: React.FC<ToggleProps> = (args) => {
//   const [pressed, setPressed] = useState(false);
//   return (
//     <Toggle
//       {...args}
//       variant="outline"
//       pressed={pressed}
//       onPressedChange={setPressed}
//     >
//       Controlled Toggle
//     </Toggle>
//   );
// };
