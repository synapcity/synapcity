"use client";

import { MainEditorContentHeaderSkeleton } from "../MainEditorContentHeaderSkeleton/MainEditorContentHeaderSkeleton";
import { EditorSkeleton } from "../EditorSkeleton/EditorSkeleton";

export function MainEditorContentSkeleton() {
  return (
    <div className="flex flex-col w-full h-full">
      <MainEditorContentHeaderSkeleton />
      <EditorSkeleton />
    </div>
  );
}
