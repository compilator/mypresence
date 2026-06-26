"use client";

import Image from "next/image";

import { LogoHorizontal } from "@/components/brand/logo-horizontal";
import { LogoMark } from "@/components/brand/logo-mark";
import { LogoWordmark } from "@/components/brand/logo-wordmark";

export function UsageMockups() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <MockupCard title="Website header">
        <div className="flex items-center justify-between border-b border-brand-graphite/8 px-5 py-4">
          <LogoHorizontal height={24} />
          <div className="hidden gap-2 sm:flex">
            <span className="h-2 w-12 rounded-full bg-brand-graphite/10" />
            <span className="h-2 w-12 rounded-full bg-brand-graphite/10" />
          </div>
        </div>
        <div className="space-y-3 px-5 py-8">
          <div className="h-3 w-2/3 rounded-full bg-brand-graphite/10" />
          <div className="h-3 w-1/2 rounded-full bg-brand-graphite/8" />
        </div>
      </MockupCard>

      <MockupCard title="App icon">
        <div className="flex items-center justify-center py-10">
          <LogoMark size={96} />
        </div>
      </MockupCard>

      <MockupCard title="Portfolio page">
        <div className="px-5 py-6">
          <LogoWordmark height={20} />
          <p className="mt-6 text-2xl font-semibold tracking-tight">
            Product Designer
          </p>
          <p className="mt-2 text-sm text-brand-gray">
            Build your professional presence.
          </p>
        </div>
      </MockupCard>

      <MockupCard title="Social preview">
        <div className="overflow-hidden">
          <div className="flex items-center gap-3 bg-brand-bg px-4 py-3">
            <LogoMark size={28} />
            <div>
              <p className="text-sm font-medium">mypresence</p>
              <p className="text-xs text-brand-gray">mypresence.pro</p>
            </div>
          </div>
          <div className="h-28 bg-brand-graphite/5" />
        </div>
      </MockupCard>

      <MockupCard title="Browser tab">
        <div className="flex items-center gap-2 px-4 py-3">
          <Image src="/icon.png" alt="mypresence" width={16} height={16} className="rounded-sm" />
          <span className="truncate text-sm text-brand-gray">mypresence — Brand</span>
        </div>
      </MockupCard>

      <MockupCard title="Avatar">
        <div className="flex items-center justify-center py-8">
          <LogoMark size={72} />
        </div>
      </MockupCard>
    </div>
  );
}

function MockupCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-brand-graphite/8 bg-white">
      <div className="border-b border-brand-graphite/8 px-5 py-3">
        <p className="text-xs font-medium tracking-wide text-brand-gray uppercase">
          {title}
        </p>
      </div>
      {children}
    </div>
  );
}
