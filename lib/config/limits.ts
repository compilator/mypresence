/**
 * Generation limits (architecture prep, NOT enforced today).
 *
 * Future flow: anonymous user gets 1 free generation, views the result, then
 * registers to save/publish. We expose the limit and a pure helper now so the
 * gate can be switched on later (after auth) without rearchitecting. The store
 * already tracks `generationCount`.
 */
export const FREE_GENERATION_LIMIT = 1;

export function canGenerate(generationCount: number): boolean {
  return generationCount < FREE_GENERATION_LIMIT;
}
