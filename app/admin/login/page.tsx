"use client";
import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (response.ok) {
      window.location.replace("/admin/dashboard");
      return;
    }

    setError("Invalid credentials");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6">
      <div className="w-full max-w-md rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-2xl">
        <h1 className="text-center font-['Syne'] text-3xl font-bold tracking-[0.12em]">SLEEPGENIC</h1>
        <p className="mt-2 text-center font-['DM_Mono'] text-sm uppercase tracking-[0.2em] text-[var(--accent)]">
          Provider Dashboard
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-[var(--border-2)] bg-[var(--bg-2)] px-4 py-3 text-[var(--text)] outline-none focus:border-[var(--accent)]"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[var(--accent)] px-4 py-3 font-['Syne'] text-sm font-bold uppercase tracking-[0.1em] text-white transition hover:brightness-110 disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          {error ? <p className="text-center text-sm text-[#ef4444]">{error}</p> : null}
        </form>
      </div>
    </main>
  );
}
