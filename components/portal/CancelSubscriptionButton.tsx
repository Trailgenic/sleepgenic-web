"use client";

import { useState } from "react";

export default function CancelSubscriptionButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleCancel() {
    setLoading(true);
    setError("");
    setMessage("");

    const response = await fetch("/api/portal/subscription/cancel", {
      method: "POST",
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data?.error ?? "Unable to cancel subscription.");
      return;
    }

    setMessage("Your subscription has been cancelled.");
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleCancel}
        disabled={loading}
        className="rounded-lg border border-[#ef4444] px-4 py-3 font-['DM_Mono'] text-xs uppercase tracking-[0.08em] text-[#ef4444] transition hover:bg-[#ef4444]/10 disabled:opacity-60"
      >
        {loading ? "Cancelling..." : "Cancel Subscription"}
      </button>
      {message ? <p className="mt-3 text-sm text-[var(--green)]">{message}</p> : null}
      {error ? <p className="mt-3 text-sm text-[#ef4444]">{error}</p> : null}
    </div>
  );
}
