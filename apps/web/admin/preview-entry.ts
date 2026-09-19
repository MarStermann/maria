if (import.meta.env.DEV || import.meta.env.VITE_CMS_MODE === "server") {
  void import("./preview-app");
} else {
  document.getElementById("root")!.textContent = "Diese Vorschau ist nur in der lokalen Redaktion verfügbar.";
}
