// Lightweight scroll-reveal animation used across all pages.
// Theme choice is shared by all pages. Storage failures do not block toggling.
const themeToggle = document.querySelector(".theme-toggle");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
let explicitTheme = false;
try { explicitTheme = ["light", "dark"].includes(localStorage.getItem("portfolio-theme")); } catch (_) {}
function updateThemeButton() {
  if (!themeToggle) return;
  const dark = document.documentElement.dataset.theme === "dark";
  const label = `Switch to ${dark ? "light" : "dark"} mode`;
  themeToggle.setAttribute("aria-label", label);
  themeToggle.title = label;
  // CSS switches the monochrome SVG icon to match the active theme.
}
themeToggle?.addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  explicitTheme = true;
  try { localStorage.setItem("portfolio-theme", theme); } catch (_) {}
  updateThemeButton();
});
systemTheme.addEventListener("change", (event) => {
  if (!explicitTheme) {
    document.documentElement.dataset.theme = event.matches ? "dark" : "light";
    updateThemeButton();
  }
});
updateThemeButton();

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}
