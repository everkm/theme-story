let started = false;

function wrapPreloaderLetters(titleEl: HTMLElement): number {
  const text = titleEl.textContent?.trim() ?? "";
  titleEl.textContent = "";
  titleEl.setAttribute("aria-label", text);

  let index = 0;
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const wordSpan = document.createElement("span");
    wordSpan.className = "story-preloader__word";

    for (const char of word) {
      const letter = document.createElement("span");
      letter.className = "story-preloader__letter";
      letter.style.setProperty("--i", String(index));
      letter.setAttribute("aria-hidden", "true");
      letter.textContent = char;
      wordSpan.appendChild(letter);
      index += 1;
    }

    titleEl.appendChild(wordSpan);
    titleEl.appendChild(document.createTextNode(" "));
  }

  return index;
}

function hidePreloader(el: HTMLElement): void {
  if (el.classList.contains("story-preloader--hide")) return;
  el.classList.add("story-preloader--hide");
  el.setAttribute("aria-busy", "false");
  window.setTimeout(() => {
    el.style.display = "none";
  }, 200);
}

export function installPreloader(): void {
  if (started) return;

  const el = document.querySelector<HTMLElement>(".story-preloader");
  if (!el || el.classList.contains("story-preloader--hide")) return;

  started = true;

  const titleEl = el.querySelector<HTMLElement>(".story-preloader__title");
  if (!titleEl) {
    hidePreloader(el);
    return;
  }

  const letterCount = wrapPreloaderLetters(titleEl);
  const maxMs = Number.parseInt(el.dataset.maxDuration ?? "5000", 10);
  const animMs = Math.min(maxMs, 300 + letterCount * 20 + 1800);
  const targetDelay = Math.min(maxMs, Math.max(animMs, 1200));

  let hidden = false;
  const hide = () => {
    if (hidden) return;
    hidden = true;
    hidePreloader(el);
  };

  window.setTimeout(hide, maxMs);

  const schedule = () => {
    window.setTimeout(hide, targetDelay);
  };

  if (document.readyState === "complete") {
    schedule();
  } else {
    window.addEventListener("load", schedule, { once: true });
  }
}
