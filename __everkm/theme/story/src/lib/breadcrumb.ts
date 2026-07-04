import { normalizeTplPath } from "./normalizeTplPath";
import { POSTS_INDEX_URL } from "./postsPath";
import { normalizeNavPath, pageUrl } from "./url";
import type { UIStrings } from "./i18n/lang/en";

export type BreadcrumbSegment = {
  label: string;
  href?: string;
  lowercase?: boolean;
};

function decodeSegment(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function pageNoFromCtx(ctx: PageContext): number {
  const fromTpl = (ctx.tpl_path ?? "").match(/\.p(\d+)\.html$/i);
  if (fromTpl) return parseInt(fromTpl[1], 10) || 1;
  const fromQs = parseInt(String(ctx.qs?.page ?? "1"), 10);
  return Number.isFinite(fromQs) && fromQs > 0 ? fromQs : 1;
}

function pageKeySegment(pageKey?: string): string {
  const map: Record<string, string> = {
    "posts-list": "posts",
    "tags-index": "tags",
    archives: "archives",
    about: "about",
  };
  return pageKey ? map[pageKey] ?? "" : "";
}

function logicalPathKey(ctx: PageContext, pageKey?: string): string {
  const base = ctx.page_path_base || "";
  let raw = ctx.tpl_path ?? ctx.page_path ?? "";
  if (base && raw.startsWith(base)) {
    raw = raw.slice(base.length) || "/";
  }
  if (raw && !raw.startsWith("/")) raw = `/${raw}`;

  const normalized = normalizeNavPath(raw || "/", ctx.lang);
  if (normalized === "/" || normalized === "") {
    return pageKeySegment(pageKey);
  }
  return normalized.replace(/^\/+/, "");
}

function logicalSegments(ctx: PageContext, pageKey?: string): string[] {
  const key = logicalPathKey(ctx, pageKey);
  if (!key || key === "home") return [];

  const parts = key.split("/").filter(Boolean);
  const pageNo = pageNoFromCtx(ctx);

  if (parts[0] === "posts") {
    return ["posts", String(pageNo)];
  }

  if (parts[0] === "tags" && parts.length >= 2) {
    if (pageNo > 1) return ["tags", parts[1], String(pageNo)];
    return ["tags", parts[1]];
  }

  return parts;
}

/** Whether Astro-style breadcrumb should render (not on home or post detail). */
export function shouldShowBreadcrumb(
  _ctx: PageContext,
  _pageKey: string,
): boolean {
  // hexo-theme-redefine 无面包屑；Story 主题向源站对齐
  return false;
}

/** Build breadcrumb trail after Home, mirroring Astro Paper Breadcrumb.astro. */
export function buildBreadcrumbSegments(
  ctx: PageContext,
  t: UIStrings,
  pageKey?: string,
): BreadcrumbSegment[] {
  const raw = [...logicalSegments(ctx, pageKey)];
  if (raw.length === 0) return [];

  const navLabels: Record<string, string> = {
    posts: t.nav.posts,
    tags: t.nav.tags,
    about: t.nav.about,
    archives: t.nav.archives,
  };

  const labels: string[] = [];

  if (raw[0] === "posts") {
    const page = raw[1] || "1";
    labels.push(
      `${t.nav.posts} (${t.pagination.page.toLowerCase()} ${page})`,
    );
  } else if (raw[0] === "tags" && raw.length >= 2 && !Number.isNaN(Number(raw[2]))) {
    const tag = decodeSegment(raw[1]);
    const page = Number(raw[2]);
    labels.push(
      t.nav.tags,
      `${tag}${page === 1 ? "" : ` (${t.pagination.page.toLowerCase()} ${page})`}`,
    );
  } else if (raw[0] === "tags" && raw.length >= 2) {
    labels.push(t.nav.tags, decodeSegment(raw[1]));
  } else {
    for (const segment of raw) {
      labels.push(navLabels[segment] ?? decodeSegment(segment));
    }
  }

  const hrefs: (string | undefined)[] = labels.map((_, index) => {
    if (index === labels.length - 1) return undefined;

    if (raw[0] === "posts") {
      return pageUrl(ctx.request_id, POSTS_INDEX_URL);
    }

    if (raw[0] === "tags") {
      if (index === 0) return pageUrl(ctx.request_id, "/tags/index.html");
      if (raw.length >= 2) {
        const tag = encodeURIComponent(decodeSegment(raw[1]));
        return pageUrl(ctx.request_id, `/tags/${tag}/index.html`);
      }
    }

    if (raw[0] === "about") {
      return pageUrl(ctx.request_id, "/about/");
    }

    const pathSegments = raw.slice(0, index + 1);
    const last = pathSegments[pathSegments.length - 1];
    if (/^\d+$/.test(last)) {
      const page = parseInt(last, 10);
      const base = "/" + pathSegments.slice(0, -1).join("/");
      if (page <= 1) return pageUrl(ctx.request_id, `${base}/index.html`);
      return pageUrl(ctx.request_id, `${base}/index.p${page}.html`);
    }

    if (pathSegments.length === 1 && pathSegments[0] === "about") {
      return pageUrl(ctx.request_id, "/about/");
    }

    return pageUrl(ctx.request_id, `/${pathSegments.join("/")}/index.html`);
  });

  return labels.map((label, index) => ({
    label,
    href: hrefs[index],
    lowercase: raw[0] === "tags" && index > 0,
  }));
}
