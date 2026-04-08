"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardControls({ initialAutoReview }: { initialAutoReview: boolean }) {
  const [autoReview, setAutoReview] = useState(initialAutoReview);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!autoReview) {
      return;
    }

    const interval = setInterval(async () => {
      await fetch("/api/admin/auto-review/process", { method: "GET" });
      router.refresh();
    }, 30000);

    return () => clearInterval(interval);
  }, [autoReview, router]);

  async function onToggle() {
    setBusy(true);
    const response = await fetch("/api/admin/auto-review/toggle", { method: "POST" });
    const data = await response.json();
    setAutoReview(Boolean(data.enabled));
    setBusy(false);
    router.refresh();
  }

  async function onLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.2em] text-[#ef4444]">Demo Mode</p>
        <button
          type="button"
          onClick={onToggle}
          disabled={busy}
          className={`relative h-7 w-16 rounded-full border ${autoReview ? "border-[var(--accent)] bg-[var(--accent)]" : "border-[var(--border-2)] bg-[var(--surface)]"}`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${autoReview ? "left-10" : "left-1"}`}
          />
          <span className="sr-only">Auto review toggle</span>
        </button>
      </div>
      <button
        onClick={onLogout}
        className="rounded-md border border-[var(--border-2)] bg-[var(--surface)] px-4 py-2 font-['DM_Mono'] text-xs uppercase tracking-[0.12em] text-[var(--text)] hover:bg-[var(--surface-2)]"
      >
        Logout
      </button>
    </div>
  );
}
