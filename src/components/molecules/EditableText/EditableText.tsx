"use client"

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
}

export const EditableText = ({
  value,
  onSave,
  onEdit,
  as = "span",
  className = "",
  placeholder = "Untitled",
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
      onEdit?.();
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
  };

  const handleEditing = () => {
    setEditing(true)
  }
  const Comp = as;
  const textValue = currentValue.trim().length === 0 ? <span className="opacity-60">{placeholder}</span> : currentValue.trim()

  return editing ? (
    <input
      ref={inputRef}
      type="text"
      value={currentValue}
      onChange={handleInput}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`flex-grow text-3xl font-bold bg-transparent border-none focus:ring-0 focus:border-b focus:border-accent-400 truncate ${className}`}
      placeholder={placeholder}
      aria-placeholder={placeholder}
      autoFocus
    />
  ) : (
    <Comp
      className={className}
      tabIndex={0}
      onDoubleClick={() => handleEditing()}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleEditing()
      }}
      style={{ cursor: "pointer" }}
      aria-label={`Edit ${textValue}`}
      role="textbox"
    >
      {textValue}
    </Comp>
  );
};
