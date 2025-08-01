// import { z } from "zod";
// import { EntityBaseSchema } from "./base-schema";

// // 1. Full Dashboard model (extends BaseEntity + domain fields)
// export const DashboardSchema = EntityBaseSchema.extend({
// 	name: z.string().min(1, "Dashboard name is required"),
// 	description: z.string().optional(),
// 	widgetIds: z.array(z.string()),
// });

// export type Dashboard = z.infer<typeof DashboardSchema>;

// // 2. Form schema—only editable bits (omit base fields)
// export const DashboardFormSchema = DashboardSchema.omit({
// 	id: true,
// 	createdAt: true,
// 	updatedAt: true,
// 	deletedAt: true,
// });

// export type DashboardForm = z.infer<typeof DashboardFormSchema>;

// // 3. Factory to create a new Dashboard with defaults + validation
// export function createDashboard(partial: Partial<Dashboard> = {}): Dashboard {
// 	const now = new Date().toISOString();
// 	const base = {
// 		id: partial.id ?? crypto.randomUUID(),
// 		createdAt: partial.createdAt ?? now,
// 		updatedAt: partial.updatedAt ?? now,
// 		deletedAt: partial.deletedAt ?? null,
// 	};

// 	const dash = {
// 		...base,
// 		name: partial.name?.trim() || "Untitled Dashboard",
// 		description: partial.description ?? "",
// 		widgetIds: partial.widgetIds ?? [],
// 	};

// 	return DashboardSchema.parse(dash);
// }
