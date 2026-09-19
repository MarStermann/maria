import previewStyles from "./preview.css?inline";

const status = document.getElementById("cms-status")!;
const online = import.meta.env.VITE_CMS_MODE === "server";

async function start() {
  if (!import.meta.env.DEV && !online) {
    status.querySelector("p")!.textContent = "Die Redaktion ist lokal verfügbar. Starte im Projektordner npm run dev und öffne http://localhost:3000/admin/.";
    return;
  }
  try {
    const response = await fetch("/__cms/api/v1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "info", params: {} }),
      signal: AbortSignal.timeout(5000)
    });
    if (!response.ok || (await response.json()).type !== "local_fs") throw new Error("proxy unavailable");
    const { default: CMS } = await import("decap-cms-app");
    const { ContentPreview } = await import("./preview");
    const german = CMS.getLocale("de");
    CMS.registerLocale("de", {
      ...german,
      auth: { ...german.auth, login: online ? "Redaktion öffnen" : "Lokale Redaktion öffnen", loggingIn: "Redaktion wird geöffnet …" },
      editor: {
        ...german.editor,
        editor: { ...german.editor.editor, onPublishing: online ? "Änderungen speichern und Website aktualisieren?" : "Änderungen lokal speichern?" },
        editorToolbar: {
          ...german.editor.editorToolbar,
          publishing: online ? "Wird gespeichert …" : "Wird lokal gespeichert …",
          publish: online ? "Speichern" : "Lokal speichern",
          published: online ? "Gespeichert" : "Lokal gespeichert",
          publishNow: online ? "Jetzt speichern" : "Jetzt lokal speichern",
          deployButtonLabel: "Website ansehen"
        }
      }
    });
    for (const name of ["home", "about", "contact", "services-page", "complaints-page", "blog-page", "services", "complaints", "articles", "article-topics"]) {
      CMS.registerPreviewTemplate(name, ContentPreview);
    }
    CMS.registerPreviewStyle(previewStyles, { raw: true });
    // Field positions do not correspond to the scaled page layout. Respect an explicit user choice.
    if (localStorage.getItem("cms.scroll-sync-enabled") === null) {
      localStorage.setItem("cms.scroll-sync-enabled", "false");
    }
    CMS.init();
    status.remove();
  } catch (error) {
    console.error("CMS konnte nicht gestartet werden:", error);
    status.querySelector("p")!.textContent = online
      ? "Die Redaktion ist gerade nicht erreichbar. Bitte lade diese Seite in einem Moment neu."
      : "Die lokale Redaktion ist nicht erreichbar. Starte im Projektordner npm run dev. Läuft das Frontend bereits, starte npm run dev:cms in einem zweiten Terminal und lade diese Seite neu.";
  }
}

void start();
