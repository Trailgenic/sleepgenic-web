export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PORTAL_COOKIE_NAME, validatePortalSession } from "@/lib/portalAuth";

type OutcomeSubmission = {
  status: string;
  outcome_type: string | null;
  outcome_notes: string | null;
  reviewed_at: string | null;
};

function outcomeHeadline(outcomeType: string | null) {
  if (outcomeType === "cbti_protocol") return "CBT-I Protocol Assigned";
  if (outcomeType === "prescription_recommended") return "Prescription Recommended";
  if (outcomeType === "both") return "Combined Treatment Plan";
  if (outcomeType === "followup_required") return "Follow-Up Required";
  if (outcomeType === "not_a_candidate") return "See Your Email for Details";
  return "Clinical Outcome";
}

export default async function PortalOutcomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(PORTAL_COOKIE_NAME)?.value;

  if (!token) {
    redirect("/portal/login");
  }

  const sessionEmail = await validatePortalSession(token);
  if (!sessionEmail) {
    redirect("/portal/login");
  }

  const normalizedEmail = sessionEmail.trim().toLowerCase();

  const { createClient } = await import("@supabase/supabase-js");
  const freshClient = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data } = await freshClient
    .from("intake_submissions")
    .select("status,outcome_type,outcome_notes,reviewed_at")
    .ilike("patient_email", normalizedEmail)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const submission = (data ?? null) as OutcomeSubmission | null;

  if (!submission || submission.status !== "complete") {
    redirect("/portal/dashboard");
  }

  const showCbti = submission.outcome_type === "cbti_protocol" || submission.outcome_type === "both";
  const showPrescription =
    submission.outcome_type === "prescription_recommended" || submission.outcome_type === "both";

  return (
    <main className="mx-auto max-w-4xl px-6 py-8">
      <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <p className="font-['DM_Mono'] text-xs uppercase tracking-[0.08em] text-[var(--accent)]">Your Clinical Outcome</p>
        <h1 className="mt-3 font-['Syne'] text-3xl font-bold">{outcomeHeadline(submission.outcome_type)}</h1>
        <p className="mt-3 text-[var(--text-2)]">
          Reviewed on {submission.reviewed_at ? new Date(submission.reviewed_at).toLocaleDateString() : "—"}
        </p>

        {submission.outcome_notes ? (
          <div className="mt-6">
            <p className="font-['DM_Mono'] text-xs uppercase tracking-[0.08em] text-[var(--accent)]">Provider Notes</p>
            <div className="mt-3 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-4 text-[var(--text-2)]">
              {submission.outcome_notes}
            </div>
          </div>
        ) : null}

        {showCbti ? (
          <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-5">
            <h2 className="font-['Syne'] text-xl font-bold">Your CBT-I Protocol</h2>
            <p className="mt-3 text-[var(--text-2)]">
              Your behavioral treatment plan has been assigned. CBT-I is the gold-standard treatment for chronic insomnia
              recommended by the American Academy of Sleep Medicine.
            </p>
            <p className="mt-3 font-['DM_Mono'] text-xs uppercase tracking-[0.08em] text-[var(--text-3)]">
              Full protocol delivery coming soon.
            </p>
          </div>
        ) : null}

        {showPrescription ? (
          <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-5">
            <h2 className="font-['Syne'] text-xl font-bold">Your Prescription</h2>
            <p className="mt-3 text-[var(--text-2)]">
              Your provider has sent a prescription to your pharmacy. Contact us at hello@sleepgenic.ai if you need to
              update your pharmacy information.
            </p>
          </div>
        ) : null}

        <Link
          href="/portal/dashboard"
          className="mt-8 inline-block font-['DM_Mono'] text-xs uppercase tracking-[0.08em] text-[var(--accent)]"
        >
          ← Back to Dashboard
        </Link>
      </section>
    </main>
  );
}
