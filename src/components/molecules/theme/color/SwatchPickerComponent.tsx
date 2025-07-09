"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import reactCSS from 'reactcss'
import type { ColorResult } from "react-color";


interface SwatchPickerComponentProps {
  value: string;
  onChange: (color: string) => void;
}

const SketchPicker = dynamic(() =>
  import("react-color").then(mod => mod.SketchPicker),
  { ssr: false }
);

type SketchState = {
  displayPicker: boolean;
  color: ColorResult
}

const SwatchPickerComponent: React.FC<SwatchPickerComponentProps> = ({ value, onChange }) => {
  const defaultColorState = {
    displayPicker: false,
    color: {
      hex: value
    } as ColorResult
  }
  const [sketchState, setSketchState] = useState<SketchState>(defaultColorState)
  const handleChange = (color: ColorResult) => {
    setSketchState(prev => ({ ...prev, color }))
    onChange(color.hex);
  };

  const handleClick = () => {
    setSketchState(prev => ({ ...prev, displayPicker: !prev.displayPicker }))
  };

  const handleClose = () => {
    setSketchState(prev => ({ ...prev, displayPicker: false }))
  };

  const color = sketchState.color.rgb ? `rgba(${sketchState.color.rgb.r}, ${sketchState.color.rgb.g}, ${sketchState.color.rgb.b}, ${sketchState.color.rgb.a})` : value
  const styles = reactCSS({
    'default': {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: color,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    }
  })
  return (
    <div className="mt-2 p-2">
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {sketchState.displayPicker ? <div style={styles.popover as React.CSSProperties}>
        <div style={styles.cover as React.CSSProperties} onClick={handleClose} />
        <SketchPicker color={color} onChange={handleChange} disableAlpha />
      </div> : null}
    </div >
  );
};

export default SwatchPickerComponent;