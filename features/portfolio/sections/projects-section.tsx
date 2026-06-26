import { ArrowUpRight } from "lucide-react";

import type { ProjectItem } from "@/types/career-profile";
import { pfBodyMuted, pfCardTitle, pfIcon, pfTag } from "@/lib/portfolio/typography";
import { cn } from "@/lib/utils";

interface ProjectsSectionProps {
  items: ProjectItem[];
}

export function ProjectsSection({ items }: ProjectsSectionProps) {
  if (items.length === 0) return null;

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:gap-10">
      {items.map((project, index) => (
        <article
          key={`${project.name}-${index}`}
          className="rounded-2xl border border-portfolio-border/45 p-7 sm:p-8"
        >
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5"
            >
              <span className={pfCardTitle}>{project.name}</span>
              <ArrowUpRight
                className={cn(pfIcon, "transition-opacity group-hover:opacity-100")}
                strokeWidth={1.5}
              />
            </a>
          ) : (
            <h3 className={pfCardTitle}>{project.name}</h3>
          )}
          <p className={cn(pfBodyMuted, "mt-4 max-w-none")}>{project.description}</p>
          {project.tags && project.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className={pfTag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
