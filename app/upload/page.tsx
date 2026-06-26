"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";

import { FlowShell } from "@/components/layout/flow-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dropzone } from "@/features/resume-upload/dropzone";
import { FileCard } from "@/features/resume-upload/file-card";
import { PrivacyFirstBlock } from "@/features/trust/privacy-first-block";
import { usePersistFlowStep } from "@/hooks/use-persist-flow-step";
import { useCareerFlow } from "@/hooks/use-career-flow";
import { extractResumeText } from "@/lib/services/resume/extract";
import type { ExtractErrorCode } from "@/lib/services/resume/extract";
import { dict } from "@/lib/i18n";

function uploadErrorMessage(code: ExtractErrorCode): string {
  switch (code) {
    case "NO_TEXT":
      return dict.upload.errors.unreadable;
    case "UNSUPPORTED_FORMAT":
      return dict.upload.errors.unsupportedFormat;
    case "TOO_LARGE":
      return dict.upload.errors.tooLarge;
    case "EMPTY":
      return dict.upload.errors.empty;
    default:
      return dict.upload.errors.generic;
  }
}

export default function UploadPage() {
  const router = useRouter();
  usePersistFlowStep("upload");
  const { setResume, setStatus, setError } = useCareerFlow();
  const [file, setFile] = React.useState<File | null>(null);
  const [isParsing, setIsParsing] = React.useState(false);
  const [parseError, setParseError] = React.useState<string | null>(null);

  function selectFile(next: File | null) {
    setParseError(null);
    setFile(next);
  }

  async function handleContinue() {
    if (!file) return;
    setIsParsing(true);
    setStatus("parsing");
    setError(null);
    setParseError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await extractResumeText(formData);

      if (!result.ok) {
        const message = uploadErrorMessage(result.code);
        setError(message);
        setParseError(message);
        setStatus("error");
        setIsParsing(false);
        return;
      }

      setResume(result.data);
      router.push("/analysis");
    } catch {
      setError(dict.upload.errors.generic);
      setParseError(dict.upload.errors.generic);
      setStatus("error");
      setIsParsing(false);
    }
  }

  return (
    <FlowShell
      step="upload"
      title={dict.upload.title}
      description={dict.upload.description}
    >
      <Card className="border-border/40 p-6 sm:p-8 lg:p-10">
        <PrivacyFirstBlock className="mb-6" />

        {file ? (
          <FileCard
            fileName={file.name}
            fileSize={file.size}
            onRemove={() => selectFile(null)}
            disabled={isParsing}
          />
        ) : (
          <Dropzone onSelect={selectFile} disabled={isParsing} />
        )}

        {parseError && (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {parseError}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" />
            {dict.upload.privacy}
          </p>
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!file || isParsing}
            className="w-full sm:w-auto"
          >
            {isParsing ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {dict.upload.reading}
              </>
            ) : (
              <>
                {dict.upload.analyze}
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </FlowShell>
  );
}
