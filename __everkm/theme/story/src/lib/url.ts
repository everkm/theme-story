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

/** Template-constructed paths (not from PostItem): prefix with `everkm.base_url`. */
export function pageUrl(requestId: string, path: string): string {
  const base = everkm.base_url(requestId).replace(/\/+$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

function normalizeHrefPath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

/** Logical virtual path from tpl_path — template-constructed, needs base_url. */
function pageUrlFromTpl(ctx: PageContext): string {
  const tpl = ctx.tpl_path?.trim();
  if (!tpl) return pageUrl(ctx.request_id, "/index.html");
  return pageUrl(ctx.request_id, normalizeHrefPath(tpl));
}

/**
 * Canonical href for the current page (data-backurl / data-home-path).
 * - `ctx.page_path`: server-resolved URL → use as-is
 * - `ctx.tpl_path` / pagination: template logical path → pageUrl
 */
export function currentPageUrl(ctx: PageContext): string {
  const pageNo = Math.max(1, parseInt(String(ctx.qs?.page ?? "1"), 10) || 1);
  const tpl = ctx.tpl_path?.trim() ?? "";

  // Paginated virtual pages: tpl_path keeps `.pN`; page_path may normalize to page 1.
  if (pageNo > 1 || /\.p\d+\.html$/i.test(tpl)) {
    return pageUrlFromTpl(ctx);
  }

  const pagePath = ctx.page_path?.trim();
  if (pagePath) {
    if (/^https?:\/\//i.test(pagePath)) return pagePath;
    return normalizeHrefPath(pagePath);
  }

  return pageUrlFromTpl(ctx);
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
