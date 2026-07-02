/** Load full post content (incl. content_html) for detail pages. */
export function resolvePostDetail(ctx: PageContext): PostItem | null {
  const meta = ctx.post;
  if (meta?.path) {
    return everkm.post_detail(ctx.request_id, { path: meta.path }) ?? meta;
  }

  const pagePath = ctx.page_path;
  if (pagePath?.endsWith(".html")) {
    return everkm.post_detail(ctx.request_id, {
      path: pagePath.replace(/\.html$/, ".md"),
    });
  }

  return meta;
}
