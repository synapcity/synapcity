'use client';

import * as React from 'react';
import { SortKey, SortDir } from '@/components/atoms/controls';
import { SearchableMultiSelect, SearchableMultiSelectOption } from '../search';
import { NoteLike } from '@/hooks/notes/useNotesSearchSort/useNotesSearchSort';
import dynamic from 'next/dynamic';
import { SkeletonOrLoading } from '../loading';
import { DropdownMenuSkeleton } from '../loading/skeletons/DropdownMenuSkeleton';

interface Props {
  searchTerm: string;
  onSearchChange: (v: string) => void;
  sortKey: SortKey;
  onSortKeyChange: (k: SortKey) => void;
  sortDir: SortDir;
  toggleSortDir: () => void;
  dateFrom?: string;
  dateTo?: string;
  onDateRangeChange: (r: { from?: string; to?: string }) => void;
  clearAll?: () => void;
  allNotes: NoteLike[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  isSearching?: boolean;
}

const SortControl = dynamic(() => import("@/components/atoms/controls/SortControl/SortControl").then(mod => mod.SortControl), { ssr: false, loading: ({ isLoading }) => <SkeletonOrLoading isLoading={isLoading} skeleton={<DropdownMenuSkeleton />} /> })
const DateRangePicker = dynamic(() => import("@/components/atoms/controls/DateRangePicker").then(mod => mod.DateRangePicker), { ssr: false, loading: ({ isLoading }) => <SkeletonOrLoading isLoading={isLoading} skeleton={<DropdownMenuSkeleton />} /> })
const SearchInput = dynamic(() => import("@/components/atoms/controls/SearchInput").then(mod => mod.SearchInput), { ssr: false, loading: ({ isLoading }) => <SkeletonOrLoading isLoading={isLoading} /> })


export function NotesControlsBar({
  searchTerm,
  onSearchChange,
  sortKey,
  onSortKeyChange,
  sortDir,
  toggleSortDir,
  dateFrom,
  dateTo,
  onDateRangeChange,
  clearAll,
  allNotes,
  selectedTags,
  setSelectedTags,
  isSearching = false,
}: Props) {

  const tagOptions: SearchableMultiSelectOption[] = React.useMemo(() => {
    const tags = new Set<string>();
    allNotes.forEach((n) => (n.tags || []).forEach((t) => tags.add(t)));
    return Array.from(tags)
      .sort()
      .map((t) => ({ label: t, value: t }));
  }, [allNotes]);

  return (
    <>
      <SearchInput
        value={searchTerm}
        onChange={onSearchChange}
        isLoading={isSearching}
        onClear={() => onSearchChange('')}
        placeholder="Search Notes..."
        className="flex-1"
      />

      <SortControl sortDir={sortDir} sortKey={sortKey} onKeyChange={onSortKeyChange} onDirToggle={toggleSortDir} />

      <DateRangePicker
        from={dateFrom}
        to={dateTo}
        onChange={({ from, to }) => onDateRangeChange({ from, to })}
      />

      <div className="max-w-sm">
        <SearchableMultiSelect
          value={selectedTags}
          onChange={setSelectedTags}
          options={tagOptions}
          onSearch={async (q) => {
            return tagOptions.filter((o) => o.label.toLowerCase().includes(q.toLowerCase()));
          }}
          placeholder="Filter by tag…"
          triggerLabel="Tags"
          showClearButton
          renderTagsBelow={false}
        />
      </div>

      {clearAll && (
        <button
          aria-label="Clear all filters"
          onClick={clearAll}
          className="text-sm underline ml-auto"
        >
          Reset
        </button>
      )}
    </>
  );
}
