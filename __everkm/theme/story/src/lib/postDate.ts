import dayjs from "dayjs";

/** Normalize everkm post timestamp (seconds or ms) to unix seconds. */
export function postTimestampSeconds(post: PostItem): number {
  const raw = post.date || post.updated_at;
  if (!raw) return 0;
  return raw > 1e12 ? Math.floor(raw / 1000) : raw;
}

export function postDate(post: PostItem) {
  return dayjs.unix(postTimestampSeconds(post));
}
