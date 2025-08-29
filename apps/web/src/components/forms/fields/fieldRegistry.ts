/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputField } from "./Input/InputField";

import type {
  // BaseFieldComponent,
  FieldDefinition,
  FieldType,
  // SelectFieldProps,
} from "@/types/form";
import { SelectField } from "./Select/SelectField";
// import { FormatSelect } from "@/components/tables/Table/TableControls/ExportButton/FormatSelect";

export type EmptyProps = {
  [key: string]: any;
};

// export type FieldRegistryMap = {
// 	exportType: SelectFieldProps;
// 	text: EmptyProps;
// 	select: EmptyProps;
// 	password: EmptyProps;
// };
// export type CombinedFieldComponent = React.FC<{Partial<
// 	BaseFieldComponent & FieldRegistryMap[FieldType]
// > | null;

type FieldComponent = React.FC<{
  config: FieldDefinition;
  meta?: FieldDefinition["meta"];
  field: any;
  trigger?: (name: string) => void;
  [key: string]: any;
}>;

export const fieldRegistry: Record<FieldType, FieldComponent> = {
  text: InputField,
  // textarea: TextareaField,
  // checkbox: CheckboxField,
  // url: UrlField,
  select: SelectField,
  // exportType: FormatSelect,
  password: InputField,
};
