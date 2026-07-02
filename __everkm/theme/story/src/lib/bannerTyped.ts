import Typed from "typed.js";

let typedInstance: Typed | null = null;
let hitokotoAbort: AbortController | null = null;

type TypedConfig = {
  typing_speed?: number;
  backing_speed?: number;
  backing_delay?: number;
  starting_delay?: number;
  loop?: boolean;
  smart_backspace?: boolean;
  hitokoto?: {
    enable?: boolean;
    show_author?: boolean;
    api?: string;
  };
};

function destroyTyped(): void {
  typedInstance?.destroy();
  typedInstance = null;
  hitokotoAbort?.abort();
  hitokotoAbort = null;
}

function parseJsonAttr<T>(raw: string | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function startTyped(
  el: HTMLElement,
  strings: string[],
  subCfg: TypedConfig,
): void {
  destroyTyped();
  typedInstance = new Typed(el, {
    strings,
    typeSpeed: subCfg.typing_speed ?? 100,
    backSpeed: subCfg.backing_speed ?? 80,
    backDelay: subCfg.backing_delay ?? 1500,
    startDelay: subCfg.starting_delay ?? 500,
    loop: subCfg.loop ?? true,
    smartBackspace: subCfg.smart_backspace ?? true,
  });
}

async function startHitokoto(
  el: HTMLElement,
  subCfg: TypedConfig,
): Promise<void> {
  const api = subCfg.hitokoto?.api ?? "https://v1.hitokoto.cn";
  hitokotoAbort?.abort();
  hitokotoAbort = new AbortController();
  try {
    const res = await fetch(api, { signal: hitokotoAbort.signal });
    if (!res.ok) return;
    const data = (await res.json()) as { hitokoto?: string; from_who?: string };
    if (!data.hitokoto) return;
    const text =
      data.from_who && subCfg.hitokoto?.show_author
        ? `${data.hitokoto}——${data.from_who}`
        : data.hitokoto;
    startTyped(el, [text], subCfg);
  } catch {
    /* ignore */
  }
}

export function installBannerTyped(): void {
  const el = document.querySelector<HTMLElement>("#home-banner-subtitle");
  if (!el) {
    destroyTyped();
    return;
  }

  const subCfg = parseJsonAttr<TypedConfig>(el.dataset.typedConfig, {});
  const strings = parseJsonAttr<string[]>(el.dataset.typedStrings, []);

  if (subCfg.hitokoto?.enable) {
    void startHitokoto(el, subCfg);
    return;
  }

  if (strings.length === 0) {
    destroyTyped();
    return;
  }

  startTyped(el, strings, subCfg);
}

export function teardownBannerTyped(): void {
  destroyTyped();
}
