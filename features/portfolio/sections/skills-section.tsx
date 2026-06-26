import type { SkillGroup } from "@/types/career-profile";
import { pfCaption, pfSubtitle } from "@/lib/portfolio/typography";

interface SkillsSectionProps {
  groups: SkillGroup[];
}

export function SkillsSection({ groups }: SkillsSectionProps) {
  if (groups.length === 0) return null;

  return (
    <div className="space-y-12 lg:space-y-14">
      {groups.map((group) => (
        <section key={group.category} aria-label={group.category}>
          <h3 className={pfSubtitle}>{group.category}</h3>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {group.skills.map((skill) => (
              <li key={skill} className={pfCaption}>
                {skill}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
