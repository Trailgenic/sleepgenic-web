"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import IntakeShell from "@/components/intake/IntakeShell";
import { useIntake } from "@/components/intake/IntakeContext";
import { intakeQuestions } from "@/components/intake/intakeQuestions";

function cardStyle(selected: boolean) {
  return {
    width: "100%",
    padding: "1rem 1.25rem",
    cursor: "pointer",
    border: `1px solid ${selected ? "#3b82f6" : "#1e2d3d"}`,
    background: selected ? "#0f2747" : "#141c24",
    color: selected ? "#e8edf2" : "#8fa3b3",
    transition: "border-color 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "'Syne', sans-serif",
  };
}

export default function IntakeQuestionPage({ params }: { params: { step: string } }) {
  const step = Number(params.step);
  const question = intakeQuestions.find((item) => item.step === step) ?? intakeQuestions[0];
  const invalidStep = Number.isNaN(step) || !intakeQuestions.some((item) => item.step === step);
  const { intake, setField, toggleArrayValue } = useIntake();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromReview = searchParams.get("from") === "review";

  const value = intake[question.field as keyof typeof intake];

  const goNext = useCallback(() => {
    if (fromReview) {
      router.push("/intake/review");
      return;
    }

    if (step === 10) {
      router.push("/intake/review");
      return;
    }
    router.push(`/intake/${step + 1}`);
  }, [fromReview, router, step]);

  const goBack = useCallback(() => {
    if (fromReview) {
      router.push("/intake/review");
      return;
    }

    if (step === 1) {
      router.push("/");
      return;
    }
    router.push(`/intake/${step - 1}`);
  }, [fromReview, router, step]);

  const requiredComplete =
    Array.isArray(value) ? value.length > 0 : typeof value === "string" ? value.trim().length > 0 : false;

  if (invalidStep) {
    return <IntakeShell>Invalid intake step.</IntakeShell>;
  }

  return (
    <IntakeShell step={step}>
      <div style={{ fontFamily: "'DM Mono', monospace", color: "#8fa3b3", marginBottom: "0.9rem", fontSize: "0.8rem" }}>
        {question.label}
      </div>
      <h1
        style={{
          fontFamily: "'EB Garamond', serif",
          fontWeight: 500,
          fontSize: "clamp(1.7rem, 4vw, 2.4rem)",
          lineHeight: 1.2,
          marginBottom: "0.85rem",
        }}
      >
        {question.text}
      </h1>

      {question.subtext && (
        <p style={{ color: "#8fa3b3", fontFamily: "'Syne', sans-serif", marginBottom: "1rem" }}>{question.subtext}</p>
      )}

      {question.type !== "text" && (
        <div style={{ display: "grid", gap: "0.75rem", marginTop: "1.25rem" }}>
          {(question.options ?? []).map((option) => {
            const selected = Array.isArray(value) ? value.includes(option) : value === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  if (question.type === "multi") {
                    toggleArrayValue(question.field, option);
                    return;
                  }
                  setField(question.field, option);
                }}
                style={cardStyle(selected)}
                onMouseEnter={(e) => {
                  if (!selected) e.currentTarget.style.borderColor = "#263545";
                }}
                onMouseLeave={(e) => {
                  if (!selected) e.currentTarget.style.borderColor = "#1e2d3d";
                }}
              >
                <span>{option}</span>
                {question.type === "multi" && selected && (
                  <span style={{ fontFamily: "'DM Mono', monospace", color: "#3b82f6" }}>◈</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {question.step === 5 && intake.wearable_device && intake.wearable_device !== "No" && (
        <div style={{ marginTop: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", color: "#8fa3b3", fontFamily: "'Syne', sans-serif" }}>
            What does your device show about your sleep?
          </label>
          <textarea
            value={intake.wearable_notes}
            onChange={(e) => setField("wearable_notes", e.target.value)}
            placeholder="Average sleep score, HRV trend, deep sleep %, or anything else you\'ve noticed. Optional — your provider will review this."
            style={{
              width: "100%",
              minHeight: 120,
              background: "#141c24",
              color: "#e8edf2",
              border: "1px solid #1e2d3d",
              padding: "0.9rem",
              fontFamily: "'Syne', sans-serif",
            }}
          />
        </div>
      )}

      {question.type === "text" && (
        <div style={{ marginTop: "1rem" }}>
          <textarea
            value={intake.current_medications}
            onChange={(e) => setField("current_medications", e.target.value)}
            placeholder={question.placeholder}
            style={{
              width: "100%",
              minHeight: 120,
              background: "#141c24",
              color: "#e8edf2",
              border: "1px solid #1e2d3d",
              padding: "0.9rem",
              fontFamily: "'Syne', sans-serif",
            }}
          />
          <p style={{ marginTop: "0.5rem", fontSize: "0.84rem", color: "#8fa3b3" }}>{question.note}</p>
        </div>
      )}

      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between", gap: "1rem" }}>
        <button
          type="button"
          onClick={goBack}
          style={{
            border: "1px solid #263545",
            color: "#8fa3b3",
            background: "transparent",
            padding: "0.8rem 1rem",
            fontFamily: "'Syne', sans-serif",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={!requiredComplete}
          style={{
            border: "none",
            color: "#ffffff",
            background: requiredComplete ? "#3b82f6" : "#1a2330",
            padding: "0.8rem 1.2rem",
            fontFamily: "'Syne', sans-serif",
            opacity: requiredComplete ? 1 : 0.5,
            cursor: requiredComplete ? "pointer" : "not-allowed",
          }}
        >
          Next →
        </button>
      </div>
    </IntakeShell>
  );
}
