"use client";

import * as React from "react";
import Link from "next/link";
import { Loader2, Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SuccessState } from "@/features/portfolio/success-state";
import { publishPortfolio } from "@/lib/services/portfolio/publish";
import { portfolioPublicPath } from "@/lib/portfolio/seo/slug";
import type { AppearanceConfig } from "@/types/appearance";
import type { CareerProfile } from "@/types/career-profile";
import type { IntelligenceData } from "@/types/intelligence";
import { dict } from "@/lib/i18n";

interface PublishDialogProps {
  profile: CareerProfile;
  intelligence: IntelligenceData | null;
  appearance: AppearanceConfig;
}

export function PublishDialog({
  profile,
  intelligence,
  appearance,
}: PublishDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [publishing, setPublishing] = React.useState(false);
  const [published, setPublished] = React.useState(false);
  const [publicUrl, setPublicUrl] = React.useState("");
  const [publicPath, setPublicPath] = React.useState("");

  async function handlePublish() {
    setPublishing(true);
    const result = await publishPortfolio({ profile, intelligence, appearance });
    setPublishing(false);

    if (!result.ok) return;

    setPublicUrl(result.url);
    setPublicPath(portfolioPublicPath(result.slug));
    setPublished(true);
  }

  function onOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setTimeout(() => {
        setPublished(false);
        setPublishing(false);
        setPublicUrl("");
        setPublicPath("");
      }, 200);
    }
  }

  const previewPath = publicPath || portfolioPublicPath("your-name");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="lg">
          <Rocket className="size-4" />
          {dict.publish.trigger}
        </Button>
      </DialogTrigger>
      <DialogContent>
        {published ? (
          <div className="space-y-4">
            <SuccessState url={publicUrl} />
            {publicPath && (
              <Button asChild className="w-full" variant="outline">
                <Link href={publicPath}>{dict.publish.viewPublished}</Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Rocket className="size-6" />
            </span>
            <DialogTitle className="mt-5">{dict.publish.title}</DialogTitle>
            <DialogDescription className="mt-2">
              {dict.publish.description}
            </DialogDescription>
            <div className="mt-6 rounded-2xl bg-secondary/60 px-4 py-3 text-sm text-muted-foreground">
              {previewPath}
            </div>
            <Button
              size="lg"
              className="mt-6 w-full"
              onClick={handlePublish}
              disabled={publishing}
            >
              {publishing ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {dict.publish.publishing}
                </>
              ) : (
                dict.publish.now
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
