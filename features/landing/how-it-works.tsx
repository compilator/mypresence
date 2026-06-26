import { Container } from "@/components/layout/container";
import { Reveal, RevealItem } from "@/components/shared/reveal";
import { dict } from "@/lib/i18n";

export function HowItWorks() {
  const t = dict.landing.how;

  const steps = [
    { step: "01", title: t.step1Title, description: t.step1Desc },
    { step: "02", title: t.step2Title, description: t.step2Desc },
    { step: "03", title: t.step3Title, description: t.step3Desc },
    { step: "04", title: t.step4Title, description: t.step4Desc },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.subtitle}</p>
        </Reveal>

        <Reveal stagger className="mt-14 grid gap-5 md:grid-cols-2">
          {steps.map(({ step, title, description }) => (
            <RevealItem
              key={step}
              className="flex gap-5 rounded-3xl bg-card p-6 shadow-card sm:p-8"
            >
              <span className="text-2xl font-semibold tabular-nums text-primary">
                {step}
              </span>
              <div>
                <h3 className="font-semibold tracking-tight">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
