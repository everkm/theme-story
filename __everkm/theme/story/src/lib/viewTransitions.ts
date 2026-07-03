import {
  mountClientBlocks,
  teardownClientMounts,
  installMobileNav,
  resetMobileNav,
} from "./clientMounts";
import { carryThemeColorTo, installTheme } from "./theme";
import { installFootnoteBackButton } from "./footnote";
import { updateActiveNav } from "./activeNav";
import { syncBackUrlFromPage, updateBackButton } from "./backButton";
import { installNavbarShrink } from "./navbarShrink";
import { installBannerTyped, teardownBannerTyped } from "./bannerTyped";
import { installScrollTopBottom } from "./scrollTopBottom";
import { installPreloader } from "./preloader";
import { resetHomeBannerBlur } from "./homeBannerBlur";
import { installHomeBannerScroll } from "./homeBannerScroll";
import { installParticles } from "./particles";
import { bootImageViewer, teardownImageViewer } from "./imageViewer";
import { bootAlbumLayout, teardownAlbumLayout } from "./albumLayout";

import { STORY_PAGE_SWAP } from "./events";

function shouldIntercept(anchor: HTMLAnchorElement): boolean {
  if (anchor.classList.contains("story-album-link")) return false;
  if (anchor.classList.contains("story-prose-image-link")) return false;
  if (anchor.target === "_blank") return false;
  if (anchor.hasAttribute("download")) return false;
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:")) return false;
  try {
    const url = new URL(href, window.location.href);
    return url.origin === window.location.origin;
  } catch {
    return false;
  }
}

async function fetchPage(url: string): Promise<Document> {
  const res = await fetch(url, { headers: { "X-Story-VT": "1" } });
  if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  carryThemeColorTo(doc);
  return doc;
}

function getUrlHash(url: string): string {
  try {
    return new URL(url, window.location.href).hash.slice(1);
  } catch {
    const idx = url.indexOf("#");
    return idx >= 0 ? url.slice(idx + 1) : "";
  }
}

function scrollToHash(hash: string): void {
  if (!hash) return;
  let id: string;
  try {
    id = decodeURIComponent(hash);
  } catch {
    id = hash;
  }
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "auto", block: "start" });
  }
}

