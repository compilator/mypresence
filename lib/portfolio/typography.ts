/**
 * Portfolio editorial type scale — single source for Apple-inspired typography.
 * Weights: regular, medium, semibold. Bold reserved for display (name) only.
 */

/** Hero name — compact executive cover */
export const pfHeroDisplay =
  "font-display text-[2.125rem] font-bold leading-[1.1] tracking-[-0.02em] text-portfolio-fg sm:text-4xl lg:text-[2.75rem]";

/** Hero name — 3rem bold, strongest element on the page */
export const pfDisplay =
  "font-display text-[3rem] font-bold leading-[1.08] tracking-[-0.02em] text-portfolio-fg";

/** In-section headings — 28–34px semibold */
export const pfSectionTitle =
  "text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.015em] text-portfolio-fg sm:text-[2rem] lg:text-[2.125rem]";

/** Card / company / project titles — 20–22px semibold */
export const pfCardTitle =
  "text-xl font-semibold leading-[1.15] tracking-[-0.01em] text-portfolio-fg sm:text-[1.375rem]";

/** Subtitles — headline, role — 16–18px medium */
export const pfSubtitle = "text-base font-medium leading-[1.5] sm:text-lg";

/** Body — ~18px regular, comfortable measure */
export const pfBody =
  "max-w-[42rem] text-[1.15rem] font-normal leading-[1.85] text-portfolio-fg/88";

/** Muted body variant */
export const pfBodyMuted =
  "max-w-[42rem] text-[1.15rem] font-normal leading-[1.85] text-portfolio-muted";

/** Caption — 13–14px */
export const pfCaption = "text-[0.8125rem] font-normal leading-[1.6] text-portfolio-muted";

/** Section / meta labels — ~14px uppercase (portfolio section headings) */
export const pfMeta =
  "text-[0.86rem] font-medium uppercase tracking-[0.22em] text-portfolio-muted/70";

/** Quiet inline link button */
export const pfButton =
  "inline-flex items-center rounded-md border border-portfolio-border/50 px-2.5 py-1 text-[0.8125rem] font-medium leading-none text-portfolio-fg transition-opacity hover:opacity-70";

/** Hero contact pills */
export const pfPillButton =
  "inline-flex items-center rounded-full border border-portfolio-border/45 px-3.5 py-1.5 text-[0.8125rem] font-medium leading-none text-portfolio-fg transition-opacity hover:opacity-70";

/** Hero headline — primary positioning in mypresence green */
export const pfHeroHeadline =
  "text-base font-medium leading-[1.45] text-portfolio-accent sm:text-lg";

/** Hero short positioning — neutral, 2–3 lines */
export const pfHeroPositioning =
  "max-w-[20rem] text-pretty text-[0.875rem] font-normal leading-[1.65] text-portfolio-muted sm:text-[0.9375rem] sm:leading-[1.7]";

/** Light tag */
export const pfTag =
  "rounded-full border border-portfolio-border/35 px-2 py-0.5 text-[0.8125rem] font-normal text-portfolio-muted/90";

/** Elegant list row */
export const pfListItem = "flex gap-2.5 text-[1.15rem] font-normal leading-[1.8] text-portfolio-muted";

/** List bullet accent */
export const pfBullet = "mt-[0.65rem] size-1 shrink-0 rounded-full bg-portfolio-accent/70";

/** Icon inline with text */
export const pfIcon = "size-4 shrink-0 text-portfolio-muted/50";
