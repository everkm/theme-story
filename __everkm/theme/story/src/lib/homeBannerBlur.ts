export function updateHomeBannerBlur(): void {
  const bg = document.querySelector<HTMLElement>(".home-banner-background");
  if (!bg) return;

  const main = document.querySelector<HTMLElement>("#main-content");
  const isBackgroundOnly = main?.classList.contains(
    "story-page-home--banner-background-only",
  );
  if (isBackgroundOnly) {
    bg.style.filter = "blur(15px)";
    bg.style.webkitFilter = "blur(15px)";
    return;
  }

  const isFixedHome =
    main?.classList.contains("story-page-home--fixed-banner") ?? false;
  if (!isFixedHome) {
    bg.style.filter = "";
    bg.style.webkitFilter = "";
    return;
  }

  const scrollY = window.scrollY;
  const threshold = window.innerHeight * 0.5;
  const blurPx = scrollY >= threshold ? 15 : 0;
  const value = blurPx > 0 ? `blur(${blurPx}px)` : "";
  bg.style.filter = value;
  bg.style.webkitFilter = value;
}

export function resetHomeBannerBlur(): void {
  const bg = document.querySelector<HTMLElement>(".home-banner-background");
  if (!bg) return;
  bg.style.filter = "";
  bg.style.webkitFilter = "";
}
