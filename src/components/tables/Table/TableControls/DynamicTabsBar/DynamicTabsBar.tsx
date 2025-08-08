"use client";

import { IconButton } from "@/components/atoms";
import { Tabs, TabsList, TabsTrigger } from "@/components/atoms/ui/tabs";
import { cn } from "@/utils";

export type TabOption = { label: string; value: string; icon?: React.ReactNode };

export function DynamicTabsBar({
  tabs,
  value,
  onTabChange,
  onAdd,
}: {
  tabs: TabOption[];
  value: string;
  onTabChange?: (value: string) => void;
  onEdit?: (tabValue: string) => void;
  onAdd: () => void;
}) {
  return (
    <div className="flex flex-1 items-center gap-2 max-w-full">
      <TabsList className="gap-1 overflow-x-auto w-full no-scrollbar min-w-0">
        {tabs.map(tab => {
          const isActive = tab.value === value;
          return (
            <div
              key={tab.value}
              className={cn(
                "relative flex-1 group flex",
                // prevent tab shrinking to nothing in flexbox
                "min-w-[90px]"
              )}
            >
              <TabsTrigger
                value={tab.value}
                onClick={() => onTabChange?.(tab.value)}
                className={cn(
                  "flex flex-1 items-center gap-1 px-3 py-1 text-xs rounded-md transition-colors min-w-0",
                  "data-[state=active]:bg-accent/30",
                  isActive ? "z-10" : ""
                )}
              >
                {tab.icon}
                <span className="truncate flex-1">{tab.label}</span>
              </TabsTrigger>
            </div>
          );
        })}
      </TabsList>
      <IconButton
        icon="plus"
        size="sm"
        onClick={onAdd}
        aria-label="Add tab"
      />
    </div>
  );
}


export interface DynamicTabsWrapperProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

export const DynamicTabsWrapper = ({ value, onChange, className, children }: DynamicTabsWrapperProps) => {
  return (
    <Tabs value={value} onValueChange={onChange} className={cn("w-full flex flex-col flex-1", className)}>
      {children}
    </Tabs>
  )
}