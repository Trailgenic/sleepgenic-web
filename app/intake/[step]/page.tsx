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

function fadeInBlock() {
  return {
    animation: "fadeUpIn 0.28s ease",
    marginTop: "1rem",
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

  const value = question.type === "wearable" ? intake.wearable : intake[question.field as keyof typeof intake];

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
    question.type === "wearable"
      ? intake.wearable.tracks_sleep === "Yes"
        ? Boolean(intake.wearable.avg_sleep_hours && intake.wearable.sleep_need_gap)
        : intake.wearable.tracks_sleep === "No"
          ? Boolean(intake.wearable.non_wearable_hours)
          : false
      : Array.isArray(value)
        ? value.length > 0
        : typeof value === "string"
          ? value.trim().length > 0
          : false;

  const setWearableField = (
    field: "tracks_sleep" | "avg_sleep_hours" | "sleep_need_gap" | "sleep_score_range" | "non_wearable_hours",
    nextValue: string,
  ) => {
    if (field === "tracks_sleep") {
      if (nextValue === "Yes") {
        setField("wearable", {
          tracks_sleep: "Yes",
          avg_sleep_hours: intake.wearable.avg_sleep_hours,
          sleep_need_gap: intake.wearable.sleep_need_gap,
          sleep_score_range: intake.wearable.sleep_score_range,
          non_wearable_hours: null,
        });
        return;
      }

      setField("wearable", {
        tracks_sleep: "No",
        avg_sleep_hours: null,
        sleep_need_gap: null,
        sleep_score_range: null,
        non_wearable_hours: intake.wearable.non_wearable_hours,
      });
      return;
    }

    setField("wearable", {
      ...intake.wearable,
      [field]: nextValue,
    });
  };

  const renderSingleOptions = (
    options: string[],
    selected: string | null,
    onPick: (option: string) => void,
  ) => (
    <div className="intake-options-grid" style={{ display: "grid", gap: "0.75rem", marginTop: "0.85rem" }}>
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onPick(option)}
            style={cardStyle(isSelected)}
            onMouseEnter={(e) => {
              if (!isSelected) e.currentTarget.style.borderColor = "#263545";
            }}
            onMouseLeave={(e) => {
              if (!isSelected) e.currentTarget.style.borderColor = "#1e2d3d";
            }}
          >
            <span>{option}</span>
          </button>
        );
      })}
    </div>
  );

  if (invalidStep) {
    return <IntakeShell>Invalid intake step.</IntakeShell>;
  }

  return (
    <IntakeShell step={step}>
      <div className="intake-section">
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

      {question.type !== "text" && question.type !== "wearable" && (
        <div className="intake-options-grid" style={{ display: "grid", gap: "0.75rem", marginTop: "1.25rem" }}>
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

      {question.type === "wearable" && (
        <div>
          <div style={{ marginTop: "1.25rem" }}>
            {renderSingleOptions(["Yes", "No"], intake.wearable.tracks_sleep || null, (option) => setWearableField("tracks_sleep", option))}
          </div>

          {intake.wearable.tracks_sleep === "Yes" && (
            <div style={fadeInBlock()}>
              <div style={{ fontFamily: "'DM Mono', monospace", color: "#8fa3b3", fontSize: "0.75rem", marginBottom: "0.35rem" }}>10b</div>
              <p style={{ color: "#e8edf2" }}>
                On average, how many hours of sleep per night does your device show?
              </p>
              {renderSingleOptions(
                ["Under 5 hours", "5–6 hours", "6–7 hours", "7–8 hours", "Over 8 hours"],
                intake.wearable.avg_sleep_hours,
                (option) => setWearableField("avg_sleep_hours", option),
              )}

              <div style={{ fontFamily: "'DM Mono', monospace", color: "#8fa3b3", fontSize: "0.75rem", marginTop: "1rem", marginBottom: "0.35rem" }}>
                10c
              </div>
              <p style={{ color: "#e8edf2" }}>
                Does your device show you&apos;re consistently falling short of your sleep need or target?
              </p>
              {renderSingleOptions(
                [
                  "Yes, by more than 1 hour",
                  "Yes, by 30–60 minutes",
                  "About even",
                  "I exceed my sleep need most nights",
                  "My device doesn't show this",
                ],
                intake.wearable.sleep_need_gap,
                (option) => setWearableField("sleep_need_gap", option),
              )}

              <div style={{ fontFamily: "'DM Mono', monospace", color: "#8fa3b3", fontSize: "0.75rem", marginTop: "1rem", marginBottom: "0.2rem" }}>
                10d
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: "#3b82f6",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Optional
              </div>
              <p style={{ color: "#e8edf2", marginTop: "0.35rem" }}>
                If your device shows an overall sleep score or quality rating, what is your typical average?
              </p>
              {renderSingleOptions(
                [
                  "Consistently poor — below 60 or red zone",
                  "Fair — 60 to 75",
                  "Good — above 75",
                  "My device doesn't show a score",
                ],
                intake.wearable.sleep_score_range,
                (option) => setWearableField("sleep_score_range", option),
              )}
            </div>
          )}

          {intake.wearable.tracks_sleep === "No" && (
            <div style={fadeInBlock()}>
              <div style={{ fontFamily: "'DM Mono', monospace", color: "#8fa3b3", fontSize: "0.75rem", marginBottom: "0.35rem" }}>10e</div>
              <p style={{ color: "#e8edf2" }}>How many hours of sleep do you typically get per night?</p>
              {renderSingleOptions(
                ["Under 5 hours", "5–6 hours", "6–7 hours", "7–8 hours", "Over 8 hours"],
                intake.wearable.non_wearable_hours,
                (option) => setWearableField("non_wearable_hours", option),
              )}
            </div>
          )}
        </div>
      )}

      {question.type === "text" && (
        <div style={{ marginTop: "1rem" }}>
          <textarea className="intake-textarea"
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

      <div className="intake-nav-buttons" style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between", gap: "1rem" }}>
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
      </div>
    </IntakeShell>
  );
}
