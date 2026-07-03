import { POSTS_CONTENT_DIR } from "./postsPath";
import { isUnderscoreDataSource } from "./postsQuery";

export type AlbumItem = {
  image: string;
  title?: string;
  width?: number;
  height?: number;
};

/** Collect image resources from public posts (URLs are resolved by Everkm). */
export function queryAlbumImages(requestId: string): AlbumItem[] {
  const raw = everkm.posts_resources(requestId, {
    dir: POSTS_CONTENT_DIR,
    recursive: true,
    draft: false,
    kinds: ["image"],
    order_by: "date",
    order_direction: "desc",
  });

  const items: AlbumItem[] = [];
  for (const entry of raw.items) {
    const path = entry.post.path ?? entry.post.url_path ?? "";
    if (isUnderscoreDataSource(path)) continue;

    for (const resource of entry.resources) {
      if (resource.kind !== "image") continue;
      const title =
        resource.title?.trim() || resource.alt?.trim() || undefined;
      items.push({
        image: resource.url,
        title,
        width: resource.width,
        height: resource.height,
      });
    }
  }
  return items;
}
