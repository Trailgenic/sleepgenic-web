import Link from "next/link";

const S = {
  bg: "#080c0f",
  bg2: "#0d1117",
  surface: "#141c24",
  border: "#1e2d3d",
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
            Mission
          </div>
          <h1 style={{ fontFamily: S.garamond, color: S.text, fontSize: "clamp(2.8rem, 6.5vw, 5rem)", fontWeight: 500, lineHeight: 1.08, marginBottom: "1.2rem" }}>
            Why Sleepgenic exists.
          </h1>
          <p style={{ fontFamily: S.syne, color: S.text2, fontSize: "1rem", lineHeight: 1.7, maxWidth: 820 }}>
            The access gap in insomnia care is not a clinical problem. It is a distribution problem. CBT-I works. The evidence is unambiguous. But with roughly 60,000 patients per specialist, most people will never access guideline-first care through traditional pathways.
          </p>
        </div>
      </section>

      <section style={{ padding: "3.5rem 2rem", background: S.bg2, borderBottom: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gap: "1rem" }}>
          {[
            "Sleepgenic is the distribution layer for insomnia care.",
            "We are a technology platform that routes the right data into the right clinical workflow at the right time.",
            "Clinical decisions are made by independent licensed providers.",
          ].map((line, index) => (
            <div key={line} style={{ background: S.surface, border: `1px solid ${S.border}`, padding: "1.4rem 1.5rem", display: "flex", gap: "1rem" }}>
              <span style={{ fontFamily: S.mono, color: S.text3, fontSize: "0.72rem", marginTop: "0.25rem" }}>0{index + 1}</span>
              <p style={{ fontFamily: S.syne, color: S.text2, fontSize: "0.95rem", lineHeight: 1.6 }}>{line}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "3.5rem 2rem 5rem" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", background: "rgba(59,130,246,0.08)", border: `1px solid ${S.accent}`, padding: "1.5rem" }}>
          <div style={{ fontFamily: S.mono, color: S.accent, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: "0.7rem" }}>
            Clinical Disclaimer
          </div>
          <p style={{ fontFamily: S.syne, color: S.text, lineHeight: 1.6, marginBottom: "1.2rem" }}>
            Sleepgenic is a technology platform. All clinical decisions are made by independent licensed providers.
          </p>
          <Link href="/start" style={{ fontFamily: S.syne, fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", background: S.accent, padding: "0.9rem 1.4rem", display: "inline-block", textDecoration: "none" }}>
            Start Your Assessment — Coming Soon
          </Link>
        </div>
      </section>
    </main>
  );
}
