/** Read nested config by slash-separated path (e.g. `algolia_search/app_id`). */
export function configValue(
  config: Record<string, unknown> | undefined,
  path: string,
  defaultValue?: unknown,
): unknown {
  if (!config) return defaultValue;
  const keys = path.split("/").filter(Boolean);
  let val: unknown = config;
  for (const key of keys) {
    if (val == null || typeof val !== "object") return defaultValue;
    val = (val as Record<string, unknown>)[key];
  }
  return val ?? defaultValue;
}
