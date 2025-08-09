"use client";

import { Icon } from "@/components/atoms";
import { EditableText } from "@/components/molecules/EditableText";
import { TagPills } from "@/components/tables/pills";
import { DynamicTabsBar } from "@/components/tables/Table/TableControls/DynamicTabsBar";
import { ViewResource } from "@/stores";
import { useNoteStore, useNoteViewStore } from "@/stores";
import { cn } from "@/utils";
import { formatInputDate } from "@/utils/date-utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";

const HEADER_FULL = 150;
const HEADER_MIN = HEADER_FULL * 0.5;
const SHRINK_THRESHOLD = 80;

export interface NoteEditorHeaderProps {
  noteId: string;
  onTitleSave: (title: string) => void;
  tags: {
    label: string;
    value: string;
    color?: string;
  }[];
  onTagRemove: (tag: string) => void;
  onTagClick: (tag: string) => void;
  createdAt: Date;
  updatedAt: Date;
  scrollContainer?: HTMLDivElement | null;
  wordCount?: number;
}

export function NoteEditorHeader({
  noteId,
  onTitleSave,
  tags,
  onTagRemove,
  onTagClick,
  createdAt,
  updatedAt,
  scrollContainer

}: NoteEditorHeaderProps) {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(HEADER_FULL);
  const created = formatInputDate(createdAt, { style: "full" })
  const updated = formatInputDate(updatedAt, { style: "relative" })
  const startStatus = useNoteStore(s => s.startStatus)
  const clearStatus = useNoteStore(s => s.resetStatus)
  const viewObj = useNoteViewStore(useShallow(s => s.items))
  const views = useMemo(() => {
    return Object.values(viewObj).filter(v => v.entityId === noteId) ?? []
  }, [viewObj, noteId])
  const activeView = useNoteViewStore(useShallow(s => s.activeByScope[noteId]))
  const setSelected = useNoteViewStore(s => s.setActive)

  const { title, status } = useNoteStore(
    useShallow((s) => ({
      title: s.items[noteId]?.title,
      status: s.status[noteId],
    }))
  );

  useEffect(() => {
    const scrollEl = scrollContainer ?? scrollContainerRef.current;
    const titleEl = titleRef.current;
    if (!scrollEl) return;

    let raf: number | null = null;

    const onScroll = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const scrollY = Math.min(scrollEl.scrollTop, SHRINK_THRESHOLD);
        const progress = scrollY / SHRINK_THRESHOLD;
        const targetHeight = HEADER_FULL - (HEADER_FULL - HEADER_MIN) * progress;
        setHeaderHeight(targetHeight);

        if (titleEl) {
          const scale = 1 - 0.15 * progress;
          titleEl.style.transform = `scale(${scale})`;
          titleEl.style.transformOrigin = "left center";
        }
      });
    };

    scrollEl.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      scrollEl.removeEventListener("scroll", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [scrollContainer])

  const getStatus = () => {
    if (!status) {
      return (
        <div className="ml-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="check" className={cn("w-4 h-4", "text-green-500")} />
          <span>Synced</span>
        </div>
      );
    }

    const isUpdating = Boolean(status.isEditing || status.isSaving);
    let text = "Saved";
    if (isUpdating) {
      if (status.isEditing) text = "Editing...";
      else if (status.isSaving) text = "Saving...";
      else text = "Loading...";
    }

    const iconName = !isUpdating ? "check" : status.isEditing ? "penLine" : "loading";
    const spin = isUpdating && !status.isEditing;

    return (
      <div className="ml-4 flex items-center gap-2 text-xs text-muted-foreground">
        <Icon
          name={iconName}
          className={cn("w-4 h-4", {
            "text-green-500": !isUpdating,
            "text-gray-500": isUpdating,
            "animate-spin": spin,
          })}
        />
        <span>{text}</span>
      </div>
    );
  };

  const tabOptions = views.map((view) => {
    return {
      label: (view as ViewResource)?.label,
      value: (view as ViewResource)?.id
    }
  })

  return (
    <div className="flex flex-col">
      <header
        ref={headerRef}
        style={{ height: headerHeight }}
        className="sticky top-0 z-30 bg-background/95 supports-[backdrop-filter]:backdrop-blur border-b flex flex-col transition-[height] duration-100 ease-out @container"
      >
        <div className="flex items-center justify-between pr-4">
          <div className="flex items-center px-4 py-2 gap-4">
            <EditableText
              value={title ?? ""}
              as="h4"
              onSave={(value: string) => {
                onTitleSave(value)
                clearStatus(noteId)
              }}
              onEdit={() => {
                startStatus("editing", noteId)
              }}
            />
            {getStatus()}
          </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between px-4 gap-3 pb-3 text-xs text-muted-foreground">
          <div className="flex flex-wrap flex-1 items-center gap-4">
            <span className="@md:flex items-center gap-1 hidden transition-[display] duration-200 ease-linear">
              {/* calendar icon + date */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-calendar w-4 h-4"
                aria-hidden="true"
              >
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              <span>
                {created}
              </span>
            </span>

            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clock w-4 h-4"
                aria-hidden="true"
              >
                <path d="M12 6v6l4 2"></path>
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
              <span>
                {updated}
              </span>
            </span>
          </div>
          <TagPills tags={tags} onClick={onTagClick} onRemove={onTagRemove} />
        </div>
        <div className="px-4 pb-3">
          <DynamicTabsBar
            tabs={tabOptions}
            onAdd={() => useNoteViewStore.getState().addView(noteId, "editor")}
            value={activeView ?? views[0].id}
            onTabChange={(tabId: string) => setSelected(noteId, tabId)}
          />
        </div>
      </header>
    </div>
  );
}
