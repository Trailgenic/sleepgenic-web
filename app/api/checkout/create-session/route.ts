import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(request: Request) {
  try {
    const { email, intake_submission_id } = await request.json();

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
    });

    // Get invoice ID from subscription
    const invoiceId = typeof subscription.latest_invoice === "string"
      ? subscription.latest_invoice
      : subscription.latest_invoice?.id;

    if (!invoiceId) {
      return NextResponse.json(
        { error: "No invoice found on subscription" },
        { status: 500 }
      );
    }

    // Retrieve invoice as raw JSON to avoid type constraints
    const invoiceRaw = await stripe.invoices.retrieve(invoiceId, {
      expand: ["payment_intent"],
    }) as unknown as Record<string, unknown>;

    // Extract payment intent
    const pi = invoiceRaw.payment_intent as Record<string, unknown> | null;

    // If expanded object with client_secret
    if (pi && typeof pi === "object" && typeof pi.client_secret === "string") {
      return NextResponse.json({
        clientSecret: pi.client_secret,
        subscriptionId: subscription.id,
        customerId: customer.id,
      });
    }

    // If payment_intent is just a string ID, retrieve it directly
    if (typeof pi === "string") {
      const paymentIntent = await stripe.paymentIntents.retrieve(pi);
      if (paymentIntent.client_secret) {
        return NextResponse.json({
          clientSecret: paymentIntent.client_secret,
          subscriptionId: subscription.id,
          customerId: customer.id,
        });
      }
    }

    // Last resort: list payment intents for this customer
    const piList = await stripe.paymentIntents.list({
      customer: customer.id,
      limit: 1,
    });

    const latestPi = piList.data[0];
    if (latestPi?.client_secret) {
      return NextResponse.json({
        clientSecret: latestPi.client_secret,
        subscriptionId: subscription.id,
        customerId: customer.id,
      });
    }

    return NextResponse.json(
      { error: "Could not retrieve client secret" },
      { status: 500 }
    );

  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error("Stripe error:", err?.message);
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
