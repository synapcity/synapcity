import { capitalize } from "lodash";
import type { UILocalStatus, StatusKeys, StatusField } from "./types";

export const defaultStatus: UILocalStatus = {
	isSearching: false,
	isEditing: false,
	isDeleting: false,
	isSaving: false,
	isLoading: false,
	error: null,
	lastSavedAt: null,
};

export function toStatusKey(field: StatusField): StatusKeys {
	return `is${capitalize(field)}` as StatusKeys;
}
