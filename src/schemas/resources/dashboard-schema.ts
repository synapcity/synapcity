import { z } from "zod";
import { ResourceSchema } from "./base-schema";

export const DashboardDataSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z.string().optional().default(""),
	widgetIds: z.array(z.string()).optional().default([]),
	icon: z.string().optional().default("boxes"),
});

export const DashboardResourceSchema = ResourceSchema(DashboardDataSchema);
export type Dashboard = z.infer<typeof DashboardResourceSchema>;

export type RawDashboard = z.infer<typeof DashboardDataSchema>;

export function createDashboard(partial: Partial<Dashboard> = {}): Dashboard {
	const now = new Date().toISOString();
	const base = {
		id: partial.id ?? crypto.randomUUID(),
		createdAt: now,
		updatedAt: now,
		deletedAt: null,
	};
	const dashboard = {
		...base,
		name: partial.name ?? "Untitled",
		icon: partial.icon ?? "boxes",
		description: partial.description ?? "",
		widgetIds: partial.widgetIds ?? [],
	};

	return DashboardResourceSchema.parse(dashboard);
}
