export interface PaginationState {
  pageNo: number;
  pageSize: number;
  offset: number;
  pageCount: number;
}

export function readPagination(
  qs: Record<string, unknown>,
  config: Record<string, unknown>,
  total: number,
): PaginationState {
  const pageNo = Math.max(1, parseInt(String(qs?.page ?? "1"), 10) || 1);
  const pageSize = Number(
    (config as { posts?: { per_page?: number } })?.posts?.per_page ?? 4,
  );
  const offset = (pageNo - 1) * pageSize;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  return { pageNo, pageSize, offset, pageCount };
}

export function paginationHref(base: string, targetPage: number): string {
  const normalized = base.replace(/\/+$/, "");
  if (targetPage <= 1) return `${normalized}/index.html`;
  return `${normalized}/index.p${targetPage}.html`;
}

export type PageNavItem = number | "ellipsis";

/** Page number sequence aligned with hexo-theme-redefine paginator helper. */
export function buildPageNavItems(
  current: number,
  total: number,
  options?: { endSize?: number; midSize?: number },
): PageNavItem[] {
  const endSize = options?.endSize ?? 1;
  const midSize = options?.midSize ?? 2;
  if (total <= 1) return [];

  const items: PageNavItem[] = [];
  const leftEnd = Math.min(endSize, current - 1);
  const rightEnd = Math.max(total - endSize + 1, current + 1);
  const leftMid = Math.max(leftEnd + 1, current - midSize);
  const rightMid = Math.min(rightEnd - 1, current + midSize);

  for (let i = 1; i <= leftEnd; i++) items.push(i);
  if (leftMid - leftEnd > 1) items.push("ellipsis");
  for (let i = leftMid; i < current; i++) items.push(i);
  items.push(current);
  for (let i = current + 1; i <= rightMid; i++) items.push(i);
  if (rightEnd - rightMid > 1) items.push("ellipsis");
  for (let i = rightEnd; i <= total; i++) items.push(i);

  return items;
}
