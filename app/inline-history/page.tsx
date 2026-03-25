"use client"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { DocumentViewer } from "@/components/document-viewer"
import { VersionTimeline } from "@/VersionTimeline/VersionTimeline"
import { mockHistory } from "@/mockHistory"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

const MOCK_DOC = {
  title: "Q3 Marketing Strategy",
  content: `Our Q3 marketing strategy focuses on three key pillars: content marketing, community engagement, and strategic partnerships.

1. Content Marketing
We will ramp up our blog output to 3 posts per week, focusing on technical deep dives and customer success stories. We will also launch a new podcast series featuring industry leaders.

2. Community Engagement
We are launching a new developer advocate program to better support our open-source community. This includes sponsoring local meetups and hosting a virtual hackathon.

3. Strategic Partnerships
We are in talks with several key players in the cloud infrastructure space to launch co-marketing campaigns.`,
  lastModified: "1 day ago",
  author: "Mike Ross",
  version: "v1.2.0",
}

export default function InlineHistoryPage() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      <header className="flex h-14 items-center gap-2 border-b border-border px-4">
        <SidebarTrigger />
        <span className="font-medium">Inline History Layout</span>
      </header>
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={70} minSize={30}>
          <DocumentViewer {...MOCK_DOC} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30} minSize={20} className="bg-muted/30">
          <div className="flex h-full flex-col">
            <div className="border-b border-border p-4">
              <h2 className="font-semibold">Version History</h2>
              <p className="text-sm text-muted-foreground">Track changes and updates</p>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <VersionTimeline entries={mockHistory} />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
