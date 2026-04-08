import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { submission_id, patient_email, outcome } = await req.json();

  console.log(
    `OUTCOME_STUB: ${submission_id} — ${outcome} — would send email to ${patient_email ?? "unknown"}`
  );

  return NextResponse.json({ status: "stub_received" }, { status: 200 });
}
