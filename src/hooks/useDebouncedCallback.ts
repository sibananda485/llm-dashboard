import { useCallback, useEffect, useRef } from "react";

export const useDebouncedCallback = <TArgs extends readonly unknown[]>(
  callback: (...args: TArgs) => void,
  delayMs: number,
): ((...args: TArgs) => void) => {
  const timerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    },
    [],
  );

  return useCallback(
    (...args: TArgs) => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(() => {
        callback(...args);
      }, delayMs);
    },
    [callback, delayMs],
  );
};

