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

let masonryInstance: MiniMasonryInstance | null = null;
let scriptPromise: Promise<void> | null = null;

const IMAGE_WAIT_MS = 8000;

function vendorScriptUrl(): string {
  const fromDom = document
    .querySelector("#masonry-container")
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
      'script[data-story-masonry="1"]',
    );
    if (existing) {
      if (existing.dataset.loaded === "1") {
        finish();
        return;
      }
      existing.addEventListener("load", () => {
        existing.dataset.loaded = "1";
        finish();
      }, { once: true });
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
    script.dataset.storyMasonry = "1";
    script.onload = () => {
      script.dataset.loaded = "1";
      finish();
    };
    script.onerror = () => reject(new Error("MiniMasonry load failed"));
    document.body.appendChild(script);
  });

  return scriptPromise;
}

export function teardownMasonryLayout(): void {
  masonryInstance?.destroy();
  masonryInstance = null;
}

function waitForMasonryImages(container: HTMLElement): Promise<void> {
  const images = container.querySelectorAll<HTMLImageElement>(".masonry-item img");
  if (images.length === 0) return Promise.resolve();

  return new Promise((resolve) => {
    let settled = 0;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };

    const onImageSettled = () => {
      settled += 1;
      if (settled >= images.length) finish();
    };

    const timeout = window.setTimeout(finish, IMAGE_WAIT_MS);

    for (const img of images) {
      if (img.complete) {
        onImageSettled();
      } else {
        img.addEventListener("load", onImageSettled, { once: true });
        img.addEventListener("error", onImageSettled, { once: true });
      }
    }

    if (settled >= images.length) {
      window.clearTimeout(timeout);
      finish();
    }
  });
}

function revealMasonryLayout(
  loadingPlaceholder: HTMLElement,
  masonryContainer: HTMLElement,
): void {
  loadingPlaceholder.style.opacity = "0";
  window.setTimeout(() => {
    loadingPlaceholder.style.display = "none";
    masonryContainer.classList.remove("is-preload");
    masonryContainer.style.display = "block";
    masonryContainer.style.visibility = "visible";

    const MiniMasonry = window.MiniMasonry;
    if (!MiniMasonry) {
      masonryContainer.style.opacity = "1";
      return;
    }

    teardownMasonryLayout();
    const baseWidth = window.innerWidth >= 768 ? 255 : 150;
    masonryInstance = new MiniMasonry({
      baseWidth,
      container: masonryContainer,
      gutterX: 10,
      gutterY: 10,
      surroundingGutter: false,
    });
    masonryInstance.layout();
    masonryContainer.style.opacity = "1";
  }, 100);
}

export async function bootMasonryLayout(): Promise<void> {
  const loadingPlaceholder = document.querySelector<HTMLElement>(
    ".page-template-container .loading-placeholder",
  );
  const masonryContainer = document.querySelector<HTMLElement>("#masonry-container");
  if (!loadingPlaceholder || !masonryContainer) {
    teardownMasonryLayout();
    return;
  }

  loadingPlaceholder.style.display = "block";
  loadingPlaceholder.style.opacity = "1";
  masonryContainer.classList.add("is-preload");
  masonryContainer.style.display = "block";
  masonryContainer.style.opacity = "0";

  try {
    await Promise.all([
      loadMiniMasonryScript(),
      waitForMasonryImages(masonryContainer),
    ]);
    revealMasonryLayout(loadingPlaceholder, masonryContainer);
  } catch (error) {
    console.error("[story] masonry layout failed:", error);
    revealMasonryLayout(loadingPlaceholder, masonryContainer);
  }
}
