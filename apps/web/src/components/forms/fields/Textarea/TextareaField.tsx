/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  UIFormControl,
  UITextarea,
  UIFormMessage,
  UITooltip,
  UITooltipTrigger,
  UITooltipContent,
  UILabel,
} from "@/components";
import { FieldConfig, FieldMeta } from "@/types/form";
import { useFieldError } from "@/hooks";

interface Props {
  config: FieldConfig;
  meta?: FieldMeta;
  field: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur: () => void;
    ref?: React.Ref<any>;
  };
}

export function TextareaField({ config, meta, field }: Props) {
  const { name, label, placeholder } = config;
  const { tooltip, helpText, required, disabled } = meta ?? {};

  const id = `textarea-${name}`;
  const labelId = `${id}-label`;
  const { message } = useFieldError(name);

  const textarea = (
    <div className="relative">
      <UILabel id={labelId} className="block text-sm font-medium mb-1">
        {label}
      </UILabel>
      <UITextarea
        {...field}
        id={id}
        name={name}
        placeholder={placeholder}
        aria-labelledby={labelId}
        aria-invalid={!!message}
        aria-describedby={message ? `${id}-error` : undefined}
        disabled={disabled}
        required={required}
      />
    </div>
  );

  return (
    <UIFormControl>
      {tooltip ? (
        <UITooltip>
          <UITooltipTrigger asChild>{textarea}</UITooltipTrigger>
          <UITooltipContent>{tooltip}</UITooltipContent>
        </UITooltip>
      ) : (
        textarea
      )}
      {helpText && <p className="text-xs text-muted-foreground">{helpText}</p>}
      {message && (
        <UIFormMessage id={`${id}-error`} className="text-red-600 mt-1">
          {message}
        </UIFormMessage>
      )}
    </UIFormControl>
  );
}
