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
    const { email, password } = await request.json();
    const normalizedEmail = (email ?? "").trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const { data: account, error } = await supabaseAdmin
      .from("patient_accounts")
      .select("email,password_hash")
      .ilike("email", normalizedEmail)
      .maybeSingle();

    if (error || !account?.password_hash) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, account.password_hash);

    if (!isMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = await createPortalSession(account.email);

    await supabaseAdmin
      .from("patient_accounts")
      .update({ last_login: new Date().toISOString() })
      .ilike("email", normalizedEmail);

    const response = NextResponse.json({ success: true });
    response.cookies.set(PORTAL_COOKIE_NAME, token, PORTAL_COOKIE_OPTIONS);
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }
}
