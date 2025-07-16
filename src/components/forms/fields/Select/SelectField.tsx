/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  // UIFormControl,
  UISelect,
  UISelectTrigger,
  UISelectValue,
  UISelectContent,
  UISelectItem,
  UITooltip,
  UITooltipTrigger,
  UITooltipContent,
  UIFormMessage,
} from "@/components/atoms/ui";
import { FieldConfig, FieldMeta } from "@/types/form";
import { useFieldError } from "@/hooks";

interface Props {
  config: FieldConfig;
  meta?: FieldMeta;
  field: {
    name: string;
    value: any;
    onChange: (value: any) => void;
    onBlur: () => void;
    ref?: React.Ref<any>;
    [key: string]: any;
  };
}

export function SelectField({ config, meta, field }: Props) {
  const { message } = useFieldError(config.name);
  const {
    name,
    placeholder,
    options = [],
  } = config;

  const {
    tooltip,
    helpText,
    disabled,
  } = meta ?? {};

  const id = `select-${name}`;
  const labelId = `${id}-label`;

  const selectElement = (
    <UISelect
      name={name}
      value={field.value}
      onValueChange={field.onChange}
      defaultValue={field.value}
      disabled={disabled}
    >
      <UISelectTrigger id={id} aria-labelledby={labelId}>
        <UISelectValue placeholder={placeholder ?? "Select one..."} />
      </UISelectTrigger>
      <UISelectContent role="listbox">
        {options.map((opt) => (
          <UISelectItem
            key={opt.value}
            value={opt.value}
            aria-label={opt.label}
            className="cursor-pointer"
          >
            {opt.label}
          </UISelectItem>
        ))}
      </UISelectContent>
    </UISelect>
  );

  return (
    // <UIFormControl>
    <div>

      {tooltip ? (
        <UITooltip>
          <UITooltipTrigger asChild>{selectElement}</UITooltipTrigger>
          <UITooltipContent>{tooltip}</UITooltipContent>
        </UITooltip>
      ) : (
        selectElement
      )}

      {helpText && (
        <p id={`${name}-help`} className="mt-1 text-xs text-muted-foreground">
          {helpText}
        </p>
      )}
      {message && (
        <UIFormMessage id={`${id}-error`} className="text-red-600 mt-1">
          {message}
        </UIFormMessage>
      )}
    </div>
    // </UIFormControl>
  );
}
