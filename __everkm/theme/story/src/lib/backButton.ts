/** Sync sessionStorage.backUrl from current page (Astro Paper Main / index / search). */
export function syncBackUrlFromPage(): void {
  const main = document.querySelector<HTMLElement>("#main-content");
  if (!main) return;

  if (main.dataset.layout === "home") {
    sessionStorage.setItem(
      "backUrl",
      main.dataset.homePath ?? window.location.pathname,
    );
    return;
  }

  const backUrl = main.dataset.backurl;
  if (backUrl) {
    sessionStorage.setItem("backUrl", backUrl);
  }
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
