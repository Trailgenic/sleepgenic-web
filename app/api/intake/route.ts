import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();

  console.log("[intake-submission]", payload);

  return NextResponse.json({
    status: "received",
    submission_id: payload.submission_id,
    message:
      "Your intake has been received. A licensed provider will review your case within 24 hours.",
    next_step: "checkout",
  });
}
