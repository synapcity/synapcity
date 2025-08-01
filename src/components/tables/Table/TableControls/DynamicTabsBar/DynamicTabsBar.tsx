"use client";

import { IconButton } from "@/components/atoms";
import { Tabs, TabsList, TabsTrigger } from "@/components/atoms/ui/tabs";
import { cn } from "@/utils";

export type TabOption = { label: string; value: string; icon?: React.ReactNode };

export function DynamicTabsBar({
  tabs,
  onAdd,
}: {
  tabs: TabOption[];
  onAdd: () => void;
}) {
  return (
    <div className="flex flex-1 items-center gap-2 max-w-full">
      <TabsList className="gap-1 overflow-x-auto w-full no-scrollbar">
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex items-center gap-1 px-3 py-1 text-xs rounded-md data-[state=active]:bg-accent/30"
          >
            {tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <IconButton
        icon="plus"
        size="sm"
        onClick={onAdd}
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
    <Tabs value={value} onValueChange={onChange} className={cn("w-full", className)}>
      {children}
    </Tabs>
  )
}