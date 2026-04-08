import Link from "next/link";

export default function CheckoutSoonPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080c0f",
        color: "#e8edf2",
        display: "grid",
        placeItems: "center",
        padding: "5rem 1rem 2rem",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(2rem, 6vw, 3rem)", marginBottom: "0.8rem" }}>
          Checkout coming soon.
        </h1>
        <p style={{ color: "#8fa3b3", marginBottom: "1.2rem" }}>We&apos;re activating the payment flow. Check back shortly.</p>
        <Link href="/" style={{ color: "#3b82f6", textDecoration: "none" }}>
          Return to home
        </Link>
      </div>
    </main>
  );
}
