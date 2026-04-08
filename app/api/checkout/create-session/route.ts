import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(request: Request) {
  try {
    const { email, intake_submission_id } = await request.json();

    // Create customer
    const customer = await stripe.customers.create({
      email,
      metadata: {
        intake_submission_id: intake_submission_id ?? "unknown",
        source: "sleepgenic-web-v1",
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: process.env.STRIPE_PRICE_ID! }],
      payment_behavior: "default_incomplete",
      payment_settings: {
        save_default_payment_method: "on_subscription",
      },
      expand: ["latest_invoice.payment_intent"],
    });

    // Try multiple paths to find the client secret
    const invoice = subscription.latest_invoice as unknown as {
      payment_intent?: {
        client_secret?: string;
        id?: string;
      } | string;
      id?: string;
    };

    let clientSecret: string | null = null;

    if (invoice?.payment_intent &&
        typeof invoice.payment_intent === "object") {
      clientSecret = invoice.payment_intent.client_secret ?? null;
    }

    // Fallback: if payment_intent is just an ID string,
    // retrieve it directly
    if (!clientSecret && invoice?.payment_intent &&
        typeof invoice.payment_intent === "string") {
      const pi = await stripe.paymentIntents.retrieve(
        invoice.payment_intent
      );
      clientSecret = pi.client_secret;
    }

    console.log("Invoice ID:", invoice?.id);
    console.log("Payment intent type:",
      typeof invoice?.payment_intent);
    console.log("Client secret found:", !!clientSecret);

    if (!clientSecret) {
      return NextResponse.json(
        { error: "No client secret returned from Stripe" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      clientSecret,
      subscriptionId: subscription.id,
      customerId: customer.id,
    });

  } catch (error: unknown) {
    const err = error as { message?: string; type?: string; code?: string };
    console.error("Stripe error:", err?.message, err?.type, err?.code);
    return NextResponse.json(
      { error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    stripeKeyPresent: !!process.env.STRIPE_SECRET_KEY,
    stripeKeyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 12) ?? "missing",
    priceId: process.env.STRIPE_PRICE_ID ?? "missing",
  });
}
