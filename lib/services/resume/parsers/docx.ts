import mammoth from "mammoth";

export async function parseDocx(bytes: Uint8Array): Promise<string> {
  const result = await mammoth.extractRawText({
    buffer: Buffer.from(bytes),
  });
  return (result.value ?? "").replace(/\u0000/g, "").trim();
}
