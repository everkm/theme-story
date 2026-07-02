---
title: "Code Blocks Demo"
description: Server-side syntax highlighting in Paper Theme.
created_at: 2026-06-22T16:00:00Z
tags:
  - demo
  - code
---

Paper Theme supports server-side code highlighting when `code_highlight.server` is enabled.

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
everkm-publish serve --work-dir ./my-site --theme paper
```
