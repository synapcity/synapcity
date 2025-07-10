import type React from "react"
import { Search } from "lucide-react"

import { Label, Input } from "@/components"

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <div className="relative bg-white dark:bg-black">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input id="search" placeholder="Type to search..." className="h-8 pl-7" />
        <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
      </div>
    </form>
  )
}
