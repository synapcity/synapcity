/* eslint-disable @typescript-eslint/no-explicit-any */

import { SelectOption } from "@/components";

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

// export type FieldType =
// 	| "text"
// 	| "password"
// 	| "textarea"
// 	| "select"
// 	| "checkbox"
// 	| "radio"
// 	| "date"
// 	| "url"
// 	| "file"
// 	| "color"
// 	| "number"
// 	| "toggle"
// 	| "slider"
// 	| "tags"
// 	| "textarea"
// 	| "bio"
// 	| "icon"
// 	| "richText"
// 	| "linkPreview"
// 	| "resourceUrl_previewMeta"
// 	| "code"
// 	| "fileGallery"
// 	| "duration"
// 	| "title"
// 	| "exportFormat";

export type FieldType = "text" | "select" | "password";

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

export type SelectFieldProps = BaseFieldComponent & {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
};

export type BaseFieldComponent = {
  config: FieldConfig;
  meta?: FieldMeta;
  field: {
    name: string;
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    ref?: React.Ref<HTMLElement>;
    [key: string]: any;
  };
  trigger?: (name: string) => void;
};
