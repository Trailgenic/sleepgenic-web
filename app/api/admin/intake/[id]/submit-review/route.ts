import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { outcome, outcome_notes, reviewer_email } = await req.json();
  const reviewedAt = new Date().toISOString();

  const { data: updated, error } = await supabaseAdmin
    .from("intake_submissions")
    .update({
      outcome,
      outcome_notes,
      reviewed_at: reviewedAt,
      reviewed_by: reviewer_email,
      status: outcome === "not_a_candidate" ? "not_a_candidate" : "complete",
    })
    .eq("id", params.id)
    .select("submission_id, patient_email")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await fetch(new URL("/api/outcomes/fire", req.url), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      submission_id: updated.submission_id,
      patient_email: updated.patient_email,
      outcome,
      outcome_notes,
      reviewed_at: reviewedAt,
    }),
  });

  return NextResponse.json({ success: true });
}
