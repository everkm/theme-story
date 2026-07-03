const FONT_SIZE_LEVEL_KEY = "story-font-size-level";

let bound = false;
let scrollHandler: (() => void) | null = null;
let fontSizeLevel = 0;
let baseFontSize = 0;

function readScrollBarEnabled(): boolean {
  return document.body.dataset.scrollProgressBar === "true";
}

function calcPercent(scrollTop: number, scrollHeight: number, clientHeight: number): number {
  const denom = scrollHeight - clientHeight;
  if (denom <= 0) return 0;
  const value = Math.round((scrollTop / denom) * 100);
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.min(value, 100);
}

function readStoredFontSizeLevel(): number {
  try {
    const raw = localStorage.getItem(FONT_SIZE_LEVEL_KEY);
    if (raw == null) return 0;
    const level = Number.parseInt(raw, 10);
    return Number.isFinite(level) ? Math.min(Math.max(level, 0), 5) : 0;
  } catch {
    return 0;
  }
}

function persistFontSizeLevel(level: number): void {
  try {
    localStorage.setItem(FONT_SIZE_LEVEL_KEY, String(level));
  } catch {
    // ignore storage failures
  }
}

function applyFontSizeLevel(level: number): void {
  fontSizeLevel = Math.min(Math.max(level, 0), 5);
  if (baseFontSize <= 0) {
    const fontSize = getComputedStyle(document.body).fontSize;
    baseFontSize = Number.parseFloat(fontSize) || 16;
  }
  document.documentElement.style.fontSize = `${baseFontSize * (1 + fontSizeLevel * 0.05)}px`;
  persistFontSizeLevel(fontSizeLevel);
}

function bindFontAdjustControls(): void {
  const plus = document.querySelector<HTMLElement>(".tool-font-adjust-plus");
  const minus = document.querySelector<HTMLElement>(".tool-font-adjust-minus");
  if (!plus || !minus) return;

  if (plus.dataset.bound !== "1") {
    plus.dataset.bound = "1";
    plus.addEventListener("click", () => {
      applyFontSizeLevel(fontSizeLevel + 1);
    });
  }

  if (minus.dataset.bound !== "1") {
    minus.dataset.bound = "1";
    minus.addEventListener("click", () => {
      applyFontSizeLevel(fontSizeLevel - 1);
    });
  }

  applyFontSizeLevel(readStoredFontSizeLevel());
}

function updateScrollUi(): void {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = window.innerHeight;
  const percent = calcPercent(scrollTop, scrollHeight, clientHeight);
  const bar = readScrollBarEnabled();

  const progressBar = document.querySelector<HTMLElement>(".scroll-progress-bar");
  if (progressBar && bar) {
    progressBar.style.visibility = percent === 0 ? "hidden" : "visible";
    progressBar.style.width = `${percent}%`;
  }

  const backToTop = document.querySelector<HTMLElement>(".tool-scroll-to-top");
  if (backToTop) {
    backToTop.classList.toggle("show", scrollTop > 0);
    backToTop.style.setProperty("--scroll-progress", String(percent / 100));
    backToTop.setAttribute("aria-valuenow", String(percent));
    backToTop.title =
      percent > 0 ? `Scroll to top (${percent}%)` : "Scroll to top";
  }

  const toolsContainer = document.querySelector<HTMLElement>(
    ".right-side-tools-container",
  );
  if (toolsContainer) {
    const atTop = scrollTop <= 100;
    const isHome = document.querySelector(".story-page-home") !== null;
    toolsContainer.classList.toggle("hide", isHome && atTop);
  }
}

function bindControls(): void {
  const backToTop = document.querySelector<HTMLElement>(".tool-scroll-to-top");
  if (backToTop && backToTop.dataset.bound !== "1") {
    backToTop.dataset.bound = "1";
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const backToBottom = document.querySelector<HTMLElement>(
    ".tool-scroll-to-bottom",
  );
  if (backToBottom && backToBottom.dataset.bound !== "1") {
    backToBottom.dataset.bound = "1";
    backToBottom.addEventListener("click", () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    });
  }

  const toggleBtn = document.querySelector<HTMLElement>(".toggle-tools-list");
  const hiddenList = document.querySelector<HTMLElement>(".hidden-tools-list");
  if (toggleBtn && hiddenList && toggleBtn.dataset.bound !== "1") {
    toggleBtn.dataset.bound = "1";
    toggleBtn.addEventListener("click", () => {
      hiddenList.classList.toggle("show");
    });
  }

  bindFontAdjustControls();
}

export function installScrollTopBottom(): void {
  if (!document.querySelector(".right-side-tools-container")) return;

  bindControls();
  updateScrollUi();

  if (bound) return;
  bound = true;

  let ticking = false;
  scrollHandler = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateScrollUi();
      ticking = false;
    });
  };
  window.addEventListener("scroll", scrollHandler, { passive: true });
}

export function teardownScrollTopBottom(): void {
  if (scrollHandler) {
    window.removeEventListener("scroll", scrollHandler);
    scrollHandler = null;
    bound = false;
  }
}
