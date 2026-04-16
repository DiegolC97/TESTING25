import { Counter } from '@interfaces/components';

export default function CounterPage() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '4rem 2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Counter</h1>
      <p style={{ color: '#6b7280', textAlign: 'center' }}>
        Click <strong>+</strong> or <strong>−</strong> to change the count. Hit{' '}
        <strong>Restart</strong> to return to zero.
      </p>
      <Counter />
    </main>
  );
}
