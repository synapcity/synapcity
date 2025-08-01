import { capitalize } from "lodash";
import type { UILocalStatus, StatusKeys, StatusField } from "@/types/ui";

export const defaultStatus: UILocalStatus = {
	isLoading: false,
	isCreating: false,
	isSaving: false,
	isDeleting: false,
	isEditing: false,
	isSearching: false,
	isSyncing: false,
	error: null,
	lastSavedAt: null,
};

export function toStatusKey(field: StatusField): StatusKeys {
	return `is${capitalize(field)}` as StatusKeys;
}
