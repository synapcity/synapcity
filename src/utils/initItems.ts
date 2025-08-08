/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ZodTypeAny, infer as zodInfer } from "zod";
import type { BaseResource } from "@/stores/resources/factory/base-schema";

export function initItems<T extends BaseResource>(
	raw: unknown[],
	schema: ZodTypeAny,
	createItem: (item: Partial<T>) => T
): Record<string, zodInfer<typeof schema>> {
	return (raw ?? []).reduce<Record<string, zodInfer<typeof schema>>>(
		(acc, item, index) => {
			try {
				const parsed = createItem(item as Partial<T>);
				acc[parsed.id] = parsed;
			} catch (err: any) {
				console.warn(
					`[initItems] Skipped invalid item at index ${index}:`,
					item,
					`Error: ${err}`
				);
			}
			return acc;
		},
		{}
	);
}
