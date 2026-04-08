export const dynamic = "force-dynamic";

import Link from "next/link";
import AdminDashboardControls from "@/components/admin/AdminDashboardControls";
import { supabaseAdmin } from "@/lib/supabase";
import { getAutoReview } from "@/lib/autoReview";

type IntakeRecord = {
  id: string;
  submission_id: string;
  status: string;
  created_at: string;
  reviewed_at: string | null;
  patient_email: string | null;
  red_flags: string[] | null;
  intake_payload: {
    sleep_difficulty_types?: string[];
    duration?: string;
    frequency?: string;
  } | null;
};

function relativeTime(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${Math.max(mins, 1)} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

const statusClasses: Record<string, string> = {
  pending: "bg-[#f59e0b]/20 text-[#f59e0b]",
  in_review: "bg-[var(--accent)]/20 text-[var(--accent)]",
  complete: "bg-[#22c55e]/20 text-[#22c55e]",
  flagged: "bg-[#ef4444]/20 text-[#ef4444]",
  not_a_candidate: "bg-[#374151]/50 text-[#cbd5e1]",
};

export default async function AdminDashboardPage() {
  const { data, error } = await supabaseAdmin
    .from("intake_submissions")
    .select("id, submission_id, status, created_at, reviewed_at, patient_email, red_flags, intake_payload")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("ADMIN_DASHBOARD_FETCH_ERROR", error.message);
  }

  const submissions = (data ?? []) as IntakeRecord[];
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);

  const pending = submissions.filter((item) => item.status === "pending").length;
  const inReview = submissions.filter((item) => item.status === "in_review").length;
  const completedToday = submissions.filter(
    (item) => item.status === "complete" && item.reviewed_at && new Date(item.reviewed_at) >= todayStart
  ).length;

  const autoReview = getAutoReview();

  return (
    <main className="mx-auto max-w-7xl px-8 py-8">
      <header className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-['Syne'] text-3xl font-bold tracking-[0.12em]">SLEEPGENIC</h1>
          <p className="mt-1 font-['DM_Mono'] text-xs uppercase tracking-[0.16em] text-[var(--text-3)]">
            Provider Dashboard
          </p>
        </div>
        <AdminDashboardControls initialAutoReview={autoReview} />
      </header>

      {autoReview ? (
        <div className="mb-6 rounded-lg border border-[#ef4444]/40 bg-[#ef4444]/10 px-4 py-3 font-['DM_Mono'] text-sm text-[#fca5a5]">
          AUTO-REVIEW ACTIVE — All intakes auto-approved after 2 minutes. Disable before real patients.
        </div>
      ) : null}

      <section className="mb-6 grid grid-cols-4 gap-4 font-['DM_Mono'] text-sm">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">Pending: {pending}</div>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">In Review: {inReview}</div>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">Completed Today: {completedToday}</div>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">Total: {submissions.length}</div>
      </section>

      <section className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--bg-2)] font-['DM_Mono'] text-xs uppercase tracking-[0.08em] text-[var(--text-2)]">
            <tr>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3">Patient Email</th>
              <th className="px-4 py-3">Sleep Difficulty</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Frequency</th>
              <th className="px-4 py-3">Red Flags</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => {
              const actionLabel = ["pending", "in_review"].includes(submission.status) ? "Review →" : "View →";
              const flags = submission.red_flags ?? [];
              const sleepDifficulty = submission.intake_payload?.sleep_difficulty_types?.[0] ?? "—";

              return (
                <tr key={submission.id} className="border-t border-[var(--border)] hover:bg-[var(--surface-2)]">
                  <td className="px-4 py-4 font-['DM_Mono'] text-xs text-[var(--text-3)]">
                    <Link href={`/admin/intake/${submission.id}`}>{relativeTime(submission.created_at)}</Link>
                  </td>
                  <td className="px-4 py-4">
                    <Link href={`/admin/intake/${submission.id}`}>{(submission.patient_email ?? "unknown").slice(0, 24)}</Link>
                  </td>
                  <td className="px-4 py-4"><Link href={`/admin/intake/${submission.id}`}>{sleepDifficulty}</Link></td>
                  <td className="px-4 py-4"><Link href={`/admin/intake/${submission.id}`}>{submission.intake_payload?.duration ?? "—"}</Link></td>
                  <td className="px-4 py-4"><Link href={`/admin/intake/${submission.id}`}>{submission.intake_payload?.frequency ?? "—"}</Link></td>
                  <td className="px-4 py-4">{flags.length > 0 ? <span className="text-[#f59e0b]">⚠</span> : "—"}</td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-2 py-1 text-xs ${statusClasses[submission.status] ?? "bg-[var(--surface-2)]"}`}>
                      {submission.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      className="rounded-md border border-[var(--border-2)] px-3 py-2 font-['DM_Mono'] text-xs uppercase tracking-[0.08em] hover:bg-[var(--surface-2)]"
                      href={`/admin/intake/${submission.id}`}
                    >
                      {actionLabel}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
