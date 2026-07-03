import dayjs from "dayjs";

function parseMetaTimestamp(value: unknown): number {
  if (typeof value === "number" && value > 0) {
    return value > 1e12 ? Math.floor(value / 1000) : value;
  }
  if (typeof value === "string" && value) {
    const ms = Date.parse(value);
    if (!Number.isNaN(ms)) return Math.floor(ms / 1000);
  }
  return 0;
}

/** Normalize everkm post timestamp (seconds or ms) to unix seconds. */
export function postTimestampSeconds(post: PostItem): number {
  const raw =
    post.date ||
    post.updated_at ||
    parseMetaTimestamp(post.meta?.created_at) ||
    parseMetaTimestamp(post.meta?.date);
  if (!raw) return 0;
  return raw > 1e12 ? Math.floor(raw / 1000) : raw;
}

export function postDate(post: PostItem) {
  return dayjs.unix(postTimestampSeconds(post));
}
