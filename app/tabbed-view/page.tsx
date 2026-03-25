"use client"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { DocumentViewer } from "@/components/document-viewer"
import { VersionTimeline } from "@/VersionTimeline/VersionTimeline"
import { DiffViewerWithFilters } from "@/DiffViewer/DiffViewerWithFilters"
import { mockHistory } from "@/mockHistory"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const MOCK_DOC = {
  title: "Employee Handbook",
  content: `Welcome to the team! This handbook is designed to help you navigate your journey with us.

1. Our Values
- Customer Obsession: We start with the customer and work backwards.
- Ownership: Leaders are owners. They think long term and don't sacrifice long-term value for short-term results.
- Invent and Simplify: Leaders expect and require innovation and invention from their teams and always find ways to simplify.

2. Benefits
We offer a comprehensive benefits package including health insurance, 401k matching, and unlimited PTO.

3. Remote Work Policy
We are a remote-first company. You can work from anywhere in the world, as long as you have a stable internet connection.`,
  lastModified: "3 days ago",
  author: "HR Team",
  version: "v4.0.1",
}

export default function TabbedViewPage() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      <header className="flex h-14 items-center gap-2 border-b border-border px-4">
        <SidebarTrigger />
        <span className="font-medium">Tabbed View Layout</span>
      </header>
      <div className="flex-1 overflow-hidden p-6">
        <Tabs defaultValue="document" className="flex h-full flex-col">
          <div className="flex items-center justify-between pb-4">
            <TabsList>
              <TabsTrigger value="document">Document</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="diff">Diff View</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="document"
            className="flex-1 overflow-hidden rounded-lg border border-border bg-card shadow-sm"
          >
            <DocumentViewer {...MOCK_DOC} />
          </TabsContent>

          <TabsContent
            value="history"
            className="flex-1 overflow-auto rounded-lg border border-border bg-card p-6 shadow-sm"
          >
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-xl font-semibold">Version History</h2>
              <VersionTimeline entries={mockHistory} />
            </div>
          </TabsContent>

          <TabsContent
            value="diff"
            className="flex-1 overflow-auto rounded-lg border border-border bg-card p-6 shadow-sm"
          >
            <DiffViewerWithFilters entries={mockHistory} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
