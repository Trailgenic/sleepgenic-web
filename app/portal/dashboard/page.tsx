export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PortalLogoutButton from "@/components/portal/PortalLogoutButton";
import { PORTAL_COOKIE_NAME, validatePortalSession } from "@/lib/portalAuth";

type IntakeSubmission = {
  id: string;
  status: string;
  patient_email: string | null;
  stripe_subscription_id: string | null;
};

export default async function PortalDashboardPage() {
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
    .select("id,status,patient_email,stripe_subscription_id")
    .ilike("patient_email", normalizedEmail)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const submission = (data ?? null) as IntakeSubmission | null;

  const status = submission?.status ?? "none";
  const subscriptionActive = Boolean(submission?.stripe_subscription_id);

  const statusCard =
    status === "complete"
      ? {
          border: "#22c55e",
          title: "Your provider review is complete.",
          body: "Your outcome is ready to view.",
          label: "STATUS: COMPLETE",
        }
      : status === "not_a_candidate"
        ? {
            border: "#ef4444",
            title: "Your provider has reviewed your case.",
            body: "Please check your email for details about next steps.",
            label: "STATUS: REVIEWED",
          }
        : status === "pending" || status === "in_review"
          ? {
              border: "#3b82f6",
              title: "Your intake is under review.",
              body: "A licensed provider will complete your review within 24 hours.",
              label: "STATUS: UNDER REVIEW",
            }
          : null;

  return (
    <main className="mx-auto max-w-4xl px-6 py-8">
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-['Syne'] text-3xl font-bold tracking-[0.12em]">SLEEPGENIC</h1>
          <p className="mt-1 font-['DM_Mono'] text-xs uppercase tracking-[0.16em] text-[var(--text-3)]">Patient Portal</p>
        </div>
        <PortalLogoutButton />
      </header>

      <section className="mb-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="font-['Syne'] text-2xl font-bold">Welcome back.</h2>
        <p className="mt-2 font-['DM_Mono'] text-xs uppercase tracking-[0.08em] text-[var(--text-3)]">{normalizedEmail}</p>
      </section>

      {submission && statusCard ? (
        <section className="mb-6 rounded-xl bg-[var(--surface)] p-6" style={{ border: `1px solid ${statusCard.border}` }}>
          <p className="font-['DM_Mono'] text-xs uppercase tracking-[0.08em] text-[var(--text-2)]">{statusCard.label}</p>
          <h3 className="mt-3 font-['Syne'] text-2xl font-bold">{statusCard.title}</h3>
          <p className="mt-2 text-[var(--text-2)]">{statusCard.body}</p>
          {status === "complete" ? (
            <Link href="/portal/outcome" className="mt-4 inline-block">
              <button
                type="button"
                className="rounded-lg bg-[var(--accent)] px-4 py-3 font-['DM_Mono'] text-xs uppercase tracking-[0.08em] text-white hover:brightness-110"
              >
                VIEW YOUR OUTCOME →
              </button>
            </Link>
          ) : null}
        </section>
      ) : (
        <section className="mb-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h3 className="font-['Syne'] text-2xl font-bold">No intake found for this account.</h3>
          <Link
            href="/intake/1"
            className="mt-4 inline-block font-['DM_Mono'] text-xs uppercase tracking-[0.08em] text-[var(--accent)]"
          >
            Start your assessment →
          </Link>
        </section>
      )}

      <section className="mb-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <p className="font-['DM_Mono'] text-xs uppercase tracking-[0.08em] text-[var(--text-2)]">Subscription Status</p>
        <p className="mt-3 text-lg" style={{ color: subscriptionActive ? "#22c55e" : "#f59e0b" }}>
          {subscriptionActive ? "Active" : "Inactive"}
        </p>
        <p className="mt-2 text-[var(--text-2)]">Price: $149.00/month</p>
        <Link
          href="/portal/account"
          className="mt-4 inline-block font-['DM_Mono'] text-xs uppercase tracking-[0.08em] text-[var(--accent)]"
        >
          Manage Subscription →
        </Link>
      </section>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <p className="text-[var(--text-2)]">Questions about your care? Contact us at hello@sleepgenic.ai</p>
      </section>
    </main>
  );
}
