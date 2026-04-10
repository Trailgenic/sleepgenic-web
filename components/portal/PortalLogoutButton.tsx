"use client";

import { useState } from "react";

export default function PortalLogoutButton() {
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/portal/auth/logout", { method: "POST" });
    window.location.replace("/portal/login");
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="rounded-lg border border-[var(--border-2)] px-4 py-2 font-['DM_Mono'] text-xs uppercase tracking-[0.08em] text-[var(--text-2)] hover:bg-[var(--surface-2)] disabled:opacity-60"
    >
      {loading ? "Signing Out..." : "Logout"}
    </button>
  );
}
