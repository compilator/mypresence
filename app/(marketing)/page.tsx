import { AppShell } from "@/components/layout/app-shell";
import { Hero } from "@/features/landing/hero";
import { FeatureGrid } from "@/features/landing/feature-grid";
import { HowItWorks } from "@/features/landing/how-it-works";
import { CtaSection } from "@/features/landing/cta-section";

export default function LandingPage() {
  return (
    <AppShell>
      <Hero />
      <FeatureGrid />
      <HowItWorks />
      <CtaSection />
    </AppShell>
  );
}
