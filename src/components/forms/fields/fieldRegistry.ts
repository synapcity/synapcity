/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputField } from "./Input/InputField";
import { TextareaField } from "./Textarea/TextareaField";
import { CheckboxField } from "./Checkbox/CheckboxField";
import { UrlField } from "./URL/UrlField";

import type { FieldDefinition } from "@/types/form";
import { SelectField } from "./Select/SelectField";

type FieldComponent = React.FC<{
	config: FieldDefinition;
	meta?: FieldDefinition["meta"];
	field: any;
	trigger?: (name: string) => void;
}>;

export const fieldRegistry: Record<string, FieldComponent> = {
	text: InputField,
	textarea: TextareaField,
	checkbox: CheckboxField,
	url: UrlField,
	select: SelectField,
};
