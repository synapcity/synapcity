"use client";

import { useForm, DefaultValues } from "react-hook-form";
import { z, ZodObject, ZodRawShape } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type UseFormEngineOptions<Schema extends ZodObject<ZodRawShape>> = {
	schema: Schema;
	defaultValues?: DefaultValues<z.infer<Schema>>;
	onSubmit: (values: z.infer<Schema>) => Promise<void> | void;
	mode?: "onSubmit" | "onChange" | "onBlur" | "all";
};

export function useFormEngine<Schema extends ZodObject<ZodRawShape>>({
	schema,
	defaultValues,
	onSubmit,
	mode = "onSubmit",
}: UseFormEngineOptions<Schema>) {
	const form = useForm<z.infer<Schema>>({
		resolver: zodResolver(schema),
		defaultValues: defaultValues as DefaultValues<z.infer<Schema>>,
		mode,
	});

	const handleSubmit = form.handleSubmit(onSubmit);

	return { form, handleSubmit };
}
