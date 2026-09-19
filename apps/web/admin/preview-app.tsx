import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import { Layout } from "@/components/layout";
import { editablePages, editableServices } from "@/content/editable";
import { complaintCatalog, complaintRegions } from "@/content/complaints";
import { ComplaintsPage } from "@/pages/complaints";
import { HomePage } from "@/pages/home";
import { AboutPage } from "@/pages/about";
import { ContactPage } from "@/pages/contact";
import { ServicesPage } from "@/pages/services";
import { ServicePage } from "@/pages/service-detail";
import { BlogPage } from "@/pages/blog";
import { ArticleDetailPage } from "@/pages/article-detail";
import { siteArticles } from "@/content/articles";
import { articleDefaults, topicDefaults } from "./article-defaults";
import { publishedTopics } from "@/content/article-topics";
import { ArticleTopicPage } from "@/pages/article-archive";
import "@/styles.css";
import { type PreviewDraft, withDefaults } from "./preview-data";

const origin = window.location.origin;
// The embedded page sits inside Decap's preview iframe; its React template runs in the admin window.
const editor = window.opener ?? (window.parent !== window ? window.parent.parent : null);

function DraftPage({ draft }: { draft: PreviewDraft }) {
  if (draft.collection === "article-topics") {
    const topic = withDefaults(publishedTopics.find(item => item.slug === draft.slug) ?? topicDefaults, draft.data);
    return draft.surface === "overview"
      ? <BlogPage topics={[...publishedTopics.filter(item => item.slug !== draft.slug), topic].sort((a, b) => a.order - b.order)} />
      : <ArticleTopicPage topic={topic} />;
  }
  if (draft.collection === "articles") {
    const article = withDefaults(siteArticles.find(item => item.slug === draft.slug) ?? articleDefaults, draft.data);
    return draft.surface === "overview"
      ? <BlogPage articles={[article, ...siteArticles.filter(item => item.slug !== draft.slug)]} editorPreview />
      : <ArticleDetailPage article={article} />;
  }
  if (draft.collection === "complaints") {
    const saved = complaintCatalog.find(region => region.id === draft.slug);
    if (!saved) return <p>Diese Körperregion wurde nicht gefunden.</p>;
    const region = withDefaults(saved, draft.data);
    return <ComplaintsPage initialRegionId={saved.id} regions={complaintRegions.map(item => item.id === saved.id ? region : item)} />;
  }
  if (draft.collection === "services") {
    const saved = editableServices.find((service) => service.slug === draft.slug);
    if (!saved) return <p>Dieses Therapieverfahren wurde nicht gefunden.</p>;
    const service = withDefaults(saved, draft.data);
    return draft.surface === "overview"
      ? <ServicesPage services={editableServices.map((item) => item.slug === saved.slug ? service : item)} />
      : <ServicePage service={service} />;
  }
  switch (draft.slug) {
    case "home": return <HomePage content={withDefaults(editablePages.home, draft.data)} />;
    case "about": return <AboutPage content={withDefaults(editablePages.about, draft.data)} />;
    case "contact": return <ContactPage content={withDefaults(editablePages.contact, draft.data)} />;
    case "services-page": return <ServicesPage content={withDefaults(editablePages.servicesPage, draft.data)} />;
    case "complaints-page": return <ComplaintsPage content={withDefaults(editablePages.complaintsPage, draft.data)} />;
    case "blog-page": return <BlogPage content={withDefaults(editablePages.blogPage, draft.data)} />;
    default: return <p>Für diese Seite ist noch keine Vorschau vorhanden.</p>;
  }
}

function PreviewApp() {
  const [draft, setDraft] = useState<PreviewDraft>();
  useEffect(() => {
    function receive(event: MessageEvent) {
      if (event.origin !== origin || event.source !== editor || event.data?.type !== "maria:preview-draft") return;
      setDraft(event.data);
    }
    const ready = () => editor?.postMessage({ type: "maria:preview-ready" }, origin);
    window.addEventListener("message", receive);
    window.addEventListener("focus", ready);
    ready();
    return () => {
      window.removeEventListener("message", receive);
      window.removeEventListener("focus", ready);
    };
  }, []);

  useEffect(() => {
    if (!draft || window.parent === window) return;
    const observer = new ResizeObserver(() => {
      editor?.postMessage({ type: "maria:preview-height", height: document.body.scrollHeight }, origin);
    });
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [draft]);

  if (!draft) return <p style={{ padding: 24, font: "16px/1.6 system-ui" }}>Öffnen Sie die Vorschau über die Redaktion. Ungespeicherte Änderungen erscheinen hier automatisch.</p>;
  return (
    <div onClickCapture={(event) => {
      // Keep the draft connected when a navigation or contact link is clicked.
      if ((event.target as Element).closest("a")) event.preventDefault();
    }}>
      <Layout key={`${draft.collection}/${draft.slug}/${draft.surface}`}><DraftPage draft={draft} /></Layout>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<PreviewApp />);
