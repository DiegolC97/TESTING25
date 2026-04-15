'use client';

import type { CSSProperties } from 'react';
import { useCounter } from '@interfaces/hooks';

/**
 * Counter UI component.
 * Thin presenter: delegates all state management and business rules
 * to the useCounter hook (which delegates to the Counter domain entity).
 * No logic lives here beyond rendering and wiring user actions to the hook.
 */
export function Counter() {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <div style={styles.wrapper}>
      <p style={styles.count}>{count}</p>
      <div style={styles.controls}>
        <button onClick={decrement} style={styles.button} aria-label="Decrement">
          −
        </button>
        <button onClick={reset} style={{ ...styles.button, ...styles.resetButton }} aria-label="Reset">
          Reset
        </button>
        <button onClick={increment} style={styles.button} aria-label="Increment">
          +
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '2rem 3rem',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    background: '#ffffff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    minWidth: '240px',
  },
  count: {
    fontSize: '4rem',
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '-0.02em',
    color: '#1a1a1a',
    minWidth: '6rem',
    textAlign: 'center',
  },
  controls: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
  },
  button: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1,
    width: '3rem',
    height: '3rem',
    border: 'none',
    borderRadius: '8px',
    background: '#0070f3',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'background 0.15s ease',
  },
  resetButton: {
    fontSize: '0.875rem',
    width: 'auto',
    padding: '0 1rem',
    background: '#6b7280',
  },
};
