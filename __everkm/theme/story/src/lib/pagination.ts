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
