import { updateHomeBannerBlur } from "./homeBannerBlur";

let lastScrollY = 0;
let bound = false;

function readAutoHideEnabled(): boolean {
  return document.body.dataset.navbarAutoHide !== "false";
}

function updateNavbarShrink(): void {
  const scrollTop = window.scrollY;
  const navbar = document.querySelector(".navbar-container");
  const homeHeader = document.querySelector(".story-page-home .main-content-header");
  const navbarHeight =
    (navbar?.getBoundingClientRect().height ??
      Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--story-navbar-height",
        ),
      )) ||
    70;

  document.body.classList.toggle("navbar-shrink", scrollTop > navbarHeight);

  if (readAutoHideEnabled()) {
    const hideTarget = (homeHeader ?? navbar) as HTMLElement | null;
    if (hideTarget) {
      const scrollingDown = scrollTop > lastScrollY && scrollTop > navbarHeight;
      hideTarget.classList.toggle("hide", scrollingDown);
      if (!scrollingDown || scrollTop <= navbarHeight) {
        hideTarget.classList.remove("hide");
      }
    }
  }

  lastScrollY = scrollTop;
  updateHomeBannerBlur();
}

export function installNavbarShrink(): void {
  if (!bound) {
    bound = true;
    lastScrollY = window.scrollY;

    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          updateNavbarShrink();
          ticking = false;
        });
      },
      { passive: true },
    );
  }

  lastScrollY = window.scrollY;
  for (const el of document.querySelectorAll(
    ".navbar-container--page.hide, .story-page-home .main-content-header.hide",
  )) {
    el.classList.remove("hide");
  }
  updateNavbarShrink();
}
