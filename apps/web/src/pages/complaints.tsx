import { useEffect, useMemo, useRef, useState } from "react";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FaceOutlinedIcon from "@mui/icons-material/FaceOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";

import { Eyebrow } from "@/components/static-page";
import {
  complaintRegions as defaultRegions,
  type ComplaintGroup,
  type ComplaintRegion,
  type ComplaintTopic
} from "@/content/complaints";
import { siteConfig } from "@/content/site";
import defaultContent from "@/content/editable/complaints-page.json";
import { brandAsset, brandColors } from "@/theme/brand";

type VisibleGroup = ComplaintGroup & {
  regionId: ComplaintRegion["id"];
  regionLabel: string;
};

type InnerTarget = {
  groupLabel: string;
  shortLabel: string;
  x: number;
  y: number;
};

const innerTargetsByRegion: Partial<
  Record<ComplaintRegion["id"], readonly { groupId: string; x: number; y: number }[]>
> = {
  "magen-darm": [
    { groupId: "magen", x: 39, y: 35 },
    { groupId: "darm", x: 58, y: 66 }
  ],
  "frauenheilkunde-unterbauch": [
    {
      groupId: "gebaermutter-zyklus",
      x: 50,
      y: 38
    },
    {
      groupId: "eierstoecke-hormone",
      x: 72,
      y: 52
    },
    {
      groupId: "blase-vaginalbereich",
      x: 50,
      y: 74
    }
  ]
};

export type ComplaintsPageContent = typeof defaultContent;

const detailHistoryKey = "mariaComplaintDetail";
type DetailHistoryEntry = { regionId: ComplaintRegion["id"]; overviewScrollY: number };

function readDetailHistory(state: unknown): DetailHistoryEntry | null {
  if (!state || typeof state !== "object") return null;
  const detail = (state as Record<string, unknown>)[detailHistoryKey];
  if (!detail || typeof detail !== "object") return null;
  const entry = detail as Partial<DetailHistoryEntry>;
  return typeof entry.regionId === "string" && typeof entry.overviewScrollY === "number"
    ? entry as DetailHistoryEntry
    : null;
}

