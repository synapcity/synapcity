"use client";

import React from "react";
import type { Format } from "@/types/export";
import { Select } from "@/components";

interface FormatPickerProps {
  /** Currently selected format */
  value: Format;
  /** Available formats to choose from */
  formats: Format[];
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Handler when the user selects a new format */
  onChange: (fmt: Format) => void;
}

/**
 * A simple <select> dropdown for choosing export formats.
 */
export function FormatPicker({ value, formats, disabled = false, onChange }: FormatPickerProps) {
  const options = formats.map((fmt) => {
    return {
      value: fmt,
      label: fmt.toUpperCase(),
    };
  });
  return (
    <Select
      value={value}
      disabled={disabled}
      onValueChange={(value: string) => onChange(value as Format)}
      aria-label="Select export format"
      options={options}
    />
  );
}

// "use client"
// import React from 'react';
// import type { Format } from './exportUtils';

// interface FormatPickerProps {
//   value: Format;
//   onChange: (f: Format) => void;
//   formats: Format[];
//   disabled?: boolean;
// }

// export function FormatPicker({
//   value,
//   onChange,
//   formats,
//   disabled = false,
// }: FormatPickerProps) {
//   return (
//     <div className="inline-flex rounded bg-muted p-1">
//       {formats.map((f) => {
//         const isActive = f === value;
//         return (
//           <button
//             key={f}
//             onClick={() => onChange(f)}
//             disabled={disabled}
//             className={`
//               px-3 py-1 text-sm font-medium
//               rounded
//               focus:outline-none focus:ring-2 focus:ring-offset-1
//               ${isActive
//                 ? 'bg-foreground text-background hover:ring-(--primary'
//                 : 'bg-transparent text-foreground hover:bg-gray-200'}
//               ${disabled && 'opacity-50 cursor-not-allowed'}
//             `}
//           >
//             {f.toUpperCase()}
//           </button>
//         );
//       })}
//     </div>
//   );
// }
