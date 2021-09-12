export function ensureArray<T>(input: unknown): T[] {
  if (Array.isArray(input)) {
    return input;
  }
  return [];
}