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
  seo: SeoMeta;
  patientQuestions: string[];
  process: string[];
  preparationNotes: string[];
  faqs: FaqItem[];
};

export type Article = ReviewFields & {
  type: "article";
  title: string;
  slug: string;
  teaser: string;
  body: string;
  seo: SeoMeta;
  author?: string;
  reviewer?: string;
  sources?: string[];
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
