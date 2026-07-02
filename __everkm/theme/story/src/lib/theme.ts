const THEME_KEY = "theme";
const LIGHT = "light";
const DARK = "dark";

function getPreferredTheme(): string {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? DARK
    : LIGHT;
}

function readThemeValue(): string {
  return (
    (window as unknown as { __theme?: { value: string } }).__theme?.value ??
    localStorage.getItem(THEME_KEY) ??
    getPreferredTheme()
  );
}

let themeValue = readThemeValue();

function persist(): void {
  localStorage.setItem(THEME_KEY, themeValue);
  (window as unknown as { __theme?: { value: string } }).__theme = {
    value: themeValue,
  };
  reflectTheme();
}

export function reflectTheme(): void {
  const root = document.documentElement;
  const isDark = themeValue === DARK;
  root.setAttribute("data-theme", themeValue);
  root.classList.toggle("dark", isDark);
  root.classList.toggle("light", !isDark);
  root.style.colorScheme = themeValue;
  document.body.classList.toggle("dark-mode", isDark);
  document.body.classList.toggle("light-mode", !isDark);
  document.querySelector("#theme-btn")?.setAttribute("aria-label", themeValue);

  const bg = window.getComputedStyle(document.body).backgroundColor;
  document
    .querySelector("meta[name='theme-color']")
    ?.setAttribute("content", bg);
}

function toggleTheme(): void {
  themeValue = themeValue === LIGHT ? DARK : LIGHT;
  persist();
}

let themeSetup = false;

export function installTheme(): void {
  themeValue = readThemeValue();
  reflectTheme();

  if (themeSetup) return;
  themeSetup = true;

  document.addEventListener("click", (e) => {
    const btn = (e.target as Element)?.closest("#theme-btn");
    if (!btn) return;
    e.preventDefault();
    toggleTheme();
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", ({ matches }) => {
      if (localStorage.getItem(THEME_KEY)) return;
      themeValue = matches ? DARK : LIGHT;
      persist();
    });
}

/** Carry theme-color into fetched VT document (Astro Paper theme.ts). */
export function carryThemeColorTo(doc: Document): void {
  const color = document
    .querySelector("meta[name='theme-color']")
    ?.getAttribute("content");
  if (!color) return;
  doc
    .querySelector("meta[name='theme-color']")
    ?.setAttribute("content", color);
}

export function resetThemeBinding(): void {
  /* single delegated listener — no re-bind on VT */
}
