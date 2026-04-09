import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const adminEmail2 = process.env.ADMIN_EMAIL_2 ?? "";
    const adminHash2 = process.env.ADMIN_PASSWORD_HASH_2 ?? "";
    const inputEmail = email.trim().toLowerCase();

    console.log("Login attempt:", {
      inputEmail,
      admin2Email: adminEmail2.trim().toLowerCase(),
      admin2EmailMatch: inputEmail === adminEmail2.trim().toLowerCase(),
      admin2HashLength: adminHash2.length,
      admin2HashPrefix: adminHash2.substring(0, 7),
    });

    const admin2Match = 
      adminEmail2 && 
      adminHash2 && 
      inputEmail === adminEmail2.trim().toLowerCase()
        ? await bcrypt.compare(password, adminHash2)
        : false;

    console.log("Admin2 password match:", admin2Match);

    const adminEmail1 = process.env.ADMIN_EMAIL ?? "";
    const adminHash1 = process.env.ADMIN_PASSWORD_HASH ?? "";

    const admin1Match =
      adminEmail1 &&
      adminHash1 &&
      inputEmail === adminEmail1.trim().toLowerCase()
        ? await bcrypt.compare(password, adminHash1)
        : false;

    console.log("Admin1 password match:", admin1Match);

    const matchedEmail = admin1Match 
      ? adminEmail1 
      : admin2Match 
        ? adminEmail2 
        : null;

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
