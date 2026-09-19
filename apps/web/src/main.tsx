import { createRoot, hydrateRoot } from "react-dom/client";

import { App } from "@/App";

import "./styles.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element #root was not found.");
}

const app = <App path={window.location.pathname} />;
const hasPrerenderedMarkup = Array.from(root.childNodes).some((node) => {
  if (node.nodeType === Node.COMMENT_NODE) {
    return false;
  }

  if (node.nodeType === Node.TEXT_NODE) {
    return Boolean(node.textContent?.trim());
  }

  return true;
});

if (hasPrerenderedMarkup) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
