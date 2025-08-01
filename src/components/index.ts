"use client";

import { useFormContext } from "react-hook-form";

export * from "./atoms";
export * from "./molecules";
export * from "./loading";
export * from "./organisms";
export * from "./panels";
export * from "./menus";
export * from "./pages";
export * from "./theme";
export function useFieldError(name: string) {
	const {
		formState: { errors },
	} = useFormContext();

	const error = errors?.[name];
	const message =
		typeof error === "object" && "message" in error
			? (error.message as string)
			: undefined;

	return { error, message };
}
