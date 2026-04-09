import { render } from "@react-email/components";
import type { ReactElement } from "react";
import { Resend } from "resend";
import IntakeConfirmation from "@/emails/IntakeConfirmation";
import OutcomeCBTI from "@/emails/OutcomeCBTI";
import OutcomePrescription from "@/emails/OutcomePrescription";
import OutcomeBoth from "@/emails/OutcomeBoth";
import OutcomeFollowup from "@/emails/OutcomeFollowup";
import OutcomeNotACandidate from "@/emails/OutcomeNotACandidate";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

async function sendEmail(to: string, subject: string, component: ReactElement): Promise<void> {
  const html = await render(component);

  await resend.emails.send({
    from: FROM,
    to,
    subject,
    html,
    headers: {},
  });
}

export async function sendIntakeConfirmationEmail(to: string): Promise<void> {
  await sendEmail(to, "Your intake has been received — review begins within 24 hours", <IntakeConfirmation />);
}

export async function sendOutcomeCBTIEmail(to: string, providerNotes?: string): Promise<void> {
  await sendEmail(to, "Your sleep review is complete — CBT-I protocol assigned", <OutcomeCBTI providerNotes={providerNotes} />);
}

export async function sendOutcomePrescriptionEmail(to: string, providerNotes?: string): Promise<void> {
  await sendEmail(to, "Your sleep review is complete — prescription recommended", <OutcomePrescription providerNotes={providerNotes} />);
}

export async function sendOutcomeBothEmail(to: string, providerNotes?: string): Promise<void> {
  await sendEmail(to, "Your sleep review is complete — treatment plan ready", <OutcomeBoth providerNotes={providerNotes} />);
}

export async function sendOutcomeFollowupEmail(to: string, providerNotes: string): Promise<void> {
  await sendEmail(to, "Your sleep review — additional information needed", <OutcomeFollowup providerNotes={providerNotes} />);
}

export async function sendOutcomeNotACandidateEmail(to: string, providerNotes?: string): Promise<void> {
  await sendEmail(
    to,
    "Your sleep review — important information about your care",
    <OutcomeNotACandidate providerNotes={providerNotes} />,
  );
}
