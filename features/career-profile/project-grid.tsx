import { ArrowUpRight } from "lucide-react";

import type { ProjectItem } from "@/types/career-profile";
import { Badge } from "@/components/ui/badge";

export function ProjectGrid({ items }: { items: ProjectItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((project, index) => (
        <div
          key={`${project.name}-${index}`}
          className="rounded-2xl bg-secondary/50 p-5"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="font-medium">{project.name}</p>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label={`Open ${project.name}`}
              >
                <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {project.description}
          </p>
          {project.tags && project.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
