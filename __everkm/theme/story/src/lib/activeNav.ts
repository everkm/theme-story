import { currentNavPathFromBrowser, isActivePath } from "./url";

/** Sync header nav active markers after VT (header is not re-rendered). */
export function updateActiveNav(): void {
  const current = currentNavPathFromBrowser();

  document.querySelectorAll<HTMLElement>("[data-nav-path]").forEach((el) => {
    const target = el.dataset.navPath;
    if (!target) return;
    const active = isActivePath(current, target);
    const isIcon = el.hasAttribute("data-nav-icon");
    if (!isIcon) {
      el.classList.toggle("active-nav", active);
    } else {
      el.classList.toggle("max-sm:underline", active);
      el.classList.toggle("max-sm:decoration-wavy", active);
      el.classList.toggle("max-sm:decoration-2", active);
      el.classList.toggle("max-sm:underline-offset-8", active);
    }
    el.querySelectorAll<HTMLElement>("[data-nav-active-icon]").forEach((icon) => {
      icon.classList.toggle("hidden", !active);
    });
  });
}
