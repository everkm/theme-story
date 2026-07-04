import { assetUrl } from "./url";

export function resolvePostCover(
  ctx: PageContext,
  post: PostItem,
): string | null {
  const cover = post.meta?.cover;
  if (typeof cover !== "string" || !cover.trim()) return null;
  const value = cover.trim();
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("/assets/")) return assetUrl(ctx.request_id, value);
  if (value.startsWith("/")) {
    try {
      const resolved = everkm.media(ctx.request_id, {
        file: value,
        __origin_path: post.path,
      } as { file: string; __origin_path?: string });
      if (typeof resolved === "string" && resolved.length > 0) {
        return resolved;
      }
    } catch {
      /* fall through */
    }
  }
  return assetUrl(ctx.request_id, value);
}

export function resolvePostCanonicalUrl(
  ctx: PageContext,
  post: PostItem,
): string {
  return post.url_path;
}