export function ComplaintsPage({
  content = defaultContent,
  regions: complaintRegions = defaultRegions,
  initialRegionId = "magen-darm"
}: {
  content?: ComplaintsPageContent;
  regions?: readonly ComplaintRegion[];
  initialRegionId?: ComplaintRegion["id"];
}) {
  const [activeRegionId, setActiveRegionId] =
    useState<ComplaintRegion["id"]>(initialRegionId);
  const [activeGroupLabel, setActiveGroupLabel] = useState<string | null>(null);
  const [isDetailActive, setDetailActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const detailHistoryRef = useRef<DetailHistoryEntry | null>(null);
  const closingHistoryRef = useRef(false);
  const restoreOverviewPositionRef = useRef(true);

  useEffect(() => {
    let restoreFrame = 0;
    const syncHistory = () => {
      window.cancelAnimationFrame(restoreFrame);
      const entry = readDetailHistory(window.history.state);
      const previousDetail = detailHistoryRef.current;
      closingHistoryRef.current = false;
      setActiveGroupLabel(null);

      if (entry && complaintRegions.some(region => region.id === entry.regionId)) {
        detailHistoryRef.current = entry;
        setActiveRegionId(entry.regionId);
        setSearchValue("");
        setDetailActive(true);
      } else {
        detailHistoryRef.current = null;
        setDetailActive(false);
        if (previousDetail && restoreOverviewPositionRef.current) {
          restoreFrame = window.requestAnimationFrame(() => {
            window.scrollTo({ top: previousDetail.overviewScrollY, behavior: "instant" });
            document.querySelector<HTMLButtonElement>(`[data-region-callout="${previousDetail.regionId}"]`)?.focus({ preventScroll: true });
          });
        }
      }
      restoreOverviewPositionRef.current = true;
    };

    syncHistory();
    window.addEventListener("popstate", syncHistory);
    return () => {
      window.cancelAnimationFrame(restoreFrame);
      window.removeEventListener("popstate", syncHistory);
    };
  }, [complaintRegions]);

  const activeRegion =
    complaintRegions.find((region) => region.id === activeRegionId) ?? complaintRegions[0]!;
  const normalizedSearch = normalizeSearch(searchValue);
  const innerTargets = (innerTargetsByRegion[activeRegion.id] ?? []).flatMap((target) => {
    const group = activeRegion.groups.find(group => group.id === target.groupId);
    return group ? [{ ...target, groupLabel: group.label, shortLabel: group.label }] : [];
  });

  const visibleGroups = useMemo<readonly VisibleGroup[]>(() => {
    if (!normalizedSearch) {
      const selectedGroups = activeGroupLabel
        ? activeRegion.groups.filter((group) => group.label === activeGroupLabel)
        : activeRegion.groups;
      const contextualGroups = selectedGroups.length ? selectedGroups : activeRegion.groups;

      return contextualGroups.map((group) => ({
        ...group,
        regionId: activeRegion.id,
        regionLabel: activeRegion.label
      }));
    }

    return complaintRegions.flatMap((region) =>
      region.groups.flatMap((group) => {
        const matchingTopics = group.topics.filter((topic) =>
          normalizeSearch(
            `${region.label} ${group.label} ${topic.title} ${topic.description}`
          ).includes(normalizedSearch)
        );

        return matchingTopics.length
          ? [
              {
                ...group,
                topics: matchingTopics,
                regionId: region.id,
                regionLabel: region.label
              }
            ]
          : [];
      })
    );
  }, [activeGroupLabel, activeRegion, complaintRegions, normalizedSearch]);

  const resultCount = visibleGroups.reduce((count, group) => count + group.topics.length, 0);

  const selectRegion = (regionId: ComplaintRegion["id"]) => {
    if (closingHistoryRef.current) return;
    const currentEntry = readDetailHistory(window.history.state);
    const entry = { regionId, overviewScrollY: currentEntry?.overviewScrollY ?? window.scrollY };
    const state = { ...window.history.state, [detailHistoryKey]: entry };
    // Switching regions stays within one zoom step, so Back always reaches the overview.
    if (currentEntry) window.history.replaceState(state, "");
    else window.history.pushState(state, "");
    detailHistoryRef.current = entry;
    setSearchValue("");
    setActiveGroupLabel(null);
    setActiveRegionId(regionId);
    setDetailActive(true);
  };

  const closeDetail = () => {
    if (closingHistoryRef.current) return;
    setActiveGroupLabel(null);
    setDetailActive(false);
    if (readDetailHistory(window.history.state)) {
      closingHistoryRef.current = true;
      window.history.back();
    }
  };

  const searchComplaints = (value: string) => {
    setSearchValue(value);
    setActiveGroupLabel(null);
    if (value && isDetailActive) {
      restoreOverviewPositionRef.current = false;
      closeDetail();
    }
  };

  useEffect(() => {
    if (!isDetailActive) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDetail();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDetailActive]);

  return (
    <Box component="article" onClick={(event) => {
      if (!isDetailActive || !(event.target instanceof Element)) return;
      // The figure handles its circular hit area; links and form controls retain their own actions.
      if (event.target.closest("figure, a, button, input, textarea, select, [role='button'], [data-detail-control]")) return;
      closeDetail();
    }}>
      <Box
        component="section"
        sx={{
          bgcolor: brandColors.canvas,
          borderBottom: `1px solid ${brandColors.taupe}`
        }}
      >
        <Box
          sx={{
            alignItems: "start",
            display: "grid",
            gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 1.7fr) minmax(0, 1fr)" },
            maxWidth: 1640,
            mx: "auto"
          }}
        >
          <BodyRegionFigure
            activeGroupLabel={activeGroupLabel}
            activeRegion={activeRegion}
            content={content}
            innerTargets={innerTargets}
            isDetailActive={isDetailActive}
            onCloseDetail={closeDetail}
            onSelectGroup={setActiveGroupLabel}
            onSelectRegion={selectRegion}
            regions={complaintRegions}
          />

            <Box component="header" sx={{ gridColumn: { md: 2 }, gridRow: 1, minWidth: 0, px: { xs: 2.5, sm: 4, md: 2.5, lg: 4 }, pt: { xs: 4, md: 8 }, pb: { xs: 2, md: 0 } }}>
              <Eyebrow>{content.eyebrow}</Eyebrow>
              <Typography component="h1" sx={{ fontSize: { xs: "2.3rem", md: "2.75rem", lg: "3.2rem" }, lineHeight: 1.12, maxWidth: 560 }} variant="h1">
                {content.title}
              </Typography>
              <Box aria-hidden="true" sx={{ bgcolor: brandColors.gold, height: 1, my: 2.75, width: 62 }} />
              <Typography color="text.secondary" sx={{ fontSize: "1rem", lineHeight: 1.8 }}>
                {content.lead}
              </Typography>
            </Box>

          <Box sx={{ gridColumn: { md: 2 }, minWidth: 0, px: { xs: 2.5, sm: 4, md: 2.5, lg: 4 }, pb: { xs: 5, md: 6 } }}>
            <TextField
              data-detail-control
              fullWidth
              id="complaint-search"
              label={content.search.label}
              onChange={(event) => searchComplaints(event.target.value)}
              placeholder={content.search.placeholder}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><SearchRoundedIcon /></InputAdornment>,
                  endAdornment: searchValue ? (
                    <InputAdornment position="end">
                      <IconButton aria-label={content.search.clearLabel} edge="end" onClick={() => searchComplaints("")}>
                        <CloseRoundedIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : undefined
                }
              }}
              sx={{ bgcolor: brandColors.white, mt: 3.5, "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
              value={searchValue}
            />

            <Stack aria-label={content.navigation.regionsLabel} component="nav" direction="row" spacing={0.75} sx={{ flexWrap: "wrap", mt: 2, rowGap: 0.75 }}>
              {complaintRegions.map((region) => (
                <Chip
                  clickable
                  color={activeRegion.id === region.id && !searchValue ? "primary" : "default"}
                  key={region.id}
                  label={region.label}
                  onClick={() => selectRegion(region.id)}
                  size="small"
                  sx={{ height: "auto", minHeight: 32, "& .MuiChip-label": { py: 0.65, whiteSpace: "normal" } }}
                  variant={activeRegion.id === region.id && !searchValue ? "filled" : "outlined"}
                />
              ))}
            </Stack>

            <Box aria-live="polite" sx={{ borderTop: `1px solid ${brandColors.taupe}`, mt: 3.5, pt: 3.5 }}>
              <Typography color="secondary.main" component="p" variant="overline">
                {normalizedSearch ? `${resultCount} ${content.search.resultsLabel}` : activeGroupLabel ?? activeRegion.shortLabel}
              </Typography>
              <Typography component="h2" sx={{ fontSize: { xs: "1.85rem", lg: "2.25rem" }, mt: 0.5 }} variant="h2">
                {normalizedSearch ? `${content.search.resultsTitle} „${searchValue.trim()}“` : activeRegion.label}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: "0.97rem", lineHeight: 1.75, mt: 1.5 }}>
                {normalizedSearch ? content.search.resultsDescription : activeRegion.description}
              </Typography>

              {visibleGroups.length ? (
                <Stack spacing={3.5} sx={{ mt: 3 }}>
                  {visibleGroups.map((group) => (
                    <Box key={`${group.regionId}-${group.label}`}>
                      <Typography component="h3" sx={{ fontSize: "1.6rem" }} variant="h3">
                        {normalizedSearch && group.regionLabel !== group.label ? `${group.regionLabel} · ${group.label}` : group.label}
                      </Typography>
                      {group.description ? <Typography color="text.secondary" sx={{ mt: 1 }}>{group.description}</Typography> : null}
                      <Stack spacing={1.5} sx={{ mt: 1.5 }}>
                        {group.topics.map((topic) => <ComplaintCard content={content} key={topic.title} topic={topic} />)}
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              ) : (
                <Box sx={{ bgcolor: brandColors.cream, border: `1px solid ${brandColors.taupe}`, borderRadius: "8px", mt: 3, p: 3 }}>
                  <Typography component="h3" variant="h3">{content.empty.title}</Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>{content.empty.description}</Typography>
                  <Button onClick={() => searchComplaints("")} sx={{ mt: 2 }} variant="outlined">{content.empty.resetLabel}</Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box component="section" sx={{ bgcolor: brandColors.linen, borderBottom: `1px solid ${brandColors.taupe}`, py: { xs: 6, md: 7.5 } }}>
        <Container maxWidth="lg">
          <Box sx={{ alignItems: "center", display: "grid", gap: { xs: 3, md: 5 }, gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) auto" } }}>
            <Box>
              <Eyebrow>{content.cta.eyebrow}</Eyebrow>
              <Typography component="h2" variant="h2">{content.cta.title}</Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.72, mt: 1.75, maxWidth: 760 }}>{content.cta.description}</Typography>
            </Box>
            <Stack direction={{ xs: "column", sm: "row", md: "column" }} spacing={1.25}>
              <Button href="/kontakt" startIcon={<EventAvailableRoundedIcon />} variant="contained">{content.cta.primaryLabel}</Button>
              <Button href="/therapieverfahren" variant="outlined">{content.cta.secondaryLabel}</Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Container component="section" maxWidth="lg" sx={{ py: { xs: 5, md: 6 } }}>
        <Alert severity="info" sx={{ alignItems: "flex-start", borderRadius: "8px" }}>
          <Typography component="strong" sx={{ display: "block", fontWeight: 800 }}>{content.medicalNote.title}</Typography>
          {content.medicalNote.text}
        </Alert>
      </Container>
    </Box>
  );
}
const bubblePositions: Record<ComplaintRegion["id"], { x: number; y: number }> = {
  kopf: { x: 8, y: 18 },
  "seelisch-mental": { x: 61, y: 18 },
  "haut-haare": { x: 4, y: 42 },
  "atemwege-immunsystem": { x: 65, y: 42 },
  bewegungsapparat: { x: 3, y: 65 },
  "magen-darm": { x: 66, y: 65 },
  "frauenheilkunde-unterbauch": { x: 34.5, y: 88 }
};

function BodyRegionFigure({
  activeGroupLabel,
  activeRegion,
  content,
  innerTargets,
  isDetailActive,
  onCloseDetail,
  onSelectGroup,
  onSelectRegion,
  regions
}: {
  activeGroupLabel: string | null;
  activeRegion: ComplaintRegion;
  content: ComplaintsPageContent;
  innerTargets: readonly InnerTarget[];
  isDetailActive: boolean;
  onCloseDetail: () => void;
  onSelectGroup: (groupLabel: string) => void;
  onSelectRegion: (regionId: ComplaintRegion["id"]) => void;
  regions: readonly ComplaintRegion[];
}) {
  return (
    <Box
      component="figure"
      sx={{
        alignSelf: "start",
        gridColumn: { md: 1 },
        gridRow: { md: "1 / span 2" },
        justifySelf: "center",
        m: 0,
        minWidth: 0,
        pb: 2,
        position: "relative",
        "@media (min-width: 900px) and (min-height: 900px)": { position: "sticky", top: 92 },
        width: "100%"
      }}
    >
      <Box
        onClick={(event) => {
          if (!isDetailActive) return;
          const target = event.target;
          if (!(target instanceof Element) || !event.currentTarget.contains(target)) return;
          if (target.closest("button, a, [data-xray-interactive]")) return;

          const lens = event.currentTarget.querySelector<HTMLElement>("[data-xray-lens]");
          if (lens) {
            const bounds = lens.getBoundingClientRect();
            if (bounds.width > 0 && bounds.height > 0) {
              const x = (event.clientX - bounds.left - bounds.width / 2) / (bounds.width / 2);
              const y = (event.clientY - bounds.top - bounds.height / 2) / (bounds.height / 2);
              if (x * x + y * y <= 1) return;
            }
          }
          onCloseDetail();
        }}
        sx={{ alignItems: "center", bgcolor: brandColors.canvas, display: "grid", isolation: "isolate", minHeight: { xs: 580, sm: 0, md: 680 }, "@media (max-width: 359px)": { minHeight: 680 }, overflow: "hidden", position: "relative" }}
      >
        {content.navigation.backgroundImage ? <Box
          alt=""
          aria-hidden="true"
          component="img"
          src={content.navigation.backgroundImage}
          sx={{
            filter: "blur(5px)",
            height: "90%",
            left: "-9%",
            maskImage: "linear-gradient(90deg, #000, transparent 100%), linear-gradient(180deg, transparent, #000 18%, #000 72%, transparent)",
            maskComposite: "intersect",
            objectFit: "cover",
            objectPosition: "left center",
            opacity: isDetailActive ? 0.1 : 0.24,
            pointerEvents: "none",
            position: "absolute",
            top: "7%",
            width: "35%"
          }}
        /> : null}
        <Box
          data-region-figure
          sx={{
            aspectRatio: "2 / 3",
            lineHeight: 0,
            mx: "auto",
            position: "relative",
            width: { xs: "78%", md: "min(78%, max(440px, 54svh))" }
          }}
        >
          {/* Blend the light paper into the canvas without masking the interactive detail layer. */}
          <Box sx={{
            maskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.08) 3%, rgba(0,0,0,0.4) 7%, rgba(0,0,0,0.85) 12%, #000 18%, #000 82%, rgba(0,0,0,0.85) 88%, rgba(0,0,0,0.4) 93%, rgba(0,0,0,0.08) 97%, transparent 100%), linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.15) 4%, rgba(0,0,0,0.75) 10%, #000 16%, #000 88%, rgba(0,0,0,0.75) 92%, rgba(0,0,0,0.15) 97%, transparent 100%)",
            maskComposite: "intersect",
            mixBlendMode: isDetailActive ? "normal" : "darken",
            overflow: "hidden"
          }}>
          <Box
            alt={content.navigation.figureAlt}
            component="img"
            decoding="async"
            src={brandAsset.complaintsBodyPath}
            sx={{
              display: "block",
              filter: isDetailActive ? "grayscale(0.78) sepia(0.3) hue-rotate(88deg) saturate(0.7) brightness(0.72) contrast(1.28)" : "saturate(0.7) brightness(1.12)",
              height: "auto",
              opacity: isDetailActive ? 0.58 : 1,
              transform: isDetailActive ? `scale(${activeRegion.marker.zoomScale})` : "scale(1)",
              transformOrigin: `${activeRegion.marker.targetX}% ${activeRegion.marker.targetY}%`,
              transition: "transform 520ms cubic-bezier(0.2, 0.75, 0.2, 1), filter 420ms ease, opacity 420ms ease",
              width: "100%",
              "@media (prefers-reduced-motion: reduce)": { transition: "none" }
            }}
          />
          </Box>
          {isDetailActive ? (
            <XrayDetailLayer
              activeGroupLabel={activeGroupLabel}
              activeRegion={activeRegion}
              innerTargets={innerTargets}
              onSelectGroup={onSelectGroup}
              selectLabel={content.navigation.selectLabel}
            />
          ) : null}
        </Box>
        {isDetailActive ? (
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", bgcolor: "rgba(255, 253, 248, 0.95)", border: `1px solid ${brandColors.taupe}`, borderRadius: "8px", justifyContent: "space-between", left: "6%", p: 1.25, position: "absolute", right: "6%", top: 16, zIndex: 4 }}
          >
            <Typography sx={{ fontSize: "0.86rem", fontWeight: 800, lineHeight: 1.3 }}>{content.detail.label}: {activeRegion.shortLabel}</Typography>
            <Button onClick={onCloseDetail} size="small" startIcon={<CloseRoundedIcon />} sx={{ flex: "0 0 auto", minHeight: 36 }} variant="outlined">{content.detail.closeLabel}</Button>
          </Stack>
        ) : (
          <>
            <RegionCalloutLines regions={regions} />
            {regions.map((region) => {
              const bubble = content.bubbles.find((item) => item.regionId === region.id);
              const position = bubblePositions[region.id];
              const isActive = activeRegion.id === region.id;
              return (
                <Tooltip arrow key={region.id} title={`${region.label}: ${content.navigation.openDetailLabel}`}>
                  <Box
                    aria-label={`${region.label} ${content.navigation.selectLabel}`}
                    aria-pressed={isActive}
                    component="button"
                    data-region-callout={region.id}
                    onClick={() => onSelectRegion(region.id)}
                    sx={{
                      alignItems: "center",
                      appearance: "none",
                      backdropFilter: "blur(10px)",
                      bgcolor: isActive ? "rgba(238, 238, 223, 0.97)" : "rgba(255, 253, 248, 0.93)",
                      border: `1px solid ${isActive ? brandColors.sage : "rgba(214, 198, 174, 0.5)"}`,
                      borderRadius: "999px",
                      boxShadow: "0 8px 28px rgba(79, 69, 46, 0.09)",
                      color: brandColors.oliveDark,
                      cursor: "pointer",
                      display: "flex",
                      fontFamily: "inherit",
                      gap: { xs: 0.75, sm: 1.25, md: 0.75, lg: 1.25 },
                      left: { xs: region.id === "frauenheilkunde-unterbauch" ? "30.5%" : position.x > 50 ? "58%" : "3%", sm: `${position.x}%`, md: `${position.x + 1}%` },
                      lineHeight: 1.4,
                      minHeight: { xs: 88, sm: 104, md: 100, lg: 108 },
                      p: { xs: "10px 12px", sm: "14px 16px", md: "12px 13px", lg: "14px 18px" },
                      position: "absolute",
                      textAlign: "left",
                      top: `${position.y}%`,
                      transform: "translateY(-50%)",
                      transition: "background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
                      width: { xs: "39%", sm: "31%", md: "29%" },
                      zIndex: 3,
                      "&:hover": { bgcolor: brandColors.white, borderColor: brandColors.olive, boxShadow: "0 10px 30px rgba(79, 69, 46, 0.17)" },
                      "&:focus-visible": { outline: `3px solid ${brandColors.gold}`, outlineOffset: 3 }
                    }}
                    type="button"
                  >
                    <RegionIcon regionId={region.id} />
                    <Box component="span" sx={{ display: "block", minWidth: 0, overflowWrap: "anywhere", hyphens: { xs: "auto", sm: "manual" } }}>
                      <Typography component="span" sx={{ display: "block", fontFamily: "Georgia, serif", fontSize: { xs: "0.88rem", sm: "1.12rem", md: "1.02rem", lg: "1.12rem" }, fontWeight: 600, lineHeight: 1.2 }}>{bubble?.title ?? region.shortLabel}</Typography>
                      <Typography component="span" sx={{ color: brandColors.charcoal, display: "block", fontSize: { xs: "0.66rem", sm: "0.79rem", md: "0.72rem", lg: "0.77rem" }, lineHeight: 1.5, mt: 0.6 }}>{bubble?.examples}</Typography>
                    </Box>
                  </Box>
                </Tooltip>
              );
            })}
          </>
        )}
      </Box>

      <Box component="figcaption" sx={{ mx: "auto", px: 3, textAlign: "center", width: "90%" }}>
        <Typography color="text.secondary" sx={{ fontSize: "0.82rem", lineHeight: 1.65 }}>
          {isDetailActive ? content.detail.caption : content.navigation.figureCaption}
        </Typography>
        {isDetailActive && innerTargets.length ? (
          <Box sx={{ mt: 1.5 }}>
            <Typography color="text.secondary" sx={{ fontSize: "0.73rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }}>{content.detail.innerAreasLabel}</Typography>
            <Stack direction="row" spacing={0.75} sx={{ flexWrap: "wrap", justifyContent: "center", mt: 1, rowGap: 0.75 }}>
              {innerTargets.map((target) => (
                <Chip clickable color={activeGroupLabel === target.groupLabel ? "primary" : "default"} key={target.groupLabel} label={target.shortLabel} onClick={() => onSelectGroup(target.groupLabel)} size="small" variant={activeGroupLabel === target.groupLabel ? "filled" : "outlined"} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

function RegionCalloutLines({ regions }: { regions: readonly ComplaintRegion[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geometry, setGeometry] = useState({ width: 1, height: 1, paths: [] as { id: string; d: string }[] });

  useEffect(() => {
    const stage = svgRef.current?.parentElement;
    const imageFrame = stage?.querySelector<HTMLElement>("[data-region-figure]");
    if (!stage || !imageFrame) return;

    // Both the image and bubbles resize independently; keep connectors in their actual shared frame.
    const measure = () => {
      const bounds = stage.getBoundingClientRect();
      const image = imageFrame.getBoundingClientRect();
      const paths = regions.flatMap((region) => {
        const bubble = stage.querySelector<HTMLElement>(`[data-region-callout="${region.id}"]`)?.getBoundingClientRect();
        if (!bubble) return [];
        const isBottom = region.id === "frauenheilkunde-unterbauch";
        const isLeft = bubblePositions[region.id].x < 30;
        const startX = (isBottom ? bubble.left + bubble.width / 2 : isLeft ? bubble.right - 12 : bubble.left + 12) - bounds.left;
        const startY = (isBottom ? bubble.top + 12 : bubble.top + bubble.height / 2) - bounds.top;
        const targetX = image.left - bounds.left + image.width * region.marker.targetX / 100;
        const targetY = image.top - bounds.top + image.height * region.marker.targetY / 100;
        const controlX = isBottom ? targetX : startX + (targetX - startX) * 0.65;
        return [{ id: region.id, d: `M ${startX} ${startY} Q ${controlX} ${targetY}, ${targetX} ${targetY}` }];
      });
      setGeometry({ width: bounds.width, height: bounds.height, paths });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(imageFrame);
    stage.querySelectorAll("[data-region-callout]").forEach((bubble) => observer.observe(bubble));
    measure();
    return () => observer.disconnect();
  }, [regions]);

  return (
    <Box aria-hidden="true" component="svg" ref={svgRef} preserveAspectRatio="none" sx={{ height: "100%", inset: 0, pointerEvents: "none", position: "absolute", width: "100%", zIndex: 1 }} viewBox={`0 0 ${geometry.width} ${geometry.height}`}>
      {geometry.paths.map(({ id, d }) => <path d={d} fill="none" key={id} stroke={brandColors.sage} strokeDasharray="2 3" strokeLinecap="round" strokeOpacity="0.65" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />)}
    </Box>
  );
}

function RegionIcon({ regionId }: { regionId: ComplaintRegion["id"] }) {
  const iconSx = { alignSelf: "center", color: brandColors.sage, display: { xs: "none", sm: "block", md: "none", lg: "block" }, flex: "0 0 auto", fontSize: { sm: 30, lg: 30 } };
  if (regionId === "magen-darm") {
    return <Box aria-hidden="true" component="svg" fill="none" sx={{ ...iconSx, height: 34, width: 34 }} viewBox="0 0 40 44"><path d="M18 3v10c0 6 4 8 8 6 2-1 3-4 6-4 5 0 7 6 5 12-2 7-8 11-15 11-6 0-8-5-11-5-4 0-5 4-5 8H2c0-8 3-14 9-14 5 0 7 5 10 4 4-1 3-7 0-10-4-4-7-8-7-18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" /></Box>;
  }
  const Icon = regionId === "seelisch-mental" ? PsychologyOutlinedIcon : regionId === "atemwege-immunsystem" ? ShieldOutlinedIcon : regionId === "frauenheilkunde-unterbauch" ? SpaOutlinedIcon : regionId === "bewegungsapparat" ? AccessibilityNewOutlinedIcon : FaceOutlinedIcon;
  return <Icon sx={iconSx} />;
}
function XrayDetailLayer({
  activeGroupLabel,
  activeRegion,
  innerTargets,
  onSelectGroup,
  selectLabel
}: {
  activeGroupLabel: string | null;
  activeRegion: ComplaintRegion;
  innerTargets: readonly InnerTarget[];
  onSelectGroup: (groupLabel: string) => void;
  selectLabel: string;
}) {
  return (
    <Box
      sx={{
        inset: 0,
        position: "absolute"
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          background: `radial-gradient(circle at ${activeRegion.marker.targetX}% ${activeRegion.marker.targetY}%, rgba(214, 231, 219, 0.14) 0%, rgba(38, 56, 32, 0.44) 55%, rgba(22, 40, 34, 0.72) 100%)`,
          inset: 0,
          maskImage: "linear-gradient(90deg, transparent 0%, #000 17%, #000 82%, transparent 100%), linear-gradient(180deg, transparent 0%, #000 14%, #000 83%, transparent 100%)",
          maskComposite: "intersect",
          pointerEvents: "none",
          position: "absolute"
        }}
      />
      <Box
        data-xray-lens
        sx={{
          aspectRatio: "1",
          left: `${activeRegion.marker.targetX}%`,
          overflow: "visible",
          position: "absolute",
          top: `${activeRegion.marker.targetY}%`,
          transform: "translate(-50%, -50%)",
          width: { xs: "66%", sm: "58%" },
          zIndex: 3
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            backdropFilter: "blur(2px) saturate(1.35)",
            background: "radial-gradient(circle, rgba(205, 234, 220, 0.3) 0%, rgba(59, 99, 85, 0.42) 58%, rgba(21, 48, 42, 0.8) 100%)",
            border: "1px solid rgba(235, 246, 238, 0.78)",
            borderRadius: "50%",
            boxShadow: "0 0 0 8px rgba(184, 135, 31, 0.12), 0 18px 48px rgba(15, 37, 31, 0.38), inset 0 0 38px rgba(230, 246, 237, 0.18)",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
            position: "absolute"
          }}
        >
          <XrayIllustration regionId={activeRegion.id} />
        </Box>
        {innerTargets.map((target) => {
          const isActive = activeGroupLabel === target.groupLabel;
          const labelToRight = target.x >= 65;
          const labelAbove = !labelToRight && target.y < 45;

          return (
            <Box
              key={target.groupLabel}
              sx={{
                left: `${target.x}%`,
                position: "absolute",
                top: `${target.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 3
              }}
            >
              <Tooltip arrow title={`${target.groupLabel} ${selectLabel}`}>
                <Box
                  aria-label={`${target.groupLabel} ${selectLabel}`}
                  aria-pressed={isActive}
                  component="button"
                  onClick={() => onSelectGroup(target.groupLabel)}
                  sx={{
                    alignItems: "center",
                    appearance: "none",
                    bgcolor: isActive ? brandColors.gold : "rgba(255, 253, 248, 0.9)",
                    border: `2px solid ${isActive ? brandColors.white : brandColors.goldSoft}`,
                    borderRadius: "50%",
                    boxShadow: "0 4px 16px rgba(12, 33, 28, 0.42)",
                    color: isActive ? brandColors.oliveDark : brandColors.olive,
                    cursor: "pointer",
                    display: "inline-flex",
                    height: 38,
                    justifyContent: "center",
                    p: 0,
                    transition: "transform 160ms ease, background-color 160ms ease",
                    width: 38,
                    "&:hover": { transform: "scale(1.08)" },
                    "&:focus-visible": {
                      outline: `3px solid ${brandColors.white}`,
                      outlineOffset: 3
                    }
                  }}
                  type="button"
                >
                  <Box
                    aria-hidden="true"
                    component="span"
                    sx={{ bgcolor: "currentColor", borderRadius: "50%", height: 9, width: 9 }}
                  />
                </Box>
              </Tooltip>
              <Typography
                component="span"
                data-xray-interactive
                sx={{
                  bgcolor: "rgba(20, 48, 40, 0.88)",
                  borderRadius: "6px",
                  color: brandColors.white,
                  display: "block",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  bottom: labelAbove ? "calc(100% + 5px)" : "auto",
                  left: labelToRight ? "calc(100% + 5px)" : "50%",
                  lineHeight: 1.2,
                  p: "3px 5px",
                  pointerEvents: "auto",
                  position: "absolute",
                  textAlign: "center",
                  top: labelToRight ? "50%" : labelAbove ? "auto" : "calc(100% + 5px)",
                  transform: labelToRight ? "translateY(-50%)" : "translateX(-50%)",
                  maxWidth: { xs: 96, sm: 112 },
                  width: "max-content",
                  whiteSpace: "normal"
                }}
              >
                {target.shortLabel}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

function XrayIllustration({ regionId }: { regionId: ComplaintRegion["id"] }) {
  return (
    <Box
      alt=""
      aria-hidden="true"
      component="img"
      decoding="async"
      loading="lazy"
      src={brandAsset.complaintsXrayPaths[regionId]}
      sx={{
        filter: "saturate(0.9) contrast(1.04)",
        height: "100%",
        inset: 0,
        objectFit: "cover",
        opacity: 0.88,
        position: "absolute",
        width: "100%"
      }}
    />
  );
}

function ComplaintCard({ topic, content }: { topic: ComplaintTopic; content: ComplaintsPageContent }) {
  const linkedTherapies = topic.therapySlugs
    .map((slug) => siteConfig.services.find((service) => service.slug === slug))
    .filter((service): service is (typeof siteConfig.services)[number] => Boolean(service));

  return (
    <Box
      component="article"
      sx={{
        bgcolor: brandColors.canvas,
        border: `1px solid ${brandColors.taupe}`,
        borderLeft: `4px solid ${brandColors.gold}`,
        borderRadius: "8px",
        p: { xs: 2, sm: 2.25 }
      }}
    >
      <Link href={`/beschwerden/${topic.slug}`} sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: "primary.main" } }}>
        <Typography component="h4" sx={{ fontSize: "1.08rem", fontWeight: 800, lineHeight: 1.35 }}>
          {topic.title}
        </Typography>
      </Link>
      <Typography color="text.secondary" sx={{ fontSize: "0.94rem", lineHeight: 1.65, mt: 0.75 }}>
        {topic.description}
      </Typography>
      {topic.careNote ? (
        <Typography sx={{ color: brandColors.olive, fontSize: "0.88rem", fontWeight: 700, lineHeight: 1.55, mt: 1 }}>
          {topic.careNote}
        </Typography>
      ) : null}
      <Link
        href={`/beschwerden/${topic.slug}`}
        sx={{ alignItems: "center", display: "inline-flex", fontSize: "0.9rem", fontWeight: 800, gap: 0.35, mt: 1.5, textDecoration: "none" }}
      >
        {content.cards.detailLinkLabel}
        <ArrowForwardRoundedIcon sx={{ fontSize: "1rem" }} />
      </Link>
      <Typography color="text.secondary" sx={{ fontSize: "0.76rem", fontWeight: 800, letterSpacing: "0.06em", mt: 1.75, textTransform: "uppercase" }}>
        {content.cards.therapiesLabel}
      </Typography>
      <Stack direction="row" spacing={0.75} sx={{ flexWrap: "wrap", mt: 0.75, rowGap: 0.75 }}>
        {linkedTherapies.map((service) => (
          <Link
            href={`/therapieverfahren/${service.slug}`}
            key={service.slug}
            sx={{
              alignItems: "center",
              borderBottom: `1px solid ${brandColors.gold}`,
              color: "primary.main",
              display: "inline-flex",
              fontSize: "0.88rem",
              fontWeight: 800,
              gap: 0.25,
              lineHeight: 1.4,
              py: 0.35,
              textDecoration: "none"
            }}
          >
            {service.title}
            <ArrowForwardRoundedIcon sx={{ fontSize: "1rem" }} />
          </Link>
        ))}
      </Stack>
    </Box>
  );
}

function normalizeSearch(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("de-DE")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}


