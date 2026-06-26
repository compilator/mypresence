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
import { useCareerFlowHydrated } from "@/hooks/use-career-flow-hydrated";
import { usePersistFlowStep } from "@/hooks/use-persist-flow-step";
import { useCareerFlow } from "@/hooks/use-career-flow";
import { analyzeResume } from "@/lib/services/ai/career-analyzer";
import { withMedia } from "@/lib/profile-photo";
import { dict } from "@/lib/i18n";

type Phase = "running" | "error" | "done";

export default function AnalysisPage() {
  const router = useRouter();
  const hydrated = useCareerFlowHydrated();
  usePersistFlowStep("analysis");

  const {
    resume,
    analysis,
    setAnalysis,
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
      const snapshot = await analyzeResume(resume.text);
      clearInterval(interval);

      const profileWithMedia = withMedia(snapshot.profile, resume.media);

      setAnalysis({
        ...snapshot,
        profile: profileWithMedia,
      });
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
    setAnalysis,
    setStatus,
    setError,
    incrementGeneration,
  ]);

  React.useEffect(() => {
    if (!hydrated) return;

    if (analysis?.profile) {
      router.replace("/profile");
      return;
    }

    if (!resume) {
      router.replace("/upload");
      return;
    }

    if (startedRef.current) return;
    startedRef.current = true;
    void runAnalysis();
  }, [hydrated, resume, analysis, router, runAnalysis]);

  if (!hydrated) {
    return (
      <FlowShell step="analysis" title={dict.analysis.title}>
        <Card className="border-border/40 p-10" />
      </FlowShell>
    );
  }

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
