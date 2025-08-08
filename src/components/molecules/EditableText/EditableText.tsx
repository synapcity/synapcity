"use client"

import { cn } from "@/utils";
import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  JSX,
} from "react";

interface EditableTextProps {
  value: string;
  onSave: (value: string) => void;
  onEdit?: () => void;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  placeholder?: string;
  onBlur?: () => void;
}

export const EditableText = ({
  value,
  onSave,
  onEdit,
  as = "span",
  className = "",
  placeholder = "Untitled",
  onBlur
}: EditableTextProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentValue, setCurrentValue] = useState(value);
  const [editing, setEditing] = useState(false);

  // Sync when parent value changes
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  // Autofocus input on edit
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing, onEdit]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
    if (e.key === "Escape") {
      setCurrentValue(value); // revert
      setEditing(false);
    }
  };

  const handleBlur = () => {
    setEditing(false);
    if (currentValue !== value) {
      onSave(currentValue);
    }
    onBlur?.()
  };

  const handleEditing = () => {
    setEditing(true)
    onEdit?.();
  }
  const Comp = as;
  const textValue = currentValue.trim().length === 0 ? <span className="opacity-60">{placeholder}</span> : currentValue.trim()

  const textStyles: Partial<Record<keyof JSX.IntrinsicElements, string>> = {
    h1: "text-4xl md:text-5xl font-bold tracking-tight leading-tight",
    h2: "text-3xl md:text-4xl font-semibold tracking-tight leading-snug",
    h3: "text-2xl md:text-3xl font-semibold tracking-normal lading-snug",
    h4: "text-xl md:text-2xl font-medium tracking-normal leading-snug",
    h5: "text-lg md:text-xl font-medium leading-relaxed tracking-normal",
    h6: "text-base md:text-lg font-medium leading-relaxed tracking-wide",
    p: "font-body text-body text-base leading-relaxed",
    span: "font-base text-body text-base leading-relaxed"
  }

  const text = () => {
    if (editing) {
      return (
        <input
          ref={inputRef}
          type="text"
          value={currentValue}
          onChange={handleInput}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={cn(`flex-grow bg-transparent border-none focus:ring-0 focus:border-b focus:border-accent-400 truncate`, textStyles[as])}
          placeholder={placeholder}
          aria-placeholder={placeholder}
          autoFocus
        />
      )
    }
    return (
      <Comp
        className={cn(textStyles[as], className)}
        tabIndex={0}
        onDoubleClick={() => handleEditing()}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleEditing()
        }}
        style={{ cursor: "pointer" }}
        aria-label={`Edit ${textValue}`}
        role="textbox"
        onBlur={handleBlur}
      >
        {textValue}
      </Comp>
    )
  }

  return (
    <div className={cn("my-2", className)}>
      {text()}
    </div>
  )
};
