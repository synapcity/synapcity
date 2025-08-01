"use client";

import { useContext } from "react";
import { MetadataContext } from "../metadata-context";

export function useMetadata() {
	const ctx = useContext(MetadataContext);
	if (!ctx) {
		throw new Error("useMetadata must be used within a MetadataProvider");
	}
	return ctx;
}
