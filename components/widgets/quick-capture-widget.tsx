"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Hash, Calendar, User } from "lucide-react"

export function QuickCaptureWidget() {
  const [input, setInput] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      console.log("[v0] Quick capture submitted:", input)
      setInput("")
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">Quick Capture</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Hash className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className={`rounded-lg border-2 transition-colors ${isFocused ? "border-primary" : "border-border"}`}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Capture a thought, task, or idea..."
              className="w-full resize-none bg-transparent px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none"
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">⌘ + K</span>
              <span className="text-xs text-muted-foreground">to open</span>
            </div>
            <Button type="submit" size="sm" disabled={!input.trim()}>
              <Plus className="mr-1 h-4 w-4" />
              Add
            </Button>
          </div>
        </form>
      </div>
    </Card>
  )
}
