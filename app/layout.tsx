import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Sleepgenic — Clinical Sleep Medicine, Without the Wait",
  description: "10-question biometric intake. Licensed provider review in 24 hours. CBT-I protocol + medication where indicated. $149/month. No insurance. No waiting room.",
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
