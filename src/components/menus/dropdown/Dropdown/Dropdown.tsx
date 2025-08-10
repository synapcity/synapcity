"use client";

import {
  DropdownMenu as BaseDropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/atoms/ui/dropdown-menu";
import { Icon, Button, type ButtonProps } from "@/components/atoms";
import { cn } from "@/utils";

interface DropdownItem {
  label: string;
  icon?: string;
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  shortcut?: string;
  tooltip?: string;
  children?: React.ReactNode;
}

interface DropdownProps {
  trigger?: ButtonProps;
  items: (DropdownItem | "separator" | { label: string; items: DropdownItem[] })[];
  align?: "start" | "center" | "end";
  children?: React.ReactNode;
}

export function Dropdown({ trigger, items, align = "end", children }: DropdownProps) {
  return (
    <BaseDropdownMenu>
      <DropdownMenuTrigger asChild>
        {children ?? (trigger && trigger.children) ?? <Button {...trigger} />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="min-w-[180px]">
        {items.map((item, i) => {
          if (item === "separator") {
            return <DropdownMenuSeparator key={`sep-${i}`} />;
          }

          if ("items" in item) {
            return (
              <DropdownMenuGroup key={`group-${item.label}`}>
                <DropdownMenuLabel>{item.label}</DropdownMenuLabel>
                {item.items.map((subItem, j) => (
                  <DropdownMenuItem
                    key={`${i}-${j}`}
                    onSelect={(e) => {
                      e.preventDefault();
                      if (!subItem.disabled) subItem.onSelect?.();
                    }}
                    disabled={subItem.disabled}
                    className={cn(
                      "flex items-center justify-between gap-2",
                      subItem.destructive && "text-red-500 focus:text-red-600"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {subItem.icon && <Icon name={subItem.icon} size="sm" />}
                      {subItem.label}
                    </span>
                    {subItem.shortcut && (
                      <span className="text-xs text-muted-foreground">{subItem.shortcut}</span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            );
          }

          return (
            <DropdownMenuItem
              key={item.label}
              onSelect={(e) => {
                e.preventDefault();
                if (!item.disabled) item.onSelect?.();
              }}
              disabled={item.disabled}
              className={cn(
                "flex items-center justify-between gap-2 group group-hover:bg-black/50 group-hover:text-white",
                item.destructive && "text-red-500 focus:text-red-600"
              )}
            >
              <span className="flex items-center gap-2  group-hover:bg-black/50 group-hover:text-white dark:group-hover:text-background">
                {item.icon && <Icon name={item.icon} size="sm" />}
                {item.label}
              </span>
              {item.shortcut && (
                <span className="text-xs text-muted-foreground">{item.shortcut}</span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </BaseDropdownMenu>
  );
}
