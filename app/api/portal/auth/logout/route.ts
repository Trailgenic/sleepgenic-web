import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PORTAL_COOKIE_NAME, deletePortalSession } from "@/lib/portalAuth";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(PORTAL_COOKIE_NAME)?.value;

  if (token) {
    await deletePortalSession(token);
  }

  cookieStore.set(PORTAL_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return NextResponse.json({ success: true });
}
