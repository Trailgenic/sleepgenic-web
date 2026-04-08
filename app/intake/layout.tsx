"use client";

import { IntakeProvider } from "@/components/intake/IntakeContext";

export default function IntakeLayout({ children }: { children: React.ReactNode }) {
  return <IntakeProvider>{children}</IntakeProvider>;
}
