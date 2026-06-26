"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { ArrowRight } from "lucide-react";

import { FlowShell } from "@/components/layout/flow-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModeToggleGroup } from "@/features/appearance/mode-toggle-group";
import { StyleCard } from "@/features/appearance/style-card";
import { useCareerFlow } from "@/hooks/use-career-flow";
import { PORTFOLIO_STYLES } from "@/lib/theme/themes";
import { resolveMode } from "@/lib/theme/portfolio";
import { dict } from "@/lib/i18n";

export default function AppearancePage() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const { profile, appearance, setAppearance } = useCareerFlow();

  React.useEffect(() => {
    if (!profile) router.replace("/upload");
  }, [profile, router]);

  const effectiveMode = resolveMode(
    appearance.mode,
    resolvedTheme === "dark" ? "dark" : "light",
  );

  if (!profile) return null;

  const previewProfile = {
    basics: profile.basics,
    media: profile.media,
  };

  const styleDict = dict.appearance.styles as Record<
    string,
    { name: string; description: string }
  >;

  return (
    <FlowShell
      step="appearance"
      title={dict.appearance.title}
      description={dict.appearance.description}
      size="wide"
    >
      <div className="space-y-8">
        <Card className="border-border/40 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">{dict.appearance.colorMode}</p>
              <p className="text-sm text-muted-foreground">
                {dict.appearance.colorModeDesc}
              </p>
            </div>
            <div className="sm:w-80">
              <ModeToggleGroup
                value={appearance.mode}
                onChange={(mode) => setAppearance({ mode })}
              />
            </div>
          </div>
        </Card>

        <div>
          <p className="mb-4 font-medium">{dict.appearance.styleLabel}</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO_STYLES.map((style) => {
              const localized = styleDict[style.id] ?? {
                name: style.name,
                description: style.description,
              };
              return (
                <StyleCard
                  key={style.id}
                  id={style.id}
                  name={localized.name}
                  description={localized.description}
                  available={style.available}
                  selected={appearance.styleId === style.id}
                  mode={effectiveMode}
                  profile={previewProfile}
                  onSelect={(styleId) => setAppearance({ styleId })}
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/profile">{dict.appearance.backToProfile}</Link>
          </Button>
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/portfolio">
              {dict.appearance.previewPortfolio}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </FlowShell>
  );
}
