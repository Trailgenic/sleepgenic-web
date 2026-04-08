"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import IntakeShell from "@/components/intake/IntakeShell";
import { useIntake } from "@/components/intake/IntakeContext";
import { intakeQuestions } from "@/components/intake/intakeQuestions";

export default function IntakeReviewPage() {
  const { intake } = useIntake();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const answerFor = (step: number) => {
    const q = intakeQuestions.find((item) => item.step === step);
    if (!q) return "";

    if (q.type === "wearable") {
      if (intake.wearable.tracks_sleep === "Yes") {
        return [
          `10a. Tracks sleep with wearable: Yes`,
          `10b. Avg hours from device: ${intake.wearable.avg_sleep_hours ?? "Not answered"}`,
          `10c. Sleep need gap: ${intake.wearable.sleep_need_gap ?? "Not answered"}`,
          intake.wearable.sleep_score_range
            ? `10d. Sleep score range: ${intake.wearable.sleep_score_range}`
            : "10d. Sleep score range: Not answered",
        ];
      }

      if (intake.wearable.tracks_sleep === "No") {
        return [
          "10a. Tracks sleep with wearable: No",
          `10e. Typical hours per night: ${intake.wearable.non_wearable_hours ?? "Not answered"}`,
        ];
      }

      return ["10a. Tracks sleep with wearable: Not answered"];
    }

    const value = intake[q.field as keyof typeof intake];
    if (Array.isArray(value)) return value.length ? value.join(", ") : "Not answered";
    if (typeof value === "string") return value || "Not answered";
    return "Not answered";
  };

  const submit = async () => {
    setLoading(true);

    const submissionId = crypto.randomUUID();
    const payload = {
      submission_id: submissionId,
      submitted_at: new Date().toISOString(),
      source: "sleepgenic-web-v1",
      intake,
    };

    const response = await fetch("/api/intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      router.push("/intake/submitted");
      return;
    }

    setLoading(false);
  };

  return (
    <IntakeShell step={10}>
      <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "1.5rem" }}>
        Review your answers.
      </h1>

      <div style={{ display: "grid", gap: "0.9rem" }}>
        {intakeQuestions.map((q) => {
          const answer = answerFor(q.step);

          return (
            <div
              key={q.step}
              style={{
                border: "1px solid #1e2d3d",
                background: "#141c24",
                padding: "1rem",
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: "0.9rem",
                alignItems: "start",
              }}
            >
              <div style={{ fontFamily: "'DM Mono', monospace", color: "#8fa3b3", fontSize: "0.8rem", marginTop: "0.2rem" }}>
                {String(q.step).padStart(2, "0")}
              </div>
              <div>
                <p style={{ color: "#8fa3b3", marginBottom: "0.3rem", fontSize: "0.92rem" }}>{q.text}</p>
                {Array.isArray(answer) ? (
                  <div style={{ display: "grid", gap: "0.25rem" }}>
                    {answer.map((line) => (
                      <p key={line} style={{ color: "#e8edf2" }}>
                        {line}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: "#e8edf2" }}>{answer}</p>
                )}
              </div>
              <Link href={`/intake/${q.step}?from=review`} style={{ color: "#3b82f6", textDecoration: "none" }}>
                Edit
              </Link>
            </div>
          );
        })}
      </div>

      <p style={{ marginTop: "1.5rem", color: "#8fa3b3", fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", lineHeight: 1.7 }}>
        By submitting you confirm this information is accurate. A licensed provider will review your case. Sleepgenic is a
        technology platform — your provider makes all clinical decisions independently.
      </p>

      <button
        type="button"
        onClick={submit}
        disabled={loading}
        style={{
          marginTop: "1rem",
          border: "none",
          background: "#3b82f6",
          color: "white",
          padding: "0.9rem 1.4rem",
          fontFamily: "'Syne', sans-serif",
          cursor: "pointer",
        }}
      >
        {loading ? "Submitting..." : "Submit Intake"}
      </button>
    </IntakeShell>
  );
}
