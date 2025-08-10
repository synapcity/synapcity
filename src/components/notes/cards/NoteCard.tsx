"use client";

import { FC, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/shallow";
import { CardWithLoading } from "../../molecules/cards/CardWithLoading";
import { useNoteStore } from "@/stores";
import { useActionStatus } from "@/hooks/useActionStatus";

interface NoteCardProps {
  id: string;
  title: string;
  excerpt: string;
  onClick?: () => void;
}

export const NoteCard: FC<NoteCardProps> = ({ id, title, excerpt, onClick }) => {
  const router = useRouter();

  const status = useNoteStore(
    useShallow((s) => s.localStatus?.[id] ?? { isLoading: false, error: null })
  );
  const startStatus = useNoteStore((s) => s.startStatus);

  const { isRunning: localLoading, wrapAction } = useActionStatus({
    id,
    actionKey: "loading",
    onStart: () => startStatus("loading", id),
    debounceDelay: 100,
    minDisplayDuration: 200,
  });

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      wrapAction(() => {
        onClick?.();
        router.push(`/home/notes/${id}`);
      })(e);
    },
    [wrapAction, onClick, router, id]
  );

  const isLoading = !!status?.isLoading || localLoading;

  return (
    <CardWithLoading isLoading={isLoading} onClick={handleClick} ariaLabel={`Open note ${title}`}>
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{title}</h3>
      <p
        className="
          text-sm text-gray-600 dark:text-gray-400
          overflow-hidden
          line-clamp-2
        "
      >
        {excerpt}
      </p>
    </CardWithLoading>
  );
};
