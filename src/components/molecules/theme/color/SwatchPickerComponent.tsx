"use client";

import React from "react";
import { ChromePicker, ColorResult } from "react-color";

interface SwatchPickerComponentProps {
  value: string;
  onChange: (color: string) => void;
}

const SwatchPickerComponent: React.FC<SwatchPickerComponentProps> = ({ value, onChange }) => {
  const handleChange = (color: ColorResult) => {
    onChange(color.hex);
  };

  return (
    <div className="mt-2">
      <ChromePicker color={value} onChangeComplete={handleChange} disableAlpha />
    </div>
  );
};

export default SwatchPickerComponent;