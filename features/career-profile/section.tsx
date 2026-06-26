import * as React from "react";

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
}

export function ProfileSection({ title, children }: ProfileSectionProps) {
  return (
    <section className="border-t border-border pt-6">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}
