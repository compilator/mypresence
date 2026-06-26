import { create } from "zustand";

import type { CareerProfile } from "@/types/career-profile";
import type { IntelligenceData } from "@/types/intelligence";
import type { ParsedResume } from "@/types/resume";
import type { AppearanceConfig } from "@/types/appearance";
import { DEFAULT_PORTFOLIO_STYLE } from "@/lib/theme/themes";

export type FlowStatus = "idle" | "parsing" | "analyzing" | "ready" | "error";

interface CareerFlowState {
  status: FlowStatus;
  resume: ParsedResume | null;
  profile: CareerProfile | null;
  intelligence: IntelligenceData | null;
  appearance: AppearanceConfig;
  error: string | null;
  /** Anonymous generations used this session. Architecture prep for free-tier limit. */
  generationCount: number;

  setStatus: (status: FlowStatus) => void;
  setResume: (resume: ParsedResume | null) => void;
  setProfile: (profile: CareerProfile | null) => void;
  setIntelligence: (intelligence: IntelligenceData | null) => void;
  setAppearance: (appearance: Partial<AppearanceConfig>) => void;
  setError: (error: string | null) => void;
  incrementGeneration: () => void;
  reset: () => void;
}

const initialAppearance: AppearanceConfig = {
  mode: "system",
  styleId: DEFAULT_PORTFOLIO_STYLE,
};

/**
 * In-memory store for the multi-screen flow (upload to portfolio).
 * Resets on refresh, which is acceptable for the MVP. sessionStorage
 * persistence can be layered on later via zustand/middleware.
 */
export const useCareerFlowStore = create<CareerFlowState>((set) => ({
  status: "idle",
  resume: null,
  profile: null,
  intelligence: null,
  appearance: initialAppearance,
  error: null,
  generationCount: 0,

  setStatus: (status) => set({ status }),
  setResume: (resume) => set({ resume }),
  setProfile: (profile) => set({ profile }),
  setIntelligence: (intelligence) => set({ intelligence }),
  setAppearance: (appearance) =>
    set((state) => ({ appearance: { ...state.appearance, ...appearance } })),
  setError: (error) => set({ error }),
  incrementGeneration: () =>
    set((state) => ({ generationCount: state.generationCount + 1 })),
  reset: () =>
    set({
      status: "idle",
      resume: null,
      profile: null,
      intelligence: null,
      error: null,
    }),
}));
