export interface FlowStep {
  id: string;
  label: string;
  path: string;
}

/** The linear MVP flow used by the StepIndicator. */
export const FLOW_STEPS: FlowStep[] = [
  { id: "upload", label: "Upload", path: "/upload" },
  { id: "analysis", label: "Analyze", path: "/analysis" },
  { id: "profile", label: "Profile", path: "/profile" },
  { id: "appearance", label: "Appearance", path: "/appearance" },
  { id: "portfolio", label: "Portfolio", path: "/portfolio" },
];

export function stepIndexById(id: string): number {
  return FLOW_STEPS.findIndex((s) => s.id === id);
}
