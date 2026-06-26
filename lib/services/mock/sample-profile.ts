import type { CareerProfile } from "@/types/career-profile";
import { EMPTY_CAREER_MEDIA } from "@/types/career-media";
import type { IntelligenceData } from "@/types/intelligence";

/**
 * Deterministic sample profile. Used as a fallback when OPENAI_API_KEY is not
 * configured so the rest of the flow (profile, appearance, portfolio) remains
 * fully demoable end to end.
 */
export const SAMPLE_PROFILE: CareerProfile = {
  basics: {
    name: "Jordan Rivera",
    title: "Staff Frontend Engineer",
    headline: "Building performant, accessible web products at scale",
    location: "San Francisco, CA",
    email: "jordan.rivera@example.com",
    summary:
      "Frontend engineer with 8+ years building performant, accessible web apps. I care about design systems, developer experience, and turning complex products into calm, premium interfaces.",
    links: [
      { label: "GitHub", url: "https://github.com/jordanrivera" },
      { label: "LinkedIn", url: "https://linkedin.com/in/jordanrivera" },
    ],
  },
  experience: [
    {
      company: "Lumen Edge",
      role: "Staff Frontend Engineer",
      startDate: "2021",
      endDate: "Present",
      location: "Remote",
      highlights: [
        "Led the design system used across 6 product teams, cutting UI bugs by 40%.",
        "Drove a migration to React Server Components, improving TTFB by 35%.",
        "Mentored 5 engineers and established the frontend architecture guild.",
      ],
    },
    {
      company: "NexaFlow",
      role: "Senior Frontend Engineer",
      startDate: "2018",
      endDate: "2021",
      highlights: [
        "Built the analytics dashboard handling 2M+ daily events.",
        "Introduced end-to-end testing, reducing regressions by 60%.",
      ],
    },
    {
      company: "Bright Labs",
      role: "Frontend Engineer",
      startDate: "2016",
      endDate: "2018",
      highlights: [
        "Shipped the marketing site and component library from scratch.",
      ],
    },
  ],
  education: [
    {
      institution: "University of Washington",
      degree: "B.S. Computer Science",
      startDate: "2012",
      endDate: "2016",
    },
  ],
  skills: [
    { category: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { category: "Tooling", skills: ["Vite", "Turbopack", "Playwright", "Storybook"] },
    { category: "Other", skills: ["Accessibility", "Design Systems", "Performance"] },
  ],
  projects: [
    {
      name: "Prism UI",
      description: "Open-source headless component library with 4k+ stars.",
      url: "https://github.com/jordanrivera/prism-ui",
      tags: ["Open source", "React"],
    },
    {
      name: "Resume to Site",
      description: "Weekend project that inspired this very product.",
      tags: ["AI", "Side project"],
    },
  ],
  highlights: [
    "Led the design system used across 6 product teams, cutting UI bugs by 40%",
    "Drove a migration to React Server Components, improving TTFB by 35%",
    "Built the analytics dashboard handling 2M+ daily events",
  ],
  coreExpertise: [
    {
      title: "Frontend Architecture",
      description:
        "Led design system adoption across product teams and drove a React Server Components migration.",
      technologies: ["React", "Next.js", "TypeScript"],
    },
    {
      title: "Design Systems",
      description:
        "Established component libraries and frontend architecture practices across multiple teams.",
      technologies: ["Storybook", "Tailwind CSS", "Accessibility"],
    },
    {
      title: "Performance & Quality",
      description:
        "Improved core web vitals and introduced end-to-end testing to reduce regressions.",
      technologies: ["Playwright", "Vite"],
    },
  ],
  media: EMPTY_CAREER_MEDIA,
};

export const SAMPLE_INTELLIGENCE: IntelligenceData = {
  yearsOfExperience: 8,
  seniority: "Staff / Senior",
  strengths: ["Design systems", "Performance", "Mentorship"],
  focusAreas: ["Frontend architecture", "Developer experience"],
  keywords: ["React", "Next.js", "TypeScript", "Accessibility"],
  technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Playwright"],
  industries: ["SaaS", "Developer tools"],
};
