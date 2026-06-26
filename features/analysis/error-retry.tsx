"use client";

import Link from "next/link";
import { AlertTriangle, RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { dict } from "@/lib/i18n";

interface ErrorRetryProps {
  message: string;
  onRetry: () => void;
}

export function ErrorRetry({ message, onRetry }: ErrorRetryProps) {
  return (
    <div className="flex flex-col items-center gap-5 py-6 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-destructive/10 text-destructive">
        <AlertTriangle className="size-6" />
      </span>
      <div>
        <p className="font-medium">{dict.analysis.errorTitle}</p>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">{message}</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={onRetry}>
          <RotateCw className="size-4" />
          {dict.analysis.retry}
        </Button>
        <Button asChild variant="outline">
          <Link href="/upload">{dict.analysis.uploadAnother}</Link>
        </Button>
      </div>
    </div>
  );
}
