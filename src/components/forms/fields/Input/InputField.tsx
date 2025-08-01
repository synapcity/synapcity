/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  UIInput,
  UITooltip,
  UITooltipTrigger,
  UITooltipContent,
  IconButton,
  UIFormMessage,
} from "@/components";
import { getInputIcon } from "./getInputIcon";
import type { FieldConfig, FieldMeta, FieldType } from "@/types/form";
import { useFormContext } from "react-hook-form";
import { useFieldError } from "@/hooks";

interface InputFieldProps {
  config: FieldConfig;
  meta?: FieldMeta;
  field: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    ref?: React.Ref<HTMLInputElement>;
    [key: string]: any;
  };
  trigger?: (name: string) => void;
}

export function InputField({
  config,
  meta,
  field,
  trigger,
}: InputFieldProps) {
  const { message } = useFieldError(config.name);
  const {
    name,
    label,
    placeholder,
    readOnly = false,
    type: baseType = "text",
  } = config;

  const {
    disabled: metaDisabled,
    required,
    toggleVisible = false,
    showReset = false,
    tooltip,
    helpText,
  } = meta || {};

  const form = useFormContext();
  const disabled = metaDisabled ?? false;

  const [visible, setVisible] = useState(false);
  const shouldShowReset = !readOnly && showReset && !!field.value;
  const shouldShowToggle = baseType === "password" as FieldType && toggleVisible;

  const showActionButton = shouldShowReset || shouldShowToggle;

  const type = shouldShowToggle ? (visible ? "text" : "password") : baseType;
  const id = `input-${name}`;
  const labelId = `${id}-label`;

  const handleReset = () => {
    form.resetField(name);
    trigger?.(name);
  };

  const handleToggle = () => {
    setVisible((prev) => !prev);
  };


  const ActionButton = () => {
    const isReset = shouldShowReset;
    const label = isReset ? "Reset input" : visible ? "Hide password" : "Show password";

    return (
      <IconButton
        variant="ghost"
        size="sm"
        icon={isReset ? "XCircleIcon" : visible ? "EyeOff" : "Eye"}
        aria-label={label}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (isReset) {
            handleReset();
          } else {
            handleToggle();
          }
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
        data-testid={isReset ? "reset-button" : "toggle-visible"}
      />
    );
  };

  const StaticIcon = () => {
    const iconElement = getInputIcon({
      type: baseType,
      visible,
      readOnly,
      disabled,
      showReset,
      toggleVisible,
      icon: config.icon,
      name,
      label,
      onReset: handleReset,
      onToggle: handleToggle,
    });

    return iconElement ? (
      <div className="absolute right-2 top-1/2 -translate-y-1/2" data-testid="icon-wrapper">
        {iconElement}
      </div>
    ) : null;
  };

  const inputEl = (
    <div className="relative group">
      <UIInput
        {...field}
        {...config}
        id={id}
        value={field.value ?? ""}
        type={type}
        role="textbox"
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        required={required}
        aria-labelledby={labelId}
        autoFocus
        className="pr-10"
        aria-invalid={!!message}
        aria-describedby={message ? `${id}-error` : undefined}
        onChange={(e) => {
          field.onChange(e);
          trigger?.(name);
        }}
        onBlur={field.onBlur}
      />
      {showActionButton ? <ActionButton /> : <StaticIcon />}
      {helpText && (
        <p className="mt-1 text-xs text-muted-foreground group-hover:visible invisible" id={`${name}-help`}>
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


  return tooltip ? (
    <UITooltip>
      <UITooltipTrigger asChild>{inputEl}</UITooltipTrigger>
      <UITooltipContent>{tooltip}</UITooltipContent>
    </UITooltip>
  ) : inputEl
}

InputField.displayName = "InputField";