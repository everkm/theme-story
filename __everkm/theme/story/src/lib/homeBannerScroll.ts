export function installHomeBannerScroll(): void {
  if (document.documentElement.dataset.homeBannerScrollBound === "1") return;
  document.documentElement.dataset.homeBannerScrollBound = "1";

  document.addEventListener("click", (event) => {
    const target = (event.target as Element | null)?.closest?.(
      ".home-banner-container__scroll-btn",
    );
    if (!target) return;

    document.querySelector(".main-content-container")?.scrollIntoView({
      behavior: "smooth",
    });
  });
}
