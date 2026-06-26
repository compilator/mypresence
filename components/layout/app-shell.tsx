import * as React from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
  /** Hide chrome for full-bleed surfaces (e.g. future portfolio preview). */
  bare?: boolean;
}

/**
 * Workspace shell: the calm, card-on-canvas frame used by every SaaS screen
 * (landing, upload, analysis, profile, appearance). The portfolio surface
 * renders outside this shell with its own design system.
 */
export function AppShell({ children, className, bare = false }: AppShellProps) {
  if (bare) {
    return <main className={cn("min-h-dvh", className)}>{children}</main>;
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className={cn("flex-1", className)}>{children}</main>
      <SiteFooter />
    </div>
  );
}
