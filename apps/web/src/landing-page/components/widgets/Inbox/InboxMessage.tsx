export interface InboxMessage {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  timestamp: Date;
  read?: boolean;
}

interface InboxMessageProps {
  msg: InboxMessage;
}

export const InboxMessage = ({ msg }: InboxMessageProps) => {
  return (
    <li className="p-2 bg-neutral-900 hover:bg-neutral-800 rounded transition-all cursor-pointer">
      <div className="flex justify-between items-center">
        <span className="font-medium text-neutral-100 truncate">{msg.sender}</span>
        <span className="text-xs text-neutral-500">{String(msg.timestamp)}</span>
      </div>
      <p className="text-neutral-300 truncate">{msg.subject}</p>
      <p className="text-neutral-400 text-xs truncate">{msg.preview}</p>
    </li>
  );
};
