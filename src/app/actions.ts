"use server";

import { ThemeMode } from "@/theme";
import { cookies } from "next/headers";

export async function create(theme: ThemeMode) {
	const cookieStore = await cookies();
	cookieStore.set("theme", theme);
}
