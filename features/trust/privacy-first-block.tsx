import { Lock } from "lucide-react";

import { dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface PrivacyFirstBlockProps {
  className?: string;
}

export function PrivacyFirstBlock({ className }: PrivacyFirstBlockProps) {
  const t = dict.trust.privacyFirst;

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/40 bg-secondary/30 px-5 py-4 sm:px-6 sm:py-5",
        className,
      )}
    >
      <div className="flex gap-3.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Lock className="size-4" strokeWidth={1.75} aria-hidden />
        </span>
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-medium text-foreground">{t.title}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{t.body}</p>
        </div>
      </div>
    </div>
  );
}
