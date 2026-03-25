"use client"

import * as React from "react"
import {
  InboxIcon,
  PlusIcon,
  LinkIcon,
  CheckSquareIcon,
  FileTextIcon,
  XIcon,
  ClockIcon,
  MoreHorizontalIcon,
  SettingsIcon,
  BookmarkIcon,
  StarIcon,
  CalendarIcon,
  PanelLeftIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { CalendarWidget } from "@/components/widgets/calendar-widget"

type InboxItemType = "note" | "link" | "task" | "idea"
type InboxPosition = "top" | "right" | "bottom" | "left"
type PanelType = "inbox" | "bookmarks" | "quick-notes" | "links" | "tasks" | "calendar"

interface InboxItem {
  id: string
  type: InboxItemType
  content: string
  url?: string
  tags: string[]
  timestamp: Date
  bookmarked?: boolean
}

interface SidebarPanel {
  id: PanelType
  icon: React.ComponentType<{ className?: string }>
  label: string
  color: string
  enabled: boolean
  order: number
}

const itemTypeConfig = {
  note: { icon: FileTextIcon, label: "Note", color: "text-blue-400" },
  link: { icon: LinkIcon, label: "Link", color: "text-teal-400" },
  task: { icon: CheckSquareIcon, label: "Task", color: "text-purple-400" },
  idea: { icon: InboxIcon, label: "Idea", color: "text-amber-400" },
}

const positionConfig = {
  top: { label: "Top", description: "Slides down from header" },
  right: { label: "Right", description: "Slides in from right side" },
  bottom: { label: "Bottom", description: "Slides up from bottom" },
  left: { label: "Left", description: "Slides in from left side" },
}

const defaultPanels: SidebarPanel[] = [
  { id: "inbox", icon: InboxIcon, label: "Inbox", color: "text-blue-400", enabled: true, order: 0 },
  { id: "bookmarks", icon: BookmarkIcon, label: "Bookmarks", color: "text-amber-400", enabled: true, order: 1 },
  { id: "quick-notes", icon: FileTextIcon, label: "Quick Notes", color: "text-teal-400", enabled: true, order: 2 },
  { id: "links", icon: LinkIcon, label: "Links", color: "text-purple-400", enabled: true, order: 3 },
  { id: "tasks", icon: CheckSquareIcon, label: "Tasks", color: "text-green-400", enabled: true, order: 4 },
  { id: "calendar", icon: CalendarIcon, label: "Calendar", color: "text-pink-400", enabled: true, order: 5 },
]

export default function InboxDrawer() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [position, setPosition] = React.useState<InboxPosition>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("inbox-position") as InboxPosition) || "top"
    }
    return "top"
  })
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [activePanel, setActivePanel] = React.useState<PanelType>("inbox")
  const [panels, setPanels] = React.useState<SidebarPanel[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("inbox-panels")
      return saved ? JSON.parse(saved) : defaultPanels
    }
    return defaultPanels
  })

  const [items, setItems] = React.useState<InboxItem[]>([
    {
      id: "1",
      type: "note",
      content: "Research React Server Components for the new dashboard",
      tags: ["development", "react"],
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      bookmarked: true,
    },
    {
      id: "2",
      type: "link",
      content: "Interesting article on knowledge management",
      url: "https://example.com/article",
      tags: ["reading", "productivity"],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      id: "3",
      type: "task",
      content: "Update documentation for API endpoints",
      tags: ["work", "documentation"],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      bookmarked: true,
    },
  ])
  const [captureType, setCaptureType] = React.useState<InboxItemType>("note")
  const [captureContent, setCaptureContent] = React.useState("")
  const [captureUrl, setCaptureUrl] = React.useState("")

  const handlePositionChange = (newPosition: InboxPosition) => {
    setPosition(newPosition)
    localStorage.setItem("inbox-position", newPosition)
  }

  const handleCapture = () => {
    if (!captureContent.trim()) return

    const newItem: InboxItem = {
      id: Date.now().toString(),
      type: captureType,
      content: captureContent,
      url: captureType === "link" ? captureUrl : undefined,
      tags: [],
      timestamp: new Date(),
    }

    setItems([newItem, ...items])
    setCaptureContent("")
    setCaptureUrl("")
  }

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const toggleBookmark = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, bookmarked: !item.bookmarked } : item)))
  }

  const togglePanel = (panelId: PanelType) => {
    const updatedPanels = panels.map((p) => (p.id === panelId ? { ...p, enabled: !p.enabled } : p))
    setPanels(updatedPanels)
    localStorage.setItem("inbox-panels", JSON.stringify(updatedPanels))
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const getFilteredItems = () => {
    switch (activePanel) {
      case "bookmarks":
        return items.filter((item) => item.bookmarked)
      case "quick-notes":
        return items.filter((item) => item.type === "note")
      case "links":
        return items.filter((item) => item.type === "link")
      case "tasks":
        return items.filter((item) => item.type === "task")
      default:
        return items
    }
  }

  const isHorizontal = position === "left" || position === "right"
  const enabledPanels = panels.filter((p) => p.enabled).sort((a, b) => a.order - b.order)
  const filteredItems = getFilteredItems()

  return (
    <>
      {/* Inbox Trigger Button */}
      <Button variant="ghost" size="icon-sm" onClick={() => setIsOpen(!isOpen)} className="relative">
        <InboxIcon className="size-4" />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
            {items.length}
          </span>
        )}
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side={position} className={cn("flex p-0", isHorizontal ? "w-[600px] sm:w-[700px]" : "h-[80vh]")}>
          <div className={cn("flex", isHorizontal ? "flex-row w-full" : "flex-col h-full")}>
            {/* Internal Sidebar */}
            <div
              className={cn(
                "border-r bg-muted/30 flex flex-col transition-all duration-200",
                isHorizontal ? "h-full" : "w-full border-b",
                sidebarCollapsed ? (isHorizontal ? "w-14" : "h-14") : isHorizontal ? "w-48" : "h-auto",
              )}
            >
              {/* Sidebar Header */}
              <div
                className={cn(
                  "flex items-center border-b p-3",
                  sidebarCollapsed ? "justify-center" : "justify-between",
                )}
              >
                {!sidebarCollapsed && <span className="text-xs font-semibold text-muted-foreground">PANELS</span>}
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="shrink-0"
                >
                  <PanelLeftIcon className={cn("size-3.5 transition-transform", sidebarCollapsed && "rotate-180")} />
                </Button>
              </div>

              {/* Sidebar Navigation */}
              <div className={cn("flex-1 overflow-y-auto p-2", isHorizontal ? "space-y-1" : "flex gap-1")}>
                {enabledPanels.map((panel) => {
                  const Icon = panel.icon
                  return (
                    <button
                      key={panel.id}
                      onClick={() => setActivePanel(panel.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors w-full",
                        activePanel === panel.id
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-background/50 hover:text-foreground",
                        sidebarCollapsed && "justify-center px-2",
                      )}
                    >
                      <Icon className={cn("size-4 shrink-0", panel.color)} />
                      {!sidebarCollapsed && <span className="truncate">{panel.label}</span>}
                    </button>
                  )
                })}
              </div>

              {/* Sidebar Footer - Panel Settings */}
              {!sidebarCollapsed && (
                <div className="border-t p-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs">
                        <SettingsIcon className="size-3.5" />
                        Customize Panels
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      <DropdownMenuLabel>Toggle Panels</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {panels.map((panel) => (
                        <DropdownMenuItem key={panel.id} onClick={() => togglePanel(panel.id)}>
                          <div className="flex items-center justify-between w-full">
                            <span>{panel.label}</span>
                            {panel.enabled && <span className="text-xs text-muted-foreground">✓</span>}
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* Header */}
              <SheetHeader className="border-b px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {React.createElement(enabledPanels.find((p) => p.id === activePanel)?.icon || InboxIcon, {
                      className: cn("size-5", enabledPanels.find((p) => p.id === activePanel)?.color),
                    })}
                    <div>
                      <SheetTitle className="text-lg">
                        {enabledPanels.find((p) => p.id === activePanel)?.label || "Inbox"}
                      </SheetTitle>
                      <SheetDescription className="text-xs">
                        {activePanel === "calendar"
                          ? "Schedule and organize your time"
                          : "Capture anything, organize later"}
                      </SheetDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <SettingsIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Drawer Position</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {(Object.keys(positionConfig) as InboxPosition[]).map((pos) => (
                        <DropdownMenuItem
                          key={pos}
                          onClick={() => handlePositionChange(pos)}
                          className={cn("flex flex-col items-start gap-0.5", position === pos && "bg-accent")}
                        >
                          <span className="font-medium">{positionConfig[pos].label}</span>
                          <span className="text-xs text-muted-foreground">{positionConfig[pos].description}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </SheetHeader>

              {/* Quick Capture - Only show in inbox panel */}
              {activePanel === "inbox" && (
                <div className="border-b bg-muted/30 px-6 py-4">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {(Object.keys(itemTypeConfig) as InboxItemType[]).map((type) => {
                      const Icon = itemTypeConfig[type].icon
                      return (
                        <Button
                          key={type}
                          variant={captureType === type ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCaptureType(type)}
                          className="gap-1.5"
                        >
                          <Icon className="size-3.5" />
                          {itemTypeConfig[type].label}
                        </Button>
                      )
                    })}
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        placeholder={`Quick capture a ${itemTypeConfig[captureType].label.toLowerCase()}...`}
                        value={captureContent}
                        onChange={(e) => setCaptureContent(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleCapture()
                          }
                        }}
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
                      />
                      {captureType === "link" && (
                        <input
                          type="url"
                          placeholder="URL (optional)"
                          value={captureUrl}
                          onChange={(e) => setCaptureUrl(e.target.value)}
                          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
                        />
                      )}
                    </div>
                    <Button onClick={handleCapture} size="icon" className="shrink-0">
                      <PlusIcon className="size-4" />
                    </Button>
                  </div>
                </div>
              )}

              {activePanel === "calendar" ? (
                <div className="flex-1 overflow-hidden p-4">
                  <CalendarWidget compact className="h-full" />
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {/* Items List */}
                  {filteredItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      {(() => {
                        const IconComponent = enabledPanels.find((p) => p.id === activePanel)?.icon || InboxIcon
                        return <IconComponent className="size-12 text-muted-foreground/40 mb-3" />
                      })()}
                      <p className="text-sm text-muted-foreground">No items in this panel</p>
                      <p className="text-xs text-muted-foreground/70">
                        {activePanel === "inbox"
                          ? "Capture ideas, links, and tasks as they come to you"
                          : "Items will appear here when added"}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredItems.map((item) => {
                        const Icon = itemTypeConfig[item.type].icon
                        return (
                          <div
                            key={item.id}
                            className="group flex items-start gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-muted/50"
                          >
                            <div className={cn("mt-0.5 shrink-0", itemTypeConfig[item.type].color)}>
                              <Icon className="size-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-foreground leading-relaxed">{item.content}</p>
                              {item.url && (
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-1 text-xs text-primary hover:underline inline-flex items-center gap-1"
                                >
                                  <LinkIcon className="size-3" />
                                  {item.url}
                                </a>
                              )}
                              <div className="mt-2 flex items-center gap-2">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <ClockIcon className="size-3" />
                                  {formatTimestamp(item.timestamp)}
                                </div>
                                {item.tags.length > 0 && (
                                  <div className="flex gap-1">
                                    {item.tags.map((tag) => (
                                      <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => toggleBookmark(item.id)}
                                className={cn(item.bookmarked && "text-amber-400")}
                              >
                                <StarIcon className={cn("size-3.5", item.bookmarked && "fill-current")} />
                              </Button>
                              <Button variant="ghost" size="icon-sm" onClick={() => handleDelete(item.id)}>
                                <XIcon className="size-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon-sm">
                                <MoreHorizontalIcon className="size-3.5" />
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Footer - Hide for calendar panel */}
              {activePanel !== "calendar" && (
                <div className="border-t px-6 py-3 bg-muted/30">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{filteredItems.length} items</span>
                    {activePanel === "inbox" && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        Process Inbox
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
