"use client"

import { Button } from "@/components/atoms";
import { cn } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
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

export type BaseFormProps<TFields extends FieldValues> = {
  schema?: ZodType<TFields>;
  defaultValues?: UseFormProps<TFields>["defaultValues"];
  onSubmit: SubmitHandler<TFields>;
  onError?: SubmitErrorHandler<TFields>;
  className?: string;
  showSubmitButton?: boolean;
  submitLabel?: string;
  loading?: boolean;
  id?: string;
  methodsRef?: React.RefObject<UseFormReturn<TFields> | null>;
} & React.FormHTMLAttributes<HTMLFormElement>;

export function FormWrapper<TFields extends FieldValues>({
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
}: BaseFormProps<TFields> & { children: React.ReactNode }) {
  const methods = useForm<TFields>({
    resolver: schema ? zodResolver(schema) : undefined,
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
        onSubmit={handleSubmit(onSubmit, onError)}
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

export type FormWrapperWithRenderProps<TFields extends FieldValues> = BaseFormProps<TFields> & {
  render: (methods: UseFormReturn<TFields>) => React.ReactElement;
};

export function FormWrapperWithRender<TFields extends FieldValues>({
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
}: FormWrapperWithRenderProps<TFields>) {
  const methods = useForm<TFields>({
    resolver: schema ? zodResolver(schema) : undefined,
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
        onSubmit={handleSubmit(onSubmit, onError)}
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