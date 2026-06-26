"use client";

import { FileText, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { dict } from "@/lib/i18n";

interface FileCardProps {
  fileName: string;
  fileSize: number;
  onRemove: () => void;
  disabled?: boolean;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileCard({
  fileName,
  fileSize,
  onRemove,
  disabled,
}: FileCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-3xl bg-secondary/50 p-4">
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-card text-primary shadow-soft">
        <FileText className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{fileName}</p>
        <p className="text-sm text-muted-foreground">{formatSize(fileSize)}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        aria-label={dict.upload.removeAria}
        onClick={onRemove}
        disabled={disabled}
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}
