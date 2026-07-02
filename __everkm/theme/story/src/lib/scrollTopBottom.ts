let bound = false;
let prevScrollY = 0;
let scrollHandler: (() => void) | null = null;

function readScrollConfig(): {
  bar: boolean;
  percentage: boolean;
} {
  return {
    bar: document.body.dataset.scrollProgressBar === "true",
    percentage: document.body.dataset.scrollProgressPercentage !== "false",
  };
}

function calcPercent(scrollTop: number, scrollHeight: number, clientHeight: number): number {
  const denom = scrollHeight - clientHeight;
  if (denom <= 0) return 0;
  const value = Math.round((scrollTop / denom) * 100);
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.min(value, 100);
}

function updateScrollUi(): void {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = window.innerHeight;
  const percent = calcPercent(scrollTop, scrollHeight, clientHeight);
  const { bar, percentage } = readScrollConfig();

  const progressBar = document.querySelector<HTMLElement>(".scroll-progress-bar");
  if (progressBar && bar) {
    progressBar.style.visibility = percent === 0 ? "hidden" : "visible";
    progressBar.style.width = `${percent}%`;
  }

  const backToTop = document.querySelector<HTMLElement>(".tool-scroll-to-top");
  const percentEl = backToTop?.querySelector<HTMLElement>(".percent");
  if (backToTop && percentage) {
    backToTop.classList.toggle("show", percent > 0);
    if (percentEl) percentEl.textContent = String(percent);
  }

  const toolsContainer = document.querySelector<HTMLElement>(
    ".right-side-tools-container",
  );
  if (toolsContainer) {
    const atTop = scrollTop <= 100;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 20;
    const isHome = document.querySelector(".story-page-home") !== null;
    const hide = (isHome && atTop) || atBottom;
    toolsContainer.classList.toggle("hide", hide);
  }

  prevScrollY = scrollTop;
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

  const themeToggle = document.querySelector<HTMLElement>(".tool-dark-light-toggle");
  if (themeToggle && themeToggle.dataset.bound !== "1") {
    themeToggle.dataset.bound = "1";
    themeToggle.addEventListener("click", () => {
      document.querySelector<HTMLButtonElement>("#theme-btn")?.click();
    });
  }
}

export function installScrollTopBottom(): void {
  if (!document.querySelector(".right-side-tools-container")) return;

  bindControls();
  updateScrollUi();

  if (bound) return;
  bound = true;
  prevScrollY = window.scrollY;

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
