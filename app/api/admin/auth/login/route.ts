import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, ADMIN_COOKIE_OPTIONS, createSession } from "@/lib/adminAuth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminPasswordHash) {
    return NextResponse.json({ error: "Admin auth not configured" }, { status: 500 });
  }

  const isEmailMatch = email === adminEmail;
  const isPasswordMatch = await bcrypt.compare(password ?? "", adminPasswordHash);

  if (!isEmailMatch || !isPasswordMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await createSession(email);
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, ADMIN_COOKIE_OPTIONS);

  return NextResponse.json({ success: true });
}
