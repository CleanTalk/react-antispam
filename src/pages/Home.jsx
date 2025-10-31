export default function Home() {
  return (
    <section>
      <h1>Welcome</h1>
      <p>This is a simple React website scaffolded with Vite.</p>
      <div className="grid">
        <div className="card">
          <h3>Fast dev</h3>
          <p>Instant hot reload and modern tooling with Vite.</p>
        </div>
        <div className="card">
          <h3>Routing</h3>
          <p>Built with React Router for multiple pages.</p>
        </div>
        <div className="card">
          <h3>Contact form</h3>
          <p>Validated form with pluggable submission endpoint.</p>
        </div>
      </div>
    </section>
  )
}


