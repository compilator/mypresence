import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/shared/reveal";
import { dict } from "@/lib/i18n";

export function CtaSection() {
  const t = dict.landing.cta;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] bg-foreground px-8 py-14 text-center text-background shadow-float sm:px-16 sm:py-20">
            <h2 className="mx-auto max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.title}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-background/70">
              {t.subtitle}
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/upload">
                {t.button}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
