import region0 from "./editable/complaints/kopf.json";
import region1 from "./editable/complaints/seelisch-mental.json";
import region2 from "./editable/complaints/haut-haare.json";
import region3 from "./editable/complaints/bewegungsapparat.json";
import region4 from "./editable/complaints/atemwege-immunsystem.json";
import region5 from "./editable/complaints/magen-darm.json";
import region6 from "./editable/complaints/frauenheilkunde-unterbauch.json";
import type { ReviewFields } from "@maria/content-model";

export type TherapySlug =
  | "ohrakupunktur"
  | "pflanzenheilkunde"
  | "fussreflexzonentherapie"
  | "naturheilkundliche-frauenheilkunde"
  | "komplex-homoeopathie"
  | "allergien-heuschnupfen"
  | "mikrobiologische-therapie";

export type ComplaintTopic = {
  title: string;
  slug: string;
  seoTitle?: string;
  metaDescription: string;
  description: string;
  therapySlugs: readonly TherapySlug[];
  careNote?: string;
  image?: string;
  noIndex?: boolean;
};

export type ComplaintGroup = {
  id: string;
  label: string;
  description?: string;
  topics: readonly ComplaintTopic[];
};

export type ComplaintRegion = {
  id:
    | "kopf"
    | "seelisch-mental"
    | "haut-haare"
    | "bewegungsapparat"
    | "atemwege-immunsystem"
    | "magen-darm"
    | "frauenheilkunde-unterbauch";
  label: string;
  shortLabel: string;
  description: string;
  marker: {
    targetX: number;
    targetY: number;
    calloutX: number;
    calloutY: number;
    side: "left" | "right";
    zoomScale: number;
  };
  groups: readonly ComplaintGroup[];
};

export type ComplaintCatalogRegion = ComplaintRegion & { review: ReviewFields };

export const complaintCatalog = [region0, region1, region2, region3, region4, region5, region6] as ComplaintCatalogRegion[];
export const complaintRegions: readonly ComplaintRegion[] = complaintCatalog;

export type ComplaintEntry = {
  region: ComplaintRegion;
  group: ComplaintGroup;
  topic: ComplaintTopic;
};

export const complaintEntries: readonly ComplaintEntry[] = complaintRegions.flatMap((region) =>
  region.groups.flatMap((group) =>
    group.topics.map((topic) => ({
      region,
      group,
      topic
    }))
  )
);
