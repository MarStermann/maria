import { renderToString } from "react-dom/server";

import { App } from "@/App";
import { assertContentReviewed } from "@/content/editable";
import { publicEnv } from "@/lib/env";
import {
  generateManifestJson,
  generateRobotsTxt,
  generateSitemapXml,
  renderHeadTags
} from "@/lib/seo";
import { matchRoute, notFoundRoute, routes } from "@/routes";

export function render(path: string) {
  const route = matchRoute(path);

  return {
    appHtml: renderToString(<App path={path} />),
    headHtml: renderHeadTags(route.meta),
    status: route.status ?? 200
  };
}

export function getStaticRoutes() {
  if (publicEnv.allowIndexing) assertContentReviewed();
  return [...routes, notFoundRoute];
}

export { generateManifestJson, generateRobotsTxt, generateSitemapXml };
