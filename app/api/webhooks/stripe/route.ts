// Local testing: stripe listen --forward-to localhost:3000/api/webhooks/stripe
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-08-27.basil",
    })
  : null;

export async function POST(req: Request) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Stripe webhook not configured." }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  const rawBody = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    console.error("STRIPE_WEBHOOK_INVALID_SIGNATURE", error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  switch (event.type) {
    case "customer.subscription.created": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer.id;

      // Retrieve customer to get email and metadata
      const customer = await stripe.customers.retrieve(customerId);

      if (customer.deleted) break;

      const intakeSubmissionId = customer.metadata?.intake_submission_id;
      const customerEmail = customer.email;

      console.log("SUBSCRIPTION_CREATED:", {
        subscriptionId: subscription.id,
        customerId,
        intakeSubmissionId,
        customerEmail,
      });

      if (intakeSubmissionId) {
        const { error } = await supabaseAdmin
          .from("intake_submissions")
          .update({
            stripe_customer_id: customerId,
            stripe_subscription_id: subscription.id,
            patient_email: customerEmail,
          })
          .eq("submission_id", intakeSubmissionId);

        if (error) {
          console.error("Supabase update error:", error);
        } else {
          console.log("Updated intake record with Stripe data");
        }
      }

      console.log("EMAIL_STUB: would send confirmation to", customerEmail);
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`SUBSCRIPTION_CANCELLED: ${subscription.id}`);
      break;
    }
    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      const invoiceAny = invoice as unknown as { subscription?: string | { id: string } };
      const subscriptionId = typeof invoiceAny.subscription === "string"
        ? invoiceAny.subscription
        : invoiceAny.subscription?.id;
      console.log(`PAYMENT_SUCCEEDED: invoice ${invoice.id} for subscription ${subscriptionId ?? "unknown"}`);
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`PAYMENT_FAILED: invoice ${invoice.id} — future: trigger retry email`);
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
