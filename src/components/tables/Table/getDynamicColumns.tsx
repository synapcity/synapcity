import { ColumnDef } from "@tanstack/react-table";
import { RowData } from "@/types/table";
import LinkedResourcesCell from "./TableCell/LinkedResourcesCell/LinkedResourcesCell";
import RowActionsCell from "./TableCell/RowActionsCell/RowActionsCell";
import { UIDragHandle } from "./TableControls/UIDragHandle";

export function getDynamicColumns(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleUpdate: (id: string, updates: Record<string, any>) => void,
	handleDelete: (id: string) => void,
): ColumnDef<RowData>[] {
	return [
		{
			accessorKey: "title",
			header: "Title",
			cell: ({ row }) => (
				<span className="font-medium">{row.original.title}</span>
			),
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ row }) => (
				<span
					className={`
            rounded px-2 py-0.5 text-xs font-semibold
            ${row.original.status === "Done"
							? "bg-green-100 text-green-700"
							: row.original.status === "In Progress"
								? "bg-blue-100 text-blue-700"
								: "bg-gray-100 text-gray-700"
						}
          `}
				>
					{row.original.status}
				</span>
			),
		},
		{
			accessorKey: "priority",
			header: "Priority",
			cell: ({ row }) => row.original.priority ?? "",
		},
		{
			accessorKey: "linkedResources",
			header: "Links",
			cell: ({ row }) =>
				row.original.linkedResources?.length ? (
					<LinkedResourcesCell resources={row.original.linkedResources} />
				) : null,
			enableSorting: false,
		},
		{
			id: "actions",
			header: "",
			cell: ({ row }) => <RowActionsCell row={row.original} onDelete={handleDelete} onUpdate={handleUpdate} />,
			enableSorting: false,
		},
		{
			id: "drag",
			header: "",
			cell: ({ row }) => <UIDragHandle id={row.id} />,
			enableSorting: false,
			enableHiding: false,
		}
	];
}
