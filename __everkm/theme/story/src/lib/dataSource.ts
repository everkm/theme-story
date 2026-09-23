import { resolveInnerLinkPath } from "./config";
import { maybeAwait } from "./engineCompat";
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

export async function loadDataSourceDoc(
  ctx: PageContext,
  innerLink: string | undefined,
  fallbackPath: string,
): Promise<PostItem | null> {
  const path = resolveInnerLinkPath(innerLink) || fallbackPath;
  return (
    (await maybeAwait(
      everkm.post_detail(ctx.request_id, {
      path,
      allow_missing: true,
      }),
    )) ?? null
  );
}

export function parseFriendLinkCategories(
  meta: Record<string, unknown> | undefined,
): FriendLinkCategory[] {
  const raw = meta?.links;
  if (!Array.isArray(raw)) return [];
  return raw as FriendLinkCategory[];
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

export async function dataSourceTitle(
  ctx: PageContext,
  innerLink: string | undefined,
  fallbackPath: string,
  fallbackTitle: string,
): Promise<string> {
  const doc = await loadDataSourceDoc(ctx, innerLink, fallbackPath);
  return doc?.title ?? fallbackTitle;
}
