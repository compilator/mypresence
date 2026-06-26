import { Brain, Gauge, Palette, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Reveal, RevealItem } from "@/components/shared/reveal";
import { dict } from "@/lib/i18n";

export function FeatureGrid() {
  const t = dict.landing.features;

  const features = [
    { icon: Brain, title: t.intelligenceTitle, description: t.intelligenceDesc },
    { icon: Palette, title: t.premiumTitle, description: t.premiumDesc },
    { icon: Gauge, title: t.fastTitle, description: t.fastDesc },
    { icon: ShieldCheck, title: t.controlTitle, description: t.controlDesc },
  ];

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.subtitle}</p>
        </Reveal>

        <Reveal stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <RevealItem
              key={title}
              className="rounded-3xl bg-card p-6 shadow-card"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
