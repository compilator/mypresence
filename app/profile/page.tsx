"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

import { FlowShell } from "@/components/layout/flow-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProfileHeader } from "@/features/career-profile/profile-header";
import { ProfileSection } from "@/features/career-profile/section";
import { ExperienceList } from "@/features/career-profile/experience-list";
import { SkillsCloud } from "@/features/career-profile/skills-cloud";
import { EducationList } from "@/features/career-profile/education-list";
import { ProjectGrid } from "@/features/career-profile/project-grid";
import { useCareerFlowHydrated } from "@/hooks/use-career-flow-hydrated";
import { usePersistFlowStep } from "@/hooks/use-persist-flow-step";
import { useCareerFlow } from "@/hooks/use-career-flow";
import { dict } from "@/lib/i18n";

export default function ProfilePage() {
  const router = useRouter();
  const hydrated = useCareerFlowHydrated();
  usePersistFlowStep("profile");
  const { profile, reset } = useCareerFlow();

  React.useEffect(() => {
    if (!hydrated) return;
    if (!profile) router.replace("/upload");
  }, [hydrated, profile, router]);

  function handleStartOver() {
    reset();
    router.push("/upload");
  }

  if (!hydrated || !profile) {
    return (
      <FlowShell step="profile" title={dict.profile.title}>
        <div className="flex justify-center py-16 text-muted-foreground">
          <Loader2 className="size-6 animate-spin" />
        </div>
      </FlowShell>
    );
  }

  return (
    <FlowShell
      step="profile"
      title={dict.profile.title}
      description={dict.profile.description}
      size="workflow"
    >
      <Card className="space-y-10 border-border/40 p-6 sm:p-10 lg:p-12">
        <ProfileHeader profile={profile} />

        {profile.basics.summary && (
          <p className="text-pretty leading-relaxed text-muted-foreground">
            {profile.basics.summary}
          </p>
        )}

        {profile.experience.length > 0 && (
          <ProfileSection title={dict.profile.sectionExperience}>
            <ExperienceList items={profile.experience} />
          </ProfileSection>
        )}

        {profile.skills.length > 0 && (
          <ProfileSection title={dict.profile.sectionSkills}>
            <SkillsCloud groups={profile.skills} />
          </ProfileSection>
        )}

        {profile.projects.length > 0 && (
          <ProfileSection title={dict.profile.sectionProjects}>
            <ProjectGrid items={profile.projects} />
          </ProfileSection>
        )}

        {profile.education.length > 0 && (
          <ProfileSection title={dict.profile.sectionEducation}>
            <EducationList items={profile.education} />
          </ProfileSection>
        )}
      </Card>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={handleStartOver}
        >
          {dict.common.startOver}
        </Button>
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link href="/appearance">
            {dict.profile.chooseAppearance}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </FlowShell>
  );
}
