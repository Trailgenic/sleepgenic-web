"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
);

function CheckoutPaymentForm({
  email,
}: {
  email: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        receipt_email: email,
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message || "Payment could not be completed.");
      setIsSubmitting(false);
      return;
    }

    if (result.paymentIntent?.status === "succeeded") {
      window.location.href = "/checkout/success";
      return;
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={onSubmit} style={{ marginTop: "1rem" }}>
      <PaymentElement options={{ layout: "tabs", paymentMethodOrder: ["card"] }} />
      {error && <p style={{ color: "#ef4444", marginTop: "0.75rem" }}>{error}</p>}
      <button
        type="submit"
        disabled={!stripe || !elements || isSubmitting}
        style={{
          width: "100%",
          marginTop: "1rem",
          border: "none",
          background: "#3b82f6",
          color: "#ffffff",
          padding: "0.95rem 1rem",
          fontFamily: "'Syne', sans-serif",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          opacity: isSubmitting ? 0.7 : 1,
        }}
      >
        {isSubmitting ? "Processing..." : "Start My Review — $149/month"}
      </button>
      <p
        style={{
          marginTop: "0.8rem",
          color: "#556070",
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.72rem",
          lineHeight: 1.6,
        }}
      >
        Secure payment processed by Stripe. Cancel anytime from your account.
      </p>
    </form>
  );
}

export default function CheckoutPage() {
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submissionId, setSubmissionId] = useState("dev-test");

  useEffect(() => {
    const storedSubmissionId =
      window.sessionStorage.getItem("sleepgenic_submission_id") || "dev-test";
    setSubmissionId(storedSubmissionId);
  }, []);

  const isEmailValid = useMemo(() => /.+@.+\..+/.test(email.trim()), [email]);

  const initializeCheckout = async () => {
    if (!isEmailValid) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    const response = await fetch("/api/checkout/create-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        intake_submission_id: submissionId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Unable to initialize payment.");
      setLoading(false);
      return;
    }

    setClientSecret(data.clientSecret);
    setEmailSubmitted(true);
    setLoading(false);
  };

  const onEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await initializeCheckout();
  };

  const stripeOptions = {
    clientSecret,
    appearance: {
      theme: "night" as const,
      variables: {
        colorPrimary: "#3b82f6",
        colorBackground: "#141c24",
        colorText: "#e8edf2",
        colorDanger: "#ef4444",
        fontFamily: "Syne, sans-serif",
        borderRadius: "0px",
      },
    },
  };

  return (
    <main className="checkout-page" style={{ minHeight: "100vh", background: "#080c0f", color: "#e8edf2", paddingTop: 88 }}>
      {/* Stripe test cards:
          Success: 4242 4242 4242 4242
          HSA/FSA: 4000 0566 5566 5556
          Decline: 4000 0000 0000 9995
          Use any future expiry date and any 3-digit CVC */}
      <section className="checkout-section" style={{ maxWidth: 1120, margin: "0 auto", padding: "1.5rem 1rem 3rem" }}>
        <div className="checkout-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1rem",
          }}
        >
          <div
            style={{
              background: "#141c24",
              border: "1px solid #1e2d3d",
              padding: "1.25rem",
            }}
          >
            <h1
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 2.7rem)",
                lineHeight: 1.15,
                marginBottom: "0.9rem",
              }}
            >
              Sleepgenic Sleep Medicine Subscription
            </h1>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "1rem", marginBottom: "0.5rem" }}>$149.00 / month</p>
            <p style={{ color: "#8fa3b3", marginBottom: "1rem" }}>HSA/FSA eligible — cancel anytime</p>
            <div style={{ display: "grid", gap: "0.6rem" }}>
              {[
                "Licensed provider review within 24 hours",
                "Prescription where clinically indicated",
                "No insurance required",
              ].map((line) => (
                <div key={line} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                  <span style={{ color: "#22c55e" }}>✓</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
            <p
              style={{
                marginTop: "1.1rem",
                color: "#556070",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.72rem",
                lineHeight: 1.6,
              }}
            >
              By subscribing you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>

          <div
            style={{
              background: "#141c24",
              border: "1px solid #1e2d3d",
              padding: "1.25rem",
            }}
          >
            <form onSubmit={onEmailSubmit}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  color: "#8fa3b3",
                  marginBottom: "0.45rem",
                }}
              >
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                required
                style={{
                  width: "100%",
                  background: "#0d1117",
                  color: "#e8edf2",
                  border: "1px solid #1e2d3d",
                  padding: "0.85rem 0.9rem",
                  fontFamily: "'Syne', sans-serif",
                }}
              />

              {!emailSubmitted && (
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    marginTop: "0.75rem",
                    border: "1px solid #263545",
                    background: "#1a2330",
                    color: "#e8edf2",
                    padding: "0.85rem 1rem",
                    fontFamily: "'Syne', sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Loading..." : "Continue"}
                </button>
              )}
            </form>

            {error && <p style={{ color: "#ef4444", marginTop: "0.75rem" }}>{error}</p>}

            {emailSubmitted && clientSecret && (
              <Elements stripe={stripePromise} options={stripeOptions}>
                <CheckoutPaymentForm email={email.trim()} />
              </Elements>
            )}
          </div>
        </div>
      </section>


      <footer
        style={{
          borderTop: "1px solid #1e2d3d",
          textAlign: "center",
          color: "#556070",
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.72rem",
          padding: "1rem",
        }}
      >
        Sleepgenic is a technology platform. All clinical decisions are made by independent licensed providers.
      </footer>
    </main>
  );
}
