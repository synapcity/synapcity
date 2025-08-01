import { FieldDefinitionMap } from "@/types/form";
import { z } from "zod";

export const fileSchema = z.object({
	fileName: z.string().min(1, "File name is required").default(""),
});

export const fileFieldMap: FieldDefinitionMap = {
	fileName: {
		name: "fileName",
		label: "File Name",
		type: "text",
		meta: { required: true },
	},
};
