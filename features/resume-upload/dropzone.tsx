"use client";

import * as React from "react";
import { UploadCloud } from "lucide-react";

import { cn } from "@/lib/utils";
import { validateResumeFile } from "@/lib/services/resume/validation";
import { dict } from "@/lib/i18n";

interface DropzoneProps {
  onSelect: (file: File) => void;
  disabled?: boolean;
}

export function Dropzone({ onSelect, disabled }: DropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function handleFiles(files: FileList | null) {
    setError(null);
    const file = files?.[0];
    if (!file) return;
    const result = validateResumeFile(file);
    if (!result.ok) {
      setError(dict.upload.errors[result.code ?? "generic"]);
      return;
    }
    onSelect(file);
  }

  return (
    <div>
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (!disabled) handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex w-full flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-border bg-secondary/40 px-6 py-14 text-center transition-colors outline-none",
          "hover:border-primary/40 hover:bg-secondary/70 focus-visible:ring-2 focus-visible:ring-ring/60",
          isDragging && "border-primary/60 bg-accent/40",
          disabled && "pointer-events-none opacity-60",
        )}
      >
        <span className="grid size-14 place-items-center rounded-2xl bg-card text-primary shadow-soft">
          <UploadCloud className="size-6" />
        </span>
        <span className="space-y-1">
          <span className="block font-medium">{dict.upload.dropTitle}</span>
          <span className="block text-sm text-muted-foreground">
            {dict.upload.dropHint}
          </span>
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {error && (
        <p role="alert" className="mt-3 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
