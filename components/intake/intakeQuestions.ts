export type IntakeQuestion = {
  step: number;
  label: string;
  text: string;
  field:
    | "sleep_difficulty_types"
    | "duration"
    | "frequency"
    | "daytime_impact"
    | "wearable_device"
    | "previous_treatments"
    | "current_medications"
    | "medical_history"
    | "pregnancy_nursing"
    | "primary_goal";
  type: "multi" | "single" | "text";
  options?: string[];
  subtext?: string;
  placeholder?: string;
  note?: string;
};

export const intakeQuestions: IntakeQuestion[] = [
  {
    step: 1,
    label: "01 / 10",
    text: "Which of the following best describes your sleep problem?",
    field: "sleep_difficulty_types",
    type: "multi",
    options: [
      "Difficulty falling asleep",
      "Difficulty staying asleep",
      "Waking too early and unable to return to sleep",
      "Unrefreshing sleep",
      "More than one of the above",
    ],
  },
  {
    step: 2,
    label: "02 / 10",
    text: "How long have you been experiencing this sleep problem?",
    field: "duration",
    type: "single",
    options: [
      "Less than 1 month",
      "1–3 months",
      "3–6 months",
      "6–12 months",
      "More than 1 year",
    ],
  },
  {
    step: 3,
    label: "03 / 10",
    text: "How many nights per week does this affect you?",
    field: "frequency",
    type: "single",
    options: ["1–2 nights", "3–4 nights", "5–6 nights", "Every night"],
  },
  {
    step: 4,
    label: "04 / 10",
    text: "How much does your sleep problem affect your daytime functioning — work performance, energy, mood, or concentration?",
    field: "daytime_impact",
    type: "single",
    options: ["Not at all", "A little", "Moderately", "A great deal", "Severely"],
  },
  {
    step: 5,
    label: "05 / 10",
    text: "Do you track your sleep on a wearable device?",
    field: "wearable_device",
    type: "single",
    options: [
      "Yes — Garmin",
      "Yes — Whoop",
      "Yes — Apple Watch",
      "Yes — other device",
      "No",
    ],
  },
  {
    step: 6,
    label: "06 / 10",
    text: "Have you tried any of the following for your sleep problem?",
    subtext: "Select all that apply.",
    field: "previous_treatments",
    type: "multi",
    options: [
      "OTC sleep aids (melatonin, ZzzQuil, etc.)",
      "Prescription sleep medication",
      "CBT-I or behavioral therapy",
      "Nothing yet",
    ],
  },
  {
    step: 7,
    label: "07 / 10",
    text: "List any prescription medications you currently take.",
    field: "current_medications",
    type: "text",
    placeholder: "List medications separated by commas, or write None.",
    note: "Your provider needs this to check for interactions before prescribing.",
  },
  {
    step: 8,
    label: "08 / 10",
    text: "Do you have any of the following?",
    subtext: "Select all that apply.",
    field: "medical_history",
    type: "multi",
    options: [
      "Depression or anxiety",
      "Chronic pain",
      "Heart condition",
      "Sleep apnea (diagnosed)",
      "None of the above",
      "Prefer not to say",
    ],
  },
  {
    step: 9,
    label: "09 / 10",
    text: "Are you currently pregnant or nursing?",
    field: "pregnancy_nursing",
    type: "single",
    options: ["Yes", "No", "Not applicable"],
  },
  {
    step: 10,
    label: "10 / 10",
    text: "What outcome are you most hoping for from Sleepgenic?",
    field: "primary_goal",
    type: "single",
    options: [
      "A prescription medication",
      "A structured behavioral protocol (CBT-I)",
      "Either — whatever my provider recommends",
      "I\'m not sure yet — I want a clinical opinion",
    ],
  },
];
