import { Check } from "lucide-react";

import { FLOW_STEPS } from "@/lib/config/steps";
import { dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  /** Current step id from FLOW_STEPS. */
  current: string;
  className?: string;
}

export function StepIndicator({ current, className }: StepIndicatorProps) {
  const currentIndex = FLOW_STEPS.findIndex((s) => s.id === current);

  return (
    <nav aria-label="Progress" className={cn("overflow-x-auto", className)}>
      <ol className="flex min-w-min items-center justify-center gap-3 whitespace-nowrap px-1 text-sm sm:gap-4 md:flex-nowrap">
        {FLOW_STEPS.map((step, index) => {
          const done = index < currentIndex;
          const active = index === currentIndex;
          return (
            <li key={step.id} className="flex shrink-0 items-center gap-2 sm:gap-2.5">
              <span
                className={cn(
                  "grid size-6 place-items-center rounded-full text-xs font-medium transition-colors",
                  done && "bg-primary text-primary-foreground",
                  active && "bg-foreground text-background",
                  !done && !active && "bg-secondary text-muted-foreground",
                )}
              >
                {done ? <Check className="size-3.5" /> : index + 1}
              </span>
              <span
                className={cn(
                  "hidden sm:inline",
                  active ? "font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                {dict.steps[step.id as keyof typeof dict.steps]}
              </span>
              {index < FLOW_STEPS.length - 1 && (
                <span className="mx-0.5 h-px w-6 bg-border sm:mx-1 sm:w-10" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
