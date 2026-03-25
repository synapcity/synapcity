"use client"
import { Clock, User, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface DocumentViewerProps {
  title: string
  content: string
  lastModified: string
  author: string
  version: string
  isDiffActive?: boolean
}

export function DocumentViewer({ 
  title, 
  content, 
  lastModified, 
  author, 
  version,
  isDiffActive = false 
}: DocumentViewerProps) {
  return (
    <div className={cn("flex h-full flex-col", isDiffActive && "bg-accent/5")}>
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{lastModified}</span>
            </div>
            <Badge variant="secondary">{version}</Badge>
            {isDiffActive && <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/30">Diff Active</Badge>}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Export</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className={cn(
        "flex-1 overflow-auto px-6 py-8 transition-colors",
        isDiffActive && "bg-accent/3"
      )}>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className={cn(
            "leading-relaxed whitespace-pre-wrap",
            isDiffActive && "ring-2 ring-blue-300 dark:ring-blue-700 ring-opacity-30 p-4 rounded-lg bg-blue-50/50 dark:bg-blue-950/20"
          )}>
            {content}
          </p>
        </div>
      </div>
    </div>
  )
}
