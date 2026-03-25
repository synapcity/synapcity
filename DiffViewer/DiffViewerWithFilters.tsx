/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from "react"
import { VersionCard } from "@/VersionCard/VersionCard"
import { VersionFilterBar } from "@/VersionFilterBar/VersionFilterBar"
import type { VersionEntry, VersionAction } from "../types"

export interface DiffViewerWithFiltersProps<TState = unknown> {
  entries: VersionEntry<TState>[]
  className?: string
}

/**
 * High-level composite: filter bar + list of VersionCards.
 * Intended as an exploratory "history" surface.
 */
export function DiffViewerWithFilters<TState = any>({ entries = [], className }: DiffViewerWithFiltersProps<TState>) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedAction, setSelectedAction] = React.useState<VersionAction | null>(null)

  const filteredEntries = React.useMemo(() => {
    const needle = searchTerm.toLowerCase().trim()

    return entries.filter((entry) => {
      const matchesAction = selectedAction ? entry.action === selectedAction : true

      if (!needle) {
        return matchesAction
      }

      const haystack = [
        entry.entityId,
        entry.entityType,
        JSON.stringify(entry.entityState),
        JSON.stringify(entry.previousState ?? {}),
      ]
        .join(" ")
        .toLowerCase()

      const matchesSearch = haystack.includes(needle)

      return matchesAction && matchesSearch
    })
  }, [entries, searchTerm, selectedAction])

  return (
    <div className={className}>
      <div className="space-y-4">
        <VersionFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedAction={selectedAction}
          onActionChange={setSelectedAction}
          totalCount={entries.length}
          filteredCount={filteredEntries.length}
        />

        {filteredEntries.length === 0 ? (
          <p className="text-sm text-muted-foreground">No versions match your filters.</p>
        ) : (
          <div className="space-y-3">
            {filteredEntries.map((entry) => (
              <VersionCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
