export type IntakeState = {
  sleep_difficulty_types: string[];
  duration: string;
  frequency: string;
  daytime_impact: string;
  previous_treatments: string[];
  current_medications: string;
  medical_history: string[];
  pregnancy_nursing: string;
  primary_goal: string;
  wearable: {
    tracks_sleep: "Yes" | "No" | "";
    avg_sleep_hours: string | null;
    sleep_need_gap: string | null;
    sleep_score_range: string | null;
    non_wearable_hours: string | null;
  };
};

export const initialIntakeState: IntakeState = {
  sleep_difficulty_types: [],
  duration: "",
  frequency: "",
  daytime_impact: "",
  previous_treatments: [],
  current_medications: "",
  medical_history: [],
  pregnancy_nursing: "",
  primary_goal: "",
  wearable: {
    tracks_sleep: "",
    avg_sleep_hours: null,
    sleep_need_gap: null,
    sleep_score_range: null,
    non_wearable_hours: null,
  },
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
