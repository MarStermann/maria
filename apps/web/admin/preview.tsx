import { useEffect, useRef, useState } from "react";
import type { PreviewTemplateComponentProps } from "decap-cms-core";
import type { PreviewDraft } from "./preview-data";

const devices = [{ label: "Desktop", width: 1280 }, { label: "Tablet", width: 768 }, { label: "Mobil", width: 390 }];

export function ContentPreview({ entry, collection, getAsset }: PreviewTemplateComponentProps) {
  const frame = useRef<HTMLIFrameElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const largePreview = useRef<Window | null>(null);
  const latest = useRef<PreviewDraft | null>(null);
  const resetScroll = useRef(false);
  const [width, setWidth] = useState(1280);
  const [available, setAvailable] = useState(600);
  const [height, setHeight] = useState(900);
  const [surface, setSurface] = useState<PreviewDraft["surface"]>("detail");
  const [popupBlocked, setPopupBlocked] = useState(false);
  const scale = Math.min(1, available / width);
  const origin = window.location.origin;
  const isService = collection.get("name") === "services";
  const isArticle = collection.get("name") === "articles";
  const isTopic = collection.get("name") === "article-topics";

  useEffect(() => {
    const node = stage.current;
    if (!node) return;
    const observer = new ResizeObserver(([size]) => {
      if (size) setAvailable(Math.max(1, size.contentRect.width));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Resolve newly uploaded images in nested sections and lists as well as service images.
    const imageKeys = new Set(["image", "ogImage", "src", "backgroundImage", "decorationImage"]);
    function resolveImages(value: unknown, key = ""): unknown {
      if (typeof value === "string" && value && imageKeys.has(key)) return getAsset(value)?.url || value;
      if (Array.isArray(value)) return value.map(item => resolveImages(item));
      if (value && typeof value === "object") return Object.fromEntries(
        Object.entries(value).map(([childKey, child]) => [childKey, resolveImages(child, childKey)])
      );
      return value;
    }
    const data = resolveImages(entry.get("data").toJS()) as Record<string, unknown>;
    latest.current = {
      type: "maria:preview-draft", collection: collection.get("name"),
      slug: entry.get("slug"), data, surface
    };
    frame.current?.contentWindow?.postMessage(latest.current, origin);
    if (largePreview.current && !largePreview.current.closed) largePreview.current.postMessage(latest.current, origin);
  }, [entry, collection, getAsset, surface, origin]);

  useEffect(() => {
    function receive(event: MessageEvent) {
      if (event.origin !== origin) return;
      const embedded = event.source === frame.current?.contentWindow;
      const expanded = event.source === largePreview.current;
      if (!embedded && !expanded) return;
      if (event.data?.type === "maria:preview-ready" && latest.current) {
        (event.source as Window).postMessage(latest.current, origin);
      }
      if (embedded && event.data?.type === "maria:preview-height" && Number.isFinite(event.data.height)) {
        setHeight(Math.max(400, Math.ceil(event.data.height)));
        if (resetScroll.current) {
          const host = stage.current?.ownerDocument.defaultView;
          host?.requestAnimationFrame(() => {
            host.scrollTo({ top: 0, behavior: "instant" });
            resetScroll.current = false;
          });
        }
      }
    }
    window.addEventListener("message", receive);
    return () => {
      window.removeEventListener("message", receive);
    };
  }, [origin]);

  function openLargePreview() {
    largePreview.current = window.open("/admin/preview.html", "maria-cms-preview");
    setPopupBlocked(!largePreview.current);
    if (largePreview.current) {
      largePreview.current.postMessage(latest.current, origin);
      largePreview.current.focus();
    }
  }

  return (
    <div className="site-preview">
      <div className="site-preview__toolbar">
        <div className="site-preview__row">
          <strong>Seitenvorschau</strong>
          <button type="button" onClick={openLargePreview}>Groß öffnen ↗</button>
        </div>
        <div className="site-preview__row" role="group" aria-label="Vorschaugröße">
          {devices.map((device) => <button type="button" key={device.width} aria-pressed={width === device.width} onClick={() => {
            resetScroll.current = true;
            setWidth(device.width);
            stage.current?.ownerDocument.defaultView?.scrollTo({ top: 0, behavior: "instant" });
          }}>{device.label}</button>)}
          <span>{width} px · {Math.round(scale * 100)} %</span>
        </div>
        {(isService || isArticle || isTopic) && <label>Ansicht <select value={surface} onChange={(event) => setSurface(event.target.value as PreviewDraft["surface"])}>
          <option value="detail">Detailseite</option><option value="overview">{isTopic ? "Blogübersicht mit Themenbereich" : isArticle ? "Blogübersicht mit Artikelkarte" : "Therapieübersicht mit Bild"}</option>
        </select></label>}
        <p>Änderungen erscheinen sofort, auch vor dem Speichern.</p>
        {popupBlocked && <p role="alert">Bitte Pop-ups für diese Seite erlauben, um die große Vorschau zu öffnen.</p>}
      </div>
      <div className="site-preview__stage" ref={stage}>
        <div className="site-preview__canvas" style={{ width: width * scale, height: height * scale }}>
          <iframe ref={frame} title="Website mit aktuellen Änderungen" src="/admin/preview.html"
            style={{ width, height, transform: `scale(${scale})` }} />
        </div>
      </div>
    </div>
  );
}
