import { FC } from 'react';

interface NoteCardProps {
  id: string;
  title: string;
  excerpt: string;
  onClick?: () => void;
}

export const NoteCard: FC<NoteCardProps> = ({ id, title, excerpt, onClick }) => (
  <article
    onClick={onClick}
    className="cursor-pointer break-inside-avoid
               bg-white dark:bg-gray-800
               rounded-2xl p-5 mb-4
               shadow-md hover:shadow-lg transition"
  >
    <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
      {title} - {id}
    </h3>
    <p
      className="
        text-sm text-gray-600 dark:text-gray-400
        overflow-hidden
        line-clamp-2
      "
    >
      {excerpt}
    </p>
  </article>
);
