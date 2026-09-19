export type PreviewDraft = {
  type: "maria:preview-draft";
  collection: string;
  slug: string;
  data: Record<string, unknown>;
  surface: "detail" | "overview";
};

// Required fields can be temporarily absent while a new list item is being edited.
// Keep blank strings and empty lists so the preview also shows deliberate removals.
export function withDefaults<T>(defaults: T, draft: unknown): T {
  if (draft === undefined || draft === null) return defaults;
  if (Array.isArray(defaults)) {
    return (Array.isArray(draft)
      ? draft.map((item, index) => {
        const key = item && typeof item === "object"
          ? ["id", "slug", "regionId", "label"].find(key => typeof item[key] === "string")
          : undefined;
        const matching = key ? defaults.find(value => value?.[key] === item[key]) : undefined;
        return defaults.length ? withDefaults(matching ?? defaults[index] ?? defaults[0], item) : item;
      })
      : defaults) as T;
  }
  if (typeof defaults === "object" && defaults !== null) {
    if (typeof draft !== "object" || Array.isArray(draft)) return defaults;
    return Object.fromEntries(Object.entries({ ...defaults, ...draft }).map(([key, value]) =>
      [key, key in defaults ? withDefaults((defaults as Record<string, unknown>)[key], (draft as Record<string, unknown>)[key]) : value]
    )) as T;
  }
  return typeof draft === typeof defaults ? draft as T : defaults;
}
