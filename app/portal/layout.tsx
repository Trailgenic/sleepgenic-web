export default function PortalLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#080c0f", minHeight: "100vh" }}>
      {children}
    </div>
  );
}
