"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { FlowShell } from "@/components/layout/flow-shell";
import { Card } from "@/components/ui/card";
import {
  ANALYSIS_STAGE_COUNT,
  AnalysisProgress,
} from "@/features/analysis/analysis-progress";
import { ErrorRetry } from "@/features/analysis/error-retry";
import { useCareerFlow } from "@/hooks/use-career-flow";
import { analyzeResume } from "@/lib/services/ai/career-analyzer";
import { withMedia } from "@/lib/profile-photo";
import { dict } from "@/lib/i18n";

type Phase = "running" | "error" | "done";

export default function AnalysisPage() {
  const router = useRouter();
  const {
    resume,
    setProfile,
    setIntelligence,
    setStatus,
    setError,
    incrementGeneration,
  } = useCareerFlow();

  const [phase, setPhase] = React.useState<Phase>("running");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const startedRef = React.useRef(false);

  const runAnalysis = React.useCallback(async () => {
    if (!resume) return;
    setPhase("running");
    setActiveIndex(0);
    setStatus("analyzing");
    setError(null);

    const interval = setInterval(() => {
      setActiveIndex((i) => Math.min(i + 1, ANALYSIS_STAGE_COUNT - 1));
    }, 900);

    try {
      const { profile, intelligence } = await analyzeResume(resume.text);
      clearInterval(interval);

      const profileWithMedia = withMedia(profile, resume.media);

      setProfile(profileWithMedia);
      setIntelligence(intelligence);
      incrementGeneration();
      setStatus("ready");
      setPhase("done");
      setTimeout(() => router.push("/profile"), 800);
    } catch {
      clearInterval(interval);
      const msg = dict.analysis.errorMessage;
      setMessage(msg);
      setError(msg);
      setStatus("error");
      setPhase("error");
    }
  }, [
    resume,
    router,
    setProfile,
    setIntelligence,
    setStatus,
    setError,
    incrementGeneration,
  ]);

  React.useEffect(() => {
    if (!resume) {
      router.replace("/upload");
      return;
    }
    if (startedRef.current) return;
    startedRef.current = true;
    void runAnalysis();
  }, [resume, router, runAnalysis]);

  return (
    <FlowShell
      step="analysis"
      title={dict.analysis.title}
      description={dict.analysis.description}
    >
      <Card className="border-border/40 p-6 sm:p-8 lg:p-10">
        {phase === "error" ? (
          <ErrorRetry message={message} onRetry={runAnalysis} />
        ) : (
          <AnalysisProgress
            activeIndex={activeIndex}
            complete={phase === "done"}
          />
        )}
      </Card>
    </FlowShell>
  );
}
