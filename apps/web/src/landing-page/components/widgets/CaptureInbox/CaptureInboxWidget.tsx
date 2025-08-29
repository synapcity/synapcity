"use client";

import { useState } from "react";
import { CardComponent as Card } from "@/landing-page/components/ui/CardComponent/CardComponent";
import { CaptureInboxItem } from "./CaptureInboxItem";
import { CaptureInboxInput } from "./CaptureInboxInput";
import dynamic from "next/dynamic";
import { Container } from "@/landing-page/components/ui";
import { BaseProps } from "@/landing-page/types";

interface InboxItem {
  id: string;
  content: string;
  createdAt: string;
}

const InboxIcon = dynamic(() => import("lucide-react").then((mod) => mod.InboxIcon), {
  ssr: false,
});

export const CaptureInboxWidget = ({
  title = "Inbox",
  initialItems = [],
  ...props
}: {
  title?: string;
  initialItems?: InboxItem[];
} & BaseProps) => {
  const [items, setItems] = useState<InboxItem[]>(initialItems);

  const addItem = (item: InboxItem) => {
    setItems([item, ...items]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <Card
      title={title}
      icon={InboxIcon}
      className="rounded-2xl bg-neutral-950 text-neutral-200  flex-col justify-start items-start px-4 py-2"
      header={<CaptureInboxInput addItem={addItem} />}
      {...props}
    >
      <Container className="m-0 p-0 w-full">
        <ul className="flex-1 w-full text-sm space-y-2 overflow-y-auto pr-1">
          {items.length === 0 && (
            <li className="text-neutral-500 italic text-center mt-4">Nothing captured yet</li>
          )}
          {items.map((item, index) => (
            <CaptureInboxItem key={index} item={item} removeItem={removeItem} />
          ))}
        </ul>
      </Container>
    </Card>
  );
};
