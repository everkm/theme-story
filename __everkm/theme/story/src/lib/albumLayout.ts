import { bootAlbumLazy, teardownAlbumLazy } from "./albumLazy";

type MiniMasonryInstance = {
  layout: () => void;
  destroy: () => void;
};

type MiniMasonryCtor = new (options: {
  baseWidth: number;
  container: HTMLElement;
  gutterX: number;
  gutterY: number;
  surroundingGutter: boolean;
}) => MiniMasonryInstance;

declare global {
  interface Window {
    MiniMasonry?: MiniMasonryCtor;
  }
}

let layoutInstance: MiniMasonryInstance | null = null;
let scriptPromise: Promise<void> | null = null;

function vendorScriptUrl(): string {
  const fromDom = document
    .querySelector("#album-container")
    ?.getAttribute("data-vendor-script");
  if (fromDom) return fromDom;

  const base = window.__everkm_base_url ?? "/";
  return `${base}assets/vendor/minimasonry.min.js`;
}

function loadMiniMasonryScript(): Promise<void> {
  if (window.MiniMasonry) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const finish = () => {
      if (window.MiniMasonry) {
        resolve();
        return;
      }
      reject(new Error("MiniMasonry global missing after script load"));
    };

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-story-album="1"]',
    );
    if (existing) {
      if (existing.dataset.loaded === "1") {
        finish();
        return;
      }
      existing.addEventListener(
        "load",
        () => {
          existing.dataset.loaded = "1";
          finish();
        },
        { once: true },
      );
      existing.addEventListener(
        "error",
        () => reject(new Error("MiniMasonry load failed")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = vendorScriptUrl();
    script.defer = true;
    script.dataset.storyAlbum = "1";
    script.onload = () => {
      script.dataset.loaded = "1";
      finish();
    };
    script.onerror = () => reject(new Error("MiniMasonry load failed"));
    document.body.appendChild(script);
  });

  return scriptPromise;
}

export function teardownAlbumLayout(): void {
  teardownAlbumLazy();
  layoutInstance?.destroy();
  layoutInstance = null;
}

function relayoutAlbum(): void {
  layoutInstance?.layout();
}

function revealAlbumLayout(
  loadingPlaceholder: HTMLElement,
  albumContainer: HTMLElement,
): void {
  loadingPlaceholder.style.opacity = "0";
  window.setTimeout(() => {
    loadingPlaceholder.style.display = "none";
    albumContainer.classList.remove("is-preload");
    albumContainer.style.display = "block";
    albumContainer.style.visibility = "visible";

    const MiniMasonry = window.MiniMasonry;
    if (!MiniMasonry) {
      albumContainer.style.opacity = "1";
      bootAlbumLazy(albumContainer, relayoutAlbum);
      return;
    }

    teardownAlbumLayout();
    const baseWidth = window.innerWidth >= 768 ? 255 : 150;
    layoutInstance = new MiniMasonry({
      baseWidth,
      container: albumContainer,
      gutterX: 10,
      gutterY: 10,
      surroundingGutter: false,
    });
    layoutInstance.layout();
    albumContainer.style.opacity = "1";
    bootAlbumLazy(albumContainer, relayoutAlbum);
  }, 100);
}

export async function bootAlbumLayout(): Promise<void> {
  const loadingPlaceholder = document.querySelector<HTMLElement>(
    ".page-template-container .loading-placeholder",
  );
  const albumContainer = document.querySelector<HTMLElement>("#album-container");
  if (!loadingPlaceholder || !albumContainer) {
    teardownAlbumLayout();
    return;
  }

  loadingPlaceholder.style.display = "block";
  loadingPlaceholder.style.opacity = "1";
  albumContainer.classList.add("is-preload");
  albumContainer.style.display = "block";
  albumContainer.style.opacity = "0";

  try {
    await loadMiniMasonryScript();
    revealAlbumLayout(loadingPlaceholder, albumContainer);
  } catch (error) {
    console.error("[story] album layout failed:", error);
    revealAlbumLayout(loadingPlaceholder, albumContainer);
  }
}
