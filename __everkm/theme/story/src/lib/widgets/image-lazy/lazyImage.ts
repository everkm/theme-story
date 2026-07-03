import { STORY_PAGE_SWAP } from "../../events";
import {
  IMAGE_PLACEHOLDER_DEFAULT_HEIGHT,
  IMAGE_PLACEHOLDER_DEFAULT_WIDTH,
  imagePlaceholderSvg,
} from "../../imagePlaceholder";

type CleanupFn = (() => void) | null;

function loadLazyImage(image: HTMLImageElement, attr = "data-src"): void {
  const src = image.getAttribute(attr);
  if (!src) return;

  image.onload = () => {
    image.removeAttribute(attr);
    image.classList.remove("story-lazy-img--pending");
  };
  image.onerror = () => {
    image.setAttribute(
      "src",
      imagePlaceholderSvg({
        text: "Image loading failed",
        width:
          parseInt(image.getAttribute("width") || "0", 10) ||
          IMAGE_PLACEHOLDER_DEFAULT_WIDTH,
        height:
          parseInt(image.getAttribute("height") || "0", 10) ||
          IMAGE_PLACEHOLDER_DEFAULT_HEIGHT,
      }),
    );
    image.removeAttribute(attr);
    image.classList.remove("story-lazy-img--pending");
  };

  image.classList.add("story-lazy-img--pending");
  image.src = src;
}

export function setupLazyImg(
  container: HTMLElement,
  attr = "data-src",
): CleanupFn {
  const observer = new IntersectionObserver((items) => {
    for (const item of items) {
      if (!item.isIntersecting) continue;
      loadLazyImage(item.target as HTMLImageElement, attr);
      observer.unobserve(item.target);
    }
  });

  const images = container.querySelectorAll<HTMLImageElement>(`img[${attr}]`);
  for (const image of images) {
    observer.observe(image);
  }

  return () => observer.disconnect();
}

export function installLazyImg(containerSelector: string): void {
  let currentCleanup: CleanupFn = null;

  const cleanup = () => {
    currentCleanup?.();
    currentCleanup = null;
  };

  const setup = () => {
    cleanup();
    const container = document.querySelector<HTMLElement>(containerSelector);
    if (!container) return;
    currentCleanup = setupLazyImg(container);
  };

  if (document.readyState !== "loading") {
    setup();
  } else {
    document.addEventListener("DOMContentLoaded", setup, { once: true });
  }

  document.addEventListener(STORY_PAGE_SWAP, setup);
}
