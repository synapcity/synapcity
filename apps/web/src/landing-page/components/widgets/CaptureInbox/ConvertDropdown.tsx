import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/landing-page/components/ui/dropdown-menu";
import { PlusCircle } from "lucide-react";

type ConvertDropdownProps<T> = {
  label: string;
  icon: React.ReactNode;
  items: T[];
  getItemLabel: (item: T) => string;
  onSelect: (item: T) => void;
  onCreateNew: () => void;
};

export function ConvertDropdown<T>({
  label,
  icon,
  items,
  getItemLabel,
  onSelect,
  onCreateNew,
}: ConvertDropdownProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:text-accent-400 text-neutral-500">
        {icon}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-neutral-900 text-neutral-100 text-sm">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item, index) => (
          <DropdownMenuItem key={index} onClick={() => onSelect(item)}>
            {getItemLabel(item)}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onCreateNew}>
          <PlusCircle className="mr-2" size={16} /> Create new
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
