---
title: "归档与分页"
description: 按日期浏览文章，或在列表中翻页。
created_at: 2026-06-20T08:00:00Z
tags:
  - features
---

Story 主题提供两种方式浏览历史内容。

## 归档

访问 `/archives/index.html` 查看按年月分组的所有文章。可通过 `features.show_archives` 控制顶栏归档入口的显示。

## 分页

文章列表与标签页均支持分页：

- 第 1 页：`/posts/index.html`
- 第 2 页：`/posts/index.p2.html`

在 `everkm.yaml` 中配置 `posts.per_page` 可调整每页数量（默认：10）。
