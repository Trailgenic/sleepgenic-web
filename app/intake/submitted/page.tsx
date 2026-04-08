"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import IntakeShell from "@/components/intake/IntakeShell";

function SubmittedContent() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get("submission_id");

  useEffect(() => {
    if (!submissionId) {
      return;
    }

    sessionStorage.setItem("sleepgenic_submission_id", submissionId);
  }, [submissionId]);

  return (
    <IntakeShell>
      <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "1rem" }}>
        Your intake has been received.
      </h1>
      <p style={{ color: "#8fa3b3", marginBottom: "1.5rem", maxWidth: 620 }}>
        A licensed provider will review your case within 24 hours. You&apos;ll receive a confirmation email shortly.
      </p>
      <Link
        href="/checkout"
        style={{
          display: "inline-block",
          textDecoration: "none",
          background: "#3b82f6",
          color: "#ffffff",
          padding: "0.85rem 1.25rem",
        }}
      >
        Continue to Checkout →
      </Link>
      <p style={{ marginTop: "1rem", color: "#8fa3b3", fontFamily: "'DM Mono', monospace", fontSize: "0.72rem" }}>
        Sleepgenic is a technology platform. All clinical decisions are made by independent licensed providers.
      </p>
    </IntakeShell>
  );
}

export default function IntakeSubmittedPage() {
  return (
    <Suspense fallback={<div style={{ background: "#080c0f", minHeight: "100vh" }} />}>
      <SubmittedContent />
    </Suspense>
  );
}
