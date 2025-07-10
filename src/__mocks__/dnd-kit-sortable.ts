let isDraggingMock = false;

export function setDragging(value: boolean) {
	isDraggingMock = value;
}

export const useSortableMock = () => ({
	attributes: { role: "listitem" },
	listeners: { onPointerDown: jest.fn() },
	setNodeRef: jest.fn(),
	transform: { x: 10, y: 20 },
	transition: "transform 200ms ease",
	isDragging: isDraggingMock,
});
