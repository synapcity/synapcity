import dynamic from 'next/dynamic';
import React from 'react';

const SkeletonOrLoading = dynamic(() => import("@/components/loading/SkeletonOrLoading/SkeletonOrLoading").then(mod => mod.SkeletonOrLoading), { ssr: true })
const SearchableSortableNotes = dynamic(() => import("@/components/notes/SearchableSortableNotes").then(mod => mod.SearchableSortableNotes), { ssr: true, loading: ({ isLoading }) => <SkeletonOrLoading isLoading={isLoading} /> })

export default function NotesIndexPage() {
  return (
    <div className="flex-1 min-h-0 p-4 flex flex-col">
      <SearchableSortableNotes />
    </div>
  );
}
