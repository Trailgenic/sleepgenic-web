import { Text, Section } from "@react-email/components";

export function EmailHeader() {
  return (
    <Section style={{ padding: "32px 0 24px", borderBottom: "1px solid #1e2d3d" }}>
      <Text style={{ fontFamily: "Arial, sans-serif", fontSize: "18px", fontWeight: "bold", color: "#e8edf2", letterSpacing: "0.1em", margin: "0" }}>
        SLEEPGENIC
      </Text>
      <Text style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", color: "#8fa3b3", margin: "4px 0 0" }}>
        Sleep medicine access. Online.
      </Text>
    </Section>
  );
}
