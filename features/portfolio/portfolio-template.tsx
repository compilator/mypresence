import {
  Briefcase,
  Code,
  Folder,
  GraduationCap,
  LayoutGrid,
} from "lucide-react";

import type { CareerProfile } from "@/types/career-profile";
import type { IntelligenceData } from "@/types/intelligence";
import type { EffectiveMode } from "@/lib/theme/portfolio";
import { portfolioModeClass } from "@/lib/theme/portfolio";
import {
  buildSnapshotMetrics,
  collectTopAchievements,
  flattenSkillTags,
  resolveExpertiseAreas,
} from "@/lib/portfolio/derive";
import { expertiseDescription } from "@/lib/portfolio/expertise";
import { PortfolioSection } from "@/features/portfolio/sections/portfolio-section";
import { PortfolioHero } from "@/features/portfolio/sections/hero";
import { SnapshotMetricsBand } from "@/features/portfolio/sections/snapshot-metrics-band";
import { CoreExpertise } from "@/features/portfolio/sections/core-expertise";
import { ExperienceSection } from "@/features/portfolio/sections/experience-section";
import { ProjectsSection } from "@/features/portfolio/sections/projects-section";
import { SkillsSection } from "@/features/portfolio/sections/skills-section";
import { EducationSection } from "@/features/portfolio/sections/education-section";
import { PortfolioFooter } from "@/features/portfolio/sections/footer";
import { dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface PortfolioTemplateProps {
  profile: CareerProfile;
  intelligence?: IntelligenceData | null;
  mode: EffectiveMode;
  /** preview = session preview (may clamp summary); public = full SSR page. */
  variant?: "preview" | "public";
  className?: string;
}

/**
 * Executive portfolio surface. Identity → story → proof → competencies → detail.
 * Renders entirely from CareerProfile.
 */
export function PortfolioTemplate({
  profile,
  intelligence = null,
  mode,
  variant = "preview",
  className,
}: PortfolioTemplateProps) {
  const { experience, skills, projects, education } = profile;
  const t = dict.portfolio;

  const topAchievements = collectTopAchievements(profile, 5);
  const metrics = buildSnapshotMetrics(profile, intelligence, t.snapshot);
  const expertise = resolveExpertiseAreas(profile, expertiseDescription);
  const skillGroups = flattenSkillTags(skills);
  const clampSummary = variant === "preview";

  return (
    <main
      id="main-content"
      className={cn(
        portfolioModeClass(mode),
        "min-h-dvh bg-portfolio-bg text-portfolio-fg",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:max-w-7xl lg:px-14 xl:px-16">
        <PortfolioHero
          profile={profile}
          topAchievements={topAchievements}
          clampSummary={clampSummary}
        />
      </div>

      <SnapshotMetricsBand metrics={metrics} />

      {expertise.length > 0 && (
        <PortfolioSection
          id="expertise"
          label={t.sectionExpertise}
          icon={LayoutGrid}
        >
          <CoreExpertise areas={expertise} variant="section" />
        </PortfolioSection>
      )}

      {experience.length > 0 && (
        <PortfolioSection
          id="experience"
          label={t.sectionExperience}
          icon={Briefcase}
        >
          <ExperienceSection items={experience} />
        </PortfolioSection>
      )}

      {projects.length > 0 && (
        <PortfolioSection id="projects" label={t.sectionProjects} icon={Folder}>
          <ProjectsSection items={projects} />
        </PortfolioSection>
      )}

      {skillGroups.length > 0 && (
        <PortfolioSection id="skills" label={t.sectionSkills} icon={Code}>
          <SkillsSection groups={skillGroups} />
        </PortfolioSection>
      )}

      {education.length > 0 && (
        <PortfolioSection id="education" label={t.sectionEducation} icon={GraduationCap}>
          <EducationSection items={education} />
        </PortfolioSection>
      )}

      <PortfolioFooter />
    </main>
  );
}
