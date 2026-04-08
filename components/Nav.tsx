"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(8,12,15,0.88)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid #1e2d3d",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.04em", color: "#e8edf2", textDecoration: "none" }}>
          SLEEPGENIC
        </Link>
        <div className="nav-links" style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          {[["How It Works", "/how-it-works"], ["Pricing", "/pricing"], ["FAQ", "/faq"]].map(([label, href]) => (
            <Link key={href} href={href} style={{ fontFamily: "'Syne', sans-serif", fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8fa3b3", textDecoration: "none" }}>
              {label}
            </Link>
          ))}
          <Link href="/intake/1" className="nav-cta" style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "0.75rem",
            letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.6rem 1.25rem",
            background: "#3b82f6", color: "#fff", textDecoration: "none",
          }}>
            Start Assessment
          </Link>
        </div>
      </div>
    </nav>
  );
}
