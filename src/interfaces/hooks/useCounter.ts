import { useState, useCallback } from 'react';
import { Counter } from '@domain/entities';

export interface UseCounterResult {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  multiplyByTwo: () => void;
}

/**
 * React hook for counter state management.
 * Thin adapter: delegates all business rules (min/max limits, reset)
 * to the Counter domain entity. No logic lives here.
 */
export function useCounter(): UseCounterResult {
  // Each action clones the entity, mutates the clone, and stores it so
  // React detects the new reference and schedules a re-render.
  const [counter, setCounter] = useState<Counter>(() => Counter.create());

  const increment = useCallback(() => {
    setCounter((prev: Counter) => {
      const next = prev.clone();
      next.increment();
      return next;
    });
  }, []);

  const decrement = useCallback(() => {
    setCounter((prev: Counter) => {
      const next = prev.clone();
      next.decrement();
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setCounter((prev: Counter) => {
      const next = prev.clone();
      next.reset();
      return next;
    });
  }, []);

  const multiplyByTwo = useCallback(() => {
    setCounter((prev: Counter) => {
      const next = prev.clone();
      next.multiplyByTwo();
      return next;
    });
  }, []);

  return { count: counter.count, increment, decrement, reset, multiplyByTwo };
}
