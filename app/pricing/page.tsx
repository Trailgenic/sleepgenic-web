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

const included = [
  "10-question biometric intake assessment",
  "Licensed provider clinical review within 24 hours",
  "CBT-I protocol where indicated",
  "Prescription where clinically indicated — trazodone or FDA-approved orexin antagonist",
  "HSA/FSA eligible",
  "Cancel anytime",
];

const faq = [
  ["Why cash-pay?", "Insurance requires referrals, prior authorizations, and formulary approvals that add months to a process that should take 24 hours. Cash-pay removes every one of those barriers. You pay, you get treated."],
  ["Is this HSA/FSA eligible?", "Yes. Sleepgenic membership is structured to be HSA/FSA eligible."],
  ["Can I cancel?", "Yes. Month-to-month pricing with cancellation anytime."],
  ["What if I need medication?", "Independent licensed providers can prescribe where clinically indicated — trazodone or FDA-approved orexin antagonists like Quviviq where appropriate."],
];

export default function PricingPage() {
  return (
    <main style={{ background: S.bg, minHeight: "100vh", paddingTop: 64 }}>
      <section className="pricing-hero" style={{ padding: "5rem 2rem", borderBottom: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ fontFamily: S.mono, color: S.accent, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Sleep Medicine Access
          </div>
          <h1 style={{ fontFamily: S.garamond, fontSize: "clamp(2.8rem, 7vw, 5rem)", fontWeight: 500, color: S.text, lineHeight: 1.05 }}>
            $149<span style={{ color: S.text2, fontSize: "1.6rem" }}>/month</span>
          </h1>
          <p style={{ fontFamily: S.syne, color: S.text2, marginTop: "0.75rem", fontSize: "1rem" }}>One plan. No tiers. No insurance required.</p>
        </div>
      </section>

      <section className="pricing-included" style={{ padding: "3rem 2rem", background: S.bg2, borderBottom: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", background: S.surface, border: `1px solid ${S.border2}`, padding: "2rem" }}>
          <div style={{ display: "grid", gap: "0.85rem" }}>
            {included.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.7rem", borderBottom: `1px solid ${S.border}`, paddingBottom: "0.7rem" }}>
                <span style={{ fontFamily: S.mono, color: S.green, fontSize: "0.8rem" }}>✓</span>
                <span style={{ fontFamily: S.syne, color: S.text2, fontSize: "0.95rem" }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "2rem" }}>
            <Link href="/start" style={{ fontFamily: S.syne, fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", background: S.accent, padding: "0.95rem 1.5rem", display: "inline-block", textDecoration: "none" }}>
              Start Your Assessment — Coming Soon
            </Link>
          </div>
        </div>
      </section>

      <section className="pricing-faq" style={{ padding: "3rem 2rem 4rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", borderTop: `1px solid ${S.border}`, borderLeft: `1px solid ${S.border}` }}>
          {faq.map(([q, a]) => (
            <div key={q} style={{ borderRight: `1px solid ${S.border}`, borderBottom: `1px solid ${S.border}`, padding: "1.35rem" }}>
              <div style={{ fontFamily: S.mono, color: S.accent, fontSize: "0.68rem", letterSpacing: "0.11em", textTransform: "uppercase", marginBottom: "0.45rem" }}>{q}</div>
              <p style={{ fontFamily: S.syne, color: S.text2, fontSize: "0.92rem", lineHeight: 1.55 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>


      <style jsx global>{`
        @media (max-width: 768px) {
          .pricing-hero,
          .pricing-included,
          .pricing-faq {
            padding-top: 3rem !important;
            padding-bottom: 3rem !important;
          }

          .pricing-hero p,
          .pricing-included span,
          .pricing-faq p {
            font-size: 0.9rem !important;
          }
        }
      `}</style>

      <footer style={{ borderTop: `1px solid ${S.border}`, padding: "1.2rem 2rem 2rem", fontFamily: S.mono, color: S.text3, fontSize: "0.7rem", letterSpacing: "0.06em" }}>
        Sleepgenic is a technology platform. All clinical decisions are made by independent licensed providers.
      </footer>
    </main>
  );
}
