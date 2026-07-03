---
title: "使用标签"
description: 在 Story 主题中用标签组织文章。
created_at: 2026-06-23T11:00:00Z
tags:
  - guide
  - tags
---

标签帮助读者发现博客中的相关内容。

## 添加标签

```yaml
tags:
  - javascript
  - tutorial
  - featured
```

## 标签页

每个标签拥有独立页面 `/tags/{tag}/index.html`，并支持分页文章列表。

## featured 标签

带有 `featured` 标签的文章（或你配置的 `posts.featured_tag`）会在首页精选区域展示。
