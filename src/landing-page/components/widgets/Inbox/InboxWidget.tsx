"use client";

import { MailIcon } from "lucide-react";
import { CardComponent as Card } from "@/landing-page/components/ui/CardComponent/CardComponent";
import { InboxMessage } from "./InboxMessage";

export const InboxWidget = ({
  title,
  messages,
}: {
  title: string;
  messages: InboxMessage[];
}) => {

  return (
    <Card
      title={title}
      icon={MailIcon}
      className="rounded-2xl bg-neutral-950 text-neutral-200 justify-start items-start h-[300px] w-[400px] overflow-hidden"
    >
      <ul className="flex-1 w-full text-sm space-y-2 overflow-y-auto pr-1">
        {messages.length === 0 && (
          <li className="text-neutral-500 italic text-center w-full mt-4">No new messages</li>
        )}

        {messages.map((msg) => (
          <InboxMessage key={msg.id} msg={msg} />
        ))}
      </ul>
    </Card>
  );
};
