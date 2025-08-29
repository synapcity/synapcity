"use client";

import { ReactNode } from "react";
import { IconButton } from "@/components";
import { DarkModeSwitch } from "../atoms/DarkModeSwitch";
import { useMetadata } from "@/providers";
import { ThemeMode } from "@/theme";

interface MainEditorLayoutProps {
  title: string;
  createdAt?: string;
  lastSavedAt?: string;
  noteId: string;
  children: ReactNode;
}

export function MainEditorLayout({
  title,
  createdAt,
  lastSavedAt,
  children,
}: MainEditorLayoutProps) {
  const { themeMode, setThemeMode } = useMetadata();
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <aside className="hidden md:flex flex-shrink-0 w-16 flex-col bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-2 space-y-2">
        <IconButton icon="panelLeft" aria-label="Toggle sidebar" />
        <IconButton icon="search" aria-label="Search" />
        <IconButton icon="trash2" aria-label="Delete note" />
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-semibold">{title || "Untitled"}</h1>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {createdAt && <>Created {createdAt} · </>}
              {lastSavedAt && <>Last saved {lastSavedAt}</>}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <DarkModeSwitch
              aria-label="Toggle dark mode"
              value={themeMode}
              onChange={(value: ThemeMode) => setThemeMode(value)}
            />
            <IconButton icon="settings" aria-label="Open settings" />
          </div>
        </header>

        <div className="flex-1 flex flex-col overflow-x-hidden">
          <main className="flex-1 flex flex-col overflow-y-auto p-8">{children}</main>

          <aside className="w-64 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 hidden lg:block">
            <h2 className="text-sm font-medium mb-2">Outline</h2>
            <nav className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer">
                • Introduction
              </div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer">
                • Key Concepts
              </div>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
}
