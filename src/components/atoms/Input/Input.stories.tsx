import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  argTypes: {
    className: { control: "text" },
    error: { control: "boolean" },
    success: { control: "boolean" },
    helperText: { control: "text" },
    isPassword: { control: "boolean" },
    onPasswordToggle: { action: "toggled password visibility" },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter your text",
    helperText: "Some helpful text",
  },
};

export const WithIcon: Story = {
  args: {
    placeholder: "Search",
    icon: "Search"
  },
};

export const ErrorState: Story = {
  args: {
    placeholder: "Password",
    error: true,
    helperText: "This field is required.",
    errorText: ["Password is too short", "Password must contain at least one number"],
  },
};

export const SuccessState: Story = {
  args: {
    placeholder: "Email",
    success: true,
    helperText: "Valid email address.",
  },
};

export const PasswordField: Story = {
  args: {
    type: "password",
    placeholder: "Password",
    isPassword: true,
    helperText: "Your password must be at least 8 characters.",
  },
};
