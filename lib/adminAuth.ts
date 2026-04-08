import { supabaseAdmin } from "@/lib/supabase";

export const ADMIN_COOKIE_NAME = "sg_admin_session";
export const ADMIN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 28_800,
};

export function generateSessionToken() {
  return crypto.randomUUID();
}

export async function createSession(email: string) {
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();

  const { error } = await supabaseAdmin.from("admin_sessions").insert({
    token,
    email,
    expires_at: expiresAt,
  });

  if (error) {
    throw new Error(`Failed to create session: ${error.message}`);
  }

  return token;
}

export async function validateSession(token: string) {
  const nowIso = new Date().toISOString();
  const { data, error } = await supabaseAdmin
    .from("admin_sessions")
    .select("email")
    .eq("token", token)
    .gt("expires_at", nowIso)
    .maybeSingle();

  if (error || !data?.email) {
    return null;
  }

  return data.email as string;
}

export async function deleteSession(token: string) {
  const { error } = await supabaseAdmin.from("admin_sessions").delete().eq("token", token);
  if (error) {
    console.error("ADMIN_LOGOUT_DELETE_SESSION_ERROR", error.message);
  }
}
