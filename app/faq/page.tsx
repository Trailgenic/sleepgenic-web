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
  ["What is CBT-I and why is it first-line treatment?", "CBT-I is first-line for chronic insomnia per AASM guidance because it addresses the core mechanisms of insomnia without defaulting to medication-first care."],
  ["What medications can be prescribed?", "Medication decisions are made by independent licensed providers. Prescription where clinically indicated may include trazodone or FDA-approved orexin antagonists."],
  ["Is this covered by insurance?", "Sleepgenic uses a cash-pay model at $149/month and is HSA/FSA eligible."],
  ["What wearable data do I need?", "The intake is designed to be answerable from Garmin, Whoop, or Apple Watch data plus your symptom history."],
  ["What happens after I submit my intake?", "Licensed provider review within 24 hours with an independent clinical determination."],
  ["How is Sleepgenic different from seeing a sleep specialist?", "Sleepgenic is the sleep medicine access layer designed to reduce access latency while preserving provider-led decisions."],
  ["Is my data private and secure?", "Sleepgenic is built for secure clinical workflows with minimal data collection."],
  ["Can I cancel anytime?", "Yes. Membership is month-to-month and can be canceled anytime."],
  ["Does Sleepgenic deliver CBT-I therapy?", "Sleepgenic is a technology platform that connects you with licensed providers. Your provider may assign a CBT-I protocol as part of your clinical outcome. Sleepgenic does not employ therapists or deliver behavioral therapy directly."],
  ["What is the ongoing relationship after my first review?", "Your subscription gives you continued access to licensed clinical oversight for prescription management and follow-up. Your provider manages your care independently. Sleepgenic provides the access layer."],
  ["Is Sleepgenic a medical provider?", "No. Sleepgenic is a technology platform. All clinical decisions are made by independent licensed providers through our clinical infrastructure partner. Sleepgenic does not practice medicine."],
  ["How is this different from just getting a prescription from my doctor?", "The traditional pathway to a sleep prescription costs $1,000–4,000 out of pocket and takes 9–18 months — PCP visit, specialist referral, possible sleep study, post-study consultation. Sleepgenic takes 24 hours and costs $149/month."],
];

export default function FaqPage() {
  return (
    <main style={{ background: S.bg, minHeight: "100vh", paddingTop: 64 }}>
      <section className="faq-hero" style={{ padding: "5rem 2rem", borderBottom: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ fontFamily: S.mono, color: S.accent, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Frequently Asked Questions
          </div>
          <h1 style={{ fontFamily: S.garamond, color: S.text, fontSize: "clamp(2.6rem, 6.5vw, 4.8rem)", fontWeight: 500, lineHeight: 1.1 }}>
            Clinical access, clearly explained.
          </h1>
        </div>
      </section>

      <section className="faq-list" style={{ padding: "3rem 2rem 4rem", background: S.bg2, borderBottom: `1px solid ${S.border}` }}>
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


      <style jsx global>{`
        @media (max-width: 768px) {
          .faq-hero,
          .faq-list {
            padding-top: 3rem !important;
            padding-bottom: 3rem !important;
          }

          .faq-list h2,
          .faq-list p {
            font-size: 0.9rem !important;
          }
        }
      `}</style>

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
