import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminEmail || !adminHash) {
      console.error("Admin credentials not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const emailMatch = email.trim().toLowerCase() ===
      adminEmail.trim().toLowerCase();
    const passwordMatch = await bcrypt.compare(password, adminHash);

    console.log("Login attempt:", {
      emailMatch,
      passwordMatch,
      providedEmail: email.trim().toLowerCase(),
      expectedEmail: adminEmail.trim().toLowerCase()
    });

    if (!emailMatch || !passwordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create session
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000);

    await supabaseAdmin.from("admin_sessions").insert({
      id: token,
      email: adminEmail,
      expires_at: expiresAt.toISOString(),
    });

    const response = NextResponse.json({ success: true });
    response.cookies.set("sg_admin_session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 28800,
    });

    return response;

  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error("Login error:", err?.message);
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }
}
