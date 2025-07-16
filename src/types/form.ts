/* eslint-disable @typescript-eslint/no-explicit-any */

export type FieldDefinition = {
	name: string;
	label: string;
	type: FieldType;
	placeholder?: string;
	description?: string;
	defaultValue?: any;
	options?: { label: string; value: string }[];
	meta?: {
		required?: boolean;
		[key: string]: any;
	};
};

export type FieldDefinitionMap = {
	[key: string]: FieldDefinition;
};

export type FieldType =
	| "text"
	| "password"
	| "textarea"
	| "select"
	| "checkbox"
	| "radio"
	| "date"
	| "url"
	| "file"
	| "color"
	| "number"
	| "toggle"
	| "slider"
	| "tags"
	| "textarea"
	| "bio"
	| "icon"
	| "richText"
	| "linkPreview"
	| "resourceUrl_previewMeta"
	| "code"
	| "fileGallery"
	| "duration"
	| "title";

export interface FieldOption {
	label: string;
	value: any;
}

export interface FieldConfig {
	name: string;
	label: string;
	type: FieldType;
	placeholder?: string;
	options?: FieldOption[];
	defaultValue?: any;
	icon?: any;
	readOnly?: boolean;
	autoFocus?: boolean;
}

export interface FieldMeta {
	validationMessage?: string;
	language?: string;
	height?: number;
	editable?: boolean;
	tooltip?: string;
	helpText?: string;
	toggleVisible?: boolean;
	showReset?: boolean;
	disabled?: boolean;
	required?: boolean;
	min?: number;
	max?: number;
	step?: number;
	allowCustom?: boolean;
	group?: string;
	order?: number;
	direction?: "horizontal" | "vertical";
	multiple?: boolean;
	accept?: string;
	mode?: "delta" | "range" | "iso";
}

// export interface FieldDefinition extends FieldConfig {
// 	schema: z.ZodTypeAny;
// 	meta?: FieldMeta;
// }
