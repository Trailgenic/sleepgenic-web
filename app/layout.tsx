import type { Metadata } from "next";
import "./globals.css";
import "./mobile.css";
import Nav from "@/components/Nav";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Sleepgenic — Clinical Sleep Medicine, Without the Wait",
  description: "Sleep medicine access. Licensed provider review within 24 hours. Prescription where clinically indicated. Cash-pay sleep medicine — online, today.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") ?? 
    headersList.get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body>
        {!isAdmin && <Nav />}
        {children}
      </body>
    </html>
  );
}
