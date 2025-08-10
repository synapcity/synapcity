import { z } from "zod";

export const inboxFormSchema = z.object({
  type: z.enum(["text", "link", "file", "image", "snippet"]),
  content: z.string().min(1, "Content is required").default(""),
  // processed: z.boolean().optional(),
});

export type InboxFormValues = z.infer<typeof inboxFormSchema>;
