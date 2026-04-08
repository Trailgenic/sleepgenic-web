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

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: process.env.STRIPE_PRICE_ID! }],
      payment_behavior: "default_incomplete",
      payment_settings: {
        save_default_payment_method: "on_subscription",
      },
      expand: ["latest_invoice.payment_intent"],
    });

    // Extract client secret
    const latestInvoice = subscription.latest_invoice as any;
    const clientSecret = latestInvoice?.payment_intent?.client_secret;

    if (!clientSecret) {
      console.error("No client secret found. Invoice:",
        JSON.stringify(latestInvoice, null, 2));
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

  } catch (error: any) {
    console.error("Stripe error:", error?.message, error?.type, error?.code);
    return NextResponse.json(
      { error: error?.message ?? "Unknown error" },
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
