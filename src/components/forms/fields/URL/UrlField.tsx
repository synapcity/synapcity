/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  UIInput,
  UIFormControl,
  UIFormMessage,
  UITooltip,
  UITooltipTrigger,
  UITooltipContent,
  UILabel,
} from "@/components";
import type { FieldConfig, FieldMeta } from "@/types/form";
import { useFieldError } from "@/hooks";

interface Props {
  config: FieldConfig;
  meta?: FieldMeta;
  field: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    ref?: React.Ref<any>;
  };
}

export function UrlField({ config, meta, field }: Props) {
  const { name, label, placeholder } = config;
  const {
    tooltip,
    helpText,
    required,
    disabled,
  } = meta ?? {};

  const id = `url-${name}`;
  const labelId = `${id}-label`;
  const { message } = useFieldError(config.name);

  const inputEl = (
    <div className="relative">
      <UILabel id={labelId} className="block text-sm font-medium mb-1">
        {label}
      </UILabel>
      <UIInput
        {...field}
        id={id}
        name={name}
        type="url"
        placeholder={placeholder ?? "https://example.com"}
        aria-labelledby={labelId}
        aria-invalid={!!message}
        aria-describedby={message ? `${id}-error` : undefined}
        required={required}
        disabled={disabled}
      />
    </div>
  );

  return (
    <div className="flex-1 size-full relative">
      <UIFormControl>
        {tooltip ? (
          <UITooltip>
            <UITooltipTrigger asChild>{inputEl}</UITooltipTrigger>
            <UITooltipContent>{tooltip}</UITooltipContent>
          </UITooltip>
        ) : (
          inputEl
        )}
        {helpText && (
          <p className="text-xs text-muted-foreground mt-1">{helpText}</p>
        )}
        {message && (
          <UIFormMessage id={`${id}-error`} className="text-red-600 mt-1">
            {message}
          </UIFormMessage>
        )}
      </UIFormControl>
    </div>
  );
}
