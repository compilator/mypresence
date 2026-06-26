import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { CareerProfile } from "@/types/career-profile";
import type { IntelligenceData } from "@/types/intelligence";
import type { ParsedResume } from "@/types/resume";
import type { AppearanceConfig } from "@/types/appearance";
import type {
  AnalysisSnapshot,
  PersistedCareerFlowState,
  ResumeSessionMeta,
} from "@/types/career-flow-session";
import { SESSION_STORAGE_VERSION } from "@/types/career-flow-session";
import {
  CAREER_FLOW_STORAGE_KEY,
  isValidPersistedSession,
} from "@/lib/career-flow/session-storage";
import { DEFAULT_PORTFOLIO_STYLE } from "@/lib/theme/themes";

export type FlowStatus = "idle" | "parsing" | "analyzing" | "ready" | "error";

interface CareerFlowState {
  currentStep: string;
  status: FlowStatus;
  /** Transient — includes extracted text; never written to localStorage. */
  resume: ParsedResume | null;
  resumeMeta: ResumeSessionMeta | null;
  profile: CareerProfile | null;
  intelligence: IntelligenceData | null;
  analysis: AnalysisSnapshot | null;
  appearance: AppearanceConfig;
  error: string | null;
  generationCount: number;

  setCurrentStep: (step: string) => void;
  setStatus: (status: FlowStatus) => void;
  setResume: (resume: ParsedResume | null) => void;
  setProfile: (profile: CareerProfile | null) => void;
  setIntelligence: (intelligence: IntelligenceData | null) => void;
  setAnalysis: (analysis: AnalysisSnapshot | null) => void;
  setAppearance: (appearance: Partial<AppearanceConfig>) => void;
  setError: (error: string | null) => void;
  incrementGeneration: () => void;
  reset: () => void;
}

const initialAppearance: AppearanceConfig = {
  mode: "system",
  styleId: DEFAULT_PORTFOLIO_STYLE,
};

const transientDefaults = {
  currentStep: "upload",
  status: "idle" as FlowStatus,
  resume: null as ParsedResume | null,
  resumeMeta: null as ResumeSessionMeta | null,
  profile: null as CareerProfile | null,
  intelligence: null as IntelligenceData | null,
  analysis: null as AnalysisSnapshot | null,
  appearance: initialAppearance,
  error: null as string | null,
  generationCount: 0,
};

function syncFromAnalysis(
  analysis: AnalysisSnapshot | null,
): Pick<CareerFlowState, "profile" | "intelligence" | "status"> {
  if (!analysis) {
    return { profile: null, intelligence: null, status: "idle" };
  }
  return {
    profile: analysis.profile,
    intelligence: analysis.intelligence,
    status: "ready",
  };
}

function toPersistedSlice(state: CareerFlowState): PersistedCareerFlowState {
  return {
    version: SESSION_STORAGE_VERSION,
    currentStep: state.currentStep,
    status: state.status,
    resumeMeta: state.resumeMeta,
    analysis: state.analysis,
    appearance: state.appearance,
    generationCount: state.generationCount,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Career flow store with localStorage persistence (Alpha 0.2).
 * Persists analysis snapshot, appearance, and step — not resume text or PII vault.
 */
export const useCareerFlowStore = create<CareerFlowState>()(
  persist(
    (set) => ({
      ...transientDefaults,

      setCurrentStep: (currentStep) => set({ currentStep }),

      setStatus: (status) => set({ status }),

      setResume: (resume) =>
        set({
          resume,
          resumeMeta: resume
            ? {
                fileName: resume.fileName,
                parsedAt: new Date().toISOString(),
                charCount: resume.text.length,
              }
            : null,
        }),

      setProfile: (profile) => set({ profile }),

      setIntelligence: (intelligence) => set({ intelligence }),

      setAnalysis: (analysis) =>
        set({
          analysis,
          ...syncFromAnalysis(analysis),
        }),

      setAppearance: (appearance) =>
        set((state) => ({
          appearance: { ...state.appearance, ...appearance },
        })),

      setError: (error) => set({ error }),

      incrementGeneration: () =>
        set((state) => ({ generationCount: state.generationCount + 1 })),

      reset: () => {
        set({ ...transientDefaults, appearance: { ...initialAppearance } });
        useCareerFlowStore.persist.clearStorage();
      },
    }),
    {
      name: CAREER_FLOW_STORAGE_KEY,
      version: SESSION_STORAGE_VERSION,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => toPersistedSlice(state),
      merge: (persisted, current) => {
        if (!isValidPersistedSession(persisted)) {
          return current;
        }
        const synced = syncFromAnalysis(persisted.analysis);
        return {
          ...current,
          currentStep: persisted.currentStep,
          status: synced.status === "ready" ? synced.status : persisted.status,
          resumeMeta: persisted.resumeMeta,
          analysis: persisted.analysis,
          appearance: persisted.appearance,
          generationCount: persisted.generationCount,
          profile: synced.profile,
          intelligence: synced.intelligence,
          resume: null,
          error: null,
        };
      },
      migrate: (persisted, version) => {
        if (version !== SESSION_STORAGE_VERSION) {
          return {
            version: SESSION_STORAGE_VERSION,
            currentStep: "upload",
            status: "idle",
            resumeMeta: null,
            analysis: null,
            appearance: initialAppearance,
            generationCount: 0,
            updatedAt: new Date().toISOString(),
          } satisfies PersistedCareerFlowState;
        }
        return persisted as PersistedCareerFlowState;
      },
    },
  ),
);
