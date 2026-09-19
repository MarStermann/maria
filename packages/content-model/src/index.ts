export type Locale = "de-DE";

export type ReviewStatus = "draft" | "review" | "published" | "archived";

export type SeoMeta = {
  title: string;
  description: string;
  canonicalPath: `/${string}`;
  ogImage?: string;
  noIndex?: boolean;
};

export type ReviewFields = {
  status: ReviewStatus;
  medicalReviewRequired: boolean;
  lastReviewedAt?: string;
  reviewedBy?: string;
};

export type SiteSettings = {
  locale: Locale;
  practiceName: string;
  practitionerName: string;
  city?: string;
  phone?: string;
  email?: string;
  appointmentUrl?: string;
  defaultSeo: SeoMeta;
};

export type PageSection =
  | ArticleSection
  | {
      type: "text";
      heading: string;
      body: string;
    }
  | {
      type: "faq";
      items: FaqItem[];
    }
  | {
      type: "cta";
      heading: string;
      body: string;
      href: string;
      label: string;
    };

export type Page = ReviewFields & {
  type: "page";
  title: string;
  slug: string;
  seo: SeoMeta;
  sections: PageSection[];
};

export type Service = ReviewFields & {
  type: "service";
  title: string;
  slug: string;
  summary: string;
  introduction: string;
  sections: { heading: string; body: string }[];
  seo: SeoMeta;
  patientQuestions: string[];
  process: string[];
  preparationNotes: string[];
  faqs: Pick<FaqItem, "question" | "answer">[];
  sources: { label: string; url: string }[];
};

export type ArticleSection = {
  type: "articles";
  enabled: boolean;
  heading: string;
  description?: string;
  /** Manual selections take priority; contextual sections also include matching assignments. */
  articleSlugs: string[];
  serviceSlug?: string;
  complaintSlug?: string;
  limit: number;
  source?: "latest" | "news" | "topic" | "selection";
  layout?: "cards" | "list" | "featured";
  topicSlug?: string;
};

export type ArticleTopic = {
  type: "articleTopic";
  slug: string;
  title: string;
  description: string;
  order: number;
  seo: Omit<SeoMeta, "canonicalPath">;
  review: ReviewFields;
};

export type Article = {
  type: "article";
  review: ReviewFields;
  title: string;
  slug: string;
  teaser: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  imageScale?: number;
  imageSource?: string;
  imagePermission?: string;
  /** CommonMark. WordPress HTML must be converted before import. */
  body: string;
  seo: Omit<SeoMeta, "canonicalPath">;
  publishedAt: string;
  isNews?: boolean;
  /** Stable references to ArticleTopic.slug. */
  topicSlugs?: string[];
  categories: string[];
  /** Stable page slugs; legacy entries without assignments normalize to an empty list. */
  serviceSlugs: string[];
  complaintSlugs?: string[];
  relatedArticleSlugs?: string[];
  author?: string;
  sources?: string[];
  wordpress?: {
    id?: number;
    originalUrl?: string;
  };
};

export type FaqItem = ReviewFields & {
  type: "faq";
  question: string;
  answer: string;
};

export const requiredSeoFields = [
  "title",
  "description",
  "canonicalPath"
] as const;

export const complianceCopyRules = [
  "No cure promises or guaranteed outcomes.",
  "No invented credentials, reviews, addresses, or opening hours.",
  "Medical-sensitive pages require review before publication.",
  "Placeholder content must stay noindex."
] as const;
