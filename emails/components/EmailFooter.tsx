import { Text, Section } from "@react-email/components";

export function EmailFooter() {
  return (
    <Section style={{ paddingTop: "24px", marginTop: "32px", borderTop: "1px solid #1e2d3d" }}>
      <Text style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", color: "#556070", lineHeight: "1.6", margin: "0" }}>
        Sleepgenic, LLC | sleepgenic.ai | This is a transactional email related to your subscription. You cannot unsubscribe from clinical communications.
      </Text>
      <Text style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", color: "#556070", margin: "4px 0 0" }}>
        123 Placeholder Street, Suite 100, City, State 00000
      </Text>
    </Section>
  );
}
