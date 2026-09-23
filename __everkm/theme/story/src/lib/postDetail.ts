/** Load full post content (incl. content_html) for detail pages. */
export async function resolvePostDetail(
  ctx: PageContext,
): Promise<PostItem | null> {
  const lazyArgs = { lazy_img: true as const };

  const meta = ctx.post;
  if (meta?.path) {
    const detail = await everkm.post_detail(ctx.request_id, {
      path: meta.path,
      ...lazyArgs,
    });
    return detail ?? meta;
  }

  const pagePath = ctx.page_path;
  if (pagePath?.endsWith(".html")) {
    return everkm.post_detail(ctx.request_id, {
      path: pagePath.replace(/\.html$/, ".md"),
      ...lazyArgs,
    });
  }

  return meta ?? null;
}
