import { Html, Head, Body, Container, Section, Text } from "@react-email/components";
import { EmailHeader } from "./components/EmailHeader";
import { EmailFooter } from "./components/EmailFooter";

type OutcomeNotACandidateProps = {
  providerNotes?: string;
};

const DEFAULT_NOTES =
  "Based on your intake, asynchronous treatment through Sleepgenic is not the safest fit at this time. We recommend following up with an in-person clinician for next-step care.";

export default function OutcomeNotACandidate({ providerNotes }: OutcomeNotACandidateProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#0a0a0f", margin: "0", padding: "0" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px" }}>
          <EmailHeader />
          <Section style={{ padding: "32px 0" }}>
            <Text style={{ fontFamily: "Arial, sans-serif", fontSize: "22px", fontWeight: "bold", color: "#e8edf2", margin: "0 0 24px" }}>
              Important information about your care.
            </Text>
            <Section style={{ background: "#141c24", border: "1px solid #1e2d3d", padding: "16px", margin: "20px 0" }}>
              <Text style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: "#8fa3b3", fontStyle: "italic", margin: "0", lineHeight: "1.6" }}>
                Provider notes: {providerNotes ?? DEFAULT_NOTES}
              </Text>
            </Section>
            <Text style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#8fa3b3", lineHeight: "1.7", margin: "0 0 12px" }}>
              A full refund will be issued to your original payment method. Please allow 5-10 business days for it to appear on your statement.
            </Text>
            <Text style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#8fa3b3", lineHeight: "1.7", margin: "0" }}>
              If you have questions about this decision, reply to this email and our team will assist you.
            </Text>
          </Section>
          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}
