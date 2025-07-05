import * as React from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { z } from "zod";
import { FormWrapper, FormWrapperWithRender } from "./FormWrapper";
import { Input } from "@/components/atoms/Input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/atoms/ui/form";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

const meta: Meta<typeof FormWrapper> = {
  title: "Molecules/FormWrapper",
  component: FormWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

const defaultValues: FormData = {
  email: "",
  password: "",
};

const RenderFields = () => (
  <>
    <FormField
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="you@example.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

export const Default: StoryObj<typeof FormWrapper> = {
  render: () => (
    <FormWrapper<FormData>
      schema={schema}
      defaultValues={defaultValues}
      onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
      showSubmitButton
    >
      <RenderFields />
    </FormWrapper>
  ),
};

export const WithCustomLabel: StoryObj<typeof FormWrapper> = {
  render: () => (
    <FormWrapper<FormData>
      schema={schema}
      defaultValues={defaultValues}
      onSubmit={(data) => console.log(data)}
      showSubmitButton
      submitLabel="Sign In"
    >
      <RenderFields />
    </FormWrapper>
  ),
};

export const LoadingState: StoryObj<typeof FormWrapper> = {
  render: () => (
    <FormWrapper<FormData>
      schema={schema}
      defaultValues={defaultValues}
      onSubmit={(data) => new Promise((res) => setTimeout(() => res(console.log(data)), 2000))}
      showSubmitButton
      loading
    >
      <RenderFields />
    </FormWrapper>
  ),
};

export const WithRenderProp: StoryObj<typeof FormWrapperWithRender> = {
  render: () => (
    <FormWrapperWithRender<FormData>
      schema={schema}
      defaultValues={defaultValues}
      onSubmit={(data) => alert(JSON.stringify(data))}
      showSubmitButton
      render={() => <RenderFields />}
    />
  ),
};
