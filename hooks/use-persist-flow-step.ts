"use client";

import * as React from "react";

import { useCareerFlowStore } from "@/features/career-flow/store";

/** Records the current flow step for session restore after refresh. */
export function usePersistFlowStep(stepId: string): void {
  const setCurrentStep = useCareerFlowStore((s) => s.setCurrentStep);

  React.useEffect(() => {
    setCurrentStep(stepId);
  }, [stepId, setCurrentStep]);
}
