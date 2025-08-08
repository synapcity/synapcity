import React from "react";
import {
  render,
  screen,
  waitFor,
  act as rtlAct,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { z } from "zod";
import {
  FormWrapperWithRender,
  FormWrapper,
} from "./FormWrapper";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/atoms/ui/form";
import { Input } from "@/components/atoms";
import { UseFormReturn } from "react-hook-form";

const schema = z.object({
  email: z.string().email("Invalid email"),
});

beforeAll(() => {
  const originalError = console.error;
  console.error = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("act(...)")) return;
    originalError(...args);
  };
});

describe("FormWrapperWithRender", () => {
  it("renders and submits correctly", async () => {
    const onSubmit = jest.fn();
    await rtlAct(async () => {
      render(
        <FormWrapperWithRender
          schema={schema}
          defaultValues={{ email: "" }}
          onSubmit={onSubmit}
          showSubmitButton
          render={(methods) => (
            <FormField
              name="email"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Description</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        />
      );
    });

    const user = userEvent.setup();
    await user.type(screen.getByRole("textbox"), "user@example.com");
    await user.click(screen.getByRole("button"));

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith(
        { email: "user@example.com" },
        expect.anything()
      )
    );
  });

  it("calls onError when invalid", async () => {
    const onError = jest.fn();

    await rtlAct(async () => {
      render(
        <FormWrapperWithRender
          schema={schema}
          defaultValues={{ email: "" }}
          onSubmit={() => { }}
          onError={onError}
          showSubmitButton
          render={(methods) => (
            <FormField
              name="email"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        />
      );
    });

    const user = userEvent.setup();
    await user.type(screen.getByRole("textbox"), "invalid");
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });

  it("sets methodsRef correctly", async () => {
    const ref = React.createRef<UseFormReturn<{ email: string }> | null>();

    await rtlAct(async () => {
      render(
        <FormWrapperWithRender
          schema={schema}
          defaultValues={{ email: "" }}
          onSubmit={() => { }}
          methodsRef={ref}
          render={() => <div />}
        />
      );
    });

    expect(ref.current?.register).toBeDefined();
  });

  it("shows loading button state", async () => {
    await rtlAct(async () => {
      render(
        <FormWrapperWithRender
          schema={schema}
          defaultValues={{ email: "" }}
          onSubmit={() => { }}
          showSubmitButton
          loading
          submitLabel="Save"
          render={() => <div />}
        />
      );
    });

    expect(screen.getByRole("button")).toHaveTextContent("Submitting...");
  });

  it("initializes without schema", async () => {
    const onSubmit = jest.fn();

    await rtlAct(async () => {
      render(
        <FormWrapperWithRender<{ email: string }>
          defaultValues={{ email: "" }}
          onSubmit={onSubmit}
          render={() => (
            <>
              <input type="email" name="email" />
              <button type="submit">Submit</button>
            </>
          )}
        />
      );
    });

    await userEvent.click(screen.getByRole("button"));
  });
});

describe("FormWrapper (static children)", () => {
  it("renders children and handles schema-less submit", async () => {
    const onSubmit = jest.fn();

    await rtlAct(async () => {
      render(
        <FormWrapper<{ email: string }>
          defaultValues={{ email: "" }}
          onSubmit={onSubmit}
          showSubmitButton
        >
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormWrapper>
      );
    });

    const user = userEvent.setup();
    await user.type(screen.getByRole("textbox"), "test@example.com");
    await user.click(screen.getByRole("button"));

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ email: "test@example.com" }),
        expect.anything()
      )
    );
  });

  it("initializes form with schema resolver", async () => {
    const onSubmit = jest.fn();

    await rtlAct(async () => {
      render(
        <FormWrapper
          schema={schema}
          defaultValues={{ email: "test@example.com" }}
          onSubmit={onSubmit}
          showSubmitButton
        >
          <input name="email" />
        </FormWrapper>
      );
    });

    await userEvent.click(screen.getByRole("button"));
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ email: "test@example.com" }),
        expect.anything()
      )
    );
  });

  it("initializes without schema", async () => {
    const onSubmit = jest.fn();

    await rtlAct(async () => {
      render(
        <FormWrapper<{ email: string }>
          defaultValues={{ email: "test@example.com" }}
          onSubmit={onSubmit}
          showSubmitButton
        >
          <input name="email" />
        </FormWrapper>
      );
    });

    await userEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it("handles missing methodsRef without crashing", async () => {
    const onSubmit = jest.fn();

    await rtlAct(async () => {
      render(
        <FormWrapper<{ email: string }>
          onSubmit={onSubmit}
          defaultValues={{ email: "" }}
        >
          <input name="email" />
        </FormWrapper>
      );
    });
  });

  it("sets methodsRef if provided", async () => {
    const methodsRef = React.createRef<UseFormReturn<{ email: string }> | null>();

    await rtlAct(async () => {
      render(
        <FormWrapper<{ email: string }>
          defaultValues={{ email: "" }}
          onSubmit={jest.fn()}
          methodsRef={methodsRef}
        >
          <input name="email" />
        </FormWrapper>
      );
    });

    expect(methodsRef.current).not.toBeNull();
    expect(typeof methodsRef.current?.handleSubmit).toBe("function");
  });
});
