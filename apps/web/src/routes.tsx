import type { ReactNode } from "react";

import { editablePages } from "@/content/editable";
import { complaintEntries } from "@/content/complaints";
import { siteConfig } from "@/content/site";
import { createPageMeta, type PageMeta, type SitemapRoute } from "@/lib/seo";
import { AboutPage } from "@/pages/about";
import { BlogPage } from "@/pages/blog";
import { ArticleDetailPage } from "@/pages/article-detail";
import { ArticleTopicPage, NewsPage } from "@/pages/article-archive";
import { publishedTopics, topicPath } from "@/content/article-topics";
import { articlePreviewEnabled, siteArticles } from "@/content/articles";
import { articlePath, isPublishedArticle } from "@/lib/article-content";
import { ComplaintDetailPage } from "@/pages/complaint-detail";
import { ComplaintsPage } from "@/pages/complaints";
import { ContactPage } from "@/pages/contact";
import { HomePage } from "@/pages/home";
import { DatenschutzPage, ImpressumPage } from "@/pages/legal";
import { NotFoundPage } from "@/pages/not-found";
import { ServicePage } from "@/pages/service-detail";
import { ServicesPage } from "@/pages/services";
import { brandAsset } from "@/theme/brand";

export type AppRoute = SitemapRoute & {
  render: () => ReactNode;
  status?: number;
};

const serviceRoutes: AppRoute[] = siteConfig.services.map((service) => ({
  path: `/therapieverfahren/${service.slug}`,
  meta: createPageMeta({
    ...service.seo,
    path: `/therapieverfahren/${service.slug}`
  }),
  render: () => <ServicePage service={service} />
}));

const complaintRoutes: AppRoute[] = complaintEntries.map((entry) => ({
  path: `/beschwerden/${entry.topic.slug}`,
  meta: createPageMeta({
    title: entry.topic.seoTitle ?? `${entry.topic.title} in Hamburg`,
    description: entry.topic.metaDescription,
    path: `/beschwerden/${entry.topic.slug}`,
    image: entry.topic.image ?? brandAsset.complaintsXrayPaths[entry.region.id],
    noIndex: entry.topic.noIndex,
    imageWidth: 768,
    imageHeight: 768
  }),
  render: () => <ComplaintDetailPage entry={entry} />,
  changeFrequency: "monthly",
  priority: 0.75
}));

export const routes: AppRoute[] = [
  {
    path: "/blog",
    meta: createPageMeta({ ...editablePages.blogPage.seo, path: "/blog", noIndex: articlePreviewEnabled || editablePages.blogPage.seo.noIndex || !siteArticles.length }),
    render: () => <BlogPage />,
    changeFrequency: "weekly"
  },
  {
    path: "/blog/aktuelles",
    meta: createPageMeta({ title: "Aktuelles aus der Praxis", description: editablePages.blogPage.news.description, path: "/blog/aktuelles", noIndex: articlePreviewEnabled || !siteArticles.some(article => article.isNews && isPublishedArticle(article)) }),
    render: () => <NewsPage />,
    changeFrequency: "weekly"
  },
  ...publishedTopics.map((topic): AppRoute => ({
    path: topicPath(topic.slug),
    meta: createPageMeta({ ...topic.seo, path: topicPath(topic.slug), image: topic.seo.ogImage, noIndex: articlePreviewEnabled || topic.seo.noIndex || !siteArticles.some(article => article.topicSlugs?.includes(topic.slug) && isPublishedArticle(article)) }),
    render: () => <ArticleTopicPage topic={topic} />
  })),
  ...siteArticles.map((article): AppRoute => ({
    path: articlePath(article.slug),
    meta: createPageMeta({ ...article.seo, noIndex: !isPublishedArticle(article) || article.seo.noIndex, image: article.seo.ogImage || article.image, path: articlePath(article.slug) }),
    includeInSitemap: isPublishedArticle(article),
    render: () => <ArticleDetailPage article={article} />
  })),
  {
    path: "/",
    meta: createPageMeta({
      ...editablePages.home.seo,
      path: "/"
    }),
    render: () => <HomePage />,
    changeFrequency: "weekly",
    priority: 1
  },
  {
    path: "/beschwerden",
    meta: createPageMeta({
      ...editablePages.complaintsPage.seo,
      path: "/beschwerden"
    }),
    render: () => <ComplaintsPage />,
    changeFrequency: "monthly",
    priority: 0.9
  },
  ...complaintRoutes,
  {
    path: "/therapieverfahren",
    meta: createPageMeta({
      ...editablePages.servicesPage.seo,
      path: "/therapieverfahren"
    }),
    render: () => <ServicesPage />
  },
  ...serviceRoutes,
  {
    path: "/ueber-mich",
    meta: createPageMeta({
      ...editablePages.about.seo,
      path: "/ueber-mich"
    }),
    render: () => <AboutPage />
  },
  {
    path: "/kontakt",
    meta: createPageMeta({
      ...editablePages.contact.seo,
      path: "/kontakt"
    }),
    render: () => <ContactPage />
  },
  {
    path: "/impressum",
    meta: createPageMeta({
      title: "Impressum",
      description: "Impressum von Maria Alscher-Scheunemann.",
      path: "/impressum",
      noIndex: true
    }),
    render: () => <ImpressumPage />,
    includeInSitemap: false
  },
  {
    path: "/datenschutz",
    meta: createPageMeta({
      title: "Datenschutz",
      description: "Datenschutzhinweise von Maria Alscher-Scheunemann.",
      path: "/datenschutz",
      noIndex: true
    }),
    render: () => <DatenschutzPage />,
    includeInSitemap: false
  }
];

export const notFoundRoute: AppRoute = {
  path: "/404",
  meta: createPageMeta({
    title: "Seite nicht gefunden",
    description: "Die angeforderte Seite existiert nicht oder wurde noch nicht veröffentlicht.",
    path: "/404",
    noIndex: true
  }),
  render: () => <NotFoundPage />,
  includeInSitemap: false,
  status: 404
};

export function matchRoute(pathname: string) {
  const normalizedPath = normalizePathname(pathname);

  return routes.find((route) => route.path === normalizedPath) ?? notFoundRoute;
}

export function normalizePathname(pathname: string): PageMeta["path"] {
  const pathnameOnly = pathname.split(/[?#]/)[0] || "/";
  const withLeadingSlash = pathnameOnly.startsWith("/") ? pathnameOnly : `/${pathnameOnly}`;
  const withoutTrailingSlash =
    withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, "") : withLeadingSlash;

  return withoutTrailingSlash as PageMeta["path"];
}
