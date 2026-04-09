import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const adminEmail1 = process.env.ADMIN_EMAIL ?? "";
    const adminHash1 = process.env.ADMIN_PASSWORD_HASH ?? "";
    const adminEmail2 = process.env.ADMIN_EMAIL_2 ?? "";
    const adminHash2 = process.env.ADMIN_PASSWORD_HASH_2 ?? "";

    const inputEmail = email.trim().toLowerCase();

    let matchedEmail: string | null = null;

    // Check admin 1
    if (adminEmail1 && adminHash1 && 
        inputEmail === adminEmail1.trim().toLowerCase()) {
      const match = await bcrypt.compare(password, adminHash1);
      if (match) matchedEmail = adminEmail1;
    }

    // Check admin 2
    if (!matchedEmail && adminEmail2 && adminHash2 && 
        inputEmail === adminEmail2.trim().toLowerCase()) {
      const match = await bcrypt.compare(password, adminHash2);
      if (match) matchedEmail = adminEmail2;
    }

    if (!matchedEmail) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000);

    await supabaseAdmin.from("admin_sessions").insert({
      id: token,
      email: matchedEmail,
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
