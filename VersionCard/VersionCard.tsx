import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { VersionEntry } from "../types"

export interface VersionCardProps<TState = unknown> {
  entry: VersionEntry<TState>
  className?: string
}

/**
 * Compact summary of a single version.
 * Designed to be dropped into lists, timelines, or diff views.
 */
export function VersionCard<TState = any>({ entry, className }: VersionCardProps<TState>) {
  const timestampLabel = format(entry.timestamp, "PPpp")

  // Heuristic: try to surface a human-readable title/content snippet
  const entityState = entry.entityState as any
  const title: string | undefined = entityState?.title ?? entry.entityId
  const contentSnippet: string | undefined = entityState?.content

  return (
    <Card className={cn("w-full overflow-hidden border-border/70 bg-background/60 backdrop-blur", className)}>
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm font-semibold leading-tight">{title}</CardTitle>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">{entry.entityType}</span>
            <span className="mx-1 text-border">•</span>
            <span className="font-mono text-[0.7rem]">{entry.entityId}</span>
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge variant="outline" className="uppercase tracking-wide text-[0.65rem] px-2 py-0.5">
            {entry.action}
          </Badge>
          <span className="text-[0.65rem] text-muted-foreground">{timestampLabel}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-1">
        {contentSnippet && (
          <p className="line-clamp-3 text-xs text-muted-foreground whitespace-pre-line">{contentSnippet}</p>
        )}

        {(entry.previousState || entry.entityState) && (
          <div className="grid gap-3 md:grid-cols-2">
            {entry.previousState && (
              <div className="rounded-md border bg-muted/40 p-2">
                <p className="mb-1 text-[0.65rem] font-medium uppercase text-muted-foreground">Previous</p>
                <pre className="max-h-40 overflow-auto rounded bg-background/60 p-2 text-[0.65rem] leading-snug">
                  <code>{JSON.stringify(entry.previousState, null, 2)}</code>
                </pre>
              </div>
            )}
            <div className="rounded-md border bg-background/60 p-2">
              <p className="mb-1 text-[0.65rem] font-medium uppercase text-muted-foreground">Current</p>
              <pre className="max-h-40 overflow-auto rounded bg-muted/20 p-2 text-[0.65rem] leading-snug">
                <code>{JSON.stringify(entry.entityState, null, 2)}</code>
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
