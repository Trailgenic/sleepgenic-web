import type { Metadata } from "next";
import "./globals.css";
import "./mobile.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Sleepgenic — Clinical Sleep Medicine, Without the Wait",
  description: "Sleep medicine access. Licensed provider review within 24 hours. Prescription where clinically indicated. Cash-pay sleep medicine — online, today.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
