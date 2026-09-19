import { Box } from "@mui/material";
import { brandAsset } from "@/theme/brand";

export function ArticleImage({ src, alt, loading = "lazy", position = "center", scale = 1 }: { src: string; alt: string; loading?: "eager" | "lazy"; position?: string; scale?: number }) {
  return <Box component="img" src={src || brandAsset.leftStillLifePath} alt={src ? alt : ""}
    loading={loading} decoding="async"
    onError={event => {
      const image = event.currentTarget;
      if (image.dataset.fallbackApplied) return;
      image.dataset.fallbackApplied = "true";
      image.alt = "";
      image.src = brandAsset.leftStillLifePath;
    }}
    sx={{ display: "block", width: "100%", aspectRatio: "16 / 10", objectFit: "cover", objectPosition: position, transform: `scale(${Math.max(1, Math.min(2, scale))})`, transformOrigin: position, bgcolor: "background.default" }} />;
}
