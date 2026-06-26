import * as React from "react";

import { AppShell } from "@/components/layout/app-shell";
import { Container } from "@/components/layout/container";
import { StepIndicator } from "@/components/layout/step-indicator";
import { cn } from "@/lib/utils";

interface FlowShellProps {
  step: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: "default" | "narrow" | "workflow" | "wide";
  className?: string;
}

/** Shared frame for the guided flow screens (upload, analysis, profile, appearance). */
export function FlowShell({
  step,
  title,
  description,
  children,
  size = "workflow",
  className,
}: FlowShellProps) {
  return (
    <AppShell>
      <Container size={size} className="py-10 sm:py-14 lg:py-16">
        <StepIndicator current={step} className="mb-10 lg:mb-12" />
        <div className="mx-auto mb-8 max-w-3xl text-center lg:mb-10">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
        </div>
        <div className={cn(className)}>{children}</div>
      </Container>
    </AppShell>
  );
}
