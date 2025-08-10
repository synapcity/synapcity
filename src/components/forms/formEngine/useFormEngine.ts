/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, DefaultValues } from "react-hook-form";
import { z, ZodObject, ZodRawShape } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type UseFormEngineOptions<Schema extends ZodObject<ZodRawShape>> = {
  schema: Schema;
  defaultValues?: DefaultValues<z.input<Schema>>;
  onSubmit: (values: z.output<Schema>) => Promise<void> | void;
  mode?: "onSubmit" | "onChange" | "onBlur" | "all";
};

export function useFormEngine<Schema extends ZodObject<ZodRawShape>>({
  schema,
  defaultValues,
  onSubmit,
  mode = "onSubmit",
}: UseFormEngineOptions<Schema>) {
  const form = useForm<z.input<Schema>, any, z.output<Schema>>({
    resolver: zodResolver(schema),
    defaultValues,
    mode,
  });

  const handleSubmit = form.handleSubmit(onSubmit);

  return { form, handleSubmit };
}
