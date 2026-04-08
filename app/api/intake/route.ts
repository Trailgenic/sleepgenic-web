import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const payload = await req.json();

  console.log("[intake-submission]", payload);

  const { error } = await supabaseAdmin.from("intake_submissions").insert({
    submission_id: payload.submission_id,
    intake_payload: payload.intake,
    status: "pending",
  });

  if (error) {
    console.error("INTAKE_SUPABASE_INSERT_ERROR", error.message);
  } else {
    console.log("INTAKE_SUPABASE_INSERT_OK", payload.submission_id);
  }

  return NextResponse.json({
    status: "received",
    submission_id: payload.submission_id,
    message:
      "Your intake has been received. A licensed provider will review your case within 24 hours.",
    next_step: "checkout",
  });
}
