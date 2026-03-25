/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import DiffViewer from "react-diff-viewer-continued"
import { format } from "date-fns"
import type { VersionEntry } from "../types"

export type { VersionEntry, VersionAction } from "../types"

export interface VersionTimelineProps<TState = unknown> {
  entries: VersionEntry<TState>[]
  className?: string
}

/**
 * Vertical timeline of versions with a modal JSON diff viewer.
 */
export function VersionTimeline<TState = any>({ entries = [], className }: VersionTimelineProps<TState>) {
  const [selectedEntry, setSelectedEntry] = React.useState<VersionEntry<TState> | null>(null)

  const sorted = React.useMemo(
    () => [...entries].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()),
    [entries],
  )

  const handleClick = (entry: VersionEntry<TState>) => {
    setSelectedEntry(entry)
  }

  return (
    <>
      <Card className={cn("w-full max-w-3xl border-border/70 bg-background/60 backdrop-blur", className)}>
        <CardContent className="p-4">
          <ScrollArea className="max-h-[480px] pr-4">
            <ol className="relative space-y-4 border-l border-border/60 pl-4">
              {sorted.map((entry, index) => {
                const isLast = index === sorted.length - 1
                const timestampLabel = format(entry.timestamp, "PPpp")
                const state: any = entry.entityState ?? {}
                const title = state.title ?? entry.entityId

                return (
                  <li
                    key={entry.id}
                    className={cn(
                      "group relative cursor-pointer rounded-md px-3 py-2 transition-colors hover:bg-muted/60",
                      "focus-within:ring-2 focus-within:ring-ring",
                    )}
                    onClick={() => handleClick(entry)}
                  >
                    {/* timeline dot */}
                    <span
                      className={cn(
                        "absolute -left-[0.625rem] top-3 h-3 w-3 rounded-full border-2 border-background",
                        isLast ? "bg-primary" : "bg-primary/70 group-hover:bg-primary",
                      )}
                      aria-hidden="true"
                    />
                    {/* connector line extension for last item */}
                    {!isLast && <span className="absolute -left-[0.5rem] top-6 block h-full w-px bg-border/60" />}

                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-xs font-medium uppercase tracking-wide text-primary">{entry.action}</p>
                        <p className="text-sm font-semibold leading-tight">{title}</p>
                        <p className="text-[0.7rem] text-muted-foreground">
                          <span className="font-mono text-[0.65rem]">{entry.entityId}</span>
                          <span className="mx-1 text-border">•</span>
                          <span>{timestampLabel}</span>
                        </p>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="outline" className="text-[0.65rem]">
                              View diff
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Open JSON diff for this version</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    {state.content && (
                      <p className="mt-2 line-clamp-2 text-xs text-muted-foreground whitespace-pre-line">
                        {state.content}
                      </p>
                    )}
                  </li>
                )
              })}
            </ol>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-sm">
              Version diff
              {selectedEntry && (
                <span className="ml-2 font-mono text-xs text-muted-foreground">{selectedEntry.id}</span>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedEntry && (
            <div className="mt-2 rounded-md border bg-background/80 p-2">
              <DiffViewer
                oldValue={JSON.stringify(selectedEntry.previousState ?? {}, null, 2)}
                newValue={JSON.stringify(selectedEntry.entityState ?? {}, null, 2)}
                splitView
                showDiffOnly
                hideLineNumbers
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
