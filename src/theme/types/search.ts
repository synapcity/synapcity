export type SearchItem = {
	id: string;
	label: string;
	type: "note" | "tag" | "user";
	icon?: React.ReactNode;
	onSelect?: () => void;
};
