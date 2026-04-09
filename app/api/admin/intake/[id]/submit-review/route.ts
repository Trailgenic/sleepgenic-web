import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { outcome, outcome_notes, reviewer_email } =
      await request.json();

    const newStatus = outcome === "not_a_candidate"
      ? "not_a_candidate"
      : "complete";

    const { error } = await supabaseAdmin
      .from("intake_submissions")
      .update({
        outcome,
        outcome_notes: outcome_notes ?? null,
        reviewed_at: new Date().toISOString(),
        reviewed_by: reviewer_email ?? "admin",
        status: newStatus,
      })
      .eq("id", params.id);

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const { data: intakeSubmission, error: intakeFetchError } = await supabaseAdmin
      .from("intake_submissions")
      .select("patient_email")
      .eq("id", params.id)
      .single();

    if (intakeFetchError) {
      console.error("Supabase fetch error:", intakeFetchError);
      return NextResponse.json(
        { error: intakeFetchError.message },
        { status: 500 }
      );
    }

    if (!intakeSubmission?.patient_email) {
      return NextResponse.json(
        { error: "No patient email on record" },
        { status: 400 }
      );
    }

    // Fire outcome stub
    await fetch(
      new URL("/api/outcomes/fire", request.url).toString(),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submission_id: params.id,
          patient_email: intakeSubmission.patient_email,
          outcome,
          outcome_notes,
          reviewed_at: new Date().toISOString(),
        }),
      }
    );

    return NextResponse.json({ success: true });

  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error("Submit review error:", err?.message);
    return NextResponse.json(
      { error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
