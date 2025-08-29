import { z } from "zod";

export const resourceTypes = ["note", "dashboard", "widget"] as const;

export type LinkedResource = {
  type: (typeof resourceTypes)[number];
  resourceId: string;
  label: string;
};

export const RowSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  date: z.string().optional(),
  content: z.string().optional(),
  priority: z.string().optional(),
  linkedResources: z
    .array(
      z.object({
        type: z.enum(resourceTypes),
        resourceId: z.string(),
        label: z.string(),
      })
    )
    .optional(),
});

export type RowData = z.infer<typeof RowSchema>;
