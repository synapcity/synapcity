"use client"

import * as React from "react"
import { History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DocumentViewer } from "@/components/document-viewer"
import { HistoryPanel } from "@/components/history-panel"
import { DiffAccordion } from "@/components/diff-accordion"
import { SidebarTrigger } from "@/components/ui/sidebar"
import type { VersionEntry } from "@/types"

const MOCK_DOC = {
  title: "Biology Notes",
  content: `The study of life encompasses a vast range of disciplines, from the molecular level to ecosystem-wide interactions. Modern biology integrates principles from chemistry, physics, and environmental science.

Cellular Biology
All living organisms are composed of one or more cells. The cell is the basic unit of life, capable of independent function and reproduction. There are two main types of cells: prokaryotic and eukaryotic.

Genetics and Heredity
The transmission of traits from parents to offspring is governed by genes, which are segments of DNA. Gregor Mendel's work established the fundamental principles of inheritance through his experiments with pea plants.

Evolution and Natural Selection
Charles Darwin's theory of evolution by natural selection explains the diversity of life. Organisms with advantageous traits are more likely to survive and reproduce, passing these traits to their offspring.

Ecology
Ecosystems consist of both living organisms (biotic factors) and non-living elements (abiotic factors). Energy flows through ecosystems via food chains and food webs, while nutrients cycle through biogeochemical processes.`,
  lastModified: "2 hours ago",
  author: "Sarah Chen",
  version: "v2.4.0",
}

export default function SplitPanelPage() {
  const [isHistoryOpen, setIsHistoryOpen] = React.useState(false)
  const [selectedVersion, setSelectedVersion] = React.useState<VersionEntry | null>(null)
  const [isDiffOpen, setIsDiffOpen] = React.useState(false)

  const handleViewDiff = (version: VersionEntry) => {
    setSelectedVersion(version)
    setIsDiffOpen(true)
  }

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-background">
      <div
        className="flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in-out"
        style={{ marginRight: isHistoryOpen ? "24rem" : "0" }}
      >
        <header className="flex h-14 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger />
          <div className="flex-1" />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className={isHistoryOpen ? "bg-accent text-accent-foreground" : ""}
          >
            <History className="mr-2 h-4 w-4" />
            History
          </Button>
        </header>

        <div className="flex-1 overflow-auto flex flex-col">
          {selectedVersion && (
            <DiffAccordion 
              version={selectedVersion}
              isOpen={isDiffOpen}
              onToggle={() => setIsDiffOpen(!isDiffOpen)}
            />
          )}
          
          <DocumentViewer 
            {...MOCK_DOC}
            isDiffActive={isDiffOpen && !!selectedVersion}
          />
        </div>
      </div>
      <HistoryPanel 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)}
        onViewDiff={handleViewDiff}
      />
    </div>
  )
}
