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

export default function AboutPage() {
  return (
    <main style={{ background: S.bg, minHeight: "100vh", paddingTop: 64 }}>
      <section style={{ padding: "5rem 2rem", borderBottom: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ fontFamily: S.mono, color: S.accent, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Sleep Medicine Access
          </div>
          <h1 style={{ fontFamily: S.garamond, color: S.text, fontSize: "clamp(2.8rem, 6.5vw, 5rem)", fontWeight: 500, lineHeight: 1.08, marginBottom: "1.2rem" }}>
            Why Sleepgenic exists.
          </h1>
          <p style={{ fontFamily: S.syne, color: S.text2, fontSize: "1rem", lineHeight: 1.72, maxWidth: 900 }}>
            Sleepgenic is a pure access platform. We monetize the access gap, not therapy delivery. CBT-I works — the evidence is unambiguous — but 60,000 patients per specialist means most people will never reach it.
          </p>
        </div>
      </section>

      <section style={{ padding: "3.5rem 2rem", background: S.bg2, borderBottom: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gap: "1rem" }}>
          {[
            "Sleepgenic is the distribution layer for sleep medicine access.",
            "Technology platform only.",
            "All clinical decisions are made by independent licensed providers.",
          ].map((line, index) => (
            <div key={line} style={{ background: S.surface, border: `1px solid ${S.border2}`, padding: "1.4rem 1.5rem", display: "flex", gap: "1rem" }}>
              <span style={{ fontFamily: S.mono, color: S.text3, fontSize: "0.72rem", marginTop: "0.25rem" }}>0{index + 1}</span>
              <p style={{ fontFamily: S.syne, color: S.text2, fontSize: "0.95rem", lineHeight: 1.62 }}>{line}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${S.border}`, padding: "1.5rem 2rem 2rem" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", fontFamily: S.mono, color: S.text3, fontSize: "0.7rem", letterSpacing: "0.06em" }}>
          Sleepgenic is a technology platform. All clinical decisions are made by independent licensed providers.
        </div>
      </footer>
    </main>
  );
}
