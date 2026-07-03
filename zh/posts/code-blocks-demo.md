---
title: "代码块演示"
description: Story 主题中的服务端语法高亮。
created_at: 2026-06-22T16:00:00Z
tags:
  - demo
  - code
---

启用 `code_highlight.server` 后，Story 主题支持服务端代码高亮。

## TypeScript

```typescript
type Post = {
  title: string;
  tags: string[];
};

function sortByDate(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => a.title.localeCompare(b.title));
}
```

## Python

```python
def fibonacci(n: int) -> list[int]:
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq[:n]
```

## Shell

```bash
everkm-publish serve --work-dir ./my-site --theme story
```
