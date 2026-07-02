import { normalizeTplPath } from "./normalizeTplPath";

export function normalizeNavPath(rawPath: string, lang?: string): string {
  let path =
    rawPath
      .replace(/\/index(?:\.p\d+)?\.html$/i, "")
      .replace(/\.html$/i, "")
      .replace(/\/+$/, "") || "/";

  if (lang) {
    const prefix = `/${lang}`;
    if (path === prefix) return "/";
    if (path.startsWith(`${prefix}/`)) {
      path = path.slice(prefix.length) || "/";
    }
  }

  return path;
}

export function currentPagePath(ctx: PageContext): string {
  const base = ctx.page_path_base || "";
  let raw = ctx.page_path || "";

  if (base && raw.startsWith(base)) {
    raw = raw.slice(base.length) || "/";
  }

  let normalized = normalizeNavPath(raw || "/", ctx.lang);

  if (normalized === "/" || normalized === "") {
    const tplKey = normalizeTplPath(ctx.tpl_path ?? "");
    if (tplKey && tplKey !== "home") {
      normalized = normalizeNavPath(`/${tplKey}`, ctx.lang);
    }
  }

  return normalized;
}

/** Client-side path for nav active state (after VT). */
export function currentNavPathFromBrowser(): string {
  const baseUrl = (window as { __everkm_base_url?: string }).__everkm_base_url;
  const lang = (window as { __everkm_lang?: string }).__everkm_lang;
  let path = window.location.pathname;

  if (baseUrl) {
    try {
      const basePath = new URL(baseUrl, window.location.origin).pathname
        .replace(/\/+$/, "");
      if (basePath && basePath !== "/" && path.startsWith(basePath)) {
        path = path.slice(basePath.length) || "/";
      }
    } catch {
      /* ignore */
    }
  }

  return normalizeNavPath(path, lang);
}

export function isActivePath(currentPath: string, target: string): boolean {
  const current = normalizeNavPath(currentPath);
  const t = normalizeNavPath(target);
  if (current === t) return true;
  const currentParts = current.split("/").filter(Boolean);
  const targetParts = t.split("/").filter(Boolean);
  if (targetParts.length === 0) return currentParts.length === 0;
  return currentParts[0] === targetParts[0];
}

export function pageUrl(requestId: string, path: string): string {
  const base = everkm.base_url(requestId).replace(/\/+$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function assetUrl(requestId: string, path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/assets/")) {
    return pageUrl(requestId, path);
  }
  try {
    const resolved = everkm.media(requestId, { file: path });
    if (typeof resolved === "string" && resolved.length > 0) {
      return resolved;
    }
  } catch {
    /* content media unavailable — fall through */
  }
  return everkm.asset_base_url(requestId, { url: path });
}
