"use client"

import React, { useRef } from 'react';
import type { Format } from './exportUtils';
import { SelectOption } from '@/components/atoms';
import { SelectField } from '@/components/forms/fields/Select';
import { SelectFieldProps } from '@/types/form';

export const DEFAULT_FORMATS: Format[] = ['csv', 'json', 'xlsx', 'pdf', 'txt'];
export type FormatSelectFieldProps = Omit<SelectFieldProps, "value" | "options"> & {
  value: string;
  options: string[];
}
export function FormatSelect({ value, options: rawOptions, field, config, ...props }: FormatSelectFieldProps) {
  const selectRef = useRef<HTMLSelectElement | null>(null)
  const name = `exportType`
  const options = (rawOptions).map((value) => {
    return {
      label: value.toUpperCase(),
      value: value as unknown as string
    }
  }) as SelectOption[]
  const label = `Export as ${value.toUpperCase()}`
  return (
    <SelectField
      {...props}
      // value={value}
      // options={options}
      config={{
        ...config,
        name,
        label,
        options
      }}
      field={{
        ...field,
        value,
        ref: selectRef
      }}
    />
  )
}
