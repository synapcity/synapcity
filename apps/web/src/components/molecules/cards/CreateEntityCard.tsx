/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect, useRef } from "react";
import { CardWithLoading } from "./CardWithLoading";
import { useActionStatus } from "@/hooks/useActionStatus";

export interface CreateEntityCardProps<T = any> {
  /** Displayed when not creating, e.g. "New Note" / "New Dashboard" */
  idleLabel: string;
  /** Displayed while creating, e.g. "Creating…" */
  creatingLabel?: string;
  icon: ReactNode;
  /** Kick off creation; should return the created entity (must include `.id`) */
  create: (signal: AbortSignal) => Promise<T | null>;
  /** Optional optimistic stub inserter (before real create resolves) */
  insertOptimisticStub?: (stub: Partial<T>) => void;
  /** How to derive the navigation path from the created entity */
  getSuccessPath: (entity: T) => string;
  /** Optional callbacks to tie into external status systems */
  onStart?: () => void;
  onFinish?: () => void;
  onFail?: (err: unknown) => void;
  ariaLabel?: string;
}

export const CreateEntityCard: FC<CreateEntityCardProps<any>> = ({
  idleLabel,
  creatingLabel,
  icon,
  create,
  insertOptimisticStub,
  getSuccessPath,
  onStart,
  onFinish,
  onFail,
  ariaLabel,
}) => {
  const router = useRouter();
  const abortControllerRef = useRef<AbortController | null>(null);

  const {
    isRunning,
    wrapAction,
    fail: markFail,
    finish: markFinish,
  } = useActionStatus({
    actionKey: "creating",
    debounceDelay: 100,
    minDisplayDuration: 200,
    onStart: () => {
      onStart?.();
    },
    onFinish: () => {
      onFinish?.();
    },
    onFail: (_k, _i, err) => {
      onFail?.(err);
    },
  });

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const handleCreate = async (signal: AbortSignal) => {
    if (insertOptimisticStub) {
      // caller provides their shape for optimistic UI
      insertOptimisticStub({} as any);
    }

    let entity = null;
    try {
      entity = await create(signal);
      if (signal.aborted) return;
      if (entity) {
        router.push(getSuccessPath(entity));
      }
    } catch (err) {
      if (signal.aborted) return;
      markFail(err);
      onFail?.(err);
      // example toast fallback if caller didn't
      console.error("CreateEntityCard error:", err);
    } finally {
      markFinish();
    }
  };

  return (
    <CardWithLoading
      isLoading={isRunning}
      onClick={(e) => {
        wrapAction(() => {
          const ac = new AbortController();
          abortControllerRef.current = ac;
          return handleCreate(ac.signal);
        })(e);
      }}
      ariaLabel={ariaLabel}
    >
      <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-300 group-hover:text-(--accent)">
        {icon}
        <span className="mt-2 text-lg font-medium">
          {isRunning ? (creatingLabel ?? idleLabel + "…") : idleLabel}
        </span>
      </div>
    </CardWithLoading>
  );
};
