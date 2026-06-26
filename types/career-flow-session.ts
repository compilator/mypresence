import type { AppearanceConfig } from "@/types/appearance";
import type { CareerProfile } from "@/types/career-profile";
import type { IntelligenceData } from "@/types/intelligence";

/** Bump when persisted session shape changes incompatibly. */
export const SESSION_STORAGE_VERSION = 1 as const;

export type SessionStorageVersion = typeof SESSION_STORAGE_VERSION;

export type AnalysisPrivacyMode = "privacy-first";

/** Traceable AI generation settings — no secrets or PII. */
export interface GenerationConfig {
  promptVersion: string;
  model: string;
  privacyMode: AnalysisPrivacyMode;
}

/** Uploaded file metadata only — never raw bytes or full extracted text. */
export interface ResumeSessionMeta {
  fileName: string;
  parsedAt: string;
  charCount: number;
}

/** Durable analysis artifact: display + intelligence + trace metadata. */
export interface AnalysisSnapshot {
  profile: CareerProfile;
  intelligence: IntelligenceData;
  config: GenerationConfig;
  analyzedAt: string;
  warnings: string[];
}

/** Serializable subset stored in localStorage (Alpha 0.2). */
export interface PersistedCareerFlowState {
  version: SessionStorageVersion;
  currentStep: string;
  status: "idle" | "parsing" | "analyzing" | "ready" | "error";
  resumeMeta: ResumeSessionMeta | null;
  analysis: AnalysisSnapshot | null;
  appearance: AppearanceConfig;
  generationCount: number;
  updatedAt: string;
}

/** Full in-memory session — superset of persisted fields. */
export interface CareerFlowSession extends PersistedCareerFlowState {
  /** Transient parsed resume (includes text). Never persisted. */
  hasTransientResume: boolean;
}

/** Future server-side session adapter. */
export interface CareerFlowSessionStorage {
  load(): PersistedCareerFlowState | null;
  save(state: PersistedCareerFlowState): void;
  clear(): void;
}
