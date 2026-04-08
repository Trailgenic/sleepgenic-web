"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Outcome = "cbti" | "prescription" | "both" | "follow_up" | "not_a_candidate";

const options: Array<{ value: Outcome; label: string; subtext: string }> = [
  { value: "cbti", label: "CBT-I Protocol", subtext: "Behavioral protocol, no medication" },
  { value: "prescription", label: "Prescription Recommended", subtext: "Medication indicated" },
  { value: "both", label: "Both — CBT-I + Prescription", subtext: "Behavioral + medication" },
  { value: "follow_up", label: "Follow-Up Required", subtext: "More information needed" },
  { value: "not_a_candidate", label: "Not a Candidate", subtext: "Not appropriate for async care" },
];

export default function ReviewPanel({
  id,
  submissionId,
  patientEmail,
  reviewedBy,
}: {
  id: string;
  submissionId: string;
  patientEmail: string | null;
  reviewedBy: string;
}) {
  const [outcome, setOutcome] = useState<Outcome | "">("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function submitReview() {
    if (!outcome) return;
    setSaving(true);
    const response = await fetch(`/api/admin/intake/${id}/submit-review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        outcome,
        outcome_notes: notes,
        reviewer_email: reviewedBy,
      }),
    });
    setSaving(false);

    if (response.ok) {
      router.push("/admin/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="mb-6 rounded-lg border border-[var(--border)] bg-[var(--bg-2)] p-4 text-sm">
        <p>Email: {patientEmail ?? "unknown"}</p>
        <p className="mt-1 font-['DM_Mono'] text-xs text-[var(--text-3)]">Submission ID: {submissionId}</p>
      </div>

      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = outcome === option.value;
          const selectedClass =
            option.value === "not_a_candidate"
              ? "bg-[#ef4444] text-white border-[#ef4444]"
              : "bg-[var(--accent)] text-white border-[var(--accent)]";

          return (
            <button
              key={option.value}
              onClick={() => setOutcome(option.value)}
              type="button"
              className={`w-full rounded-lg border p-3 text-left transition ${isSelected ? selectedClass : "border-[var(--border-2)] bg-[var(--surface)] hover:bg-[var(--surface-2)]"}`}
            >
              <p className="font-semibold">{option.label}</p>
              <p className="text-xs opacity-90">{option.subtext}</p>
            </button>
          );
        })}
      </div>

      <label className="mt-6 block font-['DM_Mono'] text-xs uppercase tracking-[0.12em] text-[var(--text-2)]">Provider Notes</label>
      <textarea
        className="mt-2 min-h-[160px] w-full rounded-lg border border-[var(--border-2)] bg-[var(--bg-2)] p-3 text-sm outline-none focus:border-[var(--accent)]"
        placeholder="Clinical reasoning, specific recommendations, follow-up instructions... (internal only, not shared with patient)"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
      />

      <button
        type="button"
        disabled={!outcome || saving}
        onClick={submitReview}
        className="mt-4 w-full rounded-lg bg-[var(--accent)] px-4 py-3 font-['Syne'] text-sm font-bold uppercase tracking-[0.1em] text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        {saving ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
}
