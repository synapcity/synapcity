/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Callback = (actionKey: string, id?: string, payload?: any) => void;

export function useActionStatus(options?: {
  id?: string;
  actionKey?: string;
  onStart?: Callback;
  onFinish?: Callback;
  onFail?: Callback;
  debounceDelay?: number; // delay before showing spinner (ms)
  minDisplayDuration?: number; // once shown, keep spinner this long (ms)
}) {
  const {
    id,
    actionKey = "loading",
    onStart,
    onFinish,
    onFail,
    debounceDelay = 100, // default: don't flash for ultra-fast ops
    minDisplayDuration = 250, // once visible, keep at least this long
  } = options || {};

  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const startTsRef = useRef<number | null>(null);
  const showTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const hasShownRef = useRef(false);

  const router = useRouter();

  const clearTimers = () => {
    if (showTimerRef.current !== null) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
    if (hideTimerRef.current !== null) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const start = useCallback(() => {
    setError(null);
    startTsRef.current = Date.now();
    hasShownRef.current = false;

    // invoke external
    onStart?.(actionKey, id);

    // debounce before showing loading indicator
    if (debounceDelay > 0) {
      showTimerRef.current = window.setTimeout(() => {
        setIsRunning(true);
        hasShownRef.current = true;
        showTimerRef.current = null;
      }, debounceDelay);
    } else {
      setIsRunning(true);
      hasShownRef.current = true;
    }
  }, [actionKey, id, onStart, debounceDelay]);

  const finish = useCallback(() => {
    onFinish?.(actionKey, id);

    const finalize = () => {
      setIsRunning(false);
      startTsRef.current = null;
      hasShownRef.current = false;
    };

    if (hasShownRef.current) {
      // ensure minimum display duration
      const elapsedSinceShow =
        startTsRef.current != null
          ? Date.now() - (startTsRef.current + debounceDelay)
          : minDisplayDuration;

      const remaining = Math.max(minDisplayDuration - elapsedSinceShow, 0);
      hideTimerRef.current = window.setTimeout(() => {
        finalize();
        hideTimerRef.current = null;
      }, remaining);
    } else {
      // spinner never showed (still in debounce), cancel show and just clear
      clearTimers();
      finalize();
    }
  }, [actionKey, id, onFinish, debounceDelay, minDisplayDuration]);

  const fail = useCallback(
    (err: unknown) => {
      onFail?.(actionKey, id, err);
      setError(err);

      const finalize = () => {
        setIsRunning(false);
        startTsRef.current = null;
        hasShownRef.current = false;
      };

      if (hasShownRef.current) {
        // same minimum-display logic on failure if spinner already visible
        const elapsedSinceShow =
          startTsRef.current != null
            ? Date.now() - (startTsRef.current + debounceDelay)
            : minDisplayDuration;
        const remaining = Math.max(minDisplayDuration - elapsedSinceShow, 0);
        hideTimerRef.current = window.setTimeout(() => {
          finalize();
          hideTimerRef.current = null;
        }, remaining);
      } else {
        clearTimers();
        finalize();
      }
    },
    [actionKey, id, onFail, debounceDelay, minDisplayDuration]
  );

  // cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  /**
   * Wrap an arbitrary callback (e.g., navigation) so start/finalize are called
   */
  const wrapAction = useCallback(
    (fn: () => void | Promise<void>) => {
      return async (e?: React.MouseEvent) => {
        e?.preventDefault();
        start();
        try {
          const result = fn();
          if (result instanceof Promise) {
            await result;
          }
          finish();
        } catch (err) {
          fail(err);
          throw err;
        }
      };
    },
    [start, finish, fail]
  );

  const pushWithStatus = useCallback(
    (href: string) => {
      start();
      router.push(href);
      // we don't know when route transition completes here; caller could call finish in effect
    },
    [router, start]
  );

  return {
    isRunning,
    error,
    start,
    finish,
    fail,
    wrapAction,
    pushWithStatus,
  };
}
