"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PortfolioTemplate } from "@/features/portfolio/portfolio-template";
import { PublishDialog } from "@/features/portfolio/publish-dialog";
import { useCareerFlow } from "@/hooks/use-career-flow";
import { resolveMode } from "@/lib/theme/portfolio";
import { dict } from "@/lib/i18n";

export default function PortfolioPage() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const { profile, appearance, intelligence } = useCareerFlow();

  React.useEffect(() => {
    if (!profile) router.replace("/upload");
  }, [profile, router]);

  if (!profile) {
    return (
      <div className="grid min-h-dvh place-items-center text-muted-foreground">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  const effectiveMode = resolveMode(
    appearance.mode,
    resolvedTheme === "dark" ? "dark" : "light",
  );

  return (
    <div className="min-h-dvh">
      <div className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8 lg:max-w-7xl lg:px-14 xl:px-16">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link href="/appearance">
                <ArrowLeft className="size-4" />
                {dict.portfolio.backToAppearance}
              </Link>
            </Button>
            <Badge variant="muted" className="hidden sm:inline-flex">
              {dict.portfolio.previewBadge}
            </Badge>
          </div>
          <PublishDialog
            profile={profile}
            intelligence={intelligence}
            appearance={appearance}
          />
        </div>
      </div>

      <PortfolioTemplate
        profile={profile}
        intelligence={intelligence}
        mode={effectiveMode}
      />
    </div>
  );
}
