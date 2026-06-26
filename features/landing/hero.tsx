import Link from "next/link";
import { ArrowRight, FileText, Sparkles, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Reveal, RevealItem } from "@/components/shared/reveal";
import { dict } from "@/lib/i18n";

export function Hero() {
  const t = dict.landing.hero;

  return (
    <section className="relative">
      <Container className="relative py-20 sm:py-28">
        <Reveal stagger className="mx-auto max-w-3xl text-center">
          <RevealItem className="mb-6 flex justify-center">
            <Badge>
              <Sparkles className="size-3.5" />
              {t.badge}
            </Badge>
          </RevealItem>

          <RevealItem>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
              {t.titleLead} <span className="text-primary">{t.titleAccent}</span>
            </h1>
          </RevealItem>

          <RevealItem>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {t.subtitle}
            </p>
          </RevealItem>

          <RevealItem className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/upload">
                {t.primaryCta}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href="#how-it-works">{t.secondaryCta}</Link>
            </Button>
          </RevealItem>

          <RevealItem className="mt-4 text-sm text-muted-foreground">
            {t.note}
          </RevealItem>
        </Reveal>

        <Reveal className="mx-auto mt-16 max-w-4xl">
          <HeroPreview />
        </Reveal>
      </Container>
    </section>
  );
}

function HeroPreview() {
  const t = dict.landing.hero;
  const steps = [
    { icon: FileText, label: t.previewResumeLabel, caption: t.previewResumeCaption },
    { icon: Wand2, label: t.previewAiLabel, caption: t.previewAiCaption },
    {
      icon: Sparkles,
      label: t.previewPortfolioLabel,
      caption: t.previewPortfolioCaption,
    },
  ];

  return (
    <div className="rounded-3xl bg-card p-6 shadow-float sm:p-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {steps.map(({ icon: Icon, label, caption }, index) => (
          <div key={label} className="rounded-2xl bg-secondary/40 p-5 text-left">
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <span className="text-sm tabular-nums text-muted-foreground">
                0{index + 1}
              </span>
            </div>
            <p className="mt-4 font-medium">{label}</p>
            <p className="text-sm text-muted-foreground">{caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
