export default function HomePage() {
  return (
    <main
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <h1>TESTO</h1>
      <p>A Next.js application built with Clean Architecture.</p>

      <section style={{ marginTop: '2rem' }}>
        <h2>API Endpoints</h2>
        <ul style={{ lineHeight: '2' }}>
          <li>
            <code>GET /api/users</code> — List all users
          </li>
          <li>
            <code>POST /api/users</code> — Create a new user
          </li>
          <li>
            <code>GET /api/users/:id</code> — Get a user by ID
          </li>
          <li>
            <code>GET /api/health</code> — Health check
          </li>
        </ul>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Example: Create a User</h2>
        <pre
          style={{
            background: '#f4f4f4',
            padding: '1rem',
            borderRadius: '8px',
            overflow: 'auto',
          }}
        >
          {`curl -X POST http://localhost:3000/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Alice", "email": "alice@example.com"}'`}
        </pre>
      </section>
    </main>
  );
}
