import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

type Draggable = {
  htmlElement: HTMLElement;
  data: {
    top: number;
    left: number;
    height: number;
    right: number;
    width: number;
  };
};

type Line = {
  htmlElement: HTMLElement;
  data: {
    top: number;
    left: number;
    height: number;
    width: number;
  };
};

interface MiniLibraryStoreProps {
  draggable?: Draggable;
  setDraggable: (value: Draggable) => void;
  line?: Line;
  setLine: (value: Line) => void;
  resetState: () => void;
}
export const draggableStore = create<MiniLibraryStoreProps, [["zustand/devtools", never]]>(
  devtools(
    (set, get) => ({
      draggable: undefined,
      setDraggable: (value) => {
        set(
          {
            draggable: value,
          },
          false,
          { type: "setDraggable", value }
        );
      },
      line: undefined,
      setLine: (value) => {
        const prevLine = get().line?.data;

        if (
          prevLine?.top === value.data.top &&
          prevLine?.left === value.data.left &&
          prevLine?.height === value.data.height &&
          prevLine?.width === value.data.width
        ) {
          return;
        }

        set(
          {
            line: value,
          },
          false,
          { type: "setLine", value }
        );
      },
      resetState: () => {
        set(
          {
            line: undefined,
            draggable: undefined,
          },
          false,
          { type: "resetState" }
        );
      },
    }),
    { name: "draggableStore" }
  )
);

export const useDraggableStore = () =>
  draggableStore(
    useShallow(({ draggable, resetState, setDraggable }) => ({
      draggable,
      setDraggable,
      resetState,
    }))
  );
export const useDraggableLineStore = () =>
  draggableStore(
    useShallow(({ line, setLine, resetState }) => ({
      line,
      setLine,
      resetState,
    }))
  );

export const useDragStore = () =>
  draggableStore(
    useShallow(({ draggable, line, setDraggable, setLine, resetState }) => ({
      draggable,
      line,
      setDraggable,
      setLine,
      resetState,
    }))
  );
