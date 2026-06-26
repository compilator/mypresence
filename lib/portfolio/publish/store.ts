import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { resolveCanonicalSlug, slugifyName } from "@/lib/portfolio/seo/slug";
import type { CareerProfile } from "@/types/career-profile";
import type { PublishedPortfolio } from "@/types/published-portfolio";

const DATA_DIR = path.join(process.cwd(), ".data", "published");

function recordPath(slug: string): string {
  return path.join(DATA_DIR, `${slug}.json`);
}

async function ensureDir(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
}

export async function listPublishedSlugs(): Promise<string[]> {
  try {
    const files = await readdir(DATA_DIR);
    return files
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.replace(/\.json$/, ""));
  } catch {
    return [];
  }
}

export async function getPublishedPortfolio(
  slug: string,
): Promise<PublishedPortfolio | null> {
  try {
    const raw = await readFile(recordPath(slug), "utf8");
    return JSON.parse(raw) as PublishedPortfolio;
  } catch {
    return null;
  }
}

async function slugExists(slug: string): Promise<boolean> {
  const existing = await getPublishedPortfolio(slug);
  return existing !== null;
}

/** Allocate a unique slug for a profile. */
export async function allocateUniqueSlug(profile: CareerProfile): Promise<string> {
  const base = resolveCanonicalSlug(profile);
  if (!(await slugExists(base))) return base;

  const nameBase = slugifyName(profile.basics.name);
  for (let i = 2; i < 100; i++) {
    const candidate = `${nameBase}-${i}`;
    if (!(await slugExists(candidate))) return candidate;
  }
  return `${nameBase}-${Date.now()}`;
}

export async function savePublishedPortfolio(
  record: PublishedPortfolio,
): Promise<void> {
  await ensureDir();
  await writeFile(recordPath(record.slug), JSON.stringify(record, null, 2), "utf8");
}
