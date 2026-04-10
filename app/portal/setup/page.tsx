"use client";

import { FormEvent, useState } from "react";

export default function PortalSetupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const response = await fetch("/api/portal/auth/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, confirmPassword }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data?.error ?? "No active subscription found for this email");
      return;
    }

    window.location.replace("/portal/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 py-10">
      <div className="w-full max-w-xl rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-2xl">
        <h1 className="font-['Syne'] text-3xl font-bold">Set up your patient account.</h1>
        <p className="mt-3 text-sm text-[var(--text-2)]">
          Enter the email address you used at checkout, then choose a password.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="w-full rounded-lg border border-[var(--border-2)] bg-[var(--bg-2)] px-4 py-3 text-[var(--text)] outline-none focus:border-[var(--accent)]"
            required
          />
          <input
            type="password"
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password (min 8 characters)"
            className="w-full rounded-lg border border-[var(--border-2)] bg-[var(--bg-2)] px-4 py-3 text-[var(--text)] outline-none focus:border-[var(--accent)]"
            required
          />
          <input
            type="password"
            minLength={8}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm password"
            className="w-full rounded-lg border border-[var(--border-2)] bg-[var(--bg-2)] px-4 py-3 text-[var(--text)] outline-none focus:border-[var(--accent)]"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[var(--accent)] px-4 py-3 font-['Syne'] text-sm font-bold uppercase tracking-[0.1em] text-white transition hover:brightness-110 disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          {error ? <p className="text-center text-sm text-[#ef4444]">{error}</p> : null}
        </form>
      </div>
    </main>
  );
}
