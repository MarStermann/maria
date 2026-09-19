const env = import.meta.env;

export const publicEnv = {
  siteUrl: env.VITE_SITE_URL ?? env.NEXT_PUBLIC_SITE_URL ?? "https://www.alscher-scheunemann.de",
  allowIndexing: (env.VITE_ALLOW_INDEXING ?? env.NEXT_PUBLIC_ALLOW_INDEXING ?? "false") === "true"
} as const;
