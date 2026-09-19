import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, IconButton, Stack } from "@mui/material";

import { TherapyCard, type TherapyCardService } from "@/components/therapy-card";
import { brandColors } from "@/theme/brand";

type TherapyCarouselProps = {
  services: readonly TherapyCardService[];
  label: string;
};

export function TherapyCarousel({ services, label }: TherapyCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const trackId = useId();
  const [navigation, setNavigation] = useState({ previous: false, next: false });
  const hasOverflow = navigation.previous || navigation.next;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateNavigation = () => {
      const maximum = track.scrollWidth - track.clientWidth;
      const previous = track.scrollLeft > 1;
      const next = maximum - track.scrollLeft > 1;
      setNavigation((current) => current.previous === previous && current.next === next ? current : { previous, next });
    };

    const handleWheel = (event: WheelEvent) => {
      // Keep browser zoom and native horizontal/shift-wheel gestures untouched.
      if (event.ctrlKey || event.metaKey || event.shiftKey || !event.deltaY || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const maximum = track.scrollWidth - track.clientWidth;
      const available = event.deltaY > 0 ? maximum - track.scrollLeft : track.scrollLeft;
      if (available <= 1 || maximum <= 1) return;

      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? track.clientWidth : 1;
      if (!event.cancelable) return;
      event.preventDefault();
      track.scrollLeft = Math.max(0, Math.min(maximum, track.scrollLeft + event.deltaY * unit));
    };

    updateNavigation();
    const observer = new ResizeObserver(updateNavigation);
    observer.observe(track);
    track.addEventListener("scroll", updateNavigation, { passive: true });
    track.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", updateNavigation);
      track.removeEventListener("wheel", handleWheel);
    };
  }, [services]);

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * Math.max(280, track.clientWidth * 0.85),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.target !== event.currentTarget || event.ctrlKey || event.metaKey || event.altKey || !hasOverflow) return;
    if (event.key === "ArrowRight" && navigation.next) {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowLeft" && navigation.previous) {
      event.preventDefault();
      move(-1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const track = event.currentTarget;
      track.scrollTo({ left: event.key === "Home" ? 0 : track.scrollWidth, behavior: "instant" });
    }
  };

  if (!services.length) return null;

  return (
    <Box sx={{ minWidth: 0, mt: 2.5 }}>
      <Box
        aria-label={label}
        component="ul"
        data-therapy-carousel="true"
        id={trackId}
        onKeyDown={handleKeyDown}
        ref={trackRef}
        tabIndex={hasOverflow ? 0 : undefined}
        sx={{
          display: "grid",
          gap: 3,
          gridAutoColumns: services.length === 1 ? "min(100%, 420px)" : { xs: "min(86%, 360px)", sm: "max(280px, calc((100% - 24px) / 2))" },
          gridAutoFlow: "column",
          listStyle: "none",
          m: 0,
          overflowX: "auto",
          overscrollBehaviorX: "contain",
          p: 0,
          pb: 2.5,
          pt: 0.5,
          scrollbarColor: `${brandColors.sage} ${brandColors.linen}`,
          scrollbarWidth: "thin",
          "&:focus-visible": { outline: `3px solid ${brandColors.gold}`, outlineOffset: 3, borderRadius: "8px" }
        }}
      >
        {services.map((service) => (
          <Box component="li" key={service.slug} sx={{ minWidth: 0 }}>
            <TherapyCard headingComponent="h3" service={service} />
          </Box>
        ))}
      </Box>
      {services.length > 1 ? (
        <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end", mt: 1, visibility: hasOverflow ? "visible" : "hidden" }}>
          <IconButton aria-controls={trackId} aria-label="Vorherige Verfahren" disabled={!navigation.previous} onClick={() => move(-1)} sx={{ border: `1px solid ${brandColors.taupe}`, height: 44, width: 44 }}>
            <ArrowBackRoundedIcon />
          </IconButton>
          <IconButton aria-controls={trackId} aria-label="Weitere Verfahren" disabled={!navigation.next} onClick={() => move(1)} sx={{ border: `1px solid ${brandColors.taupe}`, height: 44, width: 44 }}>
            <ArrowForwardRoundedIcon />
          </IconButton>
        </Stack>
      ) : null}
    </Box>
  );
}
