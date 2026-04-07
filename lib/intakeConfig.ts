export type IntakeState = {
  sleep_difficulty_types: string[];
  duration: string;
  frequency: string;
  daytime_impact: string;
  wearable_device: string;
  wearable_notes: string;
  previous_treatments: string[];
  current_medications: string;
  medical_history: string[];
  pregnancy_nursing: string;
  primary_goal: string;
};

export const initialIntakeState: IntakeState = {
  sleep_difficulty_types: [],
  duration: "",
  frequency: "",
  daytime_impact: "",
  wearable_device: "",
  wearable_notes: "",
  previous_treatments: [],
  current_medications: "",
  medical_history: [],
  pregnancy_nursing: "",
  primary_goal: "",
};

export const redFlagRules = [
  {
    field: "medical_history",
    value: "Sleep apnea (diagnosed)",
    outcome: "not-candidate",
    message:
      "Based on your responses, Sleepgenic may not be the right fit at this time. We recommend speaking with a sleep specialist directly.",
  },
];

export function evaluateCandidate(
  intake: IntakeState,
): { candidate: boolean; message?: string } {
  for (const rule of redFlagRules) {
    const value = intake[rule.field as keyof IntakeState];

    if (Array.isArray(value) && value.includes(rule.value)) {
      return { candidate: false, message: rule.message };
    }

    if (typeof value === "string" && value === rule.value) {
      return { candidate: false, message: rule.message };
    }
  }

  return { candidate: true };
}
