"use client";

import {
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
import { useFieldError } from "@/hooks";
import { SelectFieldProps } from "@/types/form";

export function SelectField({ config, meta, field }: SelectFieldProps) {
  const { message } = useFieldError(config.name);
  const {
    placeholder,
    options = [],
  } = config;

  const {
    tooltip,
    helpText,
    disabled,
  } = meta ?? {};

  const id = `select-${field.name}`;
  const labelId = `${id}-label`;

  const selectElement = (
    <UISelect
      {...field}
      {...config}
      {...meta}
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
        <p id={`${config.name}-help`} className="mt-1 text-xs text-muted-foreground">
          {helpText}
        </p>
      )}
      {message && (
        <UIFormMessage id={`${id}-error`} className="text-red-600 mt-1">
          {message}
        </UIFormMessage>
      )}
    </div>
  );
}
