"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { VersionTimeline } from "@/VersionTimeline/VersionTimeline"
import { VersionCard } from "@/VersionCard/VersionCard"
import { mockHistory } from "@/mockHistory"
import { cn } from "@/lib/utils"
import type { VersionEntry } from "@/types"

interface HistoryPanelProps {
  isOpen: boolean
  onClose: () => void
  onViewDiff?: (version: VersionEntry) => void
  className?: string
}

export function HistoryPanel({ isOpen, onClose, onViewDiff, className }: HistoryPanelProps) {
  return (
    <div
      className={cn(
        "fixed right-0 top-0 z-40 h-full w-96 border-l border-border bg-background transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full",
        className,
      )}
    >
      <div className="flex h-14 items-center justify-between border-b border-border px-4">
        <h2 className="text-sm font-semibold">Version History</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div className="p-4 space-y-3">
          {mockHistory.map((entry) => (
            <div key={entry.id} onClick={() => onViewDiff?.(entry)}>
              <VersionCard
                id={entry.id}
                timestamp={entry.timestamp}
                author={entry.author}
                description={entry.description}
                changes={entry.changes}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
