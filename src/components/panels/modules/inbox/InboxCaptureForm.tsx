"use client";

import { useInboxStore } from "@/stores/inboxStore";
import { InboxForm } from "@/components/forms/InboxForm/InboxForm";
import { InboxFormValues } from "@/components/forms/InboxForm/inboxFormSchema";

export const InboxCaptureForm = () => {
  const addItem = useInboxStore((s) => s.addItem);

  const handleSubmit = (data: InboxFormValues) => {
    const item = {
      ...data,
      // processed: data.processed ?? false,
    };
    addItem(item);
  };

  // const types = ["text"
  //   , "link"
  //   , "image"
  //   , "file"
  //   , "snippet"
  //   , "converted"]

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Quick Capture</h2>
      <InboxForm
        layout="inline"
        onSubmit={(data) => {
          handleSubmit(data);
        }}
      />
      This is a form
    </div>
  );
};
