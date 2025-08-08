import { ZodObject, ZodRawShape, ZodTypeAny } from "zod";
import type { FieldDefinition } from "@/types/form";

type FieldResolver = (key: string) => FieldDefinition | undefined;

export function parseSchemaWithResolver<T extends ZodRawShape>(
	schemaObj: ZodObject<T>,
	resolveField: FieldResolver
): FieldDefinition[] {
	const shape = schemaObj.shape;

	return Object.entries(shape).map(([key, zodField]) => {
		const base = resolveField(key);
		if (!base) {
			throw new Error(`Missing field definition for "${key}"`);
		}

		const zod = zodField as ZodTypeAny;
		const meta = zod.meta ?? {};
		const description = zod.description;

		return {
			...base,
			name: key,
			meta,
			description,
			required: !zod.optional(),
		};
	});
}
