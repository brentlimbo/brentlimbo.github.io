// Apply the saved preference before the page paints to avoid a theme flash.
(() => {
  let theme;
  try { theme = localStorage.getItem("portfolio-theme"); } catch (_) {}
  if (theme !== "light" && theme !== "dark") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.dataset.theme = theme;
})();
