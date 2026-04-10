import { supabaseAdmin } from "@/lib/supabase";

export const PORTAL_COOKIE_NAME = "sg_portal_session";
export const PORTAL_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 86_400,
};

export async function createPortalSession(email: string): Promise<string> {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabaseAdmin
    .from("portal_sessions")
    .insert({ email, expires_at: expiresAt })
    .select("id")
    .single();

  if (error || !data?.id) {
    throw new Error(`Failed to create portal session: ${error?.message ?? "unknown"}`);
  }

  return data.id as string;
}

export async function validatePortalSession(token: string): Promise<string | null> {
  const nowIso = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("portal_sessions")
    .select("email")
    .eq("id", token)
    .gt("expires_at", nowIso)
    .maybeSingle();

  if (error || !data?.email) {
    return null;
  }

  return data.email as string;
}

export async function deletePortalSession(token: string): Promise<void> {
  const { error } = await supabaseAdmin.from("portal_sessions").delete().eq("id", token);

  if (error) {
    console.error("PORTAL_LOGOUT_DELETE_SESSION_ERROR", error.message);
  }
}
