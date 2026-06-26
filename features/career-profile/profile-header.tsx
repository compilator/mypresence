import { Mail, MapPin } from "lucide-react";

import { ProfileAvatar } from "@/components/shared/profile-avatar";
import type { CareerProfile } from "@/types/career-profile";

export function ProfileHeader({ profile }: { profile: CareerProfile }) {
  const { basics } = profile;

  return (
    <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <ProfileAvatar
        profile={profile}
        size="lg"
        variant="workspace"
      />
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight">{basics.name}</h1>
        <p className="text-primary">{basics.headline ?? basics.title}</p>
        {basics.headline && (
          <p className="text-sm text-muted-foreground">{basics.title}</p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          {basics.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4" />
              {basics.location}
            </span>
          )}
          {basics.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="size-4" />
              {basics.email}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
