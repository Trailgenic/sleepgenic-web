const S = {
  bg: "#080c0f",
  bg2: "#0d1117",
  surface: "#141c24",
  border: "#1e2d3d",
  border2: "#263545",
  text: "#e8edf2",
  text2: "#8fa3b3",
  text3: "#556070",
  accent: "#3b82f6",
  garamond: "'EB Garamond', serif",
  syne: "'Syne', sans-serif",
  mono: "'DM Mono', monospace",
};

export default function StartPage() {
  return (
    <main style={{ background: S.bg, minHeight: "100vh", paddingTop: 64 }}>
      <section style={{ padding: "6rem 2rem 4rem", textAlign: "center", borderBottom: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <div style={{ fontFamily: S.mono, color: S.accent, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Launch Queue
          </div>
          <h1 style={{ fontFamily: S.garamond, color: S.text, fontWeight: 500, lineHeight: 1.1, fontSize: "clamp(2.8rem, 7vw, 5rem)", marginBottom: "1rem" }}>
            Your assessment is almost ready.
          </h1>
          <p style={{ fontFamily: S.syne, color: S.text2, fontSize: "1rem", lineHeight: 1.65, maxWidth: 620, margin: "0 auto 2rem" }}>
            We&apos;re putting the finishing touches on our intake flow. Enter your email to be notified when we launch.
          </p>

          <div style={{ maxWidth: 560, margin: "0 auto", display: "flex", gap: "0.7rem", alignItems: "stretch", flexWrap: "wrap", justifyContent: "center" }}>
            <input
              type="email"
              placeholder="name@company.com"
              style={{
                flex: "1 1 320px",
                background: S.surface,
                border: `1px solid ${S.border2}`,
                color: S.text,
                padding: "0.92rem 0.95rem",
                fontFamily: S.syne,
                fontSize: "0.95rem",
                outline: "none",
                minWidth: 0,
              }}
            />
            <button
              type="button"
              style={{
                border: `1px solid ${S.accent}`,
                background: S.accent,
                color: "#fff",
                fontFamily: S.syne,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontSize: "0.78rem",
                padding: "0.95rem 1.2rem",
                cursor: "default",
              }}
            >
              Notify Me
            </button>
          </div>
        </div>
      </section>

      <section style={{ padding: "3rem 2rem 5rem", background: S.bg2, borderBottom: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.8rem" }}>
          {[
            ["10 Questions", "Biometric intake can be completed in minutes."],
            ["24hr Review", "Independent licensed provider turnaround target."],
            ["$149/month", "Cash-pay model. HSA/FSA eligible. Cancel anytime."],
          ].map(([title, copy]) => (
            <div key={title} style={{ background: S.surface, border: `1px solid ${S.border}`, padding: "1.2rem" }}>
              <div style={{ fontFamily: S.mono, color: S.accent, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>{title}</div>
              <p style={{ fontFamily: S.syne, color: S.text2, fontSize: "0.9rem", lineHeight: 1.55 }}>{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${S.border}`, padding: "1.2rem 2rem 2rem", fontFamily: S.mono, color: S.text3, fontSize: "0.7rem", letterSpacing: "0.06em" }}>
        Sleepgenic is a technology platform. All clinical decisions are made by independent licensed providers.
      </footer>
    </main>
  );
}
