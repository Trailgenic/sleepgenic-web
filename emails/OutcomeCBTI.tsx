import { Html, Head, Body, Container, Section, Text } from "@react-email/components";
import { EmailHeader } from "./components/EmailHeader";
import { EmailFooter } from "./components/EmailFooter";

type OutcomeCBTIProps = {
  providerNotes?: string;
};

export default function OutcomeCBTI({ providerNotes }: OutcomeCBTIProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#0a0a0f", margin: "0", padding: "0" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px" }}>
          <EmailHeader />
          <Section style={{ padding: "32px 0" }}>
            <Text style={{ fontFamily: "Arial, sans-serif", fontSize: "22px", fontWeight: "bold", color: "#e8edf2", margin: "0 0 24px" }}>
              Your treatment plan is ready.
            </Text>
            <Text style={{ fontFamily: "Arial, sans-serif", fontSize: "15px", color: "#8fa3b3", lineHeight: "1.7", margin: "0 0 20px" }}>
              Your provider has completed your review and assigned a CBT-I protocol to improve your sleep.
            </Text>
            {providerNotes ? (
              <Section style={{ background: "#141c24", border: "1px solid #1e2d3d", padding: "16px", margin: "20px 0" }}>
                <Text style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", color: "#8fa3b3", fontStyle: "italic", margin: "0", lineHeight: "1.6" }}>
                  Provider notes: {providerNotes}
                </Text>
              </Section>
            ) : null}
            <Text style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#8fa3b3", lineHeight: "1.7", margin: "16px 0" }}>
              Log in to your portal to view your full protocol and next steps: sleepgenic.ai/portal
            </Text>
          </Section>
          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}
