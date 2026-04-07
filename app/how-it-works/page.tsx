import Link from "next/link";

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
  green: "#22c55e",
  garamond: "'EB Garamond', serif",
  syne: "'Syne', sans-serif",
  mono: "'DM Mono', monospace",
};

const steps = [
  {
    title: "Complete your 10-question biometric intake.",
    detail: "Answerable from your Garmin, Whoop, or Apple Watch. Takes 5 minutes.",
  },
  {
    title: "Pay $149/month.",
    detail: "HSA/FSA eligible. Cancel anytime.",
  },
  {
    title: "A licensed provider reviews your case within 24 hours and makes a clinical determination independently.",
    detail: "Sleepgenic provides the access layer and clinical routing infrastructure.",
  },
  {
    title: "Receive your outcome — a CBT-I protocol, a prescription where clinically indicated, or both.",
    detail: "Trazodone or FDA-approved orexin antagonists like Quviviq where appropriate.",
  },
];

export default function HowItWorksPage() {
  return (
    <main style={{ background: S.bg, minHeight: "100vh", paddingTop: 64 }}>
      <section style={{ padding: "5rem 2rem 4rem", borderBottom: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontFamily: S.mono, color: S.accent, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Sleep Medicine Access
          </div>
          <h1 style={{ fontFamily: S.garamond, fontSize: "clamp(2.6rem, 6vw, 4.8rem)", lineHeight: 1.1, fontWeight: 500, color: S.text, marginBottom: "1.25rem" }}>
            How Sleepgenic works.
          </h1>
          <p style={{ fontFamily: S.syne, fontSize: "1rem", color: S.text2, maxWidth: 680, lineHeight: 1.65 }}>
            Cash-pay sleep medicine — online, today.
          </p>
        </div>
      </section>

      <section style={{ padding: "4rem 2rem", background: S.bg2, borderBottom: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gap: "1rem" }}>
          {steps.map((item, index) => (
            <div key={item.title} style={{ background: S.surface, border: `1px solid ${S.border2}`, padding: "1.5rem", display: "grid", gridTemplateColumns: "120px 1fr", gap: "1.5rem", alignItems: "start" }}>
              <div style={{ fontFamily: S.mono, color: S.accent, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Step 0{index + 1}
              </div>
              <div>
                <h2 style={{ fontFamily: S.garamond, fontSize: "1.85rem", fontWeight: 500, color: S.text, marginBottom: "0.5rem" }}>{item.title}</h2>
                <p style={{ fontFamily: S.syne, fontSize: "0.95rem", lineHeight: 1.6, color: S.text2 }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "4rem 2rem 5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div style={{ background: S.surface, border: `1px solid ${S.border}`, padding: "2rem" }}>
            <div style={{ fontFamily: S.mono, color: S.green, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.9rem" }}>
              Evidence Standard
            </div>
            <p style={{ fontFamily: S.syne, color: S.text2, lineHeight: 1.65, fontSize: "0.95rem" }}>
              CBT-I is first-line for chronic insomnia per AASM guidance. Providers assign CBT-I protocol where clinically appropriate and may prescribe medication where indicated.
            </p>
          </div>
          <div style={{ background: S.surface, border: `1px solid ${S.border}`, padding: "2rem" }}>
            <div style={{ fontFamily: S.mono, color: S.accent, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.9rem" }}>
              Start
            </div>
            <p style={{ fontFamily: S.syne, color: S.text2, lineHeight: 1.65, fontSize: "0.95rem", marginBottom: "1rem" }}>
              Sleep medicine access with licensed provider review within 24 hours.
            </p>
            <Link href="/start" style={{ fontFamily: S.syne, color: S.accent, textDecoration: "none", fontSize: "0.84rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
              Start Your Assessment — Coming Soon
            </Link>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${S.border}`, padding: "1.2rem 2rem 2rem", fontFamily: S.mono, color: S.text3, fontSize: "0.7rem", letterSpacing: "0.06em" }}>
        Sleepgenic is a technology platform. All clinical decisions are made by independent licensed providers.
      </footer>
    </main>
  );
}
