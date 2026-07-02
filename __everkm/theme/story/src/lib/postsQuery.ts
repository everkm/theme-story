import { POSTS_CONTENT_DIR } from "./postsPath";

/** `_*.md` files are data sources, not public posts. */
export function isUnderscoreDataSource(path: string): boolean {
  const base = path.replace(/^\/+/, "").split("/").pop() ?? "";
  return base.startsWith("_");
}

export function filterPublicPosts(items: PostItem[]): PostItem[] {
  return items.filter((post) => {
    if (post.draft) return false;
    const path = post.path ?? post.url_path ?? "";
    return !isUnderscoreDataSource(path);
  });
}

type PublicPostsOptions = {
  offset?: number;
  limit?: number;
  tags?: string[];
  exclude_tags?: string[];
};

/** List public root-level posts with underscore data files excluded. */
export function queryPublicPosts(
  requestId: string,
  options: PublicPostsOptions = {},
): { items: PostItem[]; total: number } {
  const raw = everkm.posts(requestId, {
    dir: POSTS_CONTENT_DIR,
    recursive: false,
    order_by: "date",
    order_direction: "desc",
    draft: false,
    limit: 10000,
    tags: options.tags,
    exclude_tags: options.exclude_tags,
  });
  const filtered = filterPublicPosts(raw.items);
  const offset = options.offset ?? 0;
  const limit = options.limit ?? filtered.length;
  return {
    items: filtered.slice(offset, offset + limit),
    total: filtered.length,
  };
}
