'use client';

import type { CSSProperties } from 'react';
import { Counter as CounterEntity } from '@domain/entities';
import { useCounter } from '@interfaces/hooks';

/**
 * Counter UI component.
 * Thin presenter: delegates all state management and business rules
 * to the useCounter hook (which delegates to the Counter domain entity).
 * No logic lives here beyond rendering and wiring user actions to the hook.
 */
export function Counter() {
  const { count, increment, decrement, reset, multiplyByTwo } = useCounter();

  const atMin = count === CounterEntity.MIN;
  const atMax = count === CounterEntity.MAX;
  const atZero = count === 0;

  return (
    <div style={styles.wrapper}>
      <p style={styles.count} aria-live="polite" aria-atomic="true">
        {count}
      </p>
      <div style={styles.controls}>
        <button
          onClick={decrement}
          disabled={atMin}
          style={{ ...styles.button, ...(atMin ? styles.buttonDisabled : {}) }}
          aria-label="Decrement"
        >
          −
        </button>
        <button
          onClick={multiplyByTwo}
          disabled={atZero}
          style={{ ...styles.button, ...styles.multiplyButton, ...(atZero ? styles.buttonDisabled : {}) }}
          aria-label="Multiply by 2"
        >
          ×2
        </button>
        <button
          onClick={reset}
          style={{ ...styles.button, ...styles.restartButton }}
          aria-label="Restart"
        >
          Restart
        </button>
        <button
          onClick={increment}
          disabled={atMax}
          style={{ ...styles.button, ...(atMax ? styles.buttonDisabled : {}) }}
          aria-label="Increment"
        >
          +
        </button>
      </div>
      {(atMin || atMax) && (
        <p style={styles.limitNote}>
          {atMin ? `Minimum limit (${CounterEntity.MIN}) reached` : `Maximum limit (${CounterEntity.MAX}) reached`}
        </p>
      )}
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
    minWidth: '280px',
  },
  count: {
    fontSize: '4rem',
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '-0.02em',
    color: '#1a1a1a',
    minWidth: '8rem',
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
    transition: 'background 0.15s ease, opacity 0.15s ease',
  },
  buttonDisabled: {
    background: '#d1d5db',
    color: '#9ca3af',
    cursor: 'not-allowed',
  },
  multiplyButton: {
    fontSize: '0.9rem',
    background: '#7c3aed',
  },
  restartButton: {
    fontSize: '0.875rem',
    width: 'auto',
    padding: '0 1rem',
    background: '#6b7280',
  },
  limitNote: {
    fontSize: '0.75rem',
    color: '#ef4444',
    textAlign: 'center',
  },
};
