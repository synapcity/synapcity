/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputField } from "./Input/InputField";

import type {
	BaseFieldComponent,
	FieldType,
	SelectFieldProps,
} from "@/types/form";
import { SelectField } from "./Select/SelectField";
import { FormatSelect } from "@/components/tables/Table/TableControls/ExportButton/FormatSelect";

export type EmptyProps = {
	[key: string]: any;
};

export type FieldRegistryMap = {
	exportType: SelectFieldProps;
	text: EmptyProps;
	select: EmptyProps;
	password: EmptyProps;
};
export type CombinedFieldComponent = Partial<
	BaseFieldComponent & FieldRegistryMap[FieldType]
> | null;
export const fieldRegistry: Record<FieldType, CombinedFieldComponent> = {
	text: InputField,
	// textarea: TextareaField,
	// checkbox: CheckboxField,
	// url: UrlField,
	select: SelectField,
	exportType: FormatSelect,
	password: InputField,
};
