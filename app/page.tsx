import Link from "next/link";

const S = {
  // Colors
  bg: "#080c0f",
  bg2: "#0d1117",
  surface: "#141c24",
  surface2: "#1a2330",
  border: "#1e2d3d",
  border2: "#263545",
  text: "#e8edf2",
  text2: "#8fa3b3",
  text3: "#556070",
  accent: "#3b82f6",
  accentDim: "#0f2747",
  green: "#22c55e",
  // Fonts
  garamond: "'EB Garamond', serif",
  syne: "'Syne', sans-serif",
  mono: "'DM Mono', monospace",
};

export default function Home() {
  return (
    <main style={{ background: S.bg, minHeight: "100vh" }}>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "0 2rem",
        paddingTop: 64,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(30,45,61,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(30,45,61,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }} />
        {/* Glow */}
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 760 }}>
            {/* Label */}
            <div style={{ fontFamily: S.mono, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: S.accent, marginBottom: "1.5rem" }}>
              Clinical Sleep Medicine
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: S.garamond,
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 500,
              lineHeight: 1.08,
              color: S.text,
              marginBottom: "1.75rem",
              letterSpacing: "-0.01em",
            }}>
              Finally. Sleep medicine<br />
              <em style={{ color: S.text2 }}>that doesn&apos;t make you<br />wait a year.</em>
            </h1>

            {/* Sub */}
            <p style={{
              fontFamily: S.syne,
              fontSize: "1.125rem",
              lineHeight: 1.6,
              color: S.text2,
              marginBottom: "2.5rem",
              maxWidth: 560,
            }}>
              30 million Americans have diagnosed insomnia. Fewer than 500 certified specialists exist. The waitlist is over a year.{" "}
              <span style={{ color: S.text }}>We are the access layer.</span>
            </p>

            {/* CTA row */}
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap", marginBottom: "4rem" }}>
              <a href="#" style={{
                fontFamily: S.syne, fontWeight: 600, fontSize: "0.85rem",
                letterSpacing: "0.08em", textTransform: "uppercase",
                padding: "1rem 2.25rem", background: S.accent, color: "#fff",
                textDecoration: "none", display: "inline-block",
                boxShadow: "0 0 30px rgba(59,130,246,0.2)",
              }}>
                Start Your Assessment — Coming Soon
              </a>
              <Link href="/how-it-works" style={{
                fontFamily: S.syne, fontWeight: 500, fontSize: "0.8rem",
                letterSpacing: "0.06em", textTransform: "uppercase",
                padding: "1rem 1.5rem", border: "1px solid #263545", color: S.text2,
                textDecoration: "none", display: "inline-block",
              }}>
                How It Works →
              </Link>
            </div>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", maxWidth: 560 }}>
              {[
                ["30M", "Diagnosed insomnia patients in the US"],
                ["< 500", "Board-certified CBT-I specialists nationwide"],
                ["24 hrs", "Provider review turnaround"],
              ].map(([n, l]) => (
                <div key={n} style={{ borderTop: `1px solid ${S.border}`, paddingTop: "1rem" }}>
                  <div style={{ fontFamily: S.mono, fontSize: "1.75rem", fontWeight: 500, color: S.text, lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: S.syne, fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: S.text3, marginTop: "0.4rem" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: floating data panel */}
        <div style={{
          position: "absolute", right: "4vw", top: "50%", transform: "translateY(-50%)",
          width: 280, display: "flex", flexDirection: "column", gap: "0.75rem",
          opacity: 0.85,
        }} className="hidden-mobile">
          {[
            { label: "HRV Baseline", value: "42 ms", delta: "−8 ms", bad: true },
            { label: "Deep Sleep", value: "0:48", delta: "11%", bad: true },
            { label: "Sleep Efficiency", value: "71%", delta: "↓", bad: true },
            { label: "Wake Episodes", value: "6", delta: "↑", bad: true },
          ].map((item) => (
            <div key={item.label} style={{
              background: S.surface, border: `1px solid ${S.border}`,
              padding: "0.875rem 1rem",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontFamily: S.mono, fontSize: "0.7rem", color: S.text3, letterSpacing: "0.05em" }}>{item.label}</span>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontFamily: S.mono, fontSize: "0.9rem", color: S.text }}>{item.value}</span>
                <span style={{ fontFamily: S.mono, fontSize: "0.65rem", color: "#ef4444", marginLeft: "0.5rem" }}>{item.delta}</span>
              </div>
            </div>
          ))}
          <div style={{
            background: S.accentDim, border: `1px solid ${S.accent}`,
            padding: "0.875rem 1rem", marginTop: "0.25rem",
          }}>
            <div style={{ fontFamily: S.mono, fontSize: "0.65rem", color: S.accent, letterSpacing: "0.1em", textTransform: "uppercase" }}>Clinical Assessment</div>
            <div style={{ fontFamily: S.syne, fontSize: "0.8rem", color: S.text, marginTop: "0.35rem" }}>Chronic onset insomnia — CBT-I candidate</div>
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section style={{
        borderTop: `1px solid ${S.border}`, borderBottom: `1px solid ${S.border}`,
        background: S.bg2,
        padding: "6rem 2rem",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
            <div>
              <div style={{ fontFamily: S.mono, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: S.accent, marginBottom: "1.5rem" }}>
                The Problem
              </div>
              <h2 style={{ fontFamily: S.garamond, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: S.text, lineHeight: 1.2, marginBottom: "1.5rem" }}>
                The system was not built for insomnia.
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  "Primary care physicians average 4 minutes on sleep complaints. They prescribe Ambien and move on.",
                  "Sleep specialists are booked 12–18 months out. Most require a referral to see one.",
                  "CBT-I — the AASM first-line recommended treatment — is available in-person to fewer than 2% of patients who need it.",
                  "There are 60,000 patients for every certified CBT-I therapist in the US.",
                ].map((text, i) => (
                  <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: S.mono, fontSize: "0.65rem", color: S.text3, marginTop: "0.35rem", flexShrink: 0 }}>0{i + 1}</span>
                    <p style={{ fontFamily: S.syne, fontSize: "0.95rem", lineHeight: 1.6, color: S.text2 }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: S.mono, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: S.green, marginBottom: "1.5rem" }}>
                The Solution
              </div>
              <h2 style={{ fontFamily: S.garamond, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: S.text, lineHeight: 1.2, marginBottom: "1.5rem" }}>
                Async clinical care, built on the evidence.
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { step: "10-question biometric intake", detail: "Answerable from your Garmin, Whoop, or Apple Watch data. Takes 5 minutes." },
                  { step: "Licensed provider review in 24 hours", detail: "A real clinician — not an algorithm — reviews your case and responds." },
                  { step: "CBT-I protocol delivered", detail: "The evidence-based behavioral treatment, structured and personalized for you." },
                  { step: "Medication where clinically indicated", detail: "Trazodone off-label or FDA-approved orexin antagonists like Quviviq — step-up only." },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: S.surface, border: `1px solid ${S.border}`,
                    padding: "1.25rem 1.5rem",
                  }}>
                    <div style={{ fontFamily: S.syne, fontWeight: 600, fontSize: "0.9rem", color: S.text, marginBottom: "0.4rem" }}>{item.step}</div>
                    <div style={{ fontFamily: S.syne, fontSize: "0.82rem", color: S.text2, lineHeight: 1.5 }}>{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CREDIBILITY SIGNALS */}
      <section style={{ padding: "5rem 2rem", background: S.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", borderTop: `1px solid ${S.border}`, borderLeft: `1px solid ${S.border}` }}>
            {[
              { tag: "AASM Guideline", title: "CBT-I is first-line.", body: "The American Academy of Sleep Medicine recommends CBT-I before medication for chronic insomnia. We lead with the evidence." },
              { tag: "Provider-led", title: "Licensed clinicians. Not a chatbot.", body: "Every Sleepgenic patient has their case reviewed by a licensed medical provider. AI assists. Humans decide." },
              { tag: "No Insurance Required", title: "$149/month. HSA/FSA eligible.", body: "Cash-pay means no pre-authorization, no formulary fights, no step therapy. You pay, you get treated." },
            ].map((item) => (
              <div key={item.tag} style={{
                borderRight: `1px solid ${S.border}`, borderBottom: `1px solid ${S.border}`,
                padding: "2.5rem",
              }}>
                <div style={{ fontFamily: S.mono, fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: S.accent, marginBottom: "1rem" }}>{item.tag}</div>
                <h3 style={{ fontFamily: S.garamond, fontSize: "1.5rem", fontWeight: 500, color: S.text, marginBottom: "0.75rem" }}>{item.title}</h3>
                <p style={{ fontFamily: S.syne, fontSize: "0.875rem", lineHeight: 1.65, color: S.text2 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section style={{ padding: "6rem 2rem", background: S.bg2, borderTop: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ maxWidth: 640, marginBottom: "3rem" }}>
            <div style={{ fontFamily: S.mono, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: S.accent, marginBottom: "1rem" }}>
              Who We Serve
            </div>
            <h2 style={{ fontFamily: S.garamond, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: S.text, lineHeight: 1.2 }}>
              You already know something is wrong.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: S.border }}>
            {[
              { icon: "◈", text: "You track HRV on a wearable and the numbers haven't been right for months." },
              { icon: "◈", text: "You&apos;ve read the sleep hygiene articles. You&apos;ve tried the magnesium. It didn&apos;t work." },
              { icon: "◈", text: "You want a clinical answer, not another app that plays white noise." },
              { icon: "◈", text: "You&apos;re not willing to wait a year for a specialist who might prescribe Ambien anyway." },
            ].map((item, i) => (
              <div key={i} style={{ background: S.bg, padding: "2rem 2.5rem", display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <span style={{ fontFamily: S.mono, color: S.accent, fontSize: "1rem", marginTop: "0.1rem", flexShrink: 0 }}>{item.icon}</span>
                <p style={{ fontFamily: S.syne, fontSize: "1rem", lineHeight: 1.6, color: S.text2 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING CALLOUT */}
      <section style={{ padding: "6rem 2rem", background: S.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: S.mono, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: S.accent, marginBottom: "1rem" }}>
              Pricing
            </div>
            <h2 style={{ fontFamily: S.garamond, fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 500, color: S.text, lineHeight: 1.1, marginBottom: "0.75rem" }}>
              $149<span style={{ fontSize: "1.5rem", color: S.text2 }}>/month</span>
            </h2>
            <p style={{ fontFamily: S.syne, fontSize: "0.9rem", color: S.text2, marginBottom: "0.5rem" }}>No insurance required. HSA/FSA eligible.</p>
            <p style={{ fontFamily: S.syne, fontSize: "0.9rem", color: S.text2, marginBottom: "2rem" }}>Cancel anytime.</p>
            <Link href="/pricing" style={{ fontFamily: S.syne, fontWeight: 500, fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase", color: S.accent, textDecoration: "none" }}>
              See what&apos;s included →
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              "Biometric intake assessment",
              "Licensed provider review within 24 hours",
              "CBT-I protocol delivery",
              "Medication management where indicated",
              "Ongoing async provider relationship",
              "HSA/FSA eligible",
            ].map((item) => (
              <div key={item} style={{ display: "flex", gap: "0.875rem", alignItems: "center", paddingBottom: "0.75rem", borderBottom: `1px solid ${S.border}` }}>
                <span style={{ color: "#22c55e", fontSize: "0.9rem", flexShrink: 0 }}>✓</span>
                <span style={{ fontFamily: S.syne, fontSize: "0.9rem", color: S.text2 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{
        padding: "6rem 2rem",
        borderTop: `1px solid ${S.border}`,
        background: "linear-gradient(to bottom, #080c0f, #0a1018)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: 700, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: S.mono, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: S.accent, marginBottom: "1.5rem" }}>
            Get Started
          </div>
          <h2 style={{ fontFamily: S.garamond, fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 500, color: S.text, lineHeight: 1.15, marginBottom: "1.5rem" }}>
            You&apos;ve tracked the data.<br />
            <em style={{ color: S.text2 }}>Now get the diagnosis.</em>
          </h2>
          <p style={{ fontFamily: S.syne, fontSize: "1rem", color: S.text2, marginBottom: "2.5rem", maxWidth: 480, margin: "0 auto 2.5rem" }}>
            10 questions. 5 minutes. Licensed provider review in 24 hours.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" style={{
              fontFamily: S.syne, fontWeight: 600, fontSize: "0.875rem",
              letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "1.1rem 2.5rem", background: S.accent, color: "#fff",
              textDecoration: "none", display: "inline-block",
              boxShadow: "0 0 40px rgba(59,130,246,0.25)",
            }}>
              Start Your Assessment — Coming Soon
            </a>
            <Link href="/faq" style={{
              fontFamily: S.syne, fontWeight: 500, fontSize: "0.8rem",
              letterSpacing: "0.06em", textTransform: "uppercase",
              padding: "1.1rem 1.5rem", border: "1px solid #263545", color: S.text2,
              textDecoration: "none", display: "inline-block",
            }}>
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: `1px solid ${S.border}`,
        padding: "2rem",
        background: S.bg,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "1rem",
      }}>
        <div style={{ fontFamily: S.syne, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.04em", color: S.text }}>SLEEPGENIC</div>
        <div style={{ fontFamily: S.mono, fontSize: "0.65rem", color: S.text3, letterSpacing: "0.06em" }}>
          Sleepgenic is a technology platform. All clinical decisions are made by independent licensed providers.
        </div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {[["Privacy", "#"], ["Terms", "#"], ["About", "/about"]].map(([l, h]) => (
            <a key={l} href={h} style={{ fontFamily: S.syne, fontSize: "0.75rem", color: S.text3, textDecoration: "none", letterSpacing: "0.05em" }}>{l}</a>
          ))}
        </div>
      </footer>
    </main>
  );
}
