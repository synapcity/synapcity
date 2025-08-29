"use client";

import { useMemo } from "react";
import {
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export const useSortableSetup = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isTestEnv = typeof window !== "undefined" && (window as any).Cypress;
  const sensors = useSensors(
    useSensor(isTestEnv ? MouseSensor : PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const dndContextProps = useMemo(
    () => ({
      collisionDetection: closestCenter,
      sensors,
    }),
    [sensors]
  );

  return { dndContextProps };
};
