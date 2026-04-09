import { Html, Head, Body, Container, Section, Text } from "@react-email/components";
import { EmailHeader } from "./components/EmailHeader";
import { EmailFooter } from "./components/EmailFooter";

export default function IntakeConfirmation() {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#0a0a0f", margin: "0", padding: "0" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px" }}>
          <EmailHeader />
          <Section style={{ padding: "32px 0" }}>
            <Text style={{ fontFamily: "Arial, sans-serif", fontSize: "22px", fontWeight: "bold", color: "#e8edf2", margin: "0 0 24px" }}>
              Your sleep intake is in review.
            </Text>
            <Text style={{ fontFamily: "Arial, sans-serif", fontSize: "15px", color: "#8fa3b3", lineHeight: "1.7", margin: "0 0 20px" }}>
              A licensed provider will review your case within 24 hours and make a clinical determination. You will receive a follow-up email with your outcome once the review is complete.
            </Text>
            <Text style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", fontWeight: "bold", color: "#e8edf2", margin: "24px 0 12px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              What happens next
            </Text>
            {[
              "Your provider will review your full intake including sleep history, medical history, and wearable data if provided.",
              "You will receive an email with your clinical outcome — a CBT-I protocol, a prescription where indicated, or both.",
              "Your $149/month subscription is now active. You can manage or cancel your subscription at any time from your account.",
            ].map((item, i) => (
              <Text key={i} style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#8fa3b3", lineHeight: "1.7", margin: "0 0 12px", paddingLeft: "16px", borderLeft: "2px solid #3b82f6" }}>
                {item}
              </Text>
            ))}
            <Text style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#8fa3b3", lineHeight: "1.7", margin: "24px 0 0" }}>
              If you have questions, reply to this email or contact us at hello@sleepgenic.ai.
            </Text>
          </Section>
          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}
