import type { SkillGroup } from "@/types/career-profile";
import { Badge } from "@/components/ui/badge";

export function SkillsCloud({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <div key={group.category}>
          <p className="mb-2 text-sm font-medium">{group.category}</p>
          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <Badge key={skill} variant="muted">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
