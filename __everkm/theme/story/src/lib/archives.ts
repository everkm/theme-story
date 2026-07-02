import { postDate, postTimestampSeconds } from "./postDate";

export type ArchiveYearGroup = {
  year: string;
  posts: PostItem[];
};

export type ArchiveDateGroup = {
  dateLabel: string;
  posts: PostItem[];
};

export function groupArchiveByYear(posts: PostItem[]): ArchiveYearGroup[] {
  const byYear = new Map<string, PostItem[]>();

  for (const post of posts) {
    if (!postTimestampSeconds(post)) continue;
    const year = postDate(post).format("YYYY");
    const bucket = byYear.get(year);
    if (bucket) bucket.push(post);
    else byYear.set(year, [post]);
  }

  return [...byYear.entries()]
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, yearPosts]) => ({
      year,
      posts: [...yearPosts].sort(
        (a, b) => postTimestampSeconds(b) - postTimestampSeconds(a),
      ),
    }));
}

export function groupArchiveByDateLabel(posts: PostItem[]): ArchiveDateGroup[] {
  const groups: ArchiveDateGroup[] = [];
  let current: ArchiveDateGroup | null = null;

  for (const post of posts) {
    const dateLabel = postDate(post).format("MM-DD");
    if (!current || current.dateLabel !== dateLabel) {
      current = { dateLabel, posts: [post] };
      groups.push(current);
    } else {
      current.posts.push(post);
    }
  }

  return groups;
}
