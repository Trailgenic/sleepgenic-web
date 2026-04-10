export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CancelSubscriptionButton from "@/components/portal/CancelSubscriptionButton";
import { PORTAL_COOKIE_NAME, validatePortalSession } from "@/lib/portalAuth";

type AccountSubmission = {
  stripe_subscription_id: string | null;
};

export default async function PortalAccountPage() {
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
    .select("stripe_subscription_id")
    .ilike("patient_email", normalizedEmail)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const submission = (data ?? null) as AccountSubmission | null;
  const isActive = Boolean(submission?.stripe_subscription_id);

  return (
    <main className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="font-['Syne'] text-3xl font-bold">Account & Subscription</h1>

      <section className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <p className="font-['DM_Mono'] text-xs uppercase tracking-[0.08em] text-[var(--text-2)]">Subscription Details</p>
        <div className="mt-4 space-y-3 text-sm">
          <p><span className="text-[var(--text-3)]">Email:</span> {normalizedEmail}</p>
          <p>
            <span className="text-[var(--text-3)]">Status:</span>{" "}
            <span style={{ color: isActive ? "#22c55e" : "#f59e0b" }}>{isActive ? "Active" : "Inactive"}</span>
          </p>
          <p><span className="text-[var(--text-3)]">Plan:</span> Sleepgenic Sleep Medicine Subscription</p>
          <p><span className="text-[var(--text-3)]">Price:</span> $149.00/month</p>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="font-['Syne'] text-2xl font-bold">Cancel Subscription</h2>
        <p className="mt-3 text-[var(--text-2)]">
          Cancelling will end your access to provider support and prescription management at the end of your current
          billing period.
        </p>
        <div className="mt-5">
          <CancelSubscriptionButton />
        </div>
      </section>

      <p className="mt-6 text-[var(--text-2)]">Questions? Contact us at hello@sleepgenic.ai</p>

      <Link
        href="/portal/dashboard"
        className="mt-6 inline-block font-['DM_Mono'] text-xs uppercase tracking-[0.08em] text-[var(--accent)]"
      >
        ← Back to Dashboard
      </Link>
    </main>
  );
}
