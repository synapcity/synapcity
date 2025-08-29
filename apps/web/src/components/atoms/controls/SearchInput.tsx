import { X } from "lucide-react";
import { Input } from "../Input";
import { cn } from "@/utils";

interface SearchInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  onClear?: () => void;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search dashboards…",
  isLoading = false,
  onClear,
  className,
}: SearchInputProps) {
  return (
    <div className="flex-1 flex min-w-[200px] relative">
      <Input
        aria-label="Search dashboards"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn("w-full border rounded px-3 py-2 pr-10", className)}
      />
      {isLoading && (
        <div className="absolute inset-y-0 right-8 flex items-center pr-2 pointer-events-none text-xs">
          Searching…
        </div>
      )}
      {value && onClear && (
        <button
          aria-label="Clear search"
          onClick={() => onClear()}
          className="absolute inset-y-0 right-2 flex items-center px-2"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
