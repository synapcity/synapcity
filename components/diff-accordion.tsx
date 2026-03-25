"use client"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { VersionEntry } from "@/types"
import { cn } from "@/lib/utils"

interface DiffAccordionProps {
  version: VersionEntry | null
  isOpen: boolean
  onToggle: () => void
}

export function DiffAccordion({ version, isOpen, onToggle }: DiffAccordionProps) {
  if (!version) return null

  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-3 hover:bg-accent/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <ChevronDown
            className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")}
          />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">View Diff</span>
            <Badge variant="secondary" className="text-xs">
              {version.author}
            </Badge>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">
          {new Date(version.timestamp).toLocaleDateString()}
        </span>
      </button>

      {isOpen && (
        <div className="px-6 py-4 bg-muted/30 border-t border-border space-y-3">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Changes</h4>
            <div className="space-y-2">
              {version.entityState && typeof version.entityState === "object" ? (
                <div className="space-y-2">
                  <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded border border-red-200 dark:border-red-900/50">
                    <p className="text-xs font-mono text-red-900 dark:text-red-300 whitespace-pre-wrap break-words">
                      {JSON.stringify(version.previousState || {}, null, 2)}
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded border border-green-200 dark:border-green-900/50">
                    <p className="text-xs font-mono text-green-900 dark:text-green-300 whitespace-pre-wrap break-words">
                      {JSON.stringify(version.entityState, null, 2)}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No changes available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
