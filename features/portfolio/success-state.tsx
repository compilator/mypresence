"use client";

import * as React from "react";
import { Check, Copy, PartyPopper } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { dict } from "@/lib/i18n";

export function SuccessState({ url }: { url: string }) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
        <PartyPopper className="size-6" />
      </span>
      <DialogTitle className="mt-5">{dict.publish.successTitle}</DialogTitle>
      <DialogDescription className="mt-2">
        {dict.publish.successDescription}
      </DialogDescription>

      <div className="mt-6 flex items-center gap-2 rounded-2xl bg-secondary/60 p-2 pl-4">
        <span className="min-w-0 flex-1 truncate text-left text-sm text-foreground">
          {url}
        </span>
        <Button size="sm" variant="secondary" onClick={copy}>
          {copied ? (
            <>
              <Check className="size-4" /> {dict.publish.copied}
            </>
          ) : (
            <>
              <Copy className="size-4" /> {dict.publish.copy}
            </>
          )}
        </Button>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">{dict.publish.note}</p>
    </div>
  );
}
