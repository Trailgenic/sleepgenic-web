export default function CheckoutSuccessPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080c0f",
        color: "#e8edf2",
        display: "grid",
        alignContent: "space-between",
        paddingTop: 88,
      }}
    >
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "2rem 1rem", width: "100%" }}>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(2.1rem, 5vw, 3.2rem)", marginBottom: "1rem" }}>
          You&apos;re in. Your review starts now.
        </h1>
        <p style={{ color: "#8fa3b3", marginBottom: "0.6rem" }}>
          A licensed provider will review your intake within 24 hours.
        </p>
        <p style={{ color: "#8fa3b3", marginBottom: "1rem" }}>
          Check your email for confirmation and next steps.
        </p>
        <p style={{ color: "#8fa3b3" }}>Questions? Email us at hello@sleepgenic.ai</p>
      </section>

      <footer
        style={{
          borderTop: "1px solid #1e2d3d",
          textAlign: "center",
          color: "#556070",
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.72rem",
          padding: "1rem",
        }}
      >
        Sleepgenic is a technology platform. All clinical decisions are made by independent licensed providers.
      </footer>
    </main>
  );
}
