import Link from "next/link";
import { cookies } from "next/headers";
import ReviewPanel from "@/components/admin/ReviewPanel";
import { ADMIN_COOKIE_NAME, validateSession } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabase";

type IntakeDetail = {
  id: string;
  submission_id: string;
  created_at: string;
  status: string;
  patient_email: string | null;
  stripe_subscription_id: string | null;
  red_flags: string[] | null;
  intake_payload: Record<string, unknown> | null;
};

function showValue(value: unknown) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value === null || value === undefined || value === "") return "—";
  return String(value);
}

export default async function AdminIntakeDetailPage({ params }: { params: { id: string } }) {
  const { data, error } = await supabaseAdmin
    .from("intake_submissions")
    .select("id, submission_id, created_at, status, patient_email, stripe_subscription_id, red_flags, intake_payload")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    return <main className="p-10">Submission not found.</main>;
  }

  const submission = data as IntakeDetail;

  if (submission.status === "pending") {
    await supabaseAdmin.from("intake_submissions").update({ status: "in_review" }).eq("id", submission.id);
    submission.status = "in_review";
  }

  const payload = submission.intake_payload ?? {};
  const flags = submission.red_flags ?? [];
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const reviewerEmail = token ? (await validateSession(token)) ?? "provider@sleepgenic.internal" : "provider@sleepgenic.internal";

  return (
    <main className="mx-auto max-w-7xl px-8 py-8">
      <Link href="/admin/dashboard" className="font-['DM_Mono'] text-sm text-[var(--text-2)] hover:text-[var(--text)]">
        ← Back to Queue
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="space-y-4">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="mb-4 font-['DM_Mono'] text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Sleep Profile</h2>
            <p>Sleep difficulty: {showValue(payload.sleep_difficulty_types)}</p>
            <p>Duration: {showValue(payload.duration)}</p>
            <p>Nights per week: {showValue(payload.frequency)}</p>
            <p>Daytime impact: {showValue(payload.daytime_impact)}</p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="mb-4 font-['DM_Mono'] text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Sleep Metrics</h2>
            <p>Tracks wearable: {showValue(payload.tracks_wearable)}</p>
            <p>Avg sleep hours: {showValue(payload.avg_sleep_hours)}</p>
            <p>Sleep need gap: {showValue(payload.sleep_need_gap)}</p>
            <p>Sleep score: {showValue(payload.sleep_score)}</p>
            <p>Estimated sleep hours: {showValue(payload.estimated_sleep_hours)}</p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="mb-4 font-['DM_Mono'] text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Clinical History</h2>
            <p>Previous treatments: {showValue(payload.previous_treatments)}</p>
            <p>Current medications: {showValue(payload.current_medications)}</p>
            <p>Medical history: {showValue(payload.medical_history)}</p>
            <p>Pregnancy/nursing: {showValue(payload.pregnancy_nursing)}</p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="mb-4 font-['DM_Mono'] text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Patient Goal</h2>
            <p>Primary goal: {showValue(payload.primary_goal)}</p>
          </div>

          {flags.length > 0 ? (
            <div className="rounded-xl border border-[#ef4444] bg-[#7f1d1d]/20 p-5">
              <h2 className="mb-3 font-['DM_Mono'] text-xs uppercase tracking-[0.18em] text-[#ef4444]">⚠ Clinical Attention Required</h2>
              <ul className="list-inside list-disc space-y-1 text-sm text-[#fecaca]">
                {flags.map((flag) => (
                  <li key={flag}>{flag}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        <section>
          <div className="mb-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <p>Email: {submission.patient_email ?? "unknown"}</p>
            <p>Submitted: {new Date(submission.created_at).toLocaleString()}</p>
            <p>
              Stripe status:{" "}
              <span className={submission.stripe_subscription_id ? "text-[#22c55e]" : "text-[#f59e0b]"}>
                {submission.stripe_subscription_id ? "Active" : "Inactive"}
              </span>
            </p>
            <p className="font-['DM_Mono'] text-xs text-[var(--text-3)]">Submission ID: {submission.submission_id}</p>
          </div>
          <ReviewPanel
            id={submission.id}
            submissionId={submission.submission_id}
            patientEmail={submission.patient_email}
            reviewedBy={reviewerEmail}
          />
        </section>
      </div>
    </main>
  );
}
