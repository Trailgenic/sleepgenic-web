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
  garamond: "'EB Garamond', serif",
  syne: "'Syne', sans-serif",
  mono: "'DM Mono', monospace",
};

export default function AboutPage() {
  return (
    <main style={{ background: S.bg, minHeight: "100vh", paddingTop: 64 }}>

      {/* HERO */}
      <section className="about-hero" style={{ padding: "5rem 2rem", borderBottom: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ fontFamily: S.mono, color: S.accent, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Why Sleepgenic Exists
          </div>
          <h1 style={{ fontFamily: S.garamond, color: S.text, fontSize: "clamp(2.8rem, 6.5vw, 5rem)", fontWeight: 500, lineHeight: 1.08, marginBottom: "1.5rem" }}>
            This is a distribution problem.<br />
            <em style={{ color: S.text2 }}>Not a clinical one.</em>
          </h1>
          <p style={{ fontFamily: S.syne, color: S.text2, fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 720 }}>
            CBT-I works. The evidence is unambiguous — the American Academy of Sleep Medicine identifies it as first-line treatment for chronic insomnia. The problem is not the science. The problem is that there are 60,000 patients for every certified specialist. Most people who need this will never reach it through the traditional system.
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="about-body" style={{ padding: "4rem 2rem", borderBottom: `1px solid ${S.border}` }}>
        <div className="about-body-grid" style={{ maxWidth: 980, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          <div>
            <div style={{ fontFamily: S.mono, color: S.accent, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "1rem" }}>
              The Access Gap
            </div>
            <p style={{ fontFamily: S.syne, color: S.text2, fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1.25rem" }}>
              The traditional pathway to sleep medicine is a 9–18 month obstacle course: PCP visit, specialist referral, possible sleep study, post-study consultation. At each step there is friction, delay, and cost. Most patients give up or go undiagnosed.
            </p>
            <p style={{ fontFamily: S.syne, color: S.text2, fontSize: "0.95rem", lineHeight: 1.75 }}>
              Fewer than 500 board-certified sleep medicine specialists exist in the US. 30 million Americans have diagnosed insomnia. The math does not work.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: S.mono, color: S.accent, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "1rem" }}>
              The Model
            </div>
            <p style={{ fontFamily: S.syne, color: S.text2, fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1.25rem" }}>
              Sleepgenic is a pure access platform. We sit between the patient and the clinical infrastructure. Brand and patient acquisition on top. Licensed provider network underneath. Nothing else.
            </p>
            <p style={{ fontFamily: S.syne, color: S.text2, fontSize: "0.95rem", lineHeight: 1.75 }}>
              We do not employ therapists. We do not deliver CBT-I. We do not manage the clinical relationship. We connect patients with licensed providers who make every clinical decision independently.
            </p>
          </div>
        </div>
      </section>

      {/* THREE PRINCIPLES */}
      <section className="about-principles" style={{ padding: "3.5rem 2rem", background: S.bg2, borderBottom: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gap: "1rem" }}>
          {[
            { n: "01", text: "Sleepgenic is the distribution layer for sleep medicine access. Not a therapy platform. Not a coaching service. Access." },
            { n: "02", text: "Technology platform only. All clinical decisions are made by independent licensed providers through our clinical infrastructure partner." },
            { n: "03", text: "The patient we serve has been failed by the existing system — not because the medicine does not exist, but because the access does not. We fix the access." },
          ].map((item) => (
            <div key={item.n} style={{ background: S.surface, border: `1px solid ${S.border2}`, padding: "1.4rem 1.5rem", display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
              <span style={{ fontFamily: S.mono, color: S.text3, fontSize: "0.72rem", marginTop: "0.25rem", flexShrink: 0 }}>{item.n}</span>
              <p style={{ fontFamily: S.syne, color: S.text2, fontSize: "0.95rem", lineHeight: 1.65 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta" style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <h2 style={{ fontFamily: S.garamond, color: S.text, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, marginBottom: "1rem" }}>
            Cash-pay sleep medicine access.<br />
            <em style={{ color: S.text2 }}>Licensed provider review in 24 hours.</em>
          </h2>
          <p style={{ fontFamily: S.syne, color: S.text2, fontSize: "0.95rem", marginBottom: "2rem" }}>
            $149/month. No insurance. No referral. No waitlist.
          </p>
          <Link href="/start" style={{ fontFamily: S.syne, fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", background: S.accent, padding: "1rem 2rem", display: "inline-block", textDecoration: "none" }}>
            Start Your Assessment — Coming Soon
          </Link>
        </div>
      </section>


      <style jsx global>{`
        @media (max-width: 768px) {
          .about-hero,
          .about-body,
          .about-principles,
          .about-cta {
            padding-top: 3rem !important;
            padding-bottom: 3rem !important;
          }

          .about-body-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>

      <footer style={{ borderTop: `1px solid ${S.border}`, padding: "1.5rem 2rem 2rem" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", fontFamily: S.mono, color: S.text3, fontSize: "0.7rem", letterSpacing: "0.06em" }}>
          Sleepgenic is a technology platform. All clinical decisions are made by independent licensed providers.
        </div>
      </footer>
    </main>
  );
}