/** Reset scroll after VT swap: top for plain URLs, target element for hash URLs. */
function scrollAfterNavigation(url: string): void {
  const hash = getUrlHash(url);
  requestAnimationFrame(() => {
    if (hash) {
      scrollToHash(hash);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  });
}

function syncMainShell(
  current: HTMLElement,
  next: HTMLElement,
): void {
  for (const { name, value } of [...next.attributes]) {
    if (name === "id") continue;
    current.setAttribute(name, value);
  }
  for (const { name } of [...current.attributes]) {
    if (name === "id") continue;
    if (!next.hasAttribute(name)) current.removeAttribute(name);
  }
}

/** VT swap targets live outside #main-content; home embeds header/footer inside main. */
function queryVtRegionOutside(root: ParentNode, key: string): Element | null {
  const main = root.querySelector("#main-content");
  for (const el of root.querySelectorAll(`[data-vt-swap="${key}"]`)) {
    if (!main?.contains(el)) return el;
  }
  return null;
}

function removeOrphanedSkipLinkOutsideMain(): void {
  const main = document.querySelector("#main-content");
  const skip = document.querySelector("#skip-to-content");
  if (skip && main && !main.contains(skip)) {
    skip.remove();
  }
}

/** Replace or remove regions marked data-vt-swap (outside #main-content). */
function swapVtRegion(
  doc: Document,
  key: string,
  anchor: Element | null,
): void {
  const next = queryVtRegionOutside(doc, key);
  const current = queryVtRegionOutside(document, key);

  if (next && current) {
    const cloned = next.cloneNode(true) as HTMLElement;
    if (key === "header") {
      const liveSearch = current.querySelector("#header-in-search");
      const clonedSearch = cloned.querySelector("#header-in-search");
      if (liveSearch && clonedSearch) {
        clonedSearch.replaceWith(liveSearch);
      }
    }
    current.replaceWith(cloned);
    return;
  }
  if (next && !current && anchor) {
    anchor.before(next.cloneNode(true));
    return;
  }
  if (!next && current) {
    current.remove();
  }
}

function swapMainContent(doc: Document, url: string): void {
  const nextMain = doc.querySelector("#main-content");
  const currentMain = document.querySelector("#main-content");
  if (!nextMain || !currentMain) {
    window.location.href = url;
    return;
  }

  teardownClientMounts(currentMain);

  const apply = () => {
    swapVtRegion(doc, "header", currentMain);
    swapVtRegion(doc, "page-chrome", currentMain);
    syncMainShell(currentMain as HTMLElement, nextMain as HTMLElement);
    currentMain.innerHTML = nextMain.innerHTML;

    const afterMainAnchor =
      document.querySelector(".right-side-tools-container") ??
      currentMain.nextElementSibling;

    swapVtRegion(doc, "footer", afterMainAnchor);
    swapVtRegion(
      doc,
      "pagination",
      queryVtRegionOutside(document, "footer") ?? afterMainAnchor,
    );
    removeOrphanedSkipLinkOutsideMain();
  };

  const title = doc.querySelector("title")?.textContent;
  if (title) document.title = title;

  if (
    !document.startViewTransition ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    apply();
    history.pushState({}, "", url);
    afterSwap(url);
    return;
  }

  const transition = document.startViewTransition(() => {
    apply();
    history.pushState({}, "", url);
  });
  transition.finished.then(() => afterSwap(url)).catch(() => afterSwap(url));
}

function afterSwap(url: string): void {
  installTheme();
  resetMobileNav();
  installMobileNav();
  installNavbarShrink();
  installScrollTopBottom();
  installBannerTyped();
  installHomeBannerScroll();
  installParticles();
  updateActiveNav();
  updateBackButton();
  const main = document.querySelector("#main-content");
  if (main) mountClientBlocks(main);
  scrollAfterNavigation(url);
  document.dispatchEvent(new CustomEvent(STORY_PAGE_SWAP));
}

function onClick(e: MouseEvent): void {
  const anchor = (e.target as Element)?.closest?.("a");
  if (!(anchor instanceof HTMLAnchorElement)) return;
  if (!shouldIntercept(anchor)) return;
  e.preventDefault();
  syncBackUrlFromPage();
  const url = anchor.href;
  fetchPage(url)
    .then((doc) => swapMainContent(doc, url))
    .catch(() => {
      window.location.href = url;
    });
}

export function installViewTransitions(): void {
  if ((window as any).__everkm_features_view_transitions === false) return;

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  document.addEventListener("click", onClick);
  window.addEventListener("popstate", () => {
    fetchPage(window.location.href)
      .then((doc) => swapMainContent(doc, window.location.href))
      .catch(() => window.location.reload());
  });
}

export function bootClient(): void {
  installPreloader();
  installTheme();
  installViewTransitions();
  installMobileNav();
  installNavbarShrink();
  installScrollTopBottom();
  installBannerTyped();
  installHomeBannerScroll();
  installParticles();
  void bootAlbumLayout().then(() => bootImageViewer());
  updateActiveNav();
  mountClientBlocks();
  installFootnoteBackButton("#article");
  syncBackUrlFromPage();
  updateBackButton();

  document.addEventListener(STORY_PAGE_SWAP, () => {
    syncBackUrlFromPage();
    updateBackButton();
    updateActiveNav();
    resetMobileNav();
    teardownBannerTyped();
    installBannerTyped();
    installScrollTopBottom();
    resetHomeBannerBlur();
    installNavbarShrink();
    teardownImageViewer();
    teardownAlbumLayout();
    void bootAlbumLayout().then(() => bootImageViewer());
  });
}
