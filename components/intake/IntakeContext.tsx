"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { initialIntakeState, type IntakeState } from "@/lib/intakeConfig";

type IntakeContextValue = {
  intake: IntakeState;
  setField: <K extends keyof IntakeState>(field: K, value: IntakeState[K]) => void;
  toggleArrayValue: (field: keyof IntakeState, value: string) => void;
  resetIntake: () => void;
};

const IntakeContext = createContext<IntakeContextValue | null>(null);

export function IntakeProvider({ children }: { children: React.ReactNode }) {
  const [intake, setIntake] = useState<IntakeState>(initialIntakeState);

  const value = useMemo(
    () => ({
      intake,
      setField: <K extends keyof IntakeState>(field: K, value: IntakeState[K]) => {
        setIntake((prev) => ({ ...prev, [field]: value }));
      },
      toggleArrayValue: (field: keyof IntakeState, value: string) => {
        setIntake((prev) => {
          const current = prev[field];
          if (!Array.isArray(current)) {
            return prev;
          }

          const updated = current.includes(value)
            ? current.filter((item) => item !== value)
            : [...current, value];

          return { ...prev, [field]: updated };
        });
      },
      resetIntake: () => setIntake(initialIntakeState),
    }),
    [intake],
  );

  return <IntakeContext.Provider value={value}>{children}</IntakeContext.Provider>;
}

export function useIntake() {
  const context = useContext(IntakeContext);
  if (!context) {
    throw new Error("useIntake must be used within IntakeProvider");
  }
  return context;
}
