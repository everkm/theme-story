import { resolveInnerLinkPath } from "./config";
import { assetUrl } from "./url";

export type FriendLinkItem = {
  name: string;
  link: string;
  description?: string;
  avatar?: string;
  thumbnail?: string;
};

export type FriendLinkCategory = {
  category?: string;
  links_category?: string;
  has_thumbnail?: boolean;
  list?: FriendLinkItem[];
};

export type MasonryItem = {
  image: string;
  title?: string;
  description?: string;
};

export function loadDataSourceDoc(
  ctx: PageContext,
  innerLink: string | undefined,
  fallbackPath: string,
): PostItem | null {
  const path = resolveInnerLinkPath(innerLink) || fallbackPath;
  return (
    everkm.post_detail(ctx.request_id, {
      path,
      allow_missing: true,
    }) ?? null
  );
}

export function parseFriendLinkCategories(meta: Record<string, unknown> | undefined): FriendLinkCategory[] {
  const raw = meta?.links;
  if (!Array.isArray(raw)) return [];
  return raw as FriendLinkCategory[];
}

export function parseMasonryItems(meta: Record<string, unknown> | undefined): MasonryItem[] {
  const raw = meta?.items;
  if (!Array.isArray(raw)) return [];
  return raw as MasonryItem[];
}

export function categoryLabel(category: FriendLinkCategory): string {
  return category.category ?? category.links_category ?? "";
}

export function resolveStoryMediaUrl(
  ctx: PageContext,
  path: string | undefined,
  originPath?: string,
): string {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/assets/")) return assetUrl(ctx.request_id, path);
  if (path.startsWith("/")) {
    try {
      const resolved = everkm.media(ctx.request_id, {
        file: path,
        __origin_path: originPath,
      } as { file: string; __origin_path?: string });
      if (typeof resolved === "string" && resolved.length > 0) {
        return resolved;
      }
    } catch {
      /* fall through */
    }
  }
  return assetUrl(ctx.request_id, path);
}

export function dataSourceTitle(
  ctx: PageContext,
  innerLink: string | undefined,
  fallbackPath: string,
  fallbackTitle: string,
): string {
  const doc = loadDataSourceDoc(ctx, innerLink, fallbackPath);
  return doc?.title ?? fallbackTitle;
}
