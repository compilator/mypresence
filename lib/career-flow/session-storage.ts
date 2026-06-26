import type {
  AnalysisSnapshot,
  CareerFlowSessionStorage,
  PersistedCareerFlowState,
  SessionStorageVersion,
} from "@/types/career-flow-session";
import { SESSION_STORAGE_VERSION } from "@/types/career-flow-session";

export const CAREER_FLOW_STORAGE_KEY = "mypresence-career-flow";

/** Validates rehydrated JSON before merging into the store. */
export function isValidPersistedSession(
  value: unknown,
): value is PersistedCareerFlowState {
  if (!value || typeof value !== "object") return false;
  const v = value as PersistedCareerFlowState;
  if (v.version !== SESSION_STORAGE_VERSION) return false;
  if (typeof v.currentStep !== "string") return false;
  if (!v.appearance || typeof v.appearance.styleId !== "string") return false;
  if (v.analysis && !isValidAnalysisSnapshot(v.analysis)) return false;
  return true;
}

function isValidAnalysisSnapshot(value: unknown): value is AnalysisSnapshot {
  if (!value || typeof value !== "object") return false;
  const s = value as AnalysisSnapshot;
  return (
    Boolean(s.profile?.basics?.name) &&
    Array.isArray(s.profile.experience) &&
    Boolean(s.config?.promptVersion) &&
    typeof s.analyzedAt === "string"
  );
}

export function createEmptyPersistedState(
  overrides: Partial<PersistedCareerFlowState> = {},
): PersistedCareerFlowState {
  const now = new Date().toISOString();
  return {
    version: SESSION_STORAGE_VERSION,
    currentStep: "upload",
    status: "idle",
    resumeMeta: null,
    analysis: null,
    appearance: overrides.appearance ?? {
      mode: "system",
      styleId: "editorial",
    },
    generationCount: 0,
    updatedAt: now,
    ...overrides,
  };
}

/** Browser localStorage adapter (Alpha 0.2). */
export function createLocalCareerFlowStorage(): CareerFlowSessionStorage {
  return {
    load(): PersistedCareerFlowState | null {
      if (typeof window === "undefined") return null;
      try {
        const raw = window.localStorage.getItem(CAREER_FLOW_STORAGE_KEY);
        if (!raw) return null;
        const parsed: unknown = JSON.parse(raw);
        const state =
          parsed &&
          typeof parsed === "object" &&
          "state" in parsed &&
          (parsed as { state: unknown }).state
            ? (parsed as { state: unknown }).state
            : parsed;
        return isValidPersistedSession(state) ? state : null;
      } catch {
        return null;
      }
    },
    save(state: PersistedCareerFlowState): void {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(
        CAREER_FLOW_STORAGE_KEY,
        JSON.stringify({ state, version: SESSION_STORAGE_VERSION }),
      );
    },
    clear(): void {
      if (typeof window === "undefined") return;
      window.localStorage.removeItem(CAREER_FLOW_STORAGE_KEY);
    },
  };
}

export function assertSessionVersion(
  version: number,
): version is SessionStorageVersion {
  return version === SESSION_STORAGE_VERSION;
}
