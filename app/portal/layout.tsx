import Link from "next/link";

export default function PortalLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#080c0f", minHeight: "100vh" }}>
      <header className="border-b border-[var(--border)] px-8 py-4">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <Link href="/" className="font-['Syne'] text-2xl font-bold tracking-[0.12em] text-[var(--text)]">
            SLEEPGENIC
          </Link>
          <p className="font-['DM_Mono'] text-xs uppercase tracking-[0.12em] text-[var(--text-3)]">Patient Portal</p>
        </div>
      </header>
      {children}
    </div>
  );
}
