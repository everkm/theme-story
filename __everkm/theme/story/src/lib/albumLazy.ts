import {
  IMAGE_PLACEHOLDER_DEFAULT_HEIGHT,
  IMAGE_PLACEHOLDER_DEFAULT_WIDTH,
  imagePlaceholderSvg,
} from "./imagePlaceholder";

type CleanupFn = (() => void) | null;

let albumCleanup: CleanupFn = null;

function loadAlbumImage(
  image: HTMLImageElement,
  onImageLoaded?: () => void,
): void {
  const src = image.getAttribute("data-src");
  if (!src) return;

  const notify = () => {
    image.removeAttribute("data-src");
    image.classList.remove("story-album-img--pending");
    onImageLoaded?.();
  };

  image.onload = notify;
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
    notify();
  };

  image.classList.add("story-album-img--pending");
  image.src = src;
}

export function setupAlbumLazy(
  container: HTMLElement,
  onImageLoaded?: () => void,
): CleanupFn {
  const observer = new IntersectionObserver((items) => {
    for (const item of items) {
      if (!item.isIntersecting) continue;
      loadAlbumImage(item.target as HTMLImageElement, onImageLoaded);
      observer.unobserve(item.target);
    }
  });

  const images = container.querySelectorAll<HTMLImageElement>(
    "img.story-album-img[data-src]",
  );
  for (const image of images) {
    observer.observe(image);
  }

  return () => observer.disconnect();
}

export function teardownAlbumLazy(): void {
  albumCleanup?.();
  albumCleanup = null;
}

export function bootAlbumLazy(
  container: HTMLElement,
  onImageLoaded?: () => void,
): void {
  teardownAlbumLazy();
  albumCleanup = setupAlbumLazy(container, onImageLoaded);
}
