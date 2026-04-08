import { NextResponse } from "next/server";
import { getAutoReview } from "@/lib/autoReview";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: Request) {
  if (!getAutoReview()) {
    return NextResponse.json({ processed: 0, enabled: false });
  }

  const cutoffIso = new Date(Date.now() - 2 * 60 * 1000).toISOString();
  const { data, error } = await supabaseAdmin
    .from("intake_submissions")
    .select("id, submission_id, patient_email")
    .eq("status", "pending")
    .lt("created_at", cutoffIso);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let processed = 0;
  for (const row of data ?? []) {
    const reviewedAt = new Date().toISOString();
    const update = await supabaseAdmin
      .from("intake_submissions")
      .update({
        outcome: "both",
        outcome_notes: "Auto-review demo mode approval",
        reviewed_at: reviewedAt,
        reviewed_by: "auto-review",
        status: "complete",
      })
      .eq("id", row.id);

    if (update.error) {
      console.error("AUTO_REVIEW_UPDATE_ERROR", update.error.message);
      continue;
    }

    processed += 1;

    await fetch(new URL("/api/outcomes/fire", req.url), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submission_id: row.submission_id,
        patient_email: row.patient_email,
        outcome: "both",
        outcome_notes: "Auto-review demo mode approval",
        reviewed_at: reviewedAt,
      }),
    });
  }

  return NextResponse.json({ processed, enabled: true });
}
