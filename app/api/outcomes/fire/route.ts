import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  sendOutcomeCBTIEmail,
  sendOutcomePrescriptionEmail,
  sendOutcomeBothEmail,
  sendOutcomeFollowupEmail,
  sendOutcomeNotACandidateEmail,
} from "@/lib/email";
import { supabaseAdmin } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(request: Request) {
  const { submission_id, patient_email, outcome, outcome_notes, reviewed_at } = await request.json();

  console.log("OUTCOME_EVENT:", { submission_id, patient_email, outcome, reviewed_at });

  if (!patient_email) {
    return NextResponse.json({ error: "No patient email" }, { status: 400 });
  }

  try {
    switch (outcome) {
      case "cbti_protocol":
        await sendOutcomeCBTIEmail(patient_email, outcome_notes);
        break;
      case "prescription_recommended":
        await sendOutcomePrescriptionEmail(patient_email, outcome_notes);
        break;
      case "both":
        await sendOutcomeBothEmail(patient_email, outcome_notes);
        break;
      case "followup_required":
        await sendOutcomeFollowupEmail(patient_email, outcome_notes ?? "");
        break;
      case "not_a_candidate": {
        await sendOutcomeNotACandidateEmail(patient_email, outcome_notes);

        const { data } = await supabaseAdmin
          .from("intake_submissions")
          .select("stripe_subscription_id")
          .eq("submission_id", submission_id)
          .single();

        if (data?.stripe_subscription_id) {
          await stripe.subscriptions.cancel(data.stripe_subscription_id);
          console.log("SUBSCRIPTION_CANCELLED:", data.stripe_subscription_id);
        }
        break;
      }
      default:
        console.warn("Unknown outcome:", outcome);
        break;
    }

    console.log("EMAIL_SENT:", outcome, "to:", patient_email);
  } catch (emailError) {
    console.error("Email send failed:", emailError);
  }

  return NextResponse.json({ status: "received" }, { status: 200 });
}
