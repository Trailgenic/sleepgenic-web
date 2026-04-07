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

const qa = [
  ["What is CBT-I and why is it first-line treatment?", "CBT-I is a structured behavioral protocol for chronic insomnia and is first-line per AASM guidance before routine medication-first approaches."],
  ["What medications can be prescribed?", "Medication options are determined by independent licensed providers when clinically indicated, including non-benzodiazepine and orexin-pathway options where appropriate."],
  ["Is this covered by insurance?", "Sleepgenic uses a cash-pay model. Pricing is transparent at $149/month and is HSA/FSA eligible."],
  ["What wearable data do I need?", "Your intake is designed to be answerable from Garmin, Whoop, or Apple Watch data plus your symptom history."],
  ["What happens after I submit my intake?", "Your case enters clinical review by an independent licensed provider with a target turnaround of 24 hours."],
  ["How is Sleepgenic different from seeing a sleep specialist?", "Sleepgenic is a technology distribution layer designed to reduce access latency while preserving provider-led clinical decisions."],
  ["Is my data private and secure?", "Sleepgenic is designed around minimal data collection and secure handling standards appropriate for clinical workflows."],
  ["Can I cancel anytime?", "Yes. Membership is month-to-month and can be canceled anytime."],
];

export default function FaqPage() {
  return (
    <main style={{ background: S.bg, minHeight: "100vh", paddingTop: 64 }}>
      <section style={{ padding: "5rem 2rem", borderBottom: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ fontFamily: S.mono, color: S.accent, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Frequently Asked Questions
          </div>
          <h1 style={{ fontFamily: S.garamond, color: S.text, fontSize: "clamp(2.6rem, 6.5vw, 4.8rem)", fontWeight: 500, lineHeight: 1.1 }}>
            Clinical operations, clearly explained.
          </h1>
        </div>
      </section>

      <section style={{ padding: "3rem 2rem 4rem", background: S.bg2, borderBottom: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gap: "0.8rem" }}>
          {qa.map(([question, answer], index) => (
            <div key={question} style={{ border: `1px solid ${S.border}`, background: S.surface, padding: "1.3rem 1.4rem" }}>
              <div style={{ display: "flex", gap: "0.9rem" }}>
                <span style={{ fontFamily: S.mono, color: S.text3, fontSize: "0.7rem", marginTop: "0.24rem" }}>{(index + 1).toString().padStart(2, "0")}</span>
                <div>
                  <h2 style={{ fontFamily: S.syne, color: S.text, fontSize: "0.95rem", marginBottom: "0.45rem", letterSpacing: "0.01em" }}>{question}</h2>
                  <p style={{ fontFamily: S.syne, color: S.text2, lineHeight: 1.6, fontSize: "0.92rem" }}>{answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${S.border}`, padding: "1.5rem 2rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ fontFamily: S.mono, color: S.text3, fontSize: "0.7rem", letterSpacing: "0.06em" }}>
          Sleepgenic is a technology platform. All clinical decisions are made by independent licensed providers.
        </div>
        <Link href="/start" style={{ fontFamily: S.syne, color: S.accent, textDecoration: "none", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
          Start Your Assessment — Coming Soon
        </Link>
      </footer>
    </main>
  );
}
