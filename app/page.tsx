"use client"

import * as React from "react"
import { History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DocumentViewer } from "@/components/document-viewer"
import { HistoryPanel } from "@/components/history-panel"
import { SidebarTrigger } from "@/components/ui/sidebar"

const MOCK_DOC = {
  title: "Project Phoenix Architecture",
  content: `Project Phoenix represents a complete overhaul of our core infrastructure, designed to scale to 100 million concurrent users. This document outlines the key architectural decisions and the rationale behind them.

1. Microservices Architecture
We are moving from a monolithic architecture to a microservices-based approach. This will allow us to scale individual components independently and improve fault isolation.

2. Event-Driven Design
All inter-service communication will be asynchronous and event-driven, using Apache Kafka as the message backbone. This ensures loose coupling and high availability.

3. Database Strategy
We will use a polyglot persistence strategy. Transactional data will reside in PostgreSQL, while time-series data will be stored in TimescaleDB. Redis will be used for caching.

4. Security
Zero-trust security model will be implemented across all services. mTLS will be mandatory for service-to-service communication.`,
  lastModified: "2 hours ago",
  author: "Sarah Chen",
  version: "v2.4.0",
}

export default function SplitPanelPage() {
  const [isHistoryOpen, setIsHistoryOpen] = React.useState(false)

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
        <DocumentViewer {...MOCK_DOC} />
      </div>
      <HistoryPanel isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
    </div>
  )
}
