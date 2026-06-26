import { writeFile, unlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import WordExtractor from "word-extractor";

/** Legacy Word (.doc) — written to a temp file because the extractor is path-based. */
export async function parseDoc(bytes: Uint8Array): Promise<string> {
  const tmpPath = join(tmpdir(), `presence-${crypto.randomUUID()}.doc`);

  try {
    await writeFile(tmpPath, Buffer.from(bytes));
    const extractor = new WordExtractor();
    const document = await extractor.extract(tmpPath);
    return (document.getBody() ?? "").replace(/\u0000/g, "").trim();
  } finally {
    await unlink(tmpPath).catch(() => {});
  }
}
