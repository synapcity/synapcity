"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormProvider,
  useForm,
  type UseFormProps,
  type SubmitHandler,
  type SubmitErrorHandler,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import type { ZodType } from "zod";
import { Button } from "@/components/atoms";
import { cn } from "@/utils";

// 👇🏽 ONLY ONE DEFINITION of BaseFormProps!
export type BaseFormProps<TInput extends FieldValues, TOutput extends TInput = TInput> = {
  schema?: ZodType<TOutput, TInput>;
  defaultValues?: UseFormProps<TInput>["defaultValues"];
  onSubmit: (values: TOutput) => void | Promise<void>;
  onError?: SubmitErrorHandler<TInput>;
  className?: string;
  showSubmitButton?: boolean;
  submitLabel?: string;
  loading?: boolean;
  id?: string;
  methodsRef?: React.RefObject<UseFormReturn<TInput> | null>;
} & React.FormHTMLAttributes<HTMLFormElement>;

export function FormWrapper<TInput extends FieldValues, TOutput extends TInput = TInput>({
  schema,
  defaultValues,
  onSubmit,
  onError,
  className,
  children,
  showSubmitButton = false,
  submitLabel = "Submit",
  loading = false,
  id,
  methodsRef,
  ...props
}: BaseFormProps<TInput, TOutput> & { children: React.ReactNode }) {
  const methods = useForm<TInput>({
    resolver: schema ? zodResolver(schema as ZodType<TOutput, TInput>) : undefined,
    defaultValues,
    shouldUnregister: false,
    mode: "onSubmit",
  });

  React.useEffect(() => {
    if (methodsRef) methodsRef.current = methods;
  }, [methodsRef, methods]);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const isLoading = loading || isSubmitting;

  return (
    <FormProvider {...methods}>
      <form
        data-testid="form"
        onSubmit={handleSubmit(onSubmit as unknown as SubmitHandler<TInput>, onError)}
        className={cn("grid gap-6", className)}
        noValidate
        id={id}
        {...props}
      >
        {children}
        {showSubmitButton && (
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : submitLabel}
          </Button>
        )}
      </form>
    </FormProvider>
  );
}

export type FormWrapperWithRenderProps<
  TInput extends FieldValues,
  TOutput extends TInput = TInput,
> = BaseFormProps<TInput, TOutput> & {
  render: (methods: UseFormReturn<TInput>) => React.ReactElement;
};

export function FormWrapperWithRender<TInput extends FieldValues, TOutput extends TInput = TInput>({
  schema,
  defaultValues,
  onSubmit,
  onError,
  render,
  className,
  showSubmitButton = false,
  submitLabel = "Submit",
  loading = false,
  id,
  methodsRef,
  ...props
}: FormWrapperWithRenderProps<TInput, TOutput>) {
  const methods = useForm<TInput>({
    resolver: schema ? zodResolver(schema as ZodType<TOutput, TInput>) : undefined,
    defaultValues,
    shouldUnregister: false,
    mode: "onSubmit",
  });

  React.useEffect(() => {
    if (methodsRef) methodsRef.current = methods;
  }, [methodsRef, methods]);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const isLoading = loading || isSubmitting;

  return (
    <FormProvider {...methods}>
      <form
        data-testid="form"
        onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>, onError)}
        className={cn("grid gap-6", className)}
        noValidate
        id={id}
        {...props}
      >
        {render(methods)}
        {showSubmitButton && (
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : submitLabel}
          </Button>
        )}
      </form>
    </FormProvider>
  );
}
