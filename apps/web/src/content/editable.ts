import home from "./editable/home.json";
import about from "./editable/about.json";
import contact from "./editable/contact.json";
import servicesPage from "./editable/services-page.json";
import complaintsPage from "./editable/complaints-page.json";
import blogPage from "./editable/blog-page.json";
import { complaintCatalog } from "./complaints";
import ohrakupunktur from "./editable/services/ohrakupunktur.json";
import pflanzenheilkunde from "./editable/services/pflanzenheilkunde.json";
import fussreflexzonentherapie from "./editable/services/fussreflexzonentherapie.json";
import frauenheilkunde from "./editable/services/naturheilkundliche-frauenheilkunde.json";
import homoeopathie from "./editable/services/komplex-homoeopathie.json";
import allergien from "./editable/services/allergien-heuschnupfen.json";
import mikrobiologischeTherapie from "./editable/services/mikrobiologische-therapie.json";

export const editablePages = { home, about, contact, servicesPage, complaintsPage, blogPage };
export const editableServices = [ohrakupunktur, pflanzenheilkunde, fussreflexzonentherapie,
  frauenheilkunde, homoeopathie, allergien, mikrobiologischeTherapie];

export function assertContentReviewed() {
  const pending = [...Object.values(editablePages), ...editableServices, ...complaintCatalog].filter(({ review }) =>
    review.status !== "published" || !review.reviewedBy?.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(review.lastReviewedAt ?? "")
  );
  if (pending.length) {
    throw new Error(`Indexierbarer Build gesperrt: ${pending.length} CMS-Inhalte sind noch nicht freigegeben. Status, geprüft von und Prüfdatum in der Redaktion ergänzen. Für die lokale Vorschau VITE_ALLOW_INDEXING=false verwenden.`);
  }
}
