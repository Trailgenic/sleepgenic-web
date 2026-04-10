import Stripe from "stripe";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { PORTAL_COOKIE_NAME, validatePortalSession } from "@/lib/portalAuth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(PORTAL_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = await validatePortalSession(token);
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const { data: intakeRecord } = await supabaseAdmin
      .from("intake_submissions")
      .select("id,stripe_subscription_id")
      .ilike("patient_email", normalizedEmail)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!intakeRecord?.stripe_subscription_id) {
      return NextResponse.json({ error: "No active subscription found" }, { status: 400 });
    }

    await stripe.subscriptions.cancel(intakeRecord.stripe_subscription_id);

    await supabaseAdmin
      .from("intake_submissions")
      .update({ status: "not_a_candidate" })
      .eq("id", intakeRecord.id);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const err = error as { message?: string };
    return NextResponse.json({ error: err?.message ?? "Unable to cancel subscription" }, { status: 500 });
  }
}
