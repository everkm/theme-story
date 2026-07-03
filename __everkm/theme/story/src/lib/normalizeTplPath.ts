/** Normalize ekmp tpl_path to route key for renderPage switch. */
export function normalizeTplPath(tplPath: string): string {
  return tplPath
    .replace(/\.p\d+(?=\.html$)/i, "")
    .replace(/^\/+/, "")
    .replace(/\/index\.html$/i, "")
    .replace(/index\.html$/i, "")
    .replace(/\.html$/i, "")
    .replace(/\/+$/, "");
}

/** Map normalized tpl key to page component name. */
export function resolvePageKey(
  compName: string,
  tplPath?: string,
  post?: PostItem | null,
): string {
  const raw = tplPath ?? compName;
  const key = normalizeTplPath(raw);

  if (key === "" || key === "home") return "home";
  if (key === "about") return "about";
  if (key === "posts") return "posts-list";
  if (key === "tags") return "tags-index";
  if (key === "archives") return "archives";
  if (key === "links") return "links";
  if (key === "album") return "album";
  if (key === "404" || key === "not-found") return "not-found";
  if (key.startsWith("tags/")) return "tag-posts";

  if (post) return "post";
  if (compName === "post") return "post";

  if (key) return "not-found";
  return "post";
}

/** Extract tag slug from tags/{slug} path. */
export function extractTagSlug(tplKey: string): string | null {
  const match = tplKey.match(/^tags\/(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}
