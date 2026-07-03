import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

type GalleryConfig = {
  id: string;
  gallery: string;
  children: string;
};

const GALLERIES: GalleryConfig[] = [
  {
    id: "album",
    gallery: "#masonry-container",
    children: "a.story-album-link",
  },
  {
    id: "prose",
    gallery: "#main-content",
    children: ".app-prose a.story-prose-image-link",
  },
];

const lightboxes = new Map<string, PhotoSwipeLightbox>();

const IMAGE_URL_RE = /\.(avif|gif|jpe?g|png|svg|webp)(\?|$)/i;

function isImageUrl(url: string): boolean {
  try {
    const pathname = new URL(url, window.location.href).pathname;
    return IMAGE_URL_RE.test(pathname);
  } catch {
    return false;
  }
}

function isProseImageCandidate(img: HTMLImageElement): boolean {
  if (img.closest("#masonry-container")) return false;
  if (img.closest(".article-hero")) return false;
  if (img.closest(".article-header__avatar")) return false;
  if (img.closest("a.story-album-link")) return false;
  return true;
}

function prepareProseImages(): void {
  for (const img of document.querySelectorAll<HTMLImageElement>(
    "#main-content .app-prose img",
  )) {
    if (img.dataset.storyImageViewer === "1") continue;
    if (!isProseImageCandidate(img)) continue;

    const parentLink = img.closest("a");
    if (parentLink?.classList.contains("story-prose-image-link")) {
      img.dataset.storyImageViewer = "1";
      continue;
    }

    if (parentLink) {
      if (!isImageUrl(parentLink.href)) continue;
      parentLink.classList.add("story-prose-image-link");
      img.dataset.storyImageViewer = "1";
      continue;
    }

    const link = document.createElement("a");
    link.href = img.currentSrc || img.src;
    link.className = "story-prose-image-link";
    link.setAttribute("aria-label", img.alt || "View image");
    img.parentNode?.insertBefore(link, img);
    link.appendChild(img);
    img.dataset.storyImageViewer = "1";
  }
}

function syncLinkDimensions(root: ParentNode, selector: string): void {
  for (const link of root.querySelectorAll<HTMLAnchorElement>(selector)) {
    if (link.dataset.pswpWidth && link.dataset.pswpHeight) continue;

    const img = link.querySelector("img");
    if (!img || img.naturalWidth <= 0 || img.naturalHeight <= 0) continue;

    link.dataset.pswpWidth = String(img.naturalWidth);
    link.dataset.pswpHeight = String(img.naturalHeight);
  }
}

function syncGalleryDimensions(config: GalleryConfig): void {
  const gallery = document.querySelector(config.gallery);
  if (!gallery) return;
  syncLinkDimensions(gallery, config.children);
}

function registerCaption(instance: PhotoSwipeLightbox): void {
  instance.on("uiRegister", () => {
    instance.pswp?.ui.registerElement({
      name: "story-image-caption",
      order: 9,
      isButton: false,
      appendTo: "root",
      html: "",
      onInit: (el) => {
        el.classList.add("pswp__story-album-caption");
        instance.pswp?.on("change", () => {
          const slideEl = instance.pswp?.currSlide?.data.element as
            | HTMLElement
            | undefined;
          if (!slideEl) {
            el.textContent = "";
            return;
          }

          const hidden = slideEl.querySelector(".hidden-caption-content");
          if (hidden) {
            el.innerHTML = hidden.innerHTML;
            return;
          }

          const figcaption = slideEl
            .closest("figure")
            ?.querySelector("figcaption");
          if (figcaption?.textContent?.trim()) {
            el.textContent = figcaption.textContent.trim();
            return;
          }

          const alt = slideEl.querySelector("img")?.getAttribute("alt")?.trim();
          el.textContent = alt ?? "";
        });
      },
    });
  });
}

function createLightbox(config: GalleryConfig): PhotoSwipeLightbox {
  const instance = new PhotoSwipeLightbox({
    gallery: config.gallery,
    children: config.children,
    pswpModule: () => import("photoswipe"),
    bgOpacity: 0.92,
    loop: true,
    arrowKeys: true,
    escKey: true,
  });
  registerCaption(instance);
  return instance;
}

export function teardownImageViewer(): void {
  for (const instance of lightboxes.values()) {
    instance.destroy();
  }
  lightboxes.clear();
}

export function bootImageViewer(): void {
  prepareProseImages();

  for (const config of GALLERIES) {
    syncGalleryDimensions(config);
  }

  teardownImageViewer();

  for (const config of GALLERIES) {
    const gallery = document.querySelector(config.gallery);
    if (!gallery?.querySelector(config.children)) continue;

    const instance = createLightbox(config);
    instance.init();
    lightboxes.set(config.id, instance);
  }
}
