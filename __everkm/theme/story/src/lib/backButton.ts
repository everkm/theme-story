/** Sync sessionStorage.backUrl from current page (Astro Paper Main / index / search). */
export function syncBackUrlFromPage(): void {
  const main = document.querySelector<HTMLElement>("#main-content");
  if (!main) return;

  // Post detail is never a back target; keep the list/home URL from the prior page.
  if (main.dataset.layout === "post") return;

  // Use the live URL — avoids SSR base_url / lang prefix miscalculation.
  sessionStorage.setItem("backUrl", window.location.pathname);
}

export function updateBackButton(): void {
  const btn = document.querySelector<HTMLAnchorElement>("#back-button");
  const backUrl = sessionStorage.getItem("backUrl");
  if (btn && backUrl) {
    btn.href = backUrl;
  }
}

/** @deprecated use syncBackUrlFromPage */
export function rememberBackUrlFromHome(): void {
  syncBackUrlFromPage();
}
