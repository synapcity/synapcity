"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/atoms/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/atoms/ui/popover";
import { Button } from "@/components";
import { Check } from "lucide-react";
import React from "react";
import { GOOGLE_FONTS, loadGoogleFont } from "../loadGoogleFont";
import { cn } from "@/utils";

interface FontComboboxProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

export function FontFamilyCombobox({ value, onChange, className }: FontComboboxProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="space-y-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className={cn("w-full justify-between", className)}>
            <span style={{ fontFamily: `'${value}', sans-serif` }}>{value}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search fonts..." />
            <CommandList>
              <CommandEmpty>No fonts found.</CommandEmpty>
              <CommandGroup>
                {GOOGLE_FONTS.map((font) => (
                  <CommandItem
                    key={font}
                    onSelect={() => {
                      if (font !== value) {
                        loadGoogleFont(font);
                        onChange(font);
                      }
                      setOpen(false);
                    }}
                    className="pointer-events-auto"
                  >
                    <span style={{ fontFamily: `'${font}', sans-serif` }}>{font}</span>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        font === value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}