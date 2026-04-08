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

    // Get the payment intent ID from the invoice
    const invoice = subscription.latest_invoice as unknown as {
      id: string;
      payment_intent: string | { id: string; client_secret: string } | null;
    };

    let clientSecret: string | null = null;

    if (!invoice?.payment_intent) {
      return NextResponse.json(
        { error: "No payment intent on invoice" },
        { status: 500 }
      );
    }

    // If expanded object
    if (typeof invoice.payment_intent === "object" &&
        invoice.payment_intent.client_secret) {
      clientSecret = invoice.payment_intent.client_secret;
    }

    // If just an ID string, retrieve it directly
    if (!clientSecret && typeof invoice.payment_intent === "string") {
      const pi = await stripe.paymentIntents.retrieve(
        invoice.payment_intent
      );
      clientSecret = pi.client_secret;
    }

    // Last resort: list payment intents for customer
    if (!clientSecret) {
      const paymentIntents = await stripe.paymentIntents.list({
        customer: customer.id,
        limit: 1,
      });
      if (paymentIntents.data[0]?.client_secret) {
        clientSecret = paymentIntents.data[0].client_secret;
      }
    }

    if (!clientSecret) {
      return NextResponse.json(
        { error: "Could not retrieve client secret" },
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
