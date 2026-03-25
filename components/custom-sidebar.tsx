"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Home,
  FileText,
  BarChart3,
  Calendar,
  Settings,
  Plus,
  GripVertical,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  LinkIcon,
  LayoutDashboard,
  Clock,
  Star,
  MoreVertical,
} from "lucide-react"
import { cn } from "@/lib/utils"

type SidebarPosition = "left" | "right"

type PanelType = "bookmark" | "dashboard" | "link" | "note" | "feature"

interface SidebarItem {
  id: string
  type: PanelType
  title: string
  icon: string
  url?: string
  isPinned?: boolean
}

const iconMap = {
  home: Home,
  file: FileText,
  chart: BarChart3,
  calendar: Calendar,
  settings: Settings,
  bookmark: Bookmark,
  link: LinkIcon,
  dashboard: LayoutDashboard,
  clock: Clock,
  star: Star,
}

const defaultItems: SidebarItem[] = [
  { id: "1", type: "dashboard", title: "Home", icon: "home", isPinned: true },
  { id: "2", type: "note", title: "Quick Notes", icon: "file" },
  { id: "3", type: "dashboard", title: "Analytics", icon: "chart" },
  { id: "4", type: "feature", title: "Calendar", icon: "calendar" },
]

export function CustomSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [position, setPosition] = useState<SidebarPosition>("left")
  const [items, setItems] = useState<SidebarItem[]>(defaultItems)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [showAddPanel, setShowAddPanel] = useState(false)

  // Load preferences from localStorage
  useEffect(() => {
    const savedPosition = localStorage.getItem("sidebar-position") as SidebarPosition
    const savedCollapsed = localStorage.getItem("sidebar-collapsed")
    const savedItems = localStorage.getItem("sidebar-items")

    if (savedPosition) setPosition(savedPosition)
    if (savedCollapsed) setIsCollapsed(savedCollapsed === "true")
    if (savedItems) setItems(JSON.parse(savedItems))
  }, [])

  useEffect(() => {
    const width = isCollapsed ? "64px" : "256px"
    document.documentElement.style.setProperty("--sidebar-width", width)
  }, [isCollapsed])

  // Save preferences to localStorage
  const updatePosition = (newPosition: SidebarPosition) => {
    setPosition(newPosition)
    localStorage.setItem("sidebar-position", newPosition)
  }

  const toggleCollapse = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem("sidebar-collapsed", String(newState))
  }

  const updateItems = (newItems: SidebarItem[]) => {
    setItems(newItems)
    localStorage.setItem("sidebar-items", JSON.stringify(newItems))
  }

  const handleDragStart = (id: string) => {
    setDraggedItem(id)
  }

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (!draggedItem || draggedItem === targetId) return

    const draggedIndex = items.findIndex((item) => item.id === draggedItem)
    const targetIndex = items.findIndex((item) => item.id === targetId)

    const newItems = [...items]
    const [removed] = newItems.splice(draggedIndex, 1)
    newItems.splice(targetIndex, 0, removed)

    updateItems(newItems)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  const removeItem = (id: string) => {
    updateItems(items.filter((item) => item.id !== id))
  }

  const addItem = (type: PanelType, title: string, icon: string) => {
    const newItem: SidebarItem = {
      id: Date.now().toString(),
      type,
      title,
      icon,
    }
    updateItems([...items, newItem])
    setShowAddPanel(false)
  }

  const togglePin = (id: string) => {
    updateItems(items.map((item) => (item.id === id ? { ...item, isPinned: !item.isPinned } : item)))
  }

  const IconComponent = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap] || FileText
    return <Icon className="h-5 w-5" />
  }

  return (
    <>
      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 h-screen bg-background border-border transition-all duration-300 z-40 flex flex-col",
          position === "left" ? "left-0 border-r" : "right-0 border-l",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        {/* Header */}
        <div className="h-14 border-b border-border flex items-center justify-between px-4">
          {!isCollapsed && <h2 className="font-semibold text-sm">Workspace</h2>}
          <Button variant="ghost" size="icon" onClick={toggleCollapse} className="h-8 w-8">
            {position === "left" ? (
              isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )
            ) : isCollapsed ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Items */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {items.map((item) => (
              <div
                key={item.id}
                draggable={!item.isPinned}
                onDragStart={() => handleDragStart(item.id)}
                onDragOver={(e) => handleDragOver(e, item.id)}
                onDragEnd={handleDragEnd}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  "hover:bg-accent hover:text-accent-foreground cursor-pointer",
                  draggedItem === item.id && "opacity-50",
                )}
              >
                {!isCollapsed && !item.isPinned && (
                  <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
                )}
                {IconComponent(item.icon)}
                {!isCollapsed && (
                  <>
                    <span className="flex-1 truncate">{item.title}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => togglePin(item.id)}>
                          {item.isPinned ? "Unpin" : "Pin"}
                        </DropdownMenuItem>
                        {!item.isPinned && (
                          <DropdownMenuItem onClick={() => removeItem(item.id)} className="text-destructive">
                            Remove
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-border p-2 space-y-1">
          <Button
            variant="ghost"
            size={isCollapsed ? "icon" : "sm"}
            className={cn("w-full", isCollapsed ? "h-10" : "justify-start")}
            onClick={() => setShowAddPanel(true)}
          >
            <Plus className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Add Panel</span>}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size={isCollapsed ? "icon" : "sm"}
                className={cn("w-full", isCollapsed ? "h-10" : "justify-start")}
              >
                <Settings className="h-4 w-4" />
                {!isCollapsed && <span className="ml-2">Settings</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Sidebar Position</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => updatePosition("left")}>
                {position === "left" && "✓ "}Left
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updatePosition("right")}>
                {position === "right" && "✓ "}Right
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Add Panel Sheet */}
      <Sheet open={showAddPanel} onOpenChange={setShowAddPanel}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Panel</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Quick Add</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                  onClick={() => addItem("bookmark", "New Bookmark", "bookmark")}
                >
                  <Bookmark className="h-5 w-5" />
                  <span className="text-xs">Bookmark</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                  onClick={() => addItem("link", "New Link", "link")}
                >
                  <LinkIcon className="h-5 w-5" />
                  <span className="text-xs">Link</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                  onClick={() => addItem("dashboard", "New Dashboard", "dashboard")}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="text-xs">Dashboard</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                  onClick={() => addItem("note", "New Note", "file")}
                >
                  <FileText className="h-5 w-5" />
                  <span className="text-xs">Note</span>
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Feature Panels</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => addItem("feature", "Time Tracker", "clock")}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Time Tracker
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => addItem("feature", "Favorites", "star")}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Favorites
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => addItem("feature", "Calendar View", "calendar")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Calendar View
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
