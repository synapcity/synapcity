import { renderHook } from "@testing-library/react";
import * as dndKitCore from "@dnd-kit/core";
import { useSortableSetup } from "./useSortableSetup";

describe("useSortableSetup", () => {
  afterEach(() => {
    // Reset window after each test
    Object.defineProperty(window, "Cypress", {
      configurable: true,
      writable: true,
      value: undefined,
    });
  });

  it("uses MouseSensor in test environment", () => {
    Object.defineProperty(window, "Cypress", {
      configurable: true,
      writable: true,
      value: true,
    });

    const useSensorSpy = jest.spyOn(dndKitCore, "useSensor");
    const useSensorsSpy = jest.spyOn(dndKitCore, "useSensors");

    renderHook(() => useSortableSetup());

    expect(useSensorSpy).toHaveBeenCalledTimes(2);

    expect(useSensorSpy).toHaveBeenNthCalledWith(
      1,
      dndKitCore.MouseSensor,
      expect.objectContaining({
        activationConstraint: expect.any(Object),
      })
    );
    expect(useSensorSpy).toHaveBeenNthCalledWith(
      2,
      dndKitCore.KeyboardSensor,
      expect.objectContaining({
        coordinateGetter: expect.any(Function),
      })
    );

    expect(useSensorsSpy).toHaveBeenCalled();

    useSensorSpy.mockRestore();
    useSensorsSpy.mockRestore();
  });

  it("uses PointerSensor in non-test environment", () => {
    Object.defineProperty(window, "Cypress", {
      configurable: true,
      writable: true,
      value: undefined,
    });

    const useSensorSpy = jest.spyOn(dndKitCore, "useSensor");
    const useSensorsSpy = jest.spyOn(dndKitCore, "useSensors");

    renderHook(() => useSortableSetup());

    expect(useSensorSpy).toHaveBeenCalledTimes(2);

    expect(useSensorSpy).toHaveBeenNthCalledWith(
      1,
      dndKitCore.PointerSensor,
      expect.objectContaining({
        activationConstraint: expect.any(Object),
      })
    );
    expect(useSensorSpy).toHaveBeenNthCalledWith(
      2,
      dndKitCore.KeyboardSensor,
      expect.objectContaining({
        coordinateGetter: expect.any(Function),
      })
    );

    expect(useSensorsSpy).toHaveBeenCalled();

    useSensorSpy.mockRestore();
    useSensorsSpy.mockRestore();
  });

  it("returns dndContextProps with correct collisionDetection and sensors", () => {
    const { result } = renderHook(() => useSortableSetup());
    expect(result.current.dndContextProps).toHaveProperty("collisionDetection");
    expect(typeof result.current.dndContextProps.collisionDetection).toBe("function");
    expect(result.current.dndContextProps).toHaveProperty("sensors");
    expect(Array.isArray(result.current.dndContextProps.sensors)).toBe(true);
  });
});
