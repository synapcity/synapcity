import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "Atoms/Label",
  component: Label,
  argTypes: {
    className: { control: "text" },
    error: { control: "boolean" },
    helperText: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    htmlFor: "email",
    children: "Email Address",
    helperText: "Please enter a valid email address.",
  },
};

export const WithIcon: Story = {
  args: {
    htmlFor: "email",
    children: "Email Address",
    icon: "Info",
    helperText: "Please enter a valid email address.",
  },
};

export const ErrorState: Story = {
  args: {
    htmlFor: "password",
    children: "Password",
    error: true,
  },
};

export const WithHelperText: Story = {
  args: {
    htmlFor: "username",
    children: "Username",
    helperText: "This will be your display name.",
  },
};

export const FullExample: Story = {
  args: {
    htmlFor: "confirmPassword",
    children: "Confirm Password",
    icon: "Info",
    helperText: "Make sure this matches your password.",
    error: true,
  },
};
