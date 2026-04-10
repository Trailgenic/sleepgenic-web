import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import {
  createPortalSession,
  PORTAL_COOKIE_NAME,
  PORTAL_COOKIE_OPTIONS,
} from "@/lib/portalAuth";

export async function POST(request: Request) {
  try {
    const { email, password, confirmPassword } = await request.json();
    const normalizedEmail = (email ?? "").trim().toLowerCase();

    if (!normalizedEmail) {
      return NextResponse.json({ error: "No active subscription found for this email" }, { status: 400 });
    }

    if ((password ?? "").length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    const { data: intakeRecord } = await supabaseAdmin
      .from("intake_submissions")
      .select("id")
      .ilike("patient_email", normalizedEmail)
      .not("stripe_subscription_id", "is", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!intakeRecord) {
      return NextResponse.json({ error: "No active subscription found for this email" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const { error: upsertError } = await supabaseAdmin.from("patient_accounts").upsert(
      {
        email: normalizedEmail,
        password_hash: passwordHash,
      },
      { onConflict: "email" }
    );

    if (upsertError) {
      return NextResponse.json({ error: "Unable to create account" }, { status: 400 });
    }

    const token = await createPortalSession(normalizedEmail);
    const response = NextResponse.json({ success: true });
    response.cookies.set(PORTAL_COOKIE_NAME, token, PORTAL_COOKIE_OPTIONS);
    return response;
  } catch {
    return NextResponse.json({ error: "Unable to create account" }, { status: 400 });
  }
}
