import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const admins = [
      {
        email: process.env.ADMIN_EMAIL ?? "",
        hash: process.env.ADMIN_PASSWORD_HASH ?? "",
      },
      {
        email: process.env.ADMIN_EMAIL_2 ?? "",
        hash: process.env.ADMIN_PASSWORD_HASH_2 ?? "",
      },
    ].filter((a) => a.email && a.hash);

    if (admins.length === 0) {
      console.error("Admin credentials not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const matchedAdmin = await Promise.all(
      admins.map(async (admin) => {
        const emailMatch =
          email.trim().toLowerCase() ===
          admin.email.trim().toLowerCase();
        const passwordMatch = emailMatch
          ? await bcrypt.compare(password, admin.hash)
          : false;
        return emailMatch && passwordMatch ? admin : null;
      })
    ).then((results) => results.find(Boolean));

    if (!matchedAdmin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create session using matchedAdmin.email
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000);

    await supabaseAdmin.from("admin_sessions").insert({
      id: token,
      email: matchedAdmin.email,
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
