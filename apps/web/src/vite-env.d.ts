/// <reference types="vite/client" />

declare module "virtual:article-topics" {
  const topics: import("@maria/content-model").ArticleTopic[];
  export default topics;
}

interface ImportMetaEnv {
  readonly VITE_CMS_MODE?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_ALLOW_INDEXING?: string;
  readonly NEXT_PUBLIC_SITE_URL?: string;
  readonly NEXT_PUBLIC_ALLOW_INDEXING?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
declare module "virtual:published-articles" {
  export const previewEnabled: boolean;
  const articles: import("@maria/content-model").Article[];
  export default articles;
}
