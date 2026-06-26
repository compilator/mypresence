import { describe, expect, it } from "vitest";

import { buildGenerationConfig } from "@/lib/config/analysis";
import {
  createEmptyPersistedState,
  isValidPersistedSession,
} from "@/lib/career-flow/session-storage";
import { SAMPLE_INTELLIGENCE, SAMPLE_PROFILE } from "@/lib/services/mock/sample-profile";
import { SESSION_STORAGE_VERSION } from "@/types/career-flow-session";

describe("career flow session storage", () => {
  it("rejects incompatible session versions", () => {
    expect(
      isValidPersistedSession({
        version: 99,
        currentStep: "upload",
        appearance: { mode: "system", styleId: "editorial" },
      }),
    ).toBe(false);
  });

  it("accepts a persisted session with analysis snapshot", () => {
    const session = createEmptyPersistedState({
      currentStep: "appearance",
      status: "ready",
      analysis: {
        profile: SAMPLE_PROFILE,
        intelligence: SAMPLE_INTELLIGENCE,
        config: buildGenerationConfig(),
        analyzedAt: new Date().toISOString(),
        warnings: [],
      },
    });

    expect(isValidPersistedSession(session)).toBe(true);
    expect(session.version).toBe(SESSION_STORAGE_VERSION);
  });
});
