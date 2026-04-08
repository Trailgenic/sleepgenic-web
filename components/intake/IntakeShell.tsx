"use client";

export default function IntakeShell({
  children,
  step,
}: {
  children: React.ReactNode;
  step?: number;
}) {
  const width = step ? `${(step / 10) * 100}%` : "100%";

  return (
    <div className="intake-shell" style={{ minHeight: "100vh", background: "#080c0f", color: "#e8edf2", paddingTop: 64 }}>
      <div className="intake-progress-track" style={{ height: 3, width: "100%", background: "#1e2d3d" }}>
        <div style={{ height: "100%", width, background: "#3b82f6", transition: "width 0.2s ease" }} />
      </div>
      <div className="intake-content" style={{ maxWidth: 760, margin: "0 auto", padding: "2rem 1rem 4rem" }}>{children}</div>
      <style jsx global>{`
        @media (max-width: 768px) {
          .intake-content {
            padding: 1rem 1rem 3rem !important;
          }

          .intake-progress-track {
            height: 4px !important;
          }
        }
      `}</style>

      <footer
        style={{
          borderTop: "1px solid #1e2d3d",
          color: "#556070",
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.72rem",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        Sleepgenic is a technology platform. All clinical decisions are made by independent licensed providers.
      </footer>
    </div>
  );
}
