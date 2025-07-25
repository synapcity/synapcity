export type Format = "csv" | "json" | "xlsx" | "pdf" | "txt";

export interface PdfColumn {
	header: string;
	dataKey: string;
}
